
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, user, setUser, theme, toggleTheme }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const isActive = (path: string) => 
    location.pathname === path 
      ? "text-blue-600 font-bold" 
      : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

  return (
    <nav className="sticky top-0 z-50 glass dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
            <i className="fas fa-mobile-screen-button text-xl"></i>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            MobiTech<span className="text-blue-600">Elite</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/shop" className={isActive('/shop')}>Products</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={isActive('/admin')}>Portal</Link>
          )}
        </div>

        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
          </button>

          <Link to="/cart" className="relative p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.name[0]}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hidden sm:block">{user.name}</span>
              </button>
              
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                    <Link to="/portal" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
                      <i className="fas fa-user-circle mr-2 opacity-50"></i> My Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
                        <i className="fas fa-gauge-high mr-2 opacity-50"></i> Admin Dashboard
                      </Link>
                    )}
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                    <button 
                      onClick={() => { setUser(null); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-slate-900 dark:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg shadow-slate-200 dark:shadow-blue-900/20">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
