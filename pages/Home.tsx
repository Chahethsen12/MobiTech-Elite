
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, addToCart }) => {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-slate-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556656793-062ff987b483?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-40" 
            alt="Hero background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-6">
            <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">Spring Sale 2024</span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">Elite Phones for <br/><span className="text-blue-500">Elite Standards.</span></h1>
            <p className="text-lg text-slate-300 max-w-lg">Discover the next generation of mobile computing. AI-integrated, performance-driven, and designed for you.</p>
            <div className="flex space-x-4 pt-4">
              <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:translate-y-[-2px] flex items-center space-x-2">
                <span>Browse Products</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: 'fa-truck-fast', title: 'Free Global Shipping', desc: 'On orders over $999' },
          { icon: 'fa-shield-halved', title: '2 Year Warranty', desc: 'Extended protection plans' },
          { icon: 'fa-headset', title: '24/7 AI Support', desc: 'Instant expert answers' },
          { icon: 'fa-rotate', title: '30-Day Returns', desc: 'Risk-free shopping' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className={`fas ${item.icon} text-xl`}></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Featured Releases</h2>
            <p className="text-slate-500 dark:text-slate-400">The most sought-after devices of the season.</p>
          </div>
          <Link to="/shop" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
                    {product.brand}
                  </span>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  <div className="flex items-center text-amber-500 text-sm">
                    <i className="fas fa-star mr-1"></i>
                    <span className="font-bold text-slate-900 dark:text-slate-200">{product.rating}</span>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-slate-900 dark:bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg shadow-slate-200 dark:shadow-blue-900/20"
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-extrabold">Need personalized help?</h2>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">Our experts are available on WhatsApp to help you choose the right device, discuss enterprise deals, or assist with orders.</p>
            <a 
              href="https://wa.me/123456789" 
              target="_blank" 
              className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-900/40"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
