
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, Command, Save, Loader2, Workflow, Check } from 'lucide-react';
import { api } from '../services/mockApi';
import { Webhook, QuickReplyTemplate } from '../types';

export const Automations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webhooks' | 'templates'>('webhooks');
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [templates, setTemplates] = useState<QuickReplyTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [newWebhookName, setNewWebhookName] = useState('');
  
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [newShortcut, setNewShortcut] = useState('');
  const [newContent, setNewContent] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [w, t] = await Promise.all([api.getWebhooks(), api.getTemplates()]);
    setWebhooks(w);
    setTemplates(t);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddWebhook = async () => {
    if(!newWebhookUrl || !newWebhookName) return;
    await api.addWebhook(newWebhookUrl, newWebhookName);
    setNewWebhookUrl('');
    setNewWebhookName('');
    setShowAddWebhook(false);
    loadData();
  };

  const handleAddTemplate = async () => {
    if(!newShortcut || !newContent) return;
    await api.addTemplate(newShortcut, newContent);
    setNewShortcut('');
    setNewContent('');
    setShowAddTemplate(false);
    loadData();
  };

  const handleDeleteWebhook = async (id: string) => {
    if(confirm('Delete this webhook?')) {
        await api.deleteWebhook(id);
        loadData();
    }
  };

  const handleDeleteTemplate = async (id: string) => {
     if(confirm('Delete this template?')) {
         await api.deleteTemplate(id);
         loadData();
     }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-500" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
        <p className="text-gray-500">Manage integrations and quick responses.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 flex">
          <button 
            onClick={() => setActiveTab('webhooks')}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors flex items-center justify-center space-x-2
            ${activeTab === 'webhooks' ? 'border-green-500 text-green-600 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Workflow size={18} />
            <span>Webhooks (n8n/Zapier)</span>
          </button>
          <button 
             onClick={() => setActiveTab('templates')}
             className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors flex items-center justify-center space-x-2
             ${activeTab === 'templates' ? 'border-green-500 text-green-600 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
             <Command size={18} />
             <span>Quick Replies</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Active Webhooks</h3>
                  <button onClick={() => setShowAddWebhook(true)} className="flex items-center space-x-2 text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors">
                     <Plus size={16} />
                     <span>Add Webhook</span>
                  </button>
               </div>

               {showAddWebhook && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                     <h4 className="font-medium text-gray-900 mb-3">New Webhook</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                           type="text" 
                           placeholder="Name (e.g. Order Sync)" 
                           className="border border-gray-300 rounded-lg p-2.5 text-sm"
                           value={newWebhookName}
                           onChange={e => setNewWebhookName(e.target.value)}
                        />
                        <input 
                           type="url" 
                           placeholder="https://n8n.your-server.com/webhook/..." 
                           className="border border-gray-300 rounded-lg p-2.5 text-sm"
                           value={newWebhookUrl}
                           onChange={e => setNewWebhookUrl(e.target.value)}
                        />
                     </div>
                     <div className="flex justify-end space-x-2">
                        <button onClick={() => setShowAddWebhook(false)} className="text-gray-500 text-sm px-3 py-2">Cancel</button>
                        <button onClick={handleAddWebhook} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">Save Webhook</button>
                     </div>
                  </div>
               )}

               <div className="space-y-3">
                  {webhooks.length === 0 ? (
                     <p className="text-center text-gray-400 py-8">No webhooks configured.</p>
                  ) : (
                     webhooks.map(wh => (
                        <div key={wh.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                           <div className="flex items-start space-x-3">
                              <div className="mt-1 bg-blue-100 p-2 rounded-lg">
                                 <Globe size={18} className="text-blue-600" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-gray-900">{wh.name}</h4>
                                 <p className="text-sm text-gray-500 font-mono break-all">{wh.url}</p>
                                 <div className="flex items-center space-x-2 mt-2">
                                    {wh.events.map(ev => (
                                       <span key={ev} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">{ev}</span>
                                    ))}
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200 flex items-center">
                                       <Check size={10} className="mr-1" /> Active
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <button onClick={() => handleDeleteWebhook(wh.id)} className="text-gray-400 hover:text-red-500 p-2">
                              <Trash2 size={18} />
                           </button>
                        </div>
                     ))
                  )}
               </div>
            </div>
          )}

          {activeTab === 'templates' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Quick Replies</h3>
                  <button onClick={() => setShowAddTemplate(true)} className="flex items-center space-x-2 text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors">
                     <Plus size={16} />
                     <span>Add Template</span>
                  </button>
               </div>

               {showAddTemplate && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                     <h4 className="font-medium text-gray-900 mb-3">New Template</h4>
                     <div className="space-y-3 mb-4">
                        <div>
                           <label className="block text-xs font-bold text-gray-500 mb-1">Shortcut (starts with /)</label>
                           <input 
                              type="text" 
                              placeholder="/price" 
                              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                              value={newShortcut}
                              onChange={e => setNewShortcut(e.target.value)}
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 mb-1">Message Content</label>
                           <textarea 
                              placeholder="Hello, our pricing starts at..." 
                              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm h-24"
                              value={newContent}
                              onChange={e => setNewContent(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="flex justify-end space-x-2">
                        <button onClick={() => setShowAddTemplate(false)} className="text-gray-500 text-sm px-3 py-2">Cancel</button>
                        <button onClick={handleAddTemplate} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">Save Template</button>
                     </div>
                  </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.length === 0 ? (
                     <div className="col-span-2 text-center text-gray-400 py-8">No templates created.</div>
                  ) : (
                     templates.map(tmp => (
                        <div key={tmp.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors relative group">
                           <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{tmp.shortcut}</span>
                              <button onClick={() => handleDeleteTemplate(tmp.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Trash2 size={16} />
                              </button>
                           </div>
                           <p className="text-sm text-gray-600 whitespace-pre-wrap">{tmp.content}</p>
                        </div>
                     ))
                  )}
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
