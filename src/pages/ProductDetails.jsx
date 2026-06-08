import { useParams } from 'react-router-dom';
import { ChevronLeft, Share2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center space-x-2 text-sm text-neutral-500 hover:text-neutral-900 mb-12 transition-colors">
        <ChevronLeft size={16} />
        <span>Back to collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Gallery Placeholder */}
        <div className="aspect-[4/5] bg-neutral-200 rounded-3xl overflow-hidden">
        </div>

        {/* Info */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">Category Name</span>
            <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          
          <h1 className="text-4xl font-bold text-neutral-900 mb-6">Product Title {id}</h1>
          <p className="text-2xl font-light text-neutral-900 mb-8">$00.00</p>
          
          <div className="prose prose-neutral mb-12">
            <p className="text-neutral-600 leading-relaxed">
              This is a placeholder description for the product. It emphasizes the quality, material, and functional benefits that align with The Quiet Mile's philosophy of intentional living.
            </p>
          </div>

          <button className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-3">
            <span>Buy Now</span>
            <ExternalLink size={20} />
          </button>
          
          <div className="mt-12 pt-12 border-t border-neutral-100 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">Key Benefits</h4>
              <ul className="text-sm text-neutral-500 space-y-2">
                <li>• Exceptional durability</li>
                <li>• Minimalist design</li>
                <li>• Sustainability focused</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">Shipping</h4>
              <p className="text-sm text-neutral-500">
                Calculated at checkout via affiliate partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
