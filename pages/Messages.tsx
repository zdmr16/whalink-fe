
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, Paperclip, MoreVertical, Phone, Video, ChevronDown, 
  Smartphone, Mic, Image as ImageIcon, FileText, Camera, User as UserIcon, 
  BarChart2, Play, MapPin, Check, CheckCheck, Clock, Lock
} from 'lucide-react';
import { api } from '../services/mockApi';
import { ChatSession, Message, WhatsAppAccount } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

export const Messages: React.FC = () => {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingChats, setLoadingChats] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useLanguage();

  // Fetch accounts on mount
  useEffect(() => {
    const loadAccounts = async () => {
      const data = await api.getAccounts();
      setAccounts(data);
      if (data.length > 0) {
        setSelectedAccountId(data[0].id);
      }
    };
    loadAccounts();
  }, []);

  // Fetch chats
  useEffect(() => {
    if (!selectedAccountId) return;
    const loadChats = async () => {
      setLoadingChats(true);
      setActiveChat(null);
      // Simulate network delay for skeleton
      await new Promise(r => setTimeout(r, 800));
      const data = await api.getChats(selectedAccountId);
      setChats(data);
      setLoadingChats(false);
    };
    loadChats();
  }, [selectedAccountId]);

  // Fetch initial messages AND Subscribe to SSE
  useEffect(() => {
    if (activeChat) {
      api.getMessages(activeChat).then(setMessages);
      setShowAttachMenu(false);

      const unsubscribe = api.subscribeToChat(activeChat, (incomingMessage) => {
        setMessages(prev => [...prev, incomingMessage]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [newMessage]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent',
      type: 'text'
    };
    setMessages([...messages, msg]);
    setNewMessage('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedChat = chats.find(c => c.id === activeChat);
  const currentAccount = accounts.find(a => a.id === selectedAccountId);

  // --- Render Helpers ---

  const MessageStatusIcon = ({ status }: { status: Message['status'] }) => {
    if (status === 'read') return <CheckCheck size={14} className="text-[#53bdeb]" />;
    if (status === 'delivered') return <CheckCheck size={14} className="text-gray-400" />;
    if (status === 'sent') return <Check size={14} className="text-gray-400" />;
    return <Clock size={12} className="text-gray-400" />;
  };

  const RenderMessageContent = ({ msg }: { msg: Message }) => {
    switch (msg.type) {
      case 'image':
        return (
          <div className="space-y-1">
            <div className="rounded-lg overflow-hidden bg-gray-100 max-w-[300px]">
              <img src={msg.mediaUrl} alt="Shared" className="w-full h-auto object-cover" />
            </div>
            {msg.text && <p className="text-sm pt-1">{msg.text}</p>}
          </div>
        );
      
      case 'document':
        return (
          <div className="flex items-center space-x-3 bg-black/5 p-3 rounded-lg min-w-[240px]">
             <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
               <FileText size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium truncate">{msg.fileName || 'Document.pdf'}</p>
               <p className="text-[10px] text-gray-500 uppercase">{msg.fileSize || 'Unknown Size'} • {msg.fileName?.split('.').pop() || 'FILE'}</p>
             </div>
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center space-x-3 min-w-[200px]">
             <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300">
               <Play size={14} className="ml-0.5" />
             </button>
             <div className="flex-1 space-y-1">
                <div className="h-1 bg-gray-300 rounded-full w-full relative">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-500 rounded-full"></div>
                </div>
                <p className="text-[10px] text-gray-500 font-mono">{msg.duration || '0:00'}</p>
             </div>
             <div className="ml-2 relative">
               <div className="w-8 h-8 rounded-full overflow-hidden border border-white">
                 <img src={msg.sender === 'me' ? 'https://ui-avatars.com/api/?name=Me' : selectedChat?.avatarUrl} alt="Voice" />
               </div>
               <Mic size={12} className="absolute -bottom-1 -right-1 text-wa-green bg-white rounded-full p-[1px]" />
             </div>
          </div>
        );

      case 'template':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium pb-2">{msg.text}</p>
            <div className="space-y-2">
              {msg.buttons?.map(btn => (
                <button key={btn.id} className="w-full bg-white/50 hover:bg-white/80 border border-black/5 text-[#00a884] text-sm font-medium py-2 rounded shadow-sm transition-colors">
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="max-w-[300px] overflow-hidden rounded-lg">
             <div className="h-32 bg-gray-200 flex items-center justify-center relative">
               <MapPin size={32} className="text-red-500" />
               <span className="absolute bottom-2 left-2 bg-white/90 text-[10px] px-2 py-1 rounded shadow">Live Location</span>
             </div>
             <div className="bg-black/5 p-2">
                <p className="text-sm font-medium">Shared Location</p>
             </div>
          </div>
        );

      default: // Text
        return <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>;
    }
  };

  const ReplyBlock = ({ reply }: { reply: NonNullable<Message['replyTo']> }) => (
    <div className={`mb-1 p-2 rounded-lg border-l-4 text-xs cursor-pointer flex flex-col opacity-90
      ${reply.sender === 'me' ? 'bg-black/10 border-wa-green' : 'bg-black/5 border-purple-500'}`}>
      <span className={`font-bold mb-0.5 ${reply.sender === 'me' ? 'text-wa-green' : 'text-purple-700'}`}>
        {reply.sender === 'me' ? 'You' : selectedChat?.contactName}
      </span>
      <span className="truncate text-gray-600 flex items-center gap-1">
        {reply.type === 'image' && <ImageIcon size={10} />}
        {reply.text || (reply.type === 'image' ? 'Photo' : 'Media')}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-8rem)] flex overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-96 border-r border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Account Switcher */}
        <div className="p-3 border-b border-gray-200 bg-wa-gray">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {currentAccount?.avatarUrl ? (
                <img src={currentAccount.avatarUrl} alt="" className="w-5 h-5 rounded-full" />
              ) : (
                <Smartphone size={16} className="text-gray-500" />
              )}
            </div>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="block w-full pl-10 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-wa-green rounded-lg bg-white text-gray-900 font-medium shadow-sm"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} • {account.phoneNumber}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder={t('messages.search')}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-lg text-sm focus:ring-0"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {loadingChats ? (
             <div className="space-y-4 p-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex items-center space-x-3">
                   <Skeleton className="w-12 h-12 rounded-full" />
                   <div className="flex-1 space-y-2">
                     <Skeleton className="w-32 h-4" />
                     <Skeleton className="w-full h-3" />
                   </div>
                 </div>
               ))}
             </div>
          ) : chats.length === 0 ? (
            <EmptyState 
              className="border-none shadow-none mt-12"
              icon={Smartphone}
              title={t('messages.noChats')}
              description="Start a new chat from WhatsApp on your phone to sync here."
            />
          ) : (
            chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 
                ${activeChat === chat.id ? 'bg-[#f0f2f5]' : ''}`}
              >
                <div className="relative">
                  <img src={chat.avatarUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
                  {chat.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-wa-green border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-gray-900 truncate text-sm">{chat.contactName}</h4>
                    <span className={`text-[11px] ${chat.unreadCount > 0 ? 'text-wa-green font-semibold' : 'text-gray-400'}`}>
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate pr-2 ${chat.status?.includes('typing') ? 'text-wa-green font-medium italic' : 'text-gray-500'}`}>
                      {chat.status?.includes('typing') ? 'typing...' : chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-wa-green text-white text-[10px] font-bold px-1.5 h-4 flex items-center justify-center rounded-full min-w-[1rem]">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
        <div className={`flex-1 flex flex-col bg-wa-bg relative ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Wallpaper pattern overlay */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>

           {/* Chat Header */}
          <div className="bg-wa-gray px-4 py-2 border-b border-gray-200 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3 cursor-pointer">
               <button onClick={() => setActiveChat(null)} className="md:hidden text-gray-600">
                  <ChevronDown className="rotate-90" size={24} /> 
               </button>
              <img src={selectedChat.avatarUrl} className="w-10 h-10 rounded-full" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-sm">{selectedChat.contactName}</span>
                <span className="text-xs text-gray-500">
                  {selectedChat.status || 'click here for contact info'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="hover:bg-gray-200 p-2 rounded-full transition-colors hidden sm:block"><Video size={20} /></button>
              <button className="hover:bg-gray-200 p-2 rounded-full transition-colors hidden sm:block"><Phone size={20} /></button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <button className="hover:bg-gray-200 p-2 rounded-full transition-colors"><Search size={20} /></button>
              <button className="hover:bg-gray-200 p-2 rounded-full transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 z-10 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} group`}>
                
                {/* Message Bubble */}
                <div className={`relative max-w-[85%] sm:max-w-[65%] rounded-lg px-2 py-1 shadow-sm text-sm
                  ${msg.sender === 'me' 
                    ? 'bg-wa-light text-gray-900 rounded-tr-none' 
                    : 'bg-white text-gray-900 rounded-tl-none'
                }`}>
                  {/* Context Reply */}
                  {msg.replyTo && <ReplyBlock reply={msg.replyTo} />}
                  
                  {/* Content */}
                  <div className={`px-1 pt-1 ${msg.type === 'text' ? 'pb-4' : 'pb-1'}`}>
                     <RenderMessageContent msg={msg} />
                  </div>

                  {/* Metadata (Time + Status) */}
                  <div className={`absolute bottom-1 right-2 text-[10px] flex items-center space-x-1 ${msg.type === 'image' || msg.type === 'video' ? 'text-white drop-shadow-md' : 'text-gray-500'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'me' && <MessageStatusIcon status={msg.status} />}
                  </div>

                  {/* Hover Arrow (Desktop only) */}
                  <button className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-black/10 to-transparent rounded-tr-lg">
                    <ChevronDown size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-wa-gray px-4 py-2 flex items-end space-x-2 z-20 min-h-[60px]">
            <div className="relative pb-2">
              <button 
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className={`p-2 transition-colors duration-200 ${showAttachMenu ? 'text-gray-800 bg-gray-200 rounded-full' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Paperclip size={24} className="transform -rotate-45" />
              </button>
              
              {/* Attachment Menu Popover */}
              {showAttachMenu && (
                <div className="absolute bottom-14 left-0 bg-transparent flex flex-col space-y-4 items-center animate-in slide-in-from-bottom-4 duration-200 z-50">
                  {[
                    { icon: UserIcon, color: 'bg-blue-500', label: 'Contact' },
                    { icon: BarChart2, color: 'bg-teal-500', label: 'Poll' },
                    { icon: FileText, color: 'bg-purple-500', label: 'Document' },
                    { icon: Camera, color: 'bg-pink-500', label: 'Camera' },
                    { icon: ImageIcon, color: 'bg-purple-600', label: 'Photos & Videos' },
                  ].map((item, idx) => (
                    <div key={idx} className="group relative flex items-center">
                       <button className={`${item.color} p-3 rounded-full text-white shadow-lg hover:brightness-110 transition-all`}>
                         <item.icon size={20} />
                       </button>
                       <span className="absolute left-14 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                         {item.label}
                       </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 bg-white rounded-lg flex items-center border border-white focus-within:border-white my-2">
              <textarea 
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('messages.typeMessage')}
                rows={1}
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-sm text-gray-800 placeholder-gray-500 resize-none max-h-32 overflow-y-auto"
                style={{ minHeight: '44px' }}
              />
            </div>

            <div className="pb-2">
              {newMessage.trim() ? (
                <button 
                  onClick={() => handleSend()}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <Send size={24} />
                </button>
              ) : (
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Mic size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-wa-gray border-b-[6px] border-wa-green box-border relative">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>
          <div className="z-10 text-center text-gray-500 max-w-md">
            <div className="w-64 h-64 mx-auto mb-10">
               <img src="https://media.istockphoto.com/id/1148050363/vector/man-texting-on-smartphone-man-holding-mobile-phone-in-hand-and-chatting-vector.jpg?s=612x612&w=0&k=20&c=B7v-jXgQ6O-3ZzTqC5s0s8gG-9-6g7-66-86-66-86.jpg" className="w-full h-full object-contain opacity-60 mix-blend-multiply filter grayscale" alt="Connect" />
            </div>
            <h2 className="text-3xl font-light mb-4 text-[#41525d]">{t('messages.connectTitle')}</h2>
            <p className="mb-8 text-sm leading-6">{t('messages.connectDesc')}<br/>Use Whalink on up to 4 linked devices.</p>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mt-10">
              <Lock size={12} />
              <span>{t('messages.encrypted')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
