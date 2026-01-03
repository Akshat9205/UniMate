import { ClipboardList, Brain, Heart, ArrowRight } from 'lucide-react';

export default function Solution() {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Preferences',
      description: 'Students input their lifestyle choices',
    },
    {
      icon: Brain,
      title: 'Smart Matching',
      description: 'ML algorithm analyzes compatibility',
    },
    {
      icon: Heart,
      title: 'Better Compatibility',
      description: 'Find roommates who truly match',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            A Smarter Way to Match Hostel Roommates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our intelligent system ensures compatibility before roommates move in together
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center max-w-xs hover:shadow-xl transition-shadow duration-300">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="text-teal-600" size={36} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="text-teal-600 hidden md:block" size={32} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
