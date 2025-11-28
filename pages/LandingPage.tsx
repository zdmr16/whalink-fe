
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Zap, Globe, MessageSquare, Shield, 
  Smartphone, ShoppingBag, Box, Play, X, Link2,
  Wifi, PhoneOff, Activity, Server, Lock, Clock, Calendar, Database, Layers
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/mockApi';
import { BlogPost } from '../types';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api.getBlogPosts().then(posts => setBlogPosts(posts.slice(0, 3)));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-wa-green/20 to-emerald-300/20 rounded-full blur-[100px] -z-10 opacity-60"></div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-wa-green animate-pulse"></span>
            <span className="text-sm font-medium text-green-800">{t('hero.tag')}</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-5xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            {t('hero.title')}
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
             {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Link to="/register" className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white text-lg font-semibold px-8 py-3 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center justify-center group">
              <div className="flex items-center">
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
              <span className="text-[11px] font-normal opacity-70 mt-0.5 font-sans">{t('hero.noCC')}</span>
            </Link>
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-lg font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center group">
              <Play className="mr-2 text-wa-green fill-wa-green group-hover:scale-110 transition-transform" size={20} />
              {t('hero.ctaSecondary')}
            </button>
          </div>

          {/* Hero Visual: Cloud Dashboard */}
          <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
             <div className="relative z-10 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden ring-1 ring-white/10">
                {/* Header */}
                <div className="bg-gray-800/80 backdrop-blur px-4 py-3 flex items-center border-b border-gray-700">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                </div>
                
                {/* Body */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                    {/* Left Side: Status Panel */}
                    <div className="md:col-span-5 space-y-4">
                         {/* Connection Status */}
                         <div className="bg-gray-800 rounded-lg p-5 border border-gray-700/50">
                             <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-400 text-xs font-medium uppercase">Session Status</span>
                                <div className="flex items-center space-x-1.5 bg-wa-green/10 px-2 py-0.5 rounded text-wa-green text-xs font-bold border border-wa-green/20">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa-green opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green"></span>
                                    </span>
                                    <span>LIVE</span>
                                </div>
                             </div>
                             <div className="flex flex-col items-center py-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-wa-green to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/20 mb-3 relative">
                                    <Wifi size={32} className="text-white" />
                                </div>
                                <h3 className="text-white font-bold text-lg">Whalink Cloud</h3>
                                <p className="text-gray-400 text-sm">Gateway Active</p>
                             </div>
                         </div>
                    </div>

                    {/* Right Side: Activity Log */}
                    <div className="md:col-span-7 bg-gray-800 rounded-lg border border-gray-700/50 p-1 overflow-hidden flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-700/50 flex justify-between items-center bg-gray-800/50">
                            <div className="flex items-center space-x-2 text-sm font-medium text-gray-200">
                               <Activity size={16} className="text-blue-400" />
                               <span>Real-time Event Log</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-4 font-mono text-xs md:text-sm relative h-full">
                            <div className="flex gap-3 bg-wa-green/10 -mx-4 px-4 py-2 border-l-2 border-wa-green">
                               <span className="text-gray-500">14:02:47</span>
                               <div className="flex-1">
                                  <span className="text-wa-green font-bold">SENT</span> <span className="text-gray-300">WhatsApp Message</span>
                                  <div className="text-gray-400 mt-1">"Merhaba! Siparişiniz 8821 alındı..."</div>
                               </div>
                            </div>
                            <div className="flex gap-3 opacity-50">
                               <span className="text-gray-500">14:01:22</span>
                               <div className="flex-1">
                                  <span className="text-blue-400 font-bold">WEBHOOK</span> <span className="text-gray-300">Order Created</span>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
             {/* Abstract Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-wa-green/10 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON SECTION --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('features.smsComparison')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Old Way */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group">
               <div className="absolute top-0 right-0 bg-gray-100 px-4 py-1 rounded-bl-xl text-xs font-bold text-gray-500">{t('features.oldWay')}</div>
               <div className="flex flex-col h-full opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-2 mb-6">
                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <MessageSquare className="text-gray-500" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-700">SMS</p>
                     </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none mb-4 text-sm text-gray-600 font-mono">
                     Siparisiniz kargoya verildi. Takip: http://bit.ly/xx...
                  </div>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                     <span className="text-sm text-gray-500">{t('features.cost')}: 0.65₺ / Adet</span>
                  </div>
               </div>
            </div>

            {/* Whalink Way */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 relative overflow-hidden ring-1 ring-wa-green/20">
               <div className="absolute top-0 right-0 bg-green-100 px-4 py-1 rounded-bl-xl text-xs font-bold text-green-700">{t('features.newWay')}</div>
               <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-6">
                     <div className="w-10 h-10 bg-wa-green rounded-full flex items-center justify-center">
                        <Link2 className="text-white" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Mağaza</p>
                        <p className="text-xs text-wa-green font-medium">● Online</p>
                     </div>
                  </div>
                  <div className="bg-wa-light p-4 rounded-lg rounded-tl-none mb-2 text-sm text-gray-800 border border-green-100">
                     <p className="mb-2"><strong>Ahmet Bey</strong>, siparişiniz kargoya verildi! 📦</p>
                  </div>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                     <span className="text-sm text-wa-green font-bold">{t('features.cost')}: 0.00₺</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTEGRATIONS (THE BRAIN) --- */}
      <section className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute -top-20 -right-20 w-96 h-96 bg-wa-green/20 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2 z-10">
                <div className="inline-flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-6">
                   <Zap size={14} className="text-yellow-400" />
                   <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Powerhouse</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                   {t('features.integrations')}
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                   {t('features.integrationsDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                   {['Shopify', 'WooCommerce', 'Magento', 'PrestaShop', 'n8n', 'Zapier'].map(tech => (
                      <span key={tech} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300">
                         {tech}
                      </span>
                   ))}
                </div>
             </div>
             
             {/* 3D Solar System Visual */}
             <div className="lg:w-1/2 relative h-[500px] flex items-center justify-center perspective-1000">
                {/* Sun (Whalink) */}
                <div className="absolute w-32 h-32 bg-gradient-to-br from-wa-green to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(0,168,132,0.5)] z-20 animate-pulse-soft">
                   <Link2 size={48} className="text-white" />
                </div>
                
                {/* Orbit 1 */}
                <div className="absolute w-[280px] h-[280px] border border-gray-700/50 rounded-full animate-orbit border-dashed preserve-3d">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-orbit-reverse">
                      <ShoppingBag size={24} className="text-green-600" />
                   </div>
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-orbit-reverse">
                      <Box size={24} className="text-purple-600" />
                   </div>
                </div>

                 {/* Orbit 2 */}
                <div className="absolute w-[450px] h-[450px] border border-gray-800 rounded-full animate-orbit-reverse preserve-3d" style={{animationDuration: '50s'}}>
                   <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FF6C37] p-3 rounded-full shadow-[0_0_20px_rgba(255,108,55,0.4)] animate-orbit">
                       <Zap size={24} className="text-white" /> {/* Zapier/n8n */}
                   </div>
                   <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-3 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-orbit">
                       <Globe size={24} className="text-white" /> {/* Webhook */}
                   </div>
                </div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-wa-green/5 blur-[100px] rounded-full -z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">
               {/* Feature 1: Large - Always On */}
               <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-200 overflow-visible relative group hover:shadow-lg transition-shadow iso-container">
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <Globe className="text-blue-600" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('features.alwaysOn')}</h3>
                     <p className="text-gray-500 max-w-md mb-8">
                        {t('features.alwaysOnDesc')}
                     </p>
                     
                     {/* 3D Isometric Server Stack */}
                     <div className="mt-auto relative w-full h-64 perspective-1000 flex items-center justify-center">
                        <div className="relative preserve-3d w-48 h-48 transition-transform duration-500">
                           {/* Layer 1: Hardware (Bottom) */}
                           <div className="absolute inset-0 bg-gray-800 rounded-xl iso-layer iso-layer-1 flex items-center justify-center border border-gray-600 shadow-xl" style={{zIndex: 1}}>
                                <Server size={40} className="text-gray-500 transform -rotate-45" />
                                <span className="absolute bottom-2 right-4 text-[10px] text-gray-500 font-mono -rotate-45">SERVER</span>
                           </div>
                           
                           {/* Layer 2: Cloud/Session (Middle) */}
                           <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm rounded-xl iso-layer iso-layer-2 flex items-center justify-center border border-blue-500/50 shadow-xl" style={{zIndex: 2, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(30px)'}}>
                                <Database size={40} className="text-blue-300 transform -rotate-45" />
                                <span className="absolute bottom-2 right-4 text-[10px] text-blue-300 font-mono -rotate-45">SESSION</span>
                           </div>
                           
                           {/* Layer 3: Application (Top) */}
                           <div className="absolute inset-0 bg-gradient-to-br from-wa-green to-emerald-600 rounded-xl iso-layer iso-layer-3 flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(0,168,132,0.4)]" style={{zIndex: 3, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(60px)'}}>
                                <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <Link2 size={48} className="text-white transform -rotate-45" />
                                <span className="absolute bottom-2 right-4 text-[10px] text-white font-mono -rotate-45 font-bold">ONLINE</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Feature 2: Privacy */}
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Shield className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('features.privacy')}</h3>
                  <p className="text-sm text-gray-500">
                     {t('features.privacyDesc')}
                  </p>
                  <div className="absolute -bottom-10 -right-10 text-green-50 opacity-50">
                     <Lock size={120} />
                  </div>
               </div>

               {/* Feature 3: Multi Account */}
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Smartphone className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('features.multi')}</h3>
                  <p className="text-sm text-gray-500">
                     {t('features.multiDesc')}
                  </p>
                  <div className="absolute -bottom-10 -right-10 text-purple-50 opacity-50">
                     <Layers size={120} />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex justify-between items-end mb-12">
              <div>
                 <span className="text-green-600 font-bold tracking-wider uppercase text-sm">From the Blog</span>
                 <h2 className="text-3xl font-bold text-gray-900 mt-2">Latest Updates & Guides</h2>
              </div>
              <Link to="/blog" className="hidden md:flex items-center text-gray-600 hover:text-green-600 font-medium transition-colors">
                 View All Posts <ArrowRight size={16} className="ml-2" />
              </Link>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                 <Link to={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                       <div className="h-48 overflow-hidden relative">
                          <img 
                             src={post.coverImage} 
                             alt={post.title} 
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                             {post.readTime}
                          </div>
                       </div>
                       <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                             <Calendar size={14} />
                             <span>{post.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                             {post.title}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                             {post.excerpt}
                          </p>
                          <span className="text-green-600 font-bold text-sm flex items-center mt-auto">
                             Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                       </div>
                    </div>
                 </Link>
              ))}
           </div>
           
           <div className="mt-8 text-center md:hidden">
              <Link to="/blog" className="inline-flex items-center text-green-600 font-bold">
                 View All Posts <ArrowRight size={16} className="ml-2" />
              </Link>
           </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA --- */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wa-green rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
         
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Otomasyona geçmek için<br/>daha neyi bekliyorsunuz?</h2>
            <Link to="/register" className="inline-flex flex-col items-center bg-wa-green hover:bg-emerald-600 text-white text-lg font-bold px-10 py-3 rounded-xl transition-all shadow-lg hover:shadow-green-500/50 hover:-translate-y-1">
               <div className="flex items-center">
                 <span>{t('hero.ctaPrimary')}</span>
                 <ArrowRight className="ml-2" />
               </div>
               <span className="text-xs font-normal opacity-80 mt-0.5">{t('hero.noCC')}</span>
            </Link>
         </div>
      </section>
    </div>
  );
};
