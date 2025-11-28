
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, MessageCircle, Activity, ArrowUpRight, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { api } from '../services/mockApi';
import { WhatsAppAccount } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from '../components/ui/Skeleton';

const data = [
  { name: 'Mon', messages: 400 },
  { name: 'Tue', messages: 300 },
  { name: 'Wed', messages: 600 },
  { name: 'Thu', messages: 800 },
  { name: 'Fri', messages: 500 },
  { name: 'Sat', messages: 200 },
  { name: 'Sun', messages: 100 },
];

export const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const load = async () => {
      // Simulate slightly longer load to show Skeleton
      await new Promise(r => setTimeout(r, 1000));
      const accs = await api.getAccounts();
      setAccounts(accs);
      setLoading(false);
    };
    load();
  }, []);

  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <span className="flex items-center text-wa-green text-sm font-medium bg-green-50 px-2 py-1 rounded">
          <ArrowUpRight size={14} className="mr-1" />
          12%
        </span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{sub}</p>
    </div>
  );

  const DashboardSkeleton = () => (
    <div className="space-y-6">
       <div className="space-y-2">
         <Skeleton className="h-8 w-48" />
         <Skeleton className="h-4 w-96" />
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Skeleton className="h-40 rounded-xl" />
         <Skeleton className="h-40 rounded-xl" />
         <Skeleton className="h-40 rounded-xl" />
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 lg:col-span-2 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
       </div>
    </div>
  );

  if (loading) {
     return <DashboardSkeleton />;
  }

  // --- ONBOARDING STATE (No Accounts) ---
  if (accounts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.welcome')} 👋</h1>
           <p className="text-gray-500 mt-2">{t('dashboard.setupSubtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">{t('dashboard.wizard')} (0/3)</h2>
           </div>
           
           <div className="divide-y divide-gray-100">
              {/* Step 1 */}
              <div className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                 <div className="mt-1">
                    <Circle className="text-gray-300" size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('dashboard.step1')}</h3>
                    <p className="text-gray-500 text-sm mb-4">{t('dashboard.step1Desc')}</p>
                    <Link to="/dashboard/accounts" className="inline-flex items-center text-sm font-bold text-white bg-wa-green hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors">
                       {t('dashboard.addAccount')} <ChevronRight size={16} className="ml-1" />
                    </Link>
                 </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition-colors opacity-75">
                 <div className="mt-1">
                    <Circle className="text-gray-300" size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('dashboard.step2')}</h3>
                    <p className="text-gray-500 text-sm">{t('dashboard.step2Desc')}</p>
                 </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition-colors opacity-75">
                 <div className="mt-1">
                    <Circle className="text-gray-300" size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('dashboard.step3')}</h3>
                    <p className="text-gray-500 text-sm">{t('dashboard.step3Desc')}</p>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start space-x-4">
           <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Users size={24} />
           </div>
           <div>
              <h4 className="font-bold text-blue-900">{t('dashboard.support')}</h4>
              <p className="text-blue-700 text-sm mt-1">{t('dashboard.supportDesc')}</p>
              <button className="text-blue-800 font-bold text-sm mt-2 hover:underline">{t('dashboard.bookSupport')}</button>
           </div>
        </div>
      </div>
    );
  }

  // --- STANDARD DASHBOARD ---
  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.dashboard')}</h1>
        <p className="text-gray-500">Overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title={t('dashboard.activeAccounts')} 
          value={accounts.length} 
          sub="All systems operational" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          title={t('dashboard.totalMessages')} 
          value="12,453" 
          sub="Last 30 days" 
          icon={MessageCircle} 
          color="bg-wa-green" 
        />
        <StatCard 
          title={t('dashboard.avgResponse')} 
          value="1.2m" 
          sub="-15% from last week" 
          icon={Activity} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t('dashboard.messageVolume')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="messages" fill="#00a884" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.recentActivity')}</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-wa-green shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New device connected</p>
                  <p className="text-xs text-gray-500">2 minutes ago • Account #1</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
