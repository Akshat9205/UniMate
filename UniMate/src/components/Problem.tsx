import { Moon, Trash2, Music, Cigarette } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: Moon,
      title: 'Different Sleep Schedules',
      description: 'Early birds vs night owls lead to constant disturbances and frustration',
    },
    {
      icon: Trash2,
      title: 'Clean vs Messy Habits',
      description: 'Conflicting cleanliness standards create tension and uncomfortable living',
    },
    {
      icon: Music,
      title: 'Study vs Party Lifestyle',
      description: 'Academic focus clashes with social activities affecting both roommates',
    },
    {
      icon: Cigarette,
      title: 'Smoking & Noise Conflicts',
      description: 'Lifestyle choices that significantly impact shared living spaces',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Problem with Random Roommate Allocation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Traditional random assignment ignores compatibility, leading to preventable conflicts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
