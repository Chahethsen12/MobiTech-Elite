
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../types';

interface ShopProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => (activeCategory === 'All' || p.category === activeCategory))
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.rating - a.rating;
      });
  }, [products, activeCategory, search, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Explore Devices</h1>
          <p className="text-slate-500 dark:text-slate-400">Find the technology that fits your lifestyle.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search brand, model, features..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-10">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Categories</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                All Products
              </button>
              {Object.values(Category).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  {cat}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Sort By</h4>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="p-6 bg-slate-900 dark:bg-blue-900/20 rounded-3xl text-white border dark:border-blue-900/30">
            <h4 className="font-bold mb-2">Trade-in Program</h4>
            <p className="text-xs text-slate-400 mb-4">Get up to $500 credit towards your next device.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">Check Value</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {product.stock < 5 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        LOW STOCK
                      </div>
                    )}
                  </Link>
                  <div className="p-6">
                    <div className="mb-1 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{product.brand}</div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex text-amber-500 text-[10px]">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-slate-200'}`}></i>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-black text-slate-900 dark:text-white">${product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-slate-900 dark:hover:bg-blue-700 transition-all text-sm font-bold flex items-center space-x-2 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                      >
                        <i className="fas fa-plus text-xs"></i>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <i className="fas fa-search text-4xl text-slate-300 dark:text-slate-700 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No results found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-6 text-blue-600 dark:text-blue-400 font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
