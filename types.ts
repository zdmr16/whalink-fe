
export enum AccountStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  QR_READY = 'QR_READY'
}

export interface Subscription {
  planName: 'Starter' | 'Growth' | 'Enterprise';
  status: 'active' | 'past_due' | 'canceled';
  nextBillingDate: string;
  price: string;
  features: string[];
}

export interface BillingInfo {
  isCorporate: boolean;
  companyName: string;
  taxId: string;
  taxOffice: string;
  address: string;
  city: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: Subscription;
  billingInfo: BillingInfo;
}

export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  name: string; // Friendly name
  status: AccountStatus;
  lastActive: string;
  avatarUrl?: string;
}

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'sticker' | 'location' | 'template' | 'system';

export interface Message {
  id: string;
  whatsappAccountId?: string;
  chatId?: string;
  text: string; // Caption for media, or body for text
  type: MessageType;
  timestamp: string;
  sender: 'me' | 'them';
  status: 'pending' | 'sent' | 'delivered' | 'read';
  
  // Media & Metadata
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string; // Audio/Video duration
  mimeType?: string;
  
  // Context / Quoted
  replyTo?: {
    id: string;
    text: string;
    sender: 'me' | 'them';
    type: MessageType;
  };

  // Interactive / Buttons
  buttons?: Array<{id: string, text: string, type: 'reply' | 'url'}>;
  
  // Location
  location?: {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  };
}

export interface ChatSession {
  id: string;
  whatsappAccountId: string; // ID of the account this chat belongs to
  contactName: string;
  contactNumber: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatarUrl: string;
  isGroup: boolean;
  status?: 'online' | 'typing...' | 'recording audio...' | '';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// --- AUTOMATION TYPES ---

export interface Webhook {
  id: string;
  url: string;
  name: string;
  events: ('message.upsert' | 'message.update' | 'connection.update')[];
  isActive: boolean;
  createdAt: string;
}

export interface QuickReplyTemplate {
  id: string;
  shortcut: string; // e.g. /address
  content: string; // The full message
}

// --- BLOG TYPES ---

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
}

// --- UI TYPES ---

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
