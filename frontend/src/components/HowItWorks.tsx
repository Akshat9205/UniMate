import { UserPlus, Settings, Sparkles, UserCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Secure Sign Up',
      description: 'Create your account with college credentials and basic information',
    },
    {
      number: '02',
      icon: Settings,
      title: 'Set Preferences',
      description: 'Answer questions about your sleep, study habits, and lifestyle choices',
    },
    {
      number: '03',
      icon: Sparkles,
      title: 'Smart Matching',
      description: 'Our ML algorithm analyzes and finds your most compatible matches',
    },
    {
      number: '04',
      icon: UserCheck,
      title: 'View Matches',
      description: 'Browse top compatible roommates with detailed compatibility scores',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Four simple steps to find your perfect roommate match
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-500"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-teal-200">
                {step.number}
              </div>
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <step.icon className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
