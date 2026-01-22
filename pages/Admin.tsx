
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  theme: 'light' | 'dark';
}

const Admin: React.FC<AdminProps> = ({ products, setProducts, theme }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales'>('inventory');
  
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const updateStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  const chartColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
  const chartText = theme === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">MobiTech Enterprise Portal</span>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'sales' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Sales Reports
          </button>
        </div>
      </header>

      {activeTab === 'inventory' ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Levels</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={p.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{p.brand}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase tracking-wider">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">${p.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-grow bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${p.stock < 5 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${Math.min(100, (p.stock / 20) * 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-bold ${p.stock < 5 ? 'text-red-600' : 'text-slate-600 dark:text-slate-400'}`}>{p.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => updateStock(p.id, p.stock - 1)} className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-red-500 hover:border-red-200 transition-all">
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <button onClick={() => updateStock(p.id, p.stock + 1)} className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-green-500 hover:border-green-200 transition-all">
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Revenue</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">$24,905</div>
              <div className="mt-4 flex items-center text-green-500 text-xs font-bold">
                <i className="fas fa-arrow-up-right mr-1"></i>
                <span>+12.4% vs last month</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Orders Handled</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">1,248</div>
              <div className="mt-4 flex items-center text-blue-500 text-xs font-bold">
                <i className="fas fa-circle-check mr-1"></i>
                <span>99.8% Success rate</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">AI Support Load</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">84%</div>
              <div className="mt-4 flex items-center text-amber-500 text-xs font-bold">
                <i className="fas fa-robot mr-1"></i>
                <span>Automated resolution</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Weekly Performance Matrix</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartText, fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: chartText, fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  />
                  <Area type="monotone" dataKey="sales" stroke={chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
