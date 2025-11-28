
export type Language = 'en' | 'tr';

export const translations = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      messages: 'Messages',
      automations: 'Automations',
      profile: 'Profile',
      logout: 'Sign Out'
    },
    hero: {
      tag: 'Next-Gen B2C Communication',
      title: 'Put Your WhatsApp on Autopilot',
      subtitle: 'Stop wasting money on SMS. Manage order notifications, tracking, and customer support from a single panel.',
      ctaPrimary: 'Start 14-Day Free Trial',
      ctaSecondary: 'Watch Demo',
      noCC: 'No credit card required'
    },
    features: {
        alwaysOn: 'Always-on Connection',
        alwaysOnDesc: 'We keep your WhatsApp Web session active in the cloud even if your phone is off. 24/7 uninterrupted messaging.',
        privacy: 'Privacy Focused',
        privacyDesc: 'End-to-end encryption preserved.',
        multi: 'Multi-Account',
        multiDesc: 'Manage Support, Sales, and HR lines from one dashboard.',
        integrations: 'Talks with your E-commerce',
        integrationsDesc: 'Whalink integrates with WooCommerce, Shopify, and WordPress. Automated notifications for every order.',
        smsComparison: 'SMS vs New World',
        oldWay: 'OLD WAY',
        newWay: 'WHALINK WAY',
        cost: 'Cost'
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your business needs. No hidden fees.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      save20: 'Get 2 months free',
      mostPopular: 'Most Popular',
      tiers: {
        starter: {
          name: 'Starter',
          desc: 'Perfect for testing and small shops.',
          features: ['1 WhatsApp Account', 'Basic Automation', 'Community Support']
        },
        professional: {
          name: 'Professional',
          desc: 'Ideal for freelancers and growing businesses.',
          features: ['3 WhatsApp Accounts', 'Unlimited Messages', 'n8n Webhooks', 'Priority Support']
        },
        business: {
          name: 'Business',
          desc: 'For scaling teams and agencies.',
          features: ['10 WhatsApp Accounts', 'Multi-Agent Inbox', 'Advanced Analytics', 'Dedicated Manager']
        },
        corporate: {
          name: 'Corporate',
          desc: 'Maximum power for large enterprises.',
          features: ['30 WhatsApp Accounts', 'Custom SLA', 'White-label Options', 'API Access']
        }
      },
      addon: {
        title: 'Custom Integration Support',
        desc: 'Get expert help setting up your flows with n8n, Shopify, or your custom CRM.',
        price: '$100',
        oneTime: 'one-time',
        btn: 'Add to Plan'
      },
      cta: 'Start 14-Day Free Trial',
      noCC: 'No credit card required',
      faq: {
        title: 'Frequently Asked Questions',
        q1: 'Can I cancel anytime?',
        a1: 'Yes, you can cancel your subscription at any time from your dashboard. No questions asked.',
        q2: 'Is my data safe?',
        a2: 'Absolutely. We use end-to-end encryption and never store your message contents permanently.',
        q3: 'Do I need a phone?',
        a3: 'You need a phone to scan the QR code once. After that, Whalink keeps the session alive in the cloud.'
      }
    },
    auth: {
        welcomeBack: 'Welcome Back',
        loginSubtitle: 'Log in to manage your Whalink panel.',
        email: 'Email Address',
        password: 'Password',
        forgotPass: 'Forgot Password',
        login: 'Log In',
        noAccount: "Don't have an account?",
        tryFree: 'Try Free for 14 Days',
        join: 'Join Whalink',
        joinSubtitle: 'Discover the power of automation with a 14-day free trial.',
        individual: 'Individual',
        corporate: 'Corporate',
        fullName: 'Full Name',
        companyName: 'Company Name',
        taxOffice: 'Tax Office',
        taxId: 'Tax ID',
        createAccount: 'Create Account'
    },
    dashboard: {
        welcome: 'Welcome!',
        setupSubtitle: 'Your Whalink account is ready. Complete the steps below to start.',
        wizard: 'Setup Wizard',
        step1: 'Connect WhatsApp',
        step1Desc: 'Link your existing WhatsApp number via QR or pairing code.',
        step2: 'Define Webhook',
        step2Desc: 'Add webhook to integrate with n8n, Zapier or your own software.',
        step3: 'Send First Message',
        step3Desc: 'Send a message to yourself to test.',
        addAccount: 'Add Account',
        activeAccounts: 'Active Accounts',
        totalMessages: 'Total Messages',
        avgResponse: 'Avg. Response Time',
        messageVolume: 'Message Volume',
        recentActivity: 'Recent Activity',
        support: 'Need help?',
        supportDesc: 'Our team can provide free setup support.',
        bookSupport: 'Book Support Call'
    },
    messages: {
        search: 'Search or start new chat',
        typeMessage: 'Type a message',
        noChats: 'No conversations found.',
        connectTitle: 'Whalink for Web',
        connectDesc: 'Send and receive messages without keeping your phone online.',
        encrypted: 'End-to-end encrypted'
    },
    common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        loading: 'Loading...',
        success: 'Success',
        error: 'Error'
    }
  },
  tr: {
    nav: {
      dashboard: 'Panel',
      accounts: 'Hesaplar',
      messages: 'Mesajlar',
      automations: 'Otomasyonlar',
      profile: 'Profil',
      logout: 'Çıkış Yap'
    },
    hero: {
      tag: 'B2C İşletmeleri için Yeni Nesil İletişim',
      title: 'WhatsApp Hattınızı Tam Otomatik Pilot\'a Alın',
      subtitle: 'Chat uygulamalarına yüzlerce dolar ödemeyin. Sipariş bildirimleri, kargo takibi ve müşteri desteğini tek bir panelden yönetin.',
      ctaPrimary: '14 Gün Ücretsiz Dene',
      ctaSecondary: 'Demoyu İzle',
      noCC: 'Kredi kartı gerekmez'
    },
    features: {
        alwaysOn: 'Always-on Bağlantı',
        alwaysOnDesc: 'Telefonunuz kapalı olsa bile WhatsApp Web oturumunuzu bulutta açık tutuyoruz. Kesintisiz 7/24 mesajlaşma.',
        privacy: 'Gizlilik Odaklı',
        privacyDesc: 'Uçtan uca şifreleme korunur.',
        multi: 'Çoklu Hesap',
        multiDesc: 'Destek, Satış ve İK hatlarını tek bir panelden yönetin.',
        integrations: 'E-Ticaret Sitenizle Konuşur',
        integrationsDesc: 'Whalink, WooCommerce, Shopify ve WordPress ile entegre çalışır. Her siparişte otomatik bildirim.',
        smsComparison: 'Eski vs Yeni Dünyanın Karşılaştırması',
        oldWay: 'ESKİ YÖNTEM',
        newWay: 'WHALINK',
        cost: 'Maliyet'
    },
    pricing: {
      title: 'Basit ve Şeffaf Fiyatlandırma',
      subtitle: 'İşletmenizin ihtiyacına uygun paketi seçin. Gizli ücret yok.',
      monthly: 'Aylık',
      yearly: 'Yıllık',
      save20: '2 ay hediye',
      mostPopular: 'En Popüler',
      tiers: {
        starter: {
          name: 'Başlangıç',
          desc: 'Test etmek ve küçük dükkanlar için.',
          features: ['1 WhatsApp Hesabı', 'Temel Otomasyon', 'Topluluk Desteği']
        },
        professional: {
          name: 'Profesyonel',
          desc: 'Freelancerlar ve büyüyen işletmeler için ideal.',
          features: ['3 WhatsApp Hesabı', 'Sınırsız Mesaj', 'n8n Webhookları', 'Öncelikli Destek']
        },
        business: {
          name: 'İşletme',
          desc: 'Büyüyen ekipler ve ajanslar için.',
          features: ['10 WhatsApp Hesabı', 'Çoklu Temsilci Kutusu', 'Gelişmiş Analitik', 'Özel Müşteri Temsilcisi']
        },
        corporate: {
          name: 'Kurumsal',
          desc: 'Büyük işletmeler için maksimum güç.',
          features: ['30 WhatsApp Hesabı', 'Özel SLA', 'White-label Seçenekleri', 'API Erişimi']
        }
      },
      addon: {
        title: 'Özel Entegrasyon Desteği',
        desc: 'n8n, Shopify veya özel CRM entegrasyonlarınız için uzman desteği alın.',
        price: '$100',
        oneTime: 'tek seferlik',
        btn: 'Pakete Ekle'
      },
      cta: '14 Gün Ücretsiz Dene',
      noCC: 'Kredi kartı gerekmez',
      faq: {
        title: 'Sıkça Sorulan Sorular',
        q1: 'İstediğim zaman iptal edebilir miyim?',
        a1: 'Evet, aboneliğinizi dilediğiniz zaman panelden iptal edebilirsiniz.',
        q2: 'Verilerim güvende mi?',
        a2: 'Kesinlikle. Uçtan uca şifreleme kullanıyoruz ve mesaj içeriklerinizi kalıcı olarak saklamıyoruz.',
        q3: 'Telefonumun açık kalması gerekiyor mu?',
        a3: 'Hayır. QR kodu bir kez tarattıktan sonra Whalink bulut sunucuları oturumu sizin için açık tutar.'
      }
    },
    auth: {
        welcomeBack: 'Tekrar Hoşgeldiniz',
        loginSubtitle: 'Whalink panelini yönetmek için giriş yapın.',
        email: 'Email Adresi',
        password: 'Şifre',
        forgotPass: 'Şifremi Unuttum',
        login: 'Giriş Yap',
        noAccount: "Hesabınız yok mu?",
        tryFree: '14 Gün Ücretsiz Deneyin',
        join: 'Whalink\'e Katılın',
        joinSubtitle: '14 gün ücretsiz deneme ile otomasyonun gücünü keşfedin.',
        individual: 'Bireysel',
        corporate: 'Kurumsal',
        fullName: 'Ad Soyad',
        companyName: 'Şirket Ünvanı',
        taxOffice: 'Vergi Dairesi',
        taxId: 'Vergi Numarası',
        createAccount: 'Hesabımı Oluştur'
    },
    dashboard: {
        welcome: 'Hoşgeldiniz!',
        setupSubtitle: 'Whalink hesabınız hazır. Başlamak için aşağıdaki adımları tamamlayın.',
        wizard: 'Kurulum Sihirbazı',
        step1: 'WhatsApp Hesabı Bağla',
        step1Desc: 'Mevcut WhatsApp numaranızı QR kod veya eşleştirme kodu ile sisteme tanıtın.',
        step2: 'Webhook Tanımla',
        step2Desc: 'n8n, Zapier veya kendi yazılımınız ile entegrasyon kurmak için webhook ekleyin.',
        step3: 'İlk Mesajını Gönder',
        step3Desc: 'Test etmek için kendinize bir mesaj gönderin.',
        addAccount: 'Hesap Ekle',
        activeAccounts: 'Aktif Hesaplar',
        totalMessages: 'Toplam Mesaj',
        avgResponse: 'Ort. Yanıt Süresi',
        messageVolume: 'Mesaj Hacmi',
        recentActivity: 'Son Aktiviteler',
        support: 'Yardıma mı ihtiyacınız var?',
        supportDesc: 'Ekibimiz kurulum için size ücretsiz destek verebilir.',
        bookSupport: 'Destek Randevusu Al'
    },
    messages: {
        search: 'Ara veya yeni sohbet başlat',
        typeMessage: 'Bir mesaj yazın',
        noChats: 'Sohbet bulunamadı.',
        connectTitle: 'Web için Whalink',
        connectDesc: 'Telefonunuzu çevrimiçi tutmadan mesaj gönderin ve alın.',
        encrypted: 'Uçtan uca şifreli'
    },
    common: {
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle',
        loading: 'Yükleniyor...',
        success: 'Başarılı',
        error: 'Hata'
    }
  }
};
