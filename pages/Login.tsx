
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Link2, Lock, Mail, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { api } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Ana Sayfaya Dön</span>
        </Link>
        
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-xl shadow-lg shadow-green-600/20 mb-6">
             <Link2 className="text-white" size={28} />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('auth.welcomeBack')}</h1>
           <p className="text-gray-500 mt-3">{t('auth.loginSubtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                 <label className="block text-sm font-medium text-gray-700">{t('auth.password')}</label>
                 <a href="#" className="text-xs font-medium text-green-600 hover:underline">{t('auth.forgotPass')}</a>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <span>{t('auth.login')}</span>}
              {!loading && <ArrowRight size={18} className="opacity-70" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="text-green-600 font-bold hover:underline">
                {t('auth.tryFree')}
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">
              © 2024 Whalink Inc. Gizlilik Politikası ve Kullanım Şartları.
           </p>
        </div>
      </div>
    </div>
  );
};
