
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
          <i className="fas fa-shopping-bag text-4xl"></i>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Your bag is empty</h2>
        <p className="text-slate-500 max-w-md mx-auto">Explore our latest mobile devices and find something perfect for you.</p>
        <Link to="/shop" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-12">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.brand}</p>
              </div>
              <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all">
                  <i className="fas fa-minus text-xs"></i>
                </button>
                <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all">
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
              <div className="text-right w-24">
                <div className="font-black text-slate-900">${item.price * item.quantity}</div>
                <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-24">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-4 text-sm font-medium border-b border-white/10 pb-8 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-8">
              <span className="text-slate-400">Total</span>
              <span className="text-3xl font-black">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-900/40"
            >
              Secure Checkout
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-bold">
              Pay with Credit Card, PayPal or Crypto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
