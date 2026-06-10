import express from 'express';
import cors from 'cors';
import { spawnSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to escape single quotes for SQL
const escapeSql = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
};

// Helper to run team-db commands
const runDb = (sql) => {
  try {
    const result = spawnSync('team-db', [sql], { encoding: 'utf8' });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      console.error(`Command failed with status ${result.status}: ${result.stderr}`);
      throw new Error(result.stderr);
    }
    return JSON.parse(result.stdout);
  } catch (error) {
    console.error(`Database error: ${error.message}`);
    throw error;
  }
};

// API: Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = runDb("SELECT * FROM products ORDER BY created_at DESC");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// API: Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const product = runDb(`SELECT * FROM products WHERE id = '${escapeSql(req.params.id)}'`);
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// API: Save product
app.post('/api/products', (req, res) => {
  const { id, title, description, benefits, image_url, affiliate_url, price, category, ai_content } = req.body;
  try {
    const sql = `INSERT INTO products (id, title, description, benefits, image_url, affiliate_url, price, category, ai_content) VALUES ('${escapeSql(id)}', '${escapeSql(title)}', '${escapeSql(description)}', '${escapeSql(benefits)}', '${escapeSql(image_url)}', '${escapeSql(affiliate_url)}', '${escapeSql(price)}', '${escapeSql(category)}', '${escapeSql(ai_content)}')`;
    runDb(sql);
    res.status(201).json({ message: 'Product saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// Redirect Route: Log click and redirect
app.get('/r/:id', (req, res) => {
  const productId = req.params.id;
  try {
    // 1. Log the click event
    runDb(`INSERT INTO analytics (product_id) VALUES ('${escapeSql(productId)}')`);

    // 2. Get affiliate URL
    const product = runDb(`SELECT affiliate_url FROM products WHERE id = '${escapeSql(productId)}'`);
    
    if (product.length > 0 && product[0].affiliate_url) {
      console.log(`Redirecting to: ${product[0].affiliate_url}`);
      res.redirect(product[0].affiliate_url);
    } else {
      res.status(404).send('Product or affiliate link not found. Handling gracefully.');
    }
  } catch (error) {
    console.error(`Redirect error: ${error.message}`);
    res.status(500).send('An error occurred during redirect.');
  }
});

// API: Get analytics (bonus)
app.get('/api/analytics', (req, res) => {
  try {
    const stats = runDb("SELECT product_id, COUNT(*) as clicks FROM analytics GROUP BY product_id");
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
