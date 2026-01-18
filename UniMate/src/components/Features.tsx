import { Percent, Shield, AlertTriangle, FileText, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Percent,
      title: 'Compatibility Score',
      description: 'Get a detailed percentage match with each potential roommate based on lifestyle factors',
      color: 'from-blue-500 to-cyan-500',
      badge: '95% Accuracy'
    },
    {
      icon: Shield,
      title: 'Deal-breaker Filters',
      description: 'Set non-negotiable preferences like smoking, pets, and cleanliness standards',
      color: 'from-purple-500 to-pink-500',
      badge: '100% Customizable'
    },
    {
      icon: AlertTriangle,
      title: 'Conflict Risk Indicator',
      description: 'Visual warning system highlights potential areas of incompatibility',
      color: 'from-red-500 to-orange-500',
      badge: 'AI-Powered'
    },
    {
      icon: FileText,
      title: 'Explainable Matching',
      description: 'Understand why you match with someone through transparent reasoning',
      color: 'from-green-500 to-teal-500',
      badge: 'Transparent'
    },
    {
      icon: Lock,
      title: 'Privacy-Aware',
      description: 'Your personal data is protected and only match-relevant info is shared',
      color: 'from-indigo-500 to-purple-500',
      badge: 'Secure'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white via-teal-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-400/10"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="mr-2" size={16} />
            Advanced Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Better Matches</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced tools designed to ensure you find the most compatible roommate through intelligent algorithms and user preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 transform border border-gray-100 ${
                  hoveredFeature === index ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                }`}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="inline-flex items-center bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-200">
                    {feature.badge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
