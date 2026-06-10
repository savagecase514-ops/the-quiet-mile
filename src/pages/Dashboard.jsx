import { useState } from 'react';
import { Link2, Plus, Loader2, CheckCircle2, Copy, Eye } from 'lucide-react';
import { extractProductInfo, generateContent } from '../utils/contentGenerator';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setGeneratedData(null);
    
    try {
      const product = await extractProductInfo(url);
      const content = generateContent(product);
      
      // Save to database via API
      const saveResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...product, 
          ai_content: JSON.stringify(content) 
        })
      });

      if (!saveResponse.ok) throw new Error('Failed to save to database');
      
      setGeneratedData({ product, content });
      setIsProcessing(false);
      setSuccess(true);
      setUrl('');
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Processing failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2 font-serif">AI Assistant Dashboard</h1>
        <p className="text-neutral-500 text-lg font-light">Affiliate product importer and AI content generator.</p>
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
                className="block w-full pl-11 pr-4 py-4 bg-neutral-50 border-none rounded-2xl focus:ring-2 focus:ring-neutral-900 transition-shadow placeholder:text-neutral-400 font-sans"
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
                <span>Analyzing Product & Generating Content...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={20} className="text-green-400" />
                <span>Product Imported Successfully</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Process Affiliate Link</span>
              </>
            )}
          </button>
        </form>
      </div>

      {generatedData && (
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 font-serif">Generated Content for: {generatedData.product.title}</h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-soft-sage/10 text-soft-sage rounded-full text-xs font-bold uppercase tracking-widest border border-soft-sage/20">Vetted</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TikTok Hooks */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest">TikTok Hooks (20)</h3>
                <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-neutral-900 transition-colors">
                  <Copy size={14} /> Copy All
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {generatedData.content.hooks.map((hook, i) => (
                  <div key={i} className="p-3 bg-neutral-50 rounded-xl text-sm text-neutral-700 border border-neutral-100 group relative hover:border-neutral-200 transition-colors">
                    {hook}
                    <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Captions */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-4">TikTok Captions</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {generatedData.content.tiktokCaptions.slice(0, 5).map((caption, i) => (
                  <div key={i} className="p-4 bg-neutral-50 rounded-xl text-sm text-neutral-600 border border-neutral-100 whitespace-pre-wrap leading-relaxed">
                    {caption}
                  </div>
                ))}
                <p className="text-center text-xs text-neutral-400 italic">Showing 5 of 20 generated captions</p>
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-4">Multi-Platform Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800">Instagram Captions</span>
                    <span className="text-xs text-neutral-400">Warm, benefit-forward tone</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-neutral-200 rounded-full text-neutral-600 font-mono">10 Ready</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800">Pinterest Descriptions</span>
                    <span className="text-xs text-neutral-400">SEO optimized for aesthetics</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-neutral-200 rounded-full text-neutral-600 font-mono">10 Ready</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800">YouTube Shorts Titles</span>
                    <span className="text-xs text-neutral-400">High-CTR curiosity gaps</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-neutral-200 rounded-full text-neutral-600 font-mono">10 Ready</span>
                </div>
              </div>
            </div>

            {/* Video Concepts */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
              <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-4">Video Concepts</h3>
              <div className="space-y-4">
                {generatedData.content.videoConcepts.map((concept, i) => (
                  <div key={i} className="p-4 border border-muted-gold/20 rounded-2xl bg-warm-ivory/30">
                    <h4 className="text-xs font-bold text-muted-gold mb-2 uppercase tracking-widest">{concept.name}</h4>
                    <p className="text-sm text-neutral-600 whitespace-pre-wrap leading-relaxed">{concept.structure}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
          <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-2">Recent Imports</h3>
          <p className="text-sm text-neutral-500 mb-4 font-light">View the history of processed links.</p>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between text-sm p-3 bg-white rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors cursor-pointer">
                <span className="truncate max-w-[140px] text-neutral-600 font-mono text-xs">amazon.com/item-{i}...</span>
                <span className="text-[10px] font-bold text-soft-sage uppercase tracking-tighter">Completed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
          <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-2">TikTok Hook Generator</h3>
          <p className="text-sm text-neutral-500 mb-4 font-light">Generate viral hooks for your short-form content.</p>
          <div className="mt-4">
            <button className="w-full py-3 bg-white border border-neutral-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-neutral-600 hover:bg-neutral-50 transition-colors">
              Create New Hooks
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
          <h3 className="font-bold text-neutral-900 uppercase text-xs tracking-widest mb-2">Storefront Performance</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-neutral-100">
              <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Products</p>
              <p className="text-2xl font-bold text-neutral-900 font-mono">24</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-100">
              <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">CTR</p>
              <p className="text-2xl font-bold text-neutral-900 font-mono">8.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
