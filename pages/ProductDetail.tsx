
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  
  const product = useMemo(() => products.find(p => p.id === id), [products, id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-blue-600 font-bold underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <i className="fas fa-arrow-left"></i>
        <span className="text-sm font-bold">Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[2.5rem] bg-white border border-slate-200 overflow-hidden shadow-sm">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={`https://picsum.photos/seed/${product.id}${i}/400/400`} className="w-full h-full object-cover" alt="Detail" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{product.brand}</span>
              <div className="flex text-amber-500 text-xs">
                <i className="fas fa-star mr-1"></i>
                <span className="text-slate-900 font-bold">{product.rating} (1.2k Reviews)</span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4">{product.name}</h1>
            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="flex items-end space-x-4">
            <span className="text-4xl font-black text-slate-900">${product.price}</span>
            <span className="text-slate-400 line-through text-lg mb-1">${(product.price * 1.15).toFixed(0)}</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-1">Save 15%</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key}>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</span>
                <span className="block text-sm font-bold text-slate-900 truncate">{val}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3"
            >
              <i className="fas fa-shopping-bag"></i>
              <span>Add to Shopping Bag</span>
            </button>
            <div className="flex items-center justify-center space-x-4 text-xs font-bold text-slate-500">
              <span className="flex items-center"><i className="fas fa-shield-check text-green-500 mr-1.5"></i> Secure Checkout</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center"><i className="fas fa-truck text-blue-500 mr-1.5"></i> Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
