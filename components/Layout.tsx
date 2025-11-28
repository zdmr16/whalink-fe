
import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Smartphone, User, LogOut, Menu, X, Link2, Workflow } from 'lucide-react';
import { api } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = api.getCurrentUser();
  const { t } = useLanguage();

  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: Smartphone, label: t('nav.accounts'), path: '/dashboard/accounts' },
    { icon: MessageSquare, label: t('nav.messages'), path: '/dashboard/messages' },
    { icon: Workflow, label: t('nav.automations'), path: '/dashboard/automations' },
    { icon: User, label: t('nav.profile'), path: '/dashboard/profile' },
  ];

  const NavItem: React.FC<{ item: typeof menuItems[0] }> = ({ item }) => {
    const isActive = item.path === '/dashboard' 
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(item.path);

    return (
      <button
        onClick={() => {
          navigate(item.path);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive 
            ? 'bg-green-50 text-wa-green font-medium' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-wa-gray flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <div className="p-6 flex items-center space-x-2">
          <div className="w-8 h-8 bg-wa-green rounded-lg flex items-center justify-center">
            <Link2 className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-gray-800">Whalink</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-4">
          <div className="flex justify-between items-center px-2">
             <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-3 px-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-wa-green font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-wa-green md:hidden text-white sticky top-0 z-20 px-4 h-16 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg">Whalink</span>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {user?.name.charAt(0)}
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-4 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-gray-800 text-lg">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                  <NavItem key={item.path} item={item} />
                ))}
              </nav>
              <div className="mt-auto space-y-4">
                 <div className="px-4"><LanguageSwitcher /></div>
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                 >
                  <LogOut size={20} />
                  <span>{t('nav.logout')}</span>
                 </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
