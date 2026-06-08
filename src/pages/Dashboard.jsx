import { useState } from 'react';
import { Link2, Plus, Loader2, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API processing
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setUrl('');
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">AI Assistant Dashboard</h1>
        <p className="text-neutral-500 text-lg">Process new product links to generate content and storefront listings.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden p-8 mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-neutral-700 mb-2">
              Product URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link2 size={18} className="text-neutral-400" />
              </div>
              <input
                type="url"
                id="url"
                required
                className="block w-full pl-11 pr-4 py-4 bg-neutral-50 border-none rounded-2xl focus:ring-2 focus:ring-neutral-900 transition-shadow placeholder:text-neutral-400"
                placeholder="https://www.amazon.com/product/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all ${
              isProcessing 
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Analyzing Product...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={20} className="text-green-400" />
                <span>Product Added Successfully</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Process Link</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
          <h3 className="font-semibold text-neutral-900 mb-2">Recent Tasks</h3>
          <p className="text-sm text-neutral-500">View the history of processed links and generated content.</p>
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between text-sm p-3 bg-white rounded-xl border border-neutral-100">
                <span className="truncate max-w-[200px] text-neutral-600">amazon.com/gadget-link-{i}...</span>
                <span className="text-xs font-medium text-neutral-400 uppercase">Completed</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
          <h3 className="font-semibold text-neutral-900 mb-2">Storefront Stats</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-neutral-100">
              <p className="text-xs text-neutral-400 uppercase font-bold mb-1">Products</p>
              <p className="text-2xl font-bold text-neutral-900">24</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-100">
              <p className="text-xs text-neutral-400 uppercase font-bold mb-1">Clicks</p>
              <p className="text-2xl font-bold text-neutral-900">1.2k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
