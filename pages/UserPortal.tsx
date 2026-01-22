
import React, { useState } from 'react';
import { User } from '../types';

interface UserPortalProps {
  user: User;
  setUser: (user: User) => void;
}

const UserPortal: React.FC<UserPortalProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState(false);

  const mockOrders = [
    { id: 'ORD-5521', date: '2024-03-15', status: 'Delivered', total: 1299, items: 'Samsung Galaxy S24 Ultra' },
    { id: 'ORD-4498', date: '2024-02-10', status: 'Delivered', total: 349, items: 'Sony WH-1000XM5' }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const emailChanged = editEmail !== user.email;
    
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false);

    if (emailChanged) {
      setIsEmailVerified(false);
      setVerificationNotice(true);
      // Auto-hide notice after 5 seconds
      setTimeout(() => setVerificationNotice(false), 5000);
    }
  };

  const handleVerifyEmail = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsEmailVerified(true);
      setVerificationNotice(false);
      alert("Verification successful! Your email is now confirmed.");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Dynamic Verification Alert */}
      {verificationNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4 animate-in slide-in-from-top-10 duration-500">
          <div className="bg-amber-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-amber-500">
            <div className="flex items-center space-x-3">
              <i className="fas fa-envelope-circle-check text-xl"></i>
              <div className="text-xs">
                <p className="font-bold">Email Change Detected</p>
                <p className="opacity-80">Please re-verify your new address.</p>
              </div>
            </div>
            <button onClick={() => setVerificationNotice(false)} className="text-white/50 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-12">
        {/* Profile Sidebar */}
        <aside className="w-full md:w-80 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm text-center">
            <div className="relative group mx-auto mb-6 w-24 h-24">
              <div className="w-full h-full bg-blue-600 text-white text-3xl font-black rounded-3xl flex items-center justify-center shadow-xl shadow-blue-100">
                {user.name[0]}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <i className="fas fa-camera text-xs"></i>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                <div className="animate-in fade-in duration-300">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="animate-in fade-in delay-75 duration-300">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-grow bg-blue-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 active:scale-95">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => { setIsEditing(false); setEditName(user.name); setEditEmail(user.email); }} className="px-4 bg-slate-100 text-slate-500 py-3 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black text-slate-900 mb-1">{user.name}</h2>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <p className="text-slate-400 text-sm truncate max-w-[150px]">{user.email}</p>
                  {isEmailVerified ? (
                    <i className="fas fa-check-circle text-green-500 text-[10px]" title="Verified"></i>
                  ) : (
                    <i className="fas fa-exclamation-circle text-amber-500 text-[10px]" title="Verification Pending"></i>
                  )}
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <i className="fas fa-pen text-[10px] group-hover:rotate-12 transition-transform"></i>
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-900/50 animate-pulse">
                    <i className="fas fa-crown text-white"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-amber-500">Gold Member</span>
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Tier 2 Elite</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMemberInfo(!showMemberInfo)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <i className={`fas ${showMemberInfo ? 'fa-times-circle' : 'fa-info-circle'} text-lg`}></i>
                </button>
              </div>

              {showMemberInfo ? (
                <div className="space-y-3 mb-4 animate-in fade-in zoom-in duration-300">
                  <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-4">Exclusive Benefits</h4>
                  <ul className="text-[10px] space-y-3 text-slate-400 font-medium">
                    <li className="flex items-center"><i className="fas fa-shipping-fast text-amber-500 mr-3 w-4"></i> Free Express Shipping</li>
                    <li className="flex items-center"><i className="fas fa-coins text-amber-500 mr-3 w-4"></i> 5% Cashback Reward</li>
                    <li className="flex items-center"><i className="fas fa-headset text-amber-500 mr-3 w-4"></i> Priority 24/7 Support</li>
                    <li className="flex items-center"><i className="fas fa-calendar-star text-amber-500 mr-3 w-4"></i> Early Release Access</li>
                  </ul>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">You're <span className="text-white font-bold">550 pts</span> away from reaching the <span className="text-amber-500 font-bold">Platinum</span> tier.</p>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6 border border-white/5">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full w-[70%] transition-all duration-1000 shadow-[0_0_15px_rgba(245,158,11,0.3)]"></div>
                  </div>
                </>
              )}
              
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 hover:border-amber-500/50">
                Redeem My Rewards
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900">Purchase History</h3>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Track All Orders</button>
            </div>
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <i className="fas fa-box"></i>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{order.id}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</div>
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <div className="text-sm font-bold text-slate-700">{order.items}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Standard Ground Shipping</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 mb-1 text-lg">${order.total}</div>
                    <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-green-100">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50/50 rounded-[2.5rem] p-10 border border-blue-100 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
            <h4 className="font-black text-blue-900 text-xl mb-8 relative z-10">Advanced Security & Access</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* 2FA Toggle */}
              <div className="bg-white p-8 rounded-3xl flex flex-col space-y-5 border border-blue-50 shadow-sm hover:shadow-lg hover:translate-y-[-2px] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${is2FAEnabled ? 'text-green-600 bg-green-50 border-green-100' : 'text-slate-300 bg-slate-50 border-slate-100'} w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500`}>
                      <i className={`fas ${is2FAEnabled ? 'fa-shield-check' : 'fa-shield-slash'} text-2xl`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">Two-Factor Auth</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${is2FAEnabled ? 'text-green-600' : 'text-slate-400'}`}>
                        {is2FAEnabled ? 'Device Protected' : 'Highly Recommended'}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                    className={`w-14 h-7 rounded-full relative transition-all duration-300 ${is2FAEnabled ? 'bg-green-500' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${is2FAEnabled ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  Add an extra layer of security to your account by requiring a code from your mobile device when logging in from new locations.
                </p>
              </div>

              {/* Email Verification Card */}
              <div className="bg-white p-8 rounded-3xl flex flex-col space-y-5 border border-blue-50 shadow-sm hover:shadow-lg hover:translate-y-[-2px] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${isEmailVerified ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-amber-600 bg-amber-50 border-amber-100'} w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500`}>
                      <i className={`fas ${isEmailVerified ? 'fa-envelope-circle-check' : 'fa-envelope-open-text'} text-2xl`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">Email Status</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center ${isEmailVerified ? 'text-blue-600' : 'text-amber-600'}`}>
                        <i className={`fas ${isEmailVerified ? 'fa-check-circle' : 'fa-clock'} mr-1.5 text-[8px]`}></i>
                        {isEmailVerified ? 'Verified Account' : 'Action Required'}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleVerifyEmail}
                    disabled={isVerifying || isEmailVerified}
                    className={`text-[10px] font-black uppercase transition-all px-4 py-2 rounded-lg ${
                      isEmailVerified 
                      ? 'text-slate-300 bg-slate-50 cursor-default' 
                      : 'text-white bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-100 active:scale-95'
                    }`}
                  >
                    {isVerifying ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : isEmailVerified ? 'Verified' : 'Verify Now'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  {isEmailVerified 
                    ? `Your address ${user.email} is active. You will receive all order updates here.`
                    : `Please confirm your new address ${user.email} to maintain access to premium features.`}
                </p>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserPortal;
