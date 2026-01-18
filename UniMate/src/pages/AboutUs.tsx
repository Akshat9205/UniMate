import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Brain, 
  Target, 
  TrendingUp,
  Shield,
  Globe,
  Clock,
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function AboutUs() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const teamMembers = [
    {
      name: "Akshat Agarwal",
      role: "Founder & Lead Developer",
      image: "👨‍💻",
      description: "Full-stack developer passionate about creating innovative solutions for student housing challenges.",
      skills: ["React", "Node.js", "Machine Learning", "MongoDB"]
    },
    {
      name: "Development Team",
      role: "Tech Innovators",
      image: "👥",
      description: "Dedicated team of developers and designers working to revolutionize roommate matching.",
      skills: ["UI/UX Design", "Backend Development", "Data Science", "Mobile Development"]
    }
  ];

  const stats = [
    { label: "Students Matched", value: "2000+", icon: Users, color: "text-teal-600" },
    { label: "Success Rate", value: "95%", icon: Target, color: "text-green-600" },
    { label: "Universities", value: "50+", icon: Globe, color: "text-blue-600" },
    { label: "Cities Covered", value: "25+", icon: Shield, color: "text-purple-600" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced machine learning algorithms analyze lifestyle preferences to find perfect roommate compatibility."
    },
    {
      icon: Heart,
      title: "Lifestyle Compatibility",
      description: "We consider sleep schedules, study habits, cleanliness levels, and personality traits for optimal matches."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles and secure data handling ensure a trustworthy matching experience."
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get your roommate matches in seconds with our real-time matching system."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-xl sm:text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors"
              >
                UniMate
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about-us')}
                className="text-teal-600 font-semibold border-b-2 border-teal-600 pb-1"
              >
                About Us
              </button>
              <button
                onClick={() => navigate('/user-details')}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Find Roommates
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-md font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => { navigate('/about-us'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-teal-600 bg-teal-50 rounded-md font-semibold"
                >
                  About Us
                </button>
                <button
                  onClick={() => { navigate('/user-details'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-md font-medium"
                >
                  Find Roommates
                </button>
                <button
                  onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-md font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Finding Your Perfect
              <span className="block text-yellow-300">Roommate Match</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              UniMate uses advanced AI technology to connect students with compatible roommates based on lifestyle preferences, study habits, and personality traits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/user-details')}
                className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Start Matching
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-teal-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Making an Impact in Student Life
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect roommates through UniMate
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex p-3 rounded-full ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose UniMate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform offers unique features designed specifically for students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate minds behind UniMate's innovative matching technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl border border-teal-100">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 bg-teal-600 text-white rounded-full text-sm font-semibold mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white text-teal-600 text-sm font-medium rounded-full border border-teal-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-teal-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To revolutionize student housing by using AI technology to create meaningful, lasting roommate connections based on genuine lifestyle compatibility and shared values.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the global platform that transforms how students find housing, making every living arrangement a positive, supportive, and growth-oriented experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Roommate?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already found their ideal living situations through our AI-powered matching system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/user-details')}
              className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Start Matching Now
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-teal-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">UniMate</h3>
              <p className="text-gray-300 leading-relaxed">
                AI-powered roommate matching designed specifically for students. Find your perfect living situation today.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/user-details')} className="text-gray-300 hover:text-white transition-colors">Find Roommates</button></li>
                <li><button onClick={() => navigate('/about-us')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Technology</h4>
              <ul className="space-y-2 text-gray-300">
                <li>AI-Powered Matching</li>
                <li>Lifestyle Analysis</li>
                <li>Real-time Results</li>
                <li>Secure Platform</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Connect</h4>
              <div className="space-y-2 text-gray-300">
                <p>support@unimate.com</p>
                <p>+91 XXXXX XXXXX</p>
                <div className="flex gap-4 pt-2">
                  <button className="hover:text-teal-400 transition-colors">Facebook</button>
                  <button className="hover:text-teal-400 transition-colors">Twitter</button>
                  <button className="hover:text-teal-400 transition-colors">LinkedIn</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UniMate. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
