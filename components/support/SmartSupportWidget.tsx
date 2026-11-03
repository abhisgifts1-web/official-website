'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Truck,
  RotateCcw,
  CreditCard,
  Ruler,
  Sun,
  ShieldCheck,
  Phone,
  ArrowUp,
  ExternalLink,
  Bot,
  HelpCircle,
  Clock,
  MapPin,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    href?: string;
    isWhatsApp?: boolean;
    waText?: string;
  };
}

const FAQ_KNOWLEDGE_BASE: {
  keywords: string[];
  question: string;
  answer: string;
  action?: {
    label: string;
    href?: string;
    isWhatsApp?: boolean;
    waText?: string;
  };
}[] = [
  {
    keywords: ['size', 'dimension', 'measurement', 'inches', 'cm', 'thickness', '4mm', 'big', 'small'],
    question: 'What frame sizes and materials do you offer?',
    answer:
      "All our frames are precision-crafted using premium 4mm crystal cast acrylic sheets with diamond-beveled edges. We offer 4 standard sizes:\n• Size 1: 12 × 18 inches (30 × 45 cm)\n• Size 2: 18 × 24 inches (45 × 60 cm) — Most Popular\n• Size 3: 24 × 36 inches (60 × 90 cm)\n• Size 4: 30 × 48 inches (75 × 120 cm) Grand Masterpiece\nCustom dimensions are also supported up to 5 feet!",
    action: {
      label: 'Explore Customizer Studio',
      href: '/customise',
    },
  },
  {
    keywords: ['led', 'light', 'backlit', 'adapter', 'power', 'plug', 'glow', 'warm', 'rgb', 'lighting'],
    question: 'How does the LED backlighting work?',
    answer:
      "Our LED Backlit frames feature high-density 3000K warm golden ambient back-glow LEDs. They include a certified 12V 2A power adapter and a 2-meter concealed cord that plugs into any standard wall outlet. The light creates an ethereal divine halo behind the artwork while remaining completely cool to touch.",
    action: {
      label: 'View LED Experience',
      href: '/#led-experience',
    },
  },
  {
    keywords: ['custom', 'customise', 'customize', 'upload', 'photo', 'picture', 'face', 'my own', 'process'],
    question: 'How does the photo frame customization process work?',
    answer:
      "Customization is simple and guided in 7 steps:\n1. Upload your photo on our Customizer Studio.\n2. Choose frame category & shape (Portrait/Landscape/Square/Round).\n3. Pick your preferred size.\n4. Select finish (Crystal Gloss, Matte, Standoff) & LED lighting.\n5. Add a personalized gold inscription (optional).\n6. Our design team creates a 1:1 digital proof and shares it on WhatsApp for your approval.\n7. Upon approval, we precision laser-cut and dispatch your frame!",
    action: {
      label: 'Start Customizing Now',
      href: '/customise',
    },
  },
  {
    keywords: ['shipping', 'delivery', 'time', 'days', 'hyderabad', 'dilsukhnagar', 'fast', 'courier', 'urgent'],
    question: 'What are the delivery timelines and shipping charges?',
    answer:
      "• FREE Express Shipping across India on all orders above ₹1,999 (₹149 for smaller orders).\n• Local Hyderabad & Dilsukhnagar: Same-day / Next-day dispatch with 24-48 hr delivery.\n• Rest of India: 3 to 5 business days via BlueDart, Delhivery, or DTDC Express.\nEvery frame is packed with multi-layer bubble wrap, edge corner guards, and sturdy wooden crates for 100% damage-free transit.",
    action: {
      label: 'Track Existing Order',
      href: '/track-order',
    },
  },
  {
    keywords: ['payment', 'pay', 'cod', 'cash on delivery', 'upi', 'gpay', 'phonepe', 'card', 'razorpay'],
    question: 'What payment methods do you accept? Is COD available?',
    answer:
      "We accept:\n• UPI (Google Pay, PhonePe, Paytm, BHIM)\n• Credit & Debit Cards (Visa, MasterCard, RuPay)\n• Net Banking across all major banks\n• Cash on Delivery (COD) is available with a nominal ₹99 handling fee.\nFor custom personalized photo frames, a 30% advance via UPI is required to initiate design proofing, with the balance on COD/dispatch.",
    action: {
      label: 'Ask Payment Help on WhatsApp',
      isWhatsApp: true,
      waText: 'Hi Abhi\'s Gifts! I have a question regarding payment options and COD.',
    },
  },
  {
    keywords: ['return', 'refund', 'damage', 'broken', 'replacement', 'transit', 'guarantee', 'policy'],
    question: 'What is your return & damage policy?',
    answer:
      "We offer a 100% Transit Safe Replacement Guarantee!\nIf your artwork arrives damaged, broken, or with a manufacturing defect, simply record a brief unboxing video and share it with our WhatsApp support within 48 hours. We will manufacture and dispatch a brand-new replacement immediately at zero extra cost to you.",
    action: {
      label: 'Read Return Policy',
      href: '/return-refund-policy',
    },
  },
  {
    keywords: ['track', 'order status', 'where is my order', 'tracking', 'dispatch', 'courier'],
    question: 'How do I track my order?',
    answer:
      "You can track your order status in real time by entering your Order ID (e.g., AG-2026-78401) on our dedicated tracking page. You'll see live updates: Order Received → Processing → Customization/Production → Dispatched → Delivered.",
    action: {
      label: 'Go to Order Tracking',
      href: '/track-order',
    },
  },
  {
    keywords: ['contact', 'address', 'phone', 'location', 'shop', 'store', 'call', 'talk', 'human'],
    question: 'Where is your store located and how can I talk to human support?',
    answer:
      "• Studio Location: Abhi's Gifts, Dilsukhnagar, Hyderabad, Telangana – 500036\n• Phone: +91 90323 72782\n• WhatsApp: +91 90323 72782\n• Email: abhisgifts@gmail.com\n• Studio Hours: Mon – Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 6:00 PM\nYou can connect directly with our master artisans anytime on WhatsApp!",
    action: {
      label: 'Chat Directly on WhatsApp',
      isWhatsApp: true,
      waText: 'Hello Abhi\'s Gifts, I would like to speak with your customer support team.',
    },
  },
];

export default function SmartSupportWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Abhi's Gifts. I'm your automated support assistant.\n\nHow may I assist you with our handcrafted acrylic photo frames and sacred wall art today?",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Monitor scroll for Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contextual WhatsApp Message based on current page
  const getContextualWhatsAppUrl = () => {
    const cleanNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
    let msg = "Hello Abhi's Gifts, I need help regarding your photo frames.";

    if (pathname?.includes('/product/')) {
      const slug = pathname.split('/').filter(Boolean).pop() || '';
      const formattedTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      msg = `Hello Abhi's Gifts, I am inquiring about "${formattedTitle}". Can you please help me with size recommendations, lighting options, and delivery timeline?`;
    } else if (pathname?.includes('/customise')) {
      msg = "Hello Abhi's Gifts, I am designing a custom photo frame and need guidance on photo resolution, sizing, and pricing.";
    } else if (pathname?.includes('/checkout') || pathname?.includes('/cart')) {
      msg = "Hello Abhi's Gifts, I am currently at checkout and need quick assistance with placing my order / payment.";
    } else if (pathname?.includes('/track-order')) {
      msg = "Hello Abhi's Gifts, I would like to check the live status of my recent order.";
    }

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Analyze query against knowledge base
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedFaq = FAQ_KNOWLEDGE_BASE.find((faq) =>
        faq.keywords.some((k) => lower.includes(k))
      );

      let responseText = '';
      let action: ChatMessage['action'] = undefined;

      if (matchedFaq) {
        responseText = matchedFaq.answer;
        action = matchedFaq.action;
      } else {
        responseText =
          "Thank you for reaching out! While I am an automated assistant with predefined knowledge on sizing, materials, delivery, and policies, our human support team is ready to answer your specific question right away on WhatsApp or phone.";
        action = {
          label: 'Chat with Team on WhatsApp',
          isWhatsApp: true,
          waText: `Hello Abhi's Gifts, I have a question: "${query}". Can you assist me?`,
        };
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: 'Just now',
        action,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const triggerFaq = (faq: (typeof FAQ_KNOWLEDGE_BASE)[0]) => {
    handleSendMessage(faq.question);
  };

  return (
    <>
      {/* Floating Action Controls Container (Bottom-Right) */}
      <div
        className="fixed z-50 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none transition-all duration-300"
        style={{
          right: 'max(1rem, calc(env(safe-area-inset-right, 0px) + 1rem))',
          bottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))',
        }}
      >
        {/* Scroll-to-Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#1F0B13]/90 hover:bg-[#35101C] text-[#F0D79B] shadow-lg border border-[#C99B45]/40 transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-md"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Support Launcher (Smart Assistant) */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {/* Smart Assistant Launcher Pill */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              setHasNewBadge(false);
            }}
            className="group inline-flex items-center gap-2 bg-[#511B2A] hover:bg-[#3D1420] text-[#FFF7EC] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-xl border border-[#D6AA55]/80 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md"
            aria-label="Open Customer Support Assistant"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-[#D6AA55] group-hover:rotate-12 transition-transform" />
              {hasNewBadge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D6AA55] rounded-full animate-ping" />
              )}
            </div>
            <span className="text-xs font-bold tracking-wide font-sans hidden sm:inline">
              Need Help?
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D6AA55] bg-[#3D1420] px-1.5 py-0.5 rounded-full">
              AI Support
            </span>
          </button>
        </div>
      </div>

      {/* Smart Customer Support Assistant Drawer / Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-auto bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full sm:w-[420px] max-w-full h-[90vh] sm:h-[620px] max-h-[92vh] bg-[#FFFBF5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8D5BD] flex flex-col overflow-hidden text-[#511B2A] animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#511B2A] via-[#641D30] to-[#511B2A] text-[#FFF7EC] px-4 sm:px-5 py-4 border-b border-[#D6AA55]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-[#D6AA55]/80 flex items-center justify-center text-[#D6AA55]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-sm tracking-wide">
                      Abhi's Gifts Assistant
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <p className="text-[10px] text-[#FFF7EC]/70 font-sans">
                    Automated Support • Hyderabad Studio
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#FFF7EC] transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Verified Policy Banner */}
            <div className="bg-[#FFF7EC] border-b border-[#E8D5BD] px-4 py-2 flex items-center justify-between text-[11px] text-[#533C36]">
              <span className="flex items-center gap-1 font-semibold text-[#511B2A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6AA55]" />
                100% Verified Store Answers
              </span>
              <a
                href={getContextualWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-bold inline-flex items-center gap-1"
              >
                Switch to WhatsApp →
              </a>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#FFFBF5] to-[#FFF7EC]/50 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-sans leading-relaxed shadow-2xs whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#511B2A] text-[#FFF7EC] rounded-tr-xs'
                        : 'bg-white text-[#511B2A] border border-[#E8D5BD] rounded-tl-xs'
                    }`}
                  >
                    {msg.text}

                    {/* Optional Interactive Action Link */}
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-[#E8D5BD]/60">
                        {msg.action.isWhatsApp ? (
                          <a
                            href={`https://wa.me/${(INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              msg.action.waText || 'Hello Abhi\'s Gifts'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-full hover:bg-[#25D366]/20 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 fill-current" />
                            <span>{msg.action.label}</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </a>
                        ) : msg.action.href ? (
                          <Link
                            href={msg.action.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#511B2A] bg-[#FFF7EC] border border-[#D6AA55] px-2.5 py-1 rounded-full hover:bg-[#511B2A] hover:text-[#FFF7EC] transition-colors"
                          >
                            <Sparkles className="w-3 h-3 text-[#D6AA55]" />
                            <span>{msg.action.label}</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </Link>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#8C7A70] mt-1 px-1">
                    {msg.sender === 'bot' ? 'Assistant' : 'You'} • {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white border border-[#E8D5BD] rounded-2xl rounded-tl-xs px-3 py-2 w-16 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-[#D6AA55] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#D6AA55] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#D6AA55] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Question Prompt Chips */}
            <div className="p-2.5 bg-[#FFF7EC] border-t border-[#E8D5BD] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[0])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                📏 Sizes &amp; Thickness
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[1])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                💡 LED Lighting Info
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[2])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                🎨 Customization Process
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[3])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                🚚 Shipping &amp; Hyderabad
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[4])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                💳 Payments &amp; COD
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[5])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                🛡️ Transit Guarantee
              </button>
              <button
                type="button"
                onClick={() => triggerFaq(FAQ_KNOWLEDGE_BASE[6])}
                className="text-[11px] font-medium bg-white text-[#511B2A] border border-[#E8D5BD] hover:border-[#D6AA55] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                📦 Track Order
              </button>
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-[#E8D5BD] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about sizes, LED, delivery, customization..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#FFFBF5] border border-[#E8D5BD] rounded-full px-3.5 py-2 text-xs text-[#511B2A] placeholder-[#8C7A70] outline-none focus:border-[#D6AA55] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  inputText.trim()
                    ? 'bg-[#511B2A] text-[#FFF7EC] hover:bg-[#3D1420]'
                    : 'bg-[#F2E5D5] text-[#8C7A70] cursor-not-allowed opacity-60'
                }`}
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
