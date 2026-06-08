import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="py-12 px-6 border-t border-neutral-200 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} The Quiet Mile. Curated Quality.</p>
      </footer>
    </div>
  );
};

export default Layout;
