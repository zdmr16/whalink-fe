
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PublicLayout } from './components/PublicLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Messages } from './pages/Messages';
import { Automations } from './pages/Automations';
import { Profile } from './pages/Profile';
import { LandingPage } from './pages/LandingPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Pricing } from './pages/Pricing';
import { api } from './services/mockApi';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';

// Protected layout wrapper that checks for auth
const ProtectedLayout = () => {
  const user = api.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
               <Route path="/" element={<LandingPage />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/integrations" element={<div className="pt-20 text-center text-gray-500">Integrations Page Coming Soon</div>} />
               <Route path="/blog" element={<Blog />} />
               <Route path="/blog/:slug" element={<BlogPost />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="messages" element={<Messages />} />
              <Route path="automations" element={<Automations />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
