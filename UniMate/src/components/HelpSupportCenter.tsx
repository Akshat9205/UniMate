import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle, Mail, Phone, Clock, Send, X, Minimize2, Maximize2, Paperclip, CheckCircle, AlertCircle, HelpCircle, User, Bot, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  popular?: boolean;
  actionLink?: string;
  actionText?: string;
}

export default function HelpSupportCenter() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isAgentOnline, setIsAgentOnline] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Chat states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      content: 'Hello! Welcome to UniMate Support. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline'>('online');
  
  // Email form states
  const [emailForm, setEmailForm] = useState({
    category: 'account',
    subject: '',
    message: '',
    attachment: null as File | null
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  // Phone states
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile by going to Settings > Profile Settings. There you can edit your personal information, upload a profile picture, and update your bio.',
      popular: true
    },
    {
      id: 2,
      category: 'roommate',
      question: 'How does roommate matching work?',
      answer: 'Our AI-powered system analyzes your lifestyle preferences, study habits, and personality traits to suggest compatible roommates. You can review matches and connect with those you like.',
      popular: true
    },
    {
      id: 3,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal and Google Pay. All payments are processed securely.'
    },
    {
      id: 4,
      category: 'technical',
      question: 'I\'m having trouble logging in. What should I do?',
      answer: 'Try resetting your password using the "Forgot Password" link. If that doesn\'t work, clear your browser cache and cookies, then try again.',
      popular: true
    },
    {
      id: 5,
      category: 'safety',
      question: 'How do I report inappropriate behavior?',
      answer: 'Your safety is our priority. Use the report feature on any profile or message, or contact our support team immediately.',
      actionText: 'Report a User',
      actionLink: '/report'
    },
    {
      id: 6,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from Settings > Privacy & Security. Please note this action is permanent and cannot be undone.'
    }
  ];

  const topics = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, color: 'text-blue-600' },
    { id: 'account', name: 'Account', icon: User, color: 'text-purple-600' },
    { id: 'roommate', name: 'Roommate Matching', icon: MessageCircle, color: 'text-green-600' },
    { id: 'billing', name: 'Billing & Payments', icon: Mail, color: 'text-yellow-600' },
    { id: 'technical', name: 'Technical Issues', icon: AlertCircle, color: 'text-red-600' },
    { id: 'safety', name: 'Safety & Privacy', icon: HelpCircle, color: 'text-indigo-600' }
  ];

  const filteredFaqs = selectedTopic === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedTopic);

  useEffect(() => {
    // Simulate agent availability check
    const checkAgentStatus = () => {
      const hour = new Date().getHours();
      const isBusinessHours = hour >= 9 && hour <= 18;
      setIsAgentOnline(isBusinessHours);
      setAgentStatus(isBusinessHours ? 'online' : 'offline');
    };
    
    checkAgentStatus();
    const interval = setInterval(checkAgentStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: isAgentOnline ? 'agent' : 'bot',
        content: isAgentOnline 
          ? 'Thank you for your message. Let me help you with that. Could you provide more details about the issue you\'re experiencing?'
          : 'All our support agents are currently offline. Your message has been saved as a support ticket. We\'ll respond within 24 hours.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/support-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user-id', // This would come from auth context
          category: emailForm.category,
          subject: emailForm.subject,
          message: emailForm.message,
          priority: 'medium',
          attachment: emailForm.attachment ? {
            filename: emailForm.attachment.name,
            size: emailForm.attachment.size,
            mimetype: emailForm.attachment.type
          } : null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create support ticket');
      }

      const data = await response.json();
      setTicketId(data.ticket.ticketId);
      setEmailSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmailSubmitted(false);
        setShowEmailModal(false);
        setEmailForm({ category: 'account', subject: '', message: '', attachment: null });
        setTicketId('');
      }, 3000);
    } catch (error) {
      console.error('Error creating support ticket:', error);
      // Handle error - show error message to user
    }
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEmailForm(prev => ({ ...prev, attachment: file }));
    }
  };

  const handleCallSupport = () => {
    const phoneNumber = '1-800-846-2833'; // UNIMATE
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeft className="text-gray-600 group-hover:text-blue-600 transition-colors" size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Help & Support Center
            </h1>
            <p className="text-gray-600 text-lg">
              Find answers and get the help you need, 24/7
            </p>
          </div>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Live Chat */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Live Chat</h3>
              <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                isAgentOnline ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
              }`}>
                {isAgentOnline ? 'Online' : 'Offline'}
              </div>
            </div>
            <p className="text-blue-100 mb-4">Chat with our support team instantly</p>
            <button 
              onClick={() => setShowChatModal(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full"
            >
              Start Chat
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Email Support</h3>
            </div>
            <p className="text-green-100 mb-4">Get help via email within 24 hours</p>
            <button 
              onClick={() => setShowEmailModal(true)}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors w-full"
            >
              Send Email
            </button>
          </div>

          {/* Phone Support */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Phone Support</h3>
            </div>
            <p className="text-purple-100 mb-4">Call us Mon-Fri, 9AM-6PM EST</p>
            <button 
              onClick={() => setShowPhoneInfo(true)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors w-full"
            >
              <Phone size={16} className="inline mr-2" />
              1-800-UNIMATE
            </button>
          </div>
        </div>

        {/* Help Topics & FAQs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Help Topics & FAQs</h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-all ${
                      selectedTopic === topic.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={14} className={selectedTopic === topic.id ? '' : topic.color} />
                    <span className="font-medium">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {faq.popular && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                          POPULAR
                        </span>
                      )}
                      <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      {faq.actionLink && (
                        <button 
                          onClick={() => faq.actionLink && navigate(faq.actionLink)}
                          className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <AlertCircle size={14} />
                          <span>{faq.actionText}</span>
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-gray-300 mb-6 text-lg">Our support team is here for you 24/7</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="font-semibold mb-1">Email Us</p>
                <p className="text-gray-400">support@unimate.com</p>
              </div>
              <div className="text-center">
                <Phone className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="font-semibold mb-1">Call Us</p>
                <p className="text-gray-400">1-800-UNIMATE</p>
              </div>
              <div className="text-center">
                <Clock className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="font-semibold mb-1">Response Time</p>
                <p className="text-gray-400">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className={`fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-14' : 'w-96 h-[500px]'
        }`}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${agentStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <div>
                <h4 className="font-semibold">Support Chat</h4>
                <p className="text-xs text-blue-100">
                  {agentStatus === 'online' ? 'Connected to Support Agent' : 
                   agentStatus === 'offline' ? 'Leave a message' : 'Connecting...'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-blue-800 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 hover:bg-blue-800 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 h-[350px] space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : message.sender === 'agent'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'agent' && <User size={12} />}
                        {message.sender === 'bot' && <Bot size={12} />}
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isAgentOnline ? "Type your message..." : "Leave a message..."}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create Support Ticket</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {emailSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ticket Submitted!</h4>
                <p className="text-gray-600 mb-2">We've received your request.</p>
                <p className="text-sm font-medium text-blue-600">Ticket ID: {ticketId}</p>
                <p className="text-xs text-gray-500 mt-2">You'll receive a confirmation email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Category</label>
                  <select
                    value={emailForm.category}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="account">Account Issues</option>
                    <option value="matching">Roommate Matching</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="technical">Technical Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Message</label>
                  <textarea
                    value={emailForm.message}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Please describe your issue in detail..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileAttach}
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Paperclip size={16} />
                      <span className="text-sm">
                        {emailForm.attachment ? emailForm.attachment.name : 'Attach File'}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Phone Info Modal */}
      {showPhoneInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Phone Support Information</h3>
              <button
                onClick={() => setShowPhoneInfo(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4">
                <Headphones className="text-purple-600" size={32} />
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">1-800-UNIMATE</p>
                <p className="text-gray-600">1-800-846-2833</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Business Hours</p>
                <p className="text-gray-600">Monday - Friday</p>
                <p className="text-lg font-semibold text-gray-900">9:00 AM - 6:00 PM EST</p>
                <div className={`mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  agentStatus === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${agentStatus === 'online' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  <span>{agentStatus === 'online' ? 'Currently Available' : 'Currently Offline'}</span>
                </div>
              </div>

              <button
                onClick={handleCallSupport}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                <Phone size={16} className="inline mr-2" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
