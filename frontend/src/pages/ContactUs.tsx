import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users, HelpCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Contact form submitted:', data);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Back Button - Top Left */}
      <button
        onClick={handleBackClick}
        className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-600 hover:text-teal-600 hover:bg-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about UniMate? We're here to help you find the perfect roommate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <Mail className="w-5 h-5 text-teal-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">support@unimate.com</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <Phone className="w-5 h-5 text-teal-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Office</p>
                    <p className="text-sm text-gray-600">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-left animation-delay-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                Office Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm group">
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Monday - Friday</span>
                  <span className="text-gray-900 font-medium group-hover:scale-105 transition-transform">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm group">
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Saturday</span>
                  <span className="text-gray-900 font-medium group-hover:scale-105 transition-transform">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-sm group">
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Sunday</span>
                  <span className="text-gray-900 font-medium group-hover:scale-105 transition-transform">Closed</span>
                </div>
              </div>
            </div>

            {/* Support Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-left animation-delay-400">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <HelpCircle className="w-4 h-4 text-white" />
                </div>
                How Can We Help?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 group cursor-pointer">
                  <Users className="w-4 h-4 mr-2 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-gray-900 transition-colors">Roommate Matching Issues</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 group cursor-pointer">
                  <MessageSquare className="w-4 h-4 mr-2 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-gray-900 transition-colors">Account & Profile Help</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 group cursor-pointer">
                  <HelpCircle className="w-4 h-4 mr-2 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-gray-900 transition-colors">Safety & Security Concerns</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 group cursor-pointer">
                  <Mail className="w-4 h-4 mr-2 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-gray-900 transition-colors">Partnership Inquiries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20 hover:shadow-xl transition-all duration-300 animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-teal-600 transition-colors">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-teal-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-teal-600 transition-colors">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-teal-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-teal-600 transition-colors">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-teal-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="roommate-help">Roommate Matching Help</option>
                    <option value="account-issue">Account Issue</option>
                    <option value="safety-concern">Safety Concern</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-teal-600 transition-colors">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-teal-300 resize-none"
                    placeholder="Tell us more about how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
