import { TrendingDown, SmilePlus, RefreshCw, BarChart3 } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: TrendingDown,
      title: 'Reduced Roommate Conflicts',
      description: 'Decrease disputes by up to 75% through intelligent matching',
      stat: '75%',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: SmilePlus,
      title: 'Higher Student Satisfaction',
      description: 'Improved living experience leads to better academic performance',
      stat: '92%',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: RefreshCw,
      title: 'Fewer Room Changes',
      description: 'Reduce administrative burden with compatible initial placements',
      stat: '60%',
      color: 'from-teal-400 to-teal-600',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Management',
      description: 'Gain insights into student preferences and housing trends',
      stat: '100%',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Colleges Should Use This System
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform hostel management with data-driven roommate matching
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                <div className={`bg-gradient-to-br ${benefit.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                      {benefit.stat}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
