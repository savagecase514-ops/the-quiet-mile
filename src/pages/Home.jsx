import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Quiet Utility. Elevated Living.
          </h1>
          <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
            A curated selection of tools and gadgets that bring focus and efficiency to your modern routine.
          </p>
          <div className="flex justify-center">
            <button className="bg-neutral-900 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors flex items-center space-x-2 group">
              <span>Explore Collection</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid Placeholder */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-neutral-200 rounded-2xl mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors" />
                {/* Image placeholder */}
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">Product Name {i}</h3>
              <p className="text-neutral-500 text-sm mb-4">Minimalist aesthetic meet functional design.</p>
              <div className="text-sm font-semibold text-neutral-900">$00.00</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
