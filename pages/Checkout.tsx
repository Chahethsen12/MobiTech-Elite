
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, User } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  user: User | null;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart, user }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNum: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') {
      setStep('success');
      clearCart();
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout is unavailable</h2>
        <p className="text-slate-500 mb-8">Your shopping bag is empty.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Return to Products</Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <i className="fas fa-check-circle text-5xl"></i>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Order Confirmed!</h1>
          <p className="text-slate-500 mb-2">Thank you for your purchase, <span className="font-bold text-slate-900">{formData.name}</span>.</p>
          <p className="text-sm text-slate-400 mb-10 tracking-wide uppercase font-bold">Order ID: #MTE-{Math.floor(Math.random() * 1000000)}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Estimated Delivery</span>
              <span className="font-bold text-slate-900">3-5 Business Days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipment Status</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Processing</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Confirmation sent to:</p>
              <p className="text-xs font-bold text-slate-700">{formData.email}</p>
            </div>
          </div>

          <Link to="/" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Progress Tracker */}
      <div className="flex items-center justify-center mb-16 space-x-4 md:space-x-12">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'shipping' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-green-500 text-white'}`}>
            {step === 'shipping' ? '1' : <i className="fas fa-check"></i>}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-400">Shipping</span>
        </div>
        <div className={`h-px w-12 md:w-24 ${step === 'payment' ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'payment' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
            2
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-400">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleNext} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm space-y-8">
            <h2 className="text-3xl font-black text-slate-900">
              {step === 'shipping' ? 'Delivery Information' : 'Payment Information'}
            </h2>

            {step === 'shipping' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="Enter your name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="name@example.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Street Address</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="123 Tech Lane" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">City</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="Innovation City" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ZIP / Postal Code</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.zip}
                    onChange={e => setFormData({...formData, zip: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="10001" 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden mb-8">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <i className="fas fa-credit-card text-8xl"></i>
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-12">
                      <div className="w-12 h-8 bg-amber-400 rounded-md"></div>
                      <i className="fab fa-visa text-3xl"></i>
                    </div>
                    <div className="text-2xl font-mono tracking-widest mb-8">
                      {formData.cardNum ? formData.cardNum.replace(/\d(?=\d{4})/g, "*") : "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between uppercase text-[10px] tracking-widest font-bold opacity-60">
                      <div>Card Holder</div>
                      <div>Expires</div>
                    </div>
                    <div className="flex justify-between font-bold text-sm tracking-widest">
                      <div>{formData.name || "YOUR NAME"}</div>
                      <div>{formData.cardExpiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Card Number</label>
                    <input 
                      required 
                      type="text" 
                      maxLength={16}
                      value={formData.cardNum}
                      onChange={e => setFormData({...formData, cardNum: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                      placeholder="4242 4242 4242 4242" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expiry</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={e => setFormData({...formData, cardExpiry: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CVV</label>
                      <input 
                        required 
                        type="password" 
                        maxLength={3}
                        value={formData.cardCvv}
                        onChange={e => setFormData({...formData, cardCvv: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="•••" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              {step === 'payment' && (
                <button 
                  type="button" 
                  onClick={() => setStep('shipping')}
                  className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back
                </button>
              )}
              <button 
                type="submit"
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 transition-all flex items-center space-x-3"
              >
                <span>{step === 'shipping' ? 'Continue to Payment' : `Pay $${total.toFixed(2)}`}</span>
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm sticky top-24">
            <h3 className="text-xl font-black text-slate-900 mb-6">Order Details</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-xs font-black text-slate-900">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                <span className="font-bold text-slate-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tax</span>
                <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4 mt-4 border-t border-slate-100">
                <span className="font-black text-slate-900">Total</span>
                <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
