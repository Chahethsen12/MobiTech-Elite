
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const isAdminRequest = searchParams.get('role') === 'admin';
  const [email, setEmail] = useState(isAdminRequest ? 'admin@mobitech.com' : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulation of authentication logic
    if (isAdminRequest) {
      if (email === 'admin@mobitech.com' && password === 'admin123') {
        const mockAdmin: User = {
          id: 'admin_1',
          name: 'System Administrator',
          email: email,
          role: 'admin'
        };
        setUser(mockAdmin);
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Use admin@mobitech.com / admin123');
      }
    } else {
      const mockUser: User = {
        id: 'user_1',
        name: 'Alex Johnson',
        email: email,
        role: 'customer'
      };
      setUser(mockUser);
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className={`w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border ${isAdminRequest ? 'border-red-100' : 'border-slate-100'} overflow-hidden animate-in fade-in zoom-in duration-500`}>
        {isAdminRequest ? (
          <div className="p-8 text-center bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
              <i className="fas fa-fingerprint text-2xl text-red-400"></i>
            </div>
            <h1 className="text-2xl font-black mb-1 uppercase tracking-tighter">Secure Admin Terminal</h1>
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Unauthorized Access Prohibited</p>
          </div>
        ) : (
          <div className="p-8 text-center bg-blue-600 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <i className="fas fa-lock text-2xl"></i>
            </div>
            <h1 className="text-2xl font-black mb-1">Welcome Back</h1>
            <p className="text-white/70 text-sm">Sign in to your customer account</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className={`text-xs font-bold p-4 rounded-xl flex items-center ${isAdminRequest ? 'bg-red-900/10 text-red-600' : 'bg-red-50 text-red-500'}`}>
              <i className="fas fa-exclamation-triangle mr-2"></i> {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              {isAdminRequest ? 'Admin ID / Email' : 'Email Address'}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-2xl px-5 py-4 text-sm outline-none transition-all ${
                isAdminRequest 
                ? 'bg-slate-900 text-white border-slate-800 focus:border-red-500' 
                : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500'
              }`}
              placeholder={isAdminRequest ? "admin@system.local" : "name@example.com"}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              {!isAdminRequest && <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</button>}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-2xl px-5 py-4 text-sm outline-none transition-all ${
                isAdminRequest 
                ? 'bg-slate-900 text-white border-slate-800 focus:border-red-500' 
                : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500'
              }`}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all transform active:scale-95 ${
              isAdminRequest 
              ? 'bg-red-600 shadow-red-900/20 hover:bg-red-700' 
              : 'bg-blue-600 shadow-blue-100 hover:bg-blue-700'
            }`}
          >
            {isAdminRequest ? 'AUTHENTICATE SYSTEM' : 'Sign Into Account'}
          </button>

          {!isAdminRequest && (
            <p className="text-center text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register now</Link>
            </p>
          )}

          {isAdminRequest && (
            <div className="pt-4 text-center">
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
                <i className="fas fa-times-circle mr-1"></i> Exit Secure Terminal
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
