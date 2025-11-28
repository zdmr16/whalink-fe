
import React, { useState, useEffect } from 'react';
import { User, CreditCard, Shield, Save, Check, Loader2, Building, Receipt } from 'lucide-react';
import { api } from '../services/mockApi';
import { User as UserType } from '../types';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form States
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [billingInfo, setBillingInfo] = useState({
    isCorporate: false,
    companyName: '',
    taxId: '',
    taxOffice: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    const u = api.getCurrentUser();
    if (u) {
      setUser(u);
      setName(u.name);
      setBillingInfo(u.billingInfo);
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      // Simulate update
      await api.updateUserProfile({
        name,
        billingInfo
      });
      setSuccessMsg('Profile updated successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your account, subscription, and billing details.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span>Save Changes</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 animate-in slide-in-from-top-2">
          <Check size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Account Details */}
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <User className="text-gray-400" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={user.email}
                  readOnly
                  disabled
                  className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg p-2.5 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
              </div>
            </div>
          </section>

          {/* Billing Info Form */}
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-2">
                 <Receipt className="text-gray-400" size={20} />
                 <h2 className="text-lg font-bold text-gray-900">Invoice Information</h2>
               </div>
               
               <label className="inline-flex items-center cursor-pointer">
                  <input 
                     type="checkbox" 
                     className="sr-only peer"
                     checked={billingInfo.isCorporate}
                     onChange={(e) => setBillingInfo({...billingInfo, isCorporate: e.target.checked})}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">Corporate Invoice</span>
               </label>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {billingInfo.isCorporate && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input 
                          type="text" 
                          value={billingInfo.companyName}
                          onChange={(e) => setBillingInfo({...billingInfo, companyName: e.target.value})}
                          placeholder="e.g. Acme Corp"
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Office</label>
                        <input 
                          type="text" 
                          value={billingInfo.taxOffice}
                          onChange={(e) => setBillingInfo({...billingInfo, taxOffice: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / VAT No</label>
                        <input 
                          type="text" 
                          value={billingInfo.taxId}
                          onChange={(e) => setBillingInfo({...billingInfo, taxId: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                     </div>
                  </div>
               )}

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                  <input 
                    type="text" 
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all mb-2"
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                        type="text" 
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                        placeholder="City"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                     />
                     <input 
                        type="text" 
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                        placeholder="Country"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                     />
                  </div>
               </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="text-gray-400" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Security</h2>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Leave blank to keep current password.</p>
             </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             {/* Abstract BG */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Current Plan</h3>
                      <p className="text-3xl font-bold mt-1 text-white">{user.subscription.planName}</p>
                   </div>
                   <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {user.subscription.status}
                   </div>
                </div>

                <div className="space-y-1 mb-6">
                   <p className="text-2xl font-bold">{user.subscription.price}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                   <p className="text-sm text-gray-400">Next billing: {user.subscription.nextBillingDate}</p>
                </div>

                <div className="space-y-3 mb-8">
                   {user.subscription.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                         <Check size={14} className="text-green-500" />
                         <span>{feat}</span>
                      </div>
                   ))}
                </div>

                <div className="flex flex-col space-y-3">
                   <button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-2.5 rounded-lg transition-colors text-sm">
                      Upgrade Plan
                   </button>
                   <button className="w-full bg-transparent border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                      Cancel Subscription
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="text-gray-400" size={20} />
                <h3 className="font-bold text-gray-900">Payment Method</h3>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                   <div className="text-sm">
                      <p className="font-medium text-gray-900">•••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/25</p>
                   </div>
                </div>
             </div>
             <button className="text-sm text-green-600 font-medium hover:underline">Update Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};
