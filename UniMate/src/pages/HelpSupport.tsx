import { useState } from 'react';
import { ArrowLeft, MessageCircle, HelpCircle, ChevronRight, Phone, Mail, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HelpSupport() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
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
      question: 'How does the roommate matching work?',
      answer: 'Our AI-powered system analyzes your lifestyle preferences, study habits, and personality traits to suggest compatible roommates. You can review matches and connect with those you like.',
      popular: true
    },
    {
      id: 3,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal and Google Pay. All payments are processed securely.',
      popular: false
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
      answer: 'Your safety is our priority. Use the report feature on any profile or message, or contact our support team immediately at support@unimate.com.',
      popular: false
    },
    {
      id: 6,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from Settings > Privacy & Security. Please note this action is permanent and cannot be undone.',
      popular: false
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Live Chat</h3>
            </div>
            <p className="text-blue-100 mb-4">Chat with our support team instantly</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Email Support</h3>
            </div>
            <p className="text-green-100 mb-4">Get help via email within 24 hours</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Send Email
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="animate-pulse" size={24} />
              <h3 className="text-xl font-bold">Phone Support</h3>
            </div>
            <p className="text-purple-100 mb-4">Call us Mon-Fri, 9AM-6PM EST</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              <Phone size={16} className="inline mr-2" />
              1-800-UNIMATE
            </button>
          </div>
        </div>

        
        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {faqs.length} Articles
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {faq.popular && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        🔥 POPULAR
                      </span>
                    )}
                    <span className="font-semibold text-gray-900 text-base">{faq.question}</span>
                  </div>
                  <ChevronRight
                    className={`text-blue-500 transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === faq.id ? 'rotate-90 text-blue-600' : ''
                    }`}
                    size={20}
                  />
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-200 animate-in slide-in-from-top duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-full p-1 mt-1">
                        <CheckCircle className="text-green-600" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed font-medium">{faq.answer}</p>
                        <div className="mt-3 flex items-center space-x-4">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                            <MessageCircle size={14} />
                            <span>Still need help?</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 text-sm">
                            Helpful?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {faqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No FAQs found</h3>
              <p className="text-gray-500">Try selecting a different category or search for something else</p>
            </div>
          )}
        </div>

        
        {/* Contact Info */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl text-white">
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
    </div>
  );
}
