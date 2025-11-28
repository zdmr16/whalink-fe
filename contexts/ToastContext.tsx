
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full duration-300 max-w-sm
              ${toast.type === 'success' ? 'bg-white border-green-200 text-green-800' : 
                toast.type === 'error' ? 'bg-white border-red-200 text-red-800' : 
                'bg-white border-blue-200 text-blue-800'}`}
          >
            <div className="mr-3">
              {toast.type === 'success' && <CheckCircle size={20} className="text-wa-green" />}
              {toast.type === 'error' && <XCircle size={20} className="text-red-500" />}
              {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
            </div>
            <p className="text-sm font-medium pr-8">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
