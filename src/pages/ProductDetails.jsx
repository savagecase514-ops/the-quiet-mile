import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Share2, ExternalLink, Loader2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-neutral-200 mb-4" />
        <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">Loading Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">Product not found</h2>
        <Link to="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">Return to collection</Link>
      </div>
    );
  }

  const benefitsList = product.benefits ? product.benefits.split(';') : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center space-x-2 text-sm text-neutral-500 hover:text-neutral-900 mb-12 transition-colors">
        <ChevronLeft size={16} />
        <span>Back to collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Gallery */}
        <div className="aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-100">
          {product.image_url ? (
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              <span className="font-mono text-xs uppercase tracking-widest">No Image</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">{product.category}</span>
            <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 font-serif">{product.title}</h1>
          <p className="text-3xl font-light text-neutral-900 mb-8 font-mono">{product.price}</p>
          
          <div className="prose prose-neutral mb-12">
            <p className="text-neutral-600 leading-relaxed text-lg font-light">
              {product.description}
            </p>
          </div>

          <a 
            href={`/r/${product.id}`}
            className="w-full bg-neutral-900 text-white py-5 rounded-3xl font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-neutral-200"
          >
            <span>Buy Now</span>
            <ExternalLink size={20} />
          </a>
          
          <div className="mt-12 pt-12 border-t border-neutral-100 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest">Key Benefits</h4>
              <ul className="text-sm text-neutral-500 space-y-3 font-light">
                {benefitsList.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-neutral-900">•</span>
                    {benefit.trim()}
                  </li>
                ))}
                {benefitsList.length === 0 && (
                  <>
                    <li>• Exceptional durability</li>
                    <li>• Minimalist design</li>
                    <li>• Sustainability focused</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest">Availability</h4>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                Stock and shipping handled by our vetted affiliate partner. Click "Buy Now" to view current status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
