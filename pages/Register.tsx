
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface RegisterProps {
  setUser: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      role: 'customer'
    };

    setUser(mockUser);
    navigate('/portal');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-plus text-2xl"></i>
          </div>
          <h1 className="text-2xl font-black mb-1">Join MobiTech</h1>
          <p className="text-white/70 text-sm">Experience the elite standard in tech</p>
        </div>

        <form onSubmit={handleRegister} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Min. 8 characters"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-indigo-600" required />
            <span className="text-xs text-slate-500">I agree to the <button type="button" className="text-indigo-600 underline">Terms of Service</button></span>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl font-black text-white shadow-xl shadow-indigo-100 transition-all transform active:scale-95"
          >
            Create My Account
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
