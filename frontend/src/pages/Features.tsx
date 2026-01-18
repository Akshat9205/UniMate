import { useState } from 'react';
import { Percent, Shield, AlertTriangle, FileText, Lock, Users, Sparkles, Target, Zap, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeaturesPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const coreFeatures = [
    {
      icon: Percent,
      title: 'Compatibility Score',
      description: 'Get a detailed percentage match with each potential roommate based on lifestyle factors',
      color: 'from-blue-500 to-cyan-500',
      stats: '95% Match Accuracy'
    },
    {
      icon: Shield,
      title: 'Deal-breaker Filters',
      description: 'Set non-negotiable preferences like smoking, pets, and cleanliness standards',
      color: 'from-purple-500 to-pink-500',
      stats: '100% Customizable'
    },
    {
      icon: AlertTriangle,
      title: 'Conflict Risk Indicator',
      description: 'Visual warning system highlights potential areas of incompatibility',
      color: 'from-red-500 to-orange-500',
      stats: 'AI-Powered Analysis'
    },
    {
      icon: FileText,
      title: 'Explainable Matching',
      description: 'Understand why you match with someone through transparent reasoning',
      color: 'from-green-500 to-teal-500',
      stats: 'Full Transparency'
    },
    {
      icon: Lock,
      title: 'Privacy-Aware',
      description: 'Your personal data is protected and only match-relevant info is shared',
      color: 'from-indigo-500 to-purple-500',
      stats: 'Bank-Level Security'
    },
    {
      icon: Users,
      title: 'Community Verified',
      description: 'Join a trusted community with verified profiles and authentic reviews',
      color: 'from-yellow-500 to-red-500',
      stats: '10K+ Happy Users'
    }
  ];

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'AI learns from your preferences to suggest better matches over time',
      included: true
    },
    {
      icon: Target,
      title: 'Advanced Filters',
      description: 'Filter by study habits, sleep schedules, dietary preferences, and more',
      included: true
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Get matched with compatible roommates in real-time',
      included: true
    },
    {
      icon: Heart,
      title: 'Compatibility Insights',
      description: 'Deep dive into personality and lifestyle compatibility analysis',
      included: false
    },
    {
      icon: CheckCircle,
      title: 'Priority Support',
      description: 'Get help from our team whenever you need it',
      included: false
    },
    {
      icon: Users,
      title: 'Group Matching',
      description: 'Find roommates for entire groups or apartments',
      included: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="mr-2" size={16} />
            Advanced Matching Technology
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Features That Make
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Perfect Matches</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the powerful tools and intelligent algorithms that help students find their ideal roommates with confidence
          </p>
          <button
            onClick={() => navigate('/user-details')}
            className="inline-flex items-center bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Matching Now
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to find your perfect roommate match
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 transform ${
                    hoveredFeature === index ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                  } border border-gray-100`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 rounded-2xl transition-opacity duration-300 ${
                    hoveredFeature === index ? 'opacity-5' : ''
                  }`}></div>
                  
                  <div className={`relative bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 ${
                    hoveredFeature === index ? 'rotate-12 scale-110' : ''
                  }`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your roommate search
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for getting started</p>
                <div className="text-4xl font-bold text-gray-900">$0<span className="text-lg font-normal text-gray-600">/month</span></div>
              </div>
              
              <div className="space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {feature.included ? (
                      <CheckCircle className="text-green-500 mt-0.5" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5"></div>
                    )}
                    <div>
                      <div className={`font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                        {feature.title}
                      </div>
                      <div className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/user-details')}
                className="w-full mt-8 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-600 mb-4">Unlock all features</p>
                <div className="text-4xl font-bold text-gray-900">$9.99<span className="text-lg font-normal text-gray-600">/month</span></div>
              </div>
              
              <div className="space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-teal-600 mt-0.5" size={20} />
                    <div>
                      <div className="font-medium text-gray-900">
                        {feature.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/user-details')}
                className="w-full mt-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Roommate?
            </h2>
            <p className="text-xl mb-8 text-teal-50">
              Join thousands of students who have found their ideal living situations through UniMate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/user-details')}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Start Free Today
              </button>
              <button
                onClick={() => navigate('/about-us')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
