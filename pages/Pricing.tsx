
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Building, Briefcase, HelpCircle, ArrowRight, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  // Base monthly prices
  const prices = {
    starter: 12,
    professional: 35,
    business: 89,
    corporate: 249
  };

  const getPrice = (base: number) => {
    if (billing === 'monthly') return base;
    // Yearly calculation: (base * 10) / 12 for effective monthly display
    return Math.round((base * 10) / 12);
  };

  const TierCard = ({ id, price, icon: Icon, popular = false }: any) => {
    const tierData = t(`pricing.tiers.${id}` as any) as any;
    
    return (
      <div className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col
        ${popular 
          ? 'border-wa-green shadow-xl scale-105 z-10 ring-1 ring-wa-green/20' 
          : 'border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1'}`}
      >
        {popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wa-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {t('pricing.mostPopular')}
          </div>
        )}

        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg ${popular ? 'bg-green-100 text-wa-green' : 'bg-gray-100 text-gray-600'}`}>
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{tierData.name}</h3>
        </div>

        <p className="text-gray-500 text-sm mb-6 min-h-[40px]">{tierData.desc}</p>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">${getPrice(price)}</span>
            <span className="text-gray-500 ml-2">/ month</span>
          </div>
          {billing === 'yearly' && (
             <p className="text-xs text-green-600 font-medium mt-1">
               Billed ${price * 10} yearly (2 months free)
             </p>
          )}
        </div>

        <Link 
          to="/register" 
          className={`w-full py-3 px-4 rounded-xl font-bold text-center transition-all shadow-sm mb-8 flex flex-col items-center justify-center
            ${popular 
              ? 'bg-wa-green hover:bg-emerald-600 text-white shadow-green-200' 
              : 'bg-gray-900 hover:bg-black text-white'}`}
        >
          <span>{t('pricing.cta')}</span>
          <span className="text-[10px] font-normal opacity-80 mt-0.5">{t('pricing.noCC')}</span>
        </Link>

        <ul className="space-y-4 mb-8 flex-1">
          {tierData.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <Check size={16} className="text-wa-green mr-3 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white pt-24 pb-32 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('pricing.title')}</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          {t('pricing.subtitle')}
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center bg-gray-100 p-1 rounded-xl relative">
          <div className="flex items-center">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {t('pricing.monthly')}
            </button>
            <button 
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${billing === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {t('pricing.yearly')}
              <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">
                -{t('pricing.save20')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          <TierCard id="starter" price={prices.starter} icon={Zap} />
          <TierCard id="professional" price={prices.professional} icon={Star} popular={true} />
          <TierCard id="business" price={prices.business} icon={Briefcase} />
          <TierCard id="corporate" price={prices.corporate} icon={Building} />
        </div>

        {/* Add-on Section */}
        <div className="max-w-4xl mx-auto mb-20">
           <div className="bg-gray-900 rounded-2xl p-1 overflow-hidden shadow-2xl">
              <div className="bg-gray-800 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none"></div>
                 
                 <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
                    <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-purple-500/20">
                       <Plus size={12} />
                       <span>Optional Add-on</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('pricing.addon.title')}</h3>
                    <p className="text-gray-400 text-lg">
                       {t('pricing.addon.desc')}
                    </p>
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center md:items-end">
                    <div className="text-center md:text-right mb-4">
                       <span className="text-3xl font-bold text-white">{t('pricing.addon.price')}</span>
                       <span className="text-gray-400 text-sm block">{t('pricing.addon.oneTime')}</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-purple-900/50">
                       {t('pricing.addon.btn')}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{t('pricing.faq.title')}</h2>
           <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                       <HelpCircle size={20} className="text-gray-400 mr-3 mt-0.5" />
                       {t(`pricing.faq.q${i}` as any)}
                    </h3>
                    <p className="text-gray-600 ml-8">
                       {t(`pricing.faq.a${i}` as any)}
                    </p>
                 </div>
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
           <p className="text-gray-500 mb-6">Still have questions?</p>
           <a href="mailto:support@whalink.com" className="text-wa-green font-bold hover:underline flex items-center justify-center">
              Contact our sales team <ArrowRight size={16} className="ml-1" />
           </a>
        </div>
      </div>
    </div>
  );
};
