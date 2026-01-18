import { ArrowRight, Play } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Find Your Perfect Hostel Roommate?
        </h2>
        <p className="text-xl text-teal-100 mb-10 leading-relaxed">
          Join thousands of students who have found their ideal living companions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-teal-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-xl flex items-center justify-center gap-2">
            Get Started
            <ArrowRight size={20} />
          </button>
          <button className="bg-teal-700 text-white px-8 py-4 rounded-xl hover:bg-teal-800 transition-all duration-200 font-semibold text-lg border-2 border-white flex items-center justify-center gap-2">
            <Play size={20} />
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
