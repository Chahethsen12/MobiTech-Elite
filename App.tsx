
import React, { useState, useMemo, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from './constants';
import { CartItem, Product, User } from './types';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPortal from './pages/UserPortal';
import Checkout from './pages/Checkout';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar';

const AdminSecretTrigger = () => {
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (clicks === 0) return;
    
    const timer = setTimeout(() => {
      setClicks(0);
    }, 2000);

    if (clicks >= 4) {
      setClicks(0);
      navigate('/login?role=admin');
    }
    
    return () => clearTimeout(timer);
  }, [clicks, navigate]);

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setClicks(prev => prev + 1);
        console.debug(`Secret Admin clicks: ${clicks + 1}/4`);
      }}
      className="fixed top-0 right-0 w-20 h-20 z-[9999] cursor-default opacity-0 hover:opacity-5 transition-opacity bg-red-500 rounded-bl-full"
      title="Restricted Access"
      aria-hidden="true"
    />
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to sync the theme with the document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
        <AdminSecretTrigger />
        <Navbar cartCount={cartCount} user={user} setUser={setUser} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow pb-20">
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <Admin products={products} setProducts={setProducts} theme={theme} /> : <Navigate to="/login?role=admin" />} 
            />
            <Route 
              path="/portal" 
              element={user ? <UserPortal user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        <ChatWidget products={products} />

        <footer className="bg-slate-900 dark:bg-slate-950 text-white py-10 mt-12 border-t dark:border-slate-800 transition-colors duration-500">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">MobiTech Elite</h3>
              <p className="text-slate-400">Industry-leading mobile phone solutions. High quality, expert support.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200 uppercase tracking-wider text-xs">Shop</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/shop" className="hover:text-blue-400 transition-colors">Smartphones</Link></li>
                <li><Link to="/shop" className="hover:text-blue-400 transition-colors">Tablets</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200 uppercase tracking-wider text-xs">Account</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/portal" className="hover:text-blue-400 transition-colors">Order History</Link></li>
                <li><Link to="/login" className="hover:text-blue-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200 uppercase tracking-wider text-xs">Contact</h4>
              <div className="flex space-x-4">
                <a href="https://wa.me/123456789" target="_blank" className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-10 text-slate-500 border-t border-slate-800 pt-6">
            &copy; 2024 MobiTech Elite. All Rights Reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
