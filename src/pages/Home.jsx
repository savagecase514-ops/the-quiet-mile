import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 font-serif">
            Quiet Utility. Elevated Living.
          </h1>
          <p className="text-xl text-neutral-500 mb-10 leading-relaxed font-light">
            A curated selection of tools and gadgets that bring focus and efficiency to your modern routine.
          </p>
          <div className="flex justify-center">
            <button className="bg-neutral-900 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center space-x-2 group">
              <span>Explore Collection</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-neutral-400 font-mono text-sm tracking-widest uppercase">Loading Collection...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-[4/5] bg-neutral-100 rounded-3xl mb-6 overflow-hidden relative border border-neutral-100">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <span className="font-mono text-xs uppercase tracking-widest">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-neutral-900 uppercase tracking-widest shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-neutral-900 font-serif">{product.title}</h3>
                  <div className="text-lg font-medium text-neutral-900 font-mono">{product.price}</div>
                </div>
                <p className="text-neutral-500 text-sm mb-6 font-light line-clamp-2">{product.description}</p>
                <a 
                  href={`/r/${product.id}`}
                  className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <span>Buy Now</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
