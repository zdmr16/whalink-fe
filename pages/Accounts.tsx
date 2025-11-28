import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Smartphone, Loader2, Power, Wifi, WifiOff } from 'lucide-react';
import { api } from '../services/mockApi';
import { WhatsAppAccount, AccountStatus } from '../types';
import { AddAccountModal } from '../components/whatsapp/AddAccountModal';

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAccounts = async () => {
    try {
      const data = await api.getAccounts();
      setAccounts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this account?')) {
      await api.deleteAccount(id);
      fetchAccounts();
    }
  };

  const handleToggleConnection = async (account: WhatsAppAccount) => {
    if (account.status === AccountStatus.CONNECTED) {
      await api.disconnectAccount(account.id);
    } else {
      await api.reconnectAccount(account.id);
    }
    fetchAccounts();
  };

  const handleAccountAdded = () => {
    setIsModalOpen(false);
    fetchAccounts();
  };

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case AccountStatus.CONNECTED: return 'text-green-500 bg-green-50 border-green-200';
      case AccountStatus.DISCONNECTED: return 'text-red-500 bg-red-50 border-red-200';
      case AccountStatus.CONNECTING: return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-500" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Accounts</h1>
          <p className="text-gray-500">Manage your connected devices and sessions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          <span>Add Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={account.avatarUrl} alt={account.name} className="w-12 h-12 rounded-full border border-gray-100" />
                <div>
                  <h3 className="font-bold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">{account.phoneNumber}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(account.status)}`}>
                 {account.status === AccountStatus.CONNECTED ? <Wifi size={12} /> : <WifiOff size={12} />}
                 <span>{account.status}</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-6">
              Last active: {new Date(account.lastActive).toLocaleString()}
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
               <button 
                onClick={() => handleToggleConnection(account)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2
                  ${account.status === AccountStatus.CONNECTED 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                    : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
              >
                <Power size={16} />
                <span>{account.status === AccountStatus.CONNECTED ? 'Disconnect' : 'Connect'}</span>
              </button>
              
              <button 
                onClick={() => handleDelete(account.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Account"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Smartphone size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No accounts connected yet</p>
            <p className="text-sm">Click "Add Account" to get started</p>
          </div>
        )}
      </div>

      {isModalOpen && <AddAccountModal onClose={() => setIsModalOpen(false)} onComplete={handleAccountAdded} />}
    </div>
  );
};