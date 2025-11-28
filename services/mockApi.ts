
import { AccountStatus, WhatsAppAccount, User, ChatSession, Message, Webhook, QuickReplyTemplate, BlogPost } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
const MOCK_USER: User = {
  id: 'u1',
  email: 'demo@example.com',
  name: 'Demo Admin',
  subscription: {
    planName: 'Growth',
    status: 'active',
    nextBillingDate: '2024-12-01',
    price: '$29.00',
    features: ['3 WhatsApp Accounts', 'Unlimited Messages', 'n8n Integrations', 'Standard Support']
  },
  billingInfo: {
    isCorporate: true,
    companyName: 'Whalink Tech Ltd.',
    taxId: 'TR1234567890',
    taxOffice: 'Kadikoy',
    address: 'Teknopark Istanbul',
    city: 'Istanbul',
    country: 'Turkey'
  }
};

const INITIAL_ACCOUNTS: WhatsAppAccount[] = [
  {
    id: 'wa1',
    phoneNumber: '+1 555 0123 4567',
    name: 'Whalink Support',
    status: AccountStatus.CONNECTED,
    lastActive: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/200'
  },
  {
    id: 'wa2',
    phoneNumber: '+44 20 7946 0123',
    name: 'Sales Bot UK',
    status: AccountStatus.DISCONNECTED,
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    avatarUrl: 'https://picsum.photos/201'
  }
];

const MOCK_CHATS: ChatSession[] = [
  { id: 'c1', whatsappAccountId: 'wa1', contactName: 'Alice Smith', contactNumber: '+123456789', lastMessage: 'Thanks for the invoice!', lastMessageTime: '10:30 AM', unreadCount: 0, avatarUrl: 'https://picsum.photos/100', isGroup: false, status: 'online' },
  { id: 'c2', whatsappAccountId: 'wa2', contactName: 'Bob Jones', contactNumber: '+987654321', lastMessage: 'Voice message (0:12)', lastMessageTime: '09:15 AM', unreadCount: 2, avatarUrl: 'https://picsum.photos/101', isGroup: false, status: '' },
  { id: 'c3', whatsappAccountId: 'wa1', contactName: 'Tech Team Group', contactNumber: '+1122334455', lastMessage: 'Meeting at 3PM', lastMessageTime: 'Yesterday', unreadCount: 5, avatarUrl: 'https://picsum.photos/102', isGroup: true, status: 'typing...' },
];

const RICH_MESSAGES: Record<string, Message[]> = {
  'c1': [
    { 
      id: 'm1', 
      text: 'Hi Alice, how can we help you today?', 
      timestamp: '10:00 AM', 
      sender: 'me', 
      status: 'read', 
      type: 'text' 
    },
    { 
      id: 'm2', 
      text: 'I need a copy of my last invoice please.', 
      timestamp: '10:01 AM', 
      sender: 'them', 
      status: 'read', 
      type: 'text' 
    },
    { 
      id: 'm3', 
      text: 'Invoice_OCT_2023.pdf', 
      timestamp: '10:02 AM', 
      sender: 'me', 
      status: 'read', 
      type: 'document',
      fileName: 'Invoice_OCT_2023.pdf',
      fileSize: '1.2 MB',
      replyTo: {
        id: 'm2',
        text: 'I need a copy of my last invoice please.',
        sender: 'them',
        type: 'text'
      }
    },
    {
      id: 'm4',
      text: 'Here is the invoice you requested.',
      timestamp: '10:02 AM',
      sender: 'me',
      status: 'read',
      type: 'text'
    },
    {
      id: 'm5',
      text: 'Thanks for the invoice!',
      timestamp: '10:05 AM',
      sender: 'them',
      status: 'read',
      type: 'text'
    },
    {
      id: 'm6',
      text: 'Please rate our service:',
      timestamp: '10:06 AM',
      sender: 'me',
      status: 'delivered',
      type: 'template',
      buttons: [
        { id: 'btn1', text: 'Excellent ⭐️', type: 'reply' },
        { id: 'btn2', text: 'Good 👍', type: 'reply' },
        { id: 'btn3', text: 'Poor 👎', type: 'reply' }
      ]
    }
  ],
  'c2': [
    {
      id: 'm2_1',
      text: 'Check out this product.',
      timestamp: '09:00 AM',
      sender: 'me',
      status: 'read',
      type: 'image',
      mediaUrl: 'https://picsum.photos/400/300'
    },
    {
      id: 'm2_2',
      text: '',
      timestamp: '09:15 AM',
      sender: 'them',
      status: 'read',
      type: 'audio',
      duration: '0:12'
    }
  ]
};

const MOCK_WEBHOOKS: Webhook[] = [
  { id: 'wh1', name: 'Order Processing (n8n)', url: 'https://n8n.mycompany.com/webhook/orders', events: ['message.upsert'], isActive: true, createdAt: '2023-11-01' }
];

const MOCK_TEMPLATES: QuickReplyTemplate[] = [
  { id: 't1', shortcut: '/address', content: 'Our office is located at: Teknopark Istanbul, Sanayi Mah. No:1, Istanbul.' },
  { id: 't2', shortcut: '/bank', content: 'Bank: Ziraat Bankasi\nIBAN: TR00 0000 0000 0000 0000 00' }
];

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'whatsapp-automation-guide-2024',
    title: 'The Ultimate Guide to WhatsApp Automation in 2024',
    excerpt: 'Learn how to automate your customer support and sales processes using Whalink and n8n.',
    coverImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800',
    author: 'Sarah Johnson',
    date: 'Oct 24, 2024',
    readTime: '5 min read',
    content: `
      <h2>Why Automate WhatsApp?</h2>
      <p>In today's fast-paced digital world, customers expect instant responses. Waiting hours for a reply can mean lost sales. Automation allows you to be there for your customers 24/7 without hiring a massive support team.</p>
      
      <h3>1. Instant Gratification</h3>
      <p>Automated welcome messages and quick replies ensure your customers feel heard immediately.</p>
      
      <h3>2. Order Tracking</h3>
      <p>Integrate with your e-commerce store (Shopify, WooCommerce) to send automatic order updates. "Your order #1234 has shipped!" messages have a 98% open rate compared to 20% for email.</p>
      
      <h3>3. Recover Abandoned Carts</h3>
      <p>Send a gentle reminder on WhatsApp for users who left items in their cart. Conversion rates on WhatsApp are significantly higher than email.</p>
      
      <h2>How Whalink Helps</h2>
      <p>Whalink provides the infrastructure to keep your WhatsApp session active 24/7 in the cloud. We handle the technical heavy lifting so you can focus on building flows.</p>
    `
  },
  {
    id: 'b2',
    slug: 'stop-wasting-money-sms',
    title: 'Stop Wasting Money on SMS: Why WhatsApp is the Future',
    excerpt: 'SMS costs are rising while open rates are dropping. Discover why modern businesses are switching to WhatsApp.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    author: 'Mike Chen',
    date: 'Oct 20, 2024',
    readTime: '4 min read',
    content: `
      <h2>The Problem with SMS</h2>
      <p>SMS has been the standard for transactional messages for decades. But it has limitations:</p>
      <ul>
        <li>Cost per message is high</li>
        <li>Character limits</li>
        <li>No media support</li>
        <li>Lack of read receipts</li>
      </ul>
      
      <h2>Enter WhatsApp</h2>
      <p>WhatsApp offers rich media, unlimited length, location sharing, and most importantly, it's virtually free when using a session-based automation tool like Whalink.</p>
      
      <p>Stop burning your budget on SMS gateways. Switch to Whalink and send unlimited messages for a flat monthly fee.</p>
    `
  },
  {
    id: 'b3',
    slug: 'n8n-whatsapp-integration',
    title: 'Connecting n8n with WhatsApp: A Technical Deep Dive',
    excerpt: 'A step-by-step tutorial on setting up a webhook to process incoming WhatsApp messages in n8n.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    author: 'Alex Dev',
    date: 'Oct 15, 2024',
    readTime: '8 min read',
    content: `
      <h2>Prerequisites</h2>
      <p>You'll need a Whalink account and a self-hosted or cloud version of n8n.</p>
      
      <h3>Step 1: Create a Webhook in Whalink</h3>
      <p>Go to your Whalink Dashboard > Automations. Click "Add Webhook". Enter your n8n Production URL.</p>
      
      <h3>Step 2: Configure n8n Webhook Node</h3>
      <p>Set the HTTP Method to POST. Whalink sends the message payload in JSON format.</p>
      
      <h3>Step 3: Process Logic</h3>
      <p>Use a Switch node to check the message content. If it contains "price", query your database and return the price list.</p>
    `
  }
];

class MockApiService {
  private accounts: WhatsAppAccount[] = INITIAL_ACCOUNTS;
  private webhooks: Webhook[] = MOCK_WEBHOOKS;
  private templates: QuickReplyTemplate[] = MOCK_TEMPLATES;

  async login(email: string, password: string): Promise<User> {
    await delay(800);
    if (email === 'demo@example.com' && password === 'password') {
      localStorage.setItem('wa_auth', JSON.stringify(MOCK_USER));
      return MOCK_USER;
    }
    throw new Error('Invalid credentials (try demo@example.com / password)');
  }

  async register(name: string, email: string, password: string, isCorporate: boolean = false, companyName: string = '', taxId: string = ''): Promise<User> {
    await delay(1200);
    const newUser: User = {
      ...MOCK_USER,
      name,
      email,
      subscription: { ...MOCK_USER.subscription, planName: 'Starter' },
      billingInfo: {
        isCorporate,
        companyName,
        taxId,
        taxOffice: '',
        address: '',
        city: '',
        country: ''
      }
    };
    // Initialize with empty accounts for new user to show onboarding
    this.accounts = [];
    localStorage.setItem('wa_auth', JSON.stringify(newUser));
    return newUser;
  }

  logout() {
    localStorage.removeItem('wa_auth');
  }

  getCurrentUser(): User | null {
    const stored = localStorage.getItem('wa_auth');
    return stored ? JSON.parse(stored) : null;
  }

  async updateUserProfile(data: Partial<User> | Partial<User['billingInfo']>): Promise<void> {
    await delay(600);
    const currentUser = this.getCurrentUser();
    if(currentUser) {
       // @ts-ignore
       const updated = { ...currentUser, ...data, billingInfo: { ...currentUser.billingInfo, ...data.billingInfo } };
       localStorage.setItem('wa_auth', JSON.stringify(updated));
    }
  }

  async getAccounts(): Promise<WhatsAppAccount[]> {
    await delay(500);
    return [...this.accounts];
  }

  async addAccount(phoneNumber: string, name: string): Promise<WhatsAppAccount> {
    await delay(1500); // Simulate connection time
    const newAccount: WhatsAppAccount = {
      id: `wa${Date.now()}`,
      phoneNumber,
      name,
      status: AccountStatus.CONNECTED,
      lastActive: new Date().toISOString(),
      avatarUrl: `https://picsum.photos/200?random=${Date.now()}`
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  async deleteAccount(id: string): Promise<void> {
    await delay(500);
    this.accounts = this.accounts.filter(a => a.id !== id);
  }

  async disconnectAccount(id: string): Promise<void> {
    await delay(500);
    const acc = this.accounts.find(a => a.id === id);
    if (acc) acc.status = AccountStatus.DISCONNECTED;
  }

  async reconnectAccount(id: string): Promise<void> {
    await delay(1000);
    const acc = this.accounts.find(a => a.id === id);
    if (acc) acc.status = AccountStatus.CONNECTED;
  }

  async generatePairingCode(phoneNumber: string): Promise<string> {
    await delay(1500);
    return 'ABC-123-XYZ';
  }

  async getChats(accountId?: string): Promise<ChatSession[]> {
    await delay(300);
    if (accountId) {
      return MOCK_CHATS.filter(c => c.whatsappAccountId === accountId);
    }
    return MOCK_CHATS;
  }

  async getMessages(chatId: string): Promise<Message[]> {
    await delay(300);
    return RICH_MESSAGES[chatId] || [];
  }

  // --- AUTOMATION METHODS ---

  async getWebhooks(): Promise<Webhook[]> {
    await delay(400);
    return [...this.webhooks];
  }

  async addWebhook(url: string, name: string): Promise<Webhook> {
    await delay(600);
    const newHook: Webhook = {
      id: `wh${Date.now()}`,
      url,
      name,
      events: ['message.upsert'],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    this.webhooks.push(newHook);
    return newHook;
  }

  async deleteWebhook(id: string): Promise<void> {
    await delay(400);
    this.webhooks = this.webhooks.filter(w => w.id !== id);
  }

  async getTemplates(): Promise<QuickReplyTemplate[]> {
    await delay(300);
    return [...this.templates];
  }

  async addTemplate(shortcut: string, content: string): Promise<QuickReplyTemplate> {
    await delay(400);
    const newTemplate = { id: `t${Date.now()}`, shortcut, content };
    this.templates.push(newTemplate);
    return newTemplate;
  }

  async deleteTemplate(id: string): Promise<void> {
    await delay(300);
    this.templates = this.templates.filter(t => t.id !== id);
  }

  // --- BLOG METHODS ---
  async getBlogPosts(): Promise<BlogPost[]> {
    await delay(300);
    return [...MOCK_BLOG_POSTS];
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    await delay(300);
    return MOCK_BLOG_POSTS.find(p => p.slug === slug);
  }

  /**
   * Simulates Server-Sent Events (SSE) subscription.
   */
  subscribeToChat(chatId: string, onMessage: (msg: Message) => void): () => void {
    const interval = setInterval(() => {
      // 10% chance to receive a random message every 5 seconds
      if (Math.random() > 0.8) {
        const mockIncomingMsg: Message = {
          id: `inc_${Date.now()}`,
          text: 'This is a real-time message via SSE! 🚀',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'them',
          status: 'read',
          type: 'text'
        };
        onMessage(mockIncomingMsg);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }
}

export const api = new MockApiService();
