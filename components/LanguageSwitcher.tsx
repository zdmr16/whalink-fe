
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC<{ variant?: 'simple' | 'dropdown' }> = ({ variant = 'simple' }) => {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <button 
      onClick={toggle}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors text-sm font-medium text-gray-700"
    >
      {language === 'tr' ? (
         <>
           <span className="text-lg">🇹🇷</span>
           <span>TR</span>
         </>
      ) : (
         <>
           <span className="text-lg">🇺🇸</span>
           <span>EN</span>
         </>
      )}
    </button>
  );
};
