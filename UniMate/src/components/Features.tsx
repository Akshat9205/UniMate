import { Percent, Shield, AlertTriangle, FileText, Lock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Percent,
      title: 'Compatibility Score',
      description: 'Get a detailed percentage match with each potential roommate based on lifestyle factors',
    },
    {
      icon: Shield,
      title: 'Deal-breaker Filters',
      description: 'Set non-negotiable preferences like smoking, pets, and cleanliness standards',
    },
    {
      icon: AlertTriangle,
      title: 'Conflict Risk Indicator',
      description: 'Visual warning system highlights potential areas of incompatibility',
    },
    {
      icon: FileText,
      title: 'Explainable Matching',
      description: 'Understand why you match with someone through transparent reasoning',
    },
    {
      icon: Lock,
      title: 'Privacy-Aware',
      description: 'Your personal data is protected and only match-relevant info is shared',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Matches
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced tools designed to ensure you find the most compatible roommate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-500"
            >
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
