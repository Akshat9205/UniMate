import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/user-details');
  };

  return (
    <section id="home" className="pt-36 pb-16 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find a Roommate Who
              <span className="text-teal-600 block text-4xl sm:text-5xl mt-5">Matches Your Lifestyle</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              A smart hostel roommate matching system designed to reduce conflicts and improve
              student living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </button>
            </div>
      </div>
    </section>
  );
}
