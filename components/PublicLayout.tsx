
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Link2, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-wa-green rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
              <Link2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Whalink</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-wa-green transition-colors">Özellikler</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-wa-green transition-colors">Fiyatlandırma</Link>
            <Link to="/integrations" className="text-sm font-medium text-gray-600 hover:text-wa-green transition-colors">Entegrasyonlar</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm font-medium text-gray-900 hover:text-wa-green transition-colors">
              {t('auth.login')}
            </Link>
            <Link to="/register" className="bg-wa-green hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {t('auth.tryFree')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-5">
            <Link to="/" className="text-base font-medium text-gray-600">Özellikler</Link>
            <Link to="/pricing" className="text-base font-medium text-gray-600">Fiyatlandırma</Link>
             <div className="flex justify-between items-center">
                 <Link to="/login" className="text-base font-medium text-gray-900">{t('auth.login')}</Link>
                 <LanguageSwitcher />
             </div>
            <Link to="/register" className="bg-wa-green text-white text-center font-medium px-5 py-3 rounded-lg">
               {t('auth.tryFree')}
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <Link2 className="text-gray-500" size={18} />
              </div>
              <span className="font-bold text-gray-700">Whalink</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Whalink. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
