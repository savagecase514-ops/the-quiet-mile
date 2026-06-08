import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight text-neutral-900">
          The Quiet Mile
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Storefront
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <Settings size={18} />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
