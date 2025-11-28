
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Link2, ArrowLeft, ArrowRight, Loader2, Building, User } from 'lucide-react';
import { api } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isCorporate: false,
    companyName: '',
    taxId: '',
    taxOffice: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.register(
        formData.name, 
        formData.email, 
        formData.password, 
        formData.isCorporate, 
        formData.companyName, 
        formData.taxId
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // In a real app show error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Ana Sayfaya Dön</span>
        </Link>
        
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-xl shadow-lg shadow-gray-900/20 mb-6">
             <Link2 className="text-white" size={28} />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('auth.join')}</h1>
           <p className="text-gray-500 mt-3">{t('auth.joinSubtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Account Type Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, isCorporate: false})}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-sm font-medium transition-all ${!formData.isCorporate ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <User size={18} />
                <span>{t('auth.individual')}</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, isCorporate: true})}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-sm font-medium transition-all ${formData.isCorporate ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Building size={18} />
                <span>{t('auth.corporate')}</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.fullName')}</label>
              <input
                name="name"
                type="text"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                placeholder="Ahmet Yılmaz"
              />
            </div>

            {formData.isCorporate && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.companyName')}</label>
                  <input
                    name="companyName"
                    type="text"
                    required={formData.isCorporate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                    placeholder="Acme Teknoloji Ltd. Şti."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.taxOffice')}</label>
                  <input
                    name="taxOffice"
                    type="text"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                    placeholder="Kadıköy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.taxId')}</label>
                  <input
                    name="taxId"
                    type="text"
                    required={formData.isCorporate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white transition-all"
                placeholder="Min. 8 karakter"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-600/20 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <span>{t('auth.createAccount')}</span>}
              {!loading && <ArrowRight size={18} className="opacity-70" />}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Kaydolarak <a href="#" className="underline">Hizmet Şartları</a>'nı kabul etmiş olursunuz.
          </p>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-sm text-gray-600">
              {t('auth.noAccount').replace('?', '')} var mı?{' '}
              <Link to="/login" className="text-gray-900 font-bold hover:underline">
                {t('auth.login')}
              </Link>
           </p>
        </div>
      </div>
    </div>
  );
};
