import { ArrowLeft, Users, Home, Heart, Globe, CheckCircle, Star, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Impact() {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    matches: 0,
    universities: 0,
    cities: 0,
    satisfaction: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        students: 15000,
        matches: 8500,
        universities: 250,
        cities: 45,
        satisfaction: 94
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const impactCategories = [
    {
      icon: Users,
      title: "Student Success",
      description: "Empowering students to find perfect living arrangements and focus on their academic journey",
      stats: "15,000+ Students Helped",
      color: "from-blue-500 to-cyan-500",
      features: ["Reduced stress levels", "Better academic performance", "Improved social connections"]
    },
    {
      icon: Home,
      title: "Housing Solutions",
      description: "Solving the accommodation crisis for students across educational institutions",
      stats: "8,500+ Successful Matches",
      color: "from-green-500 to-emerald-500",
      features: ["Safe verified listings", "Fair pricing", "Quick matching process"]
    },
    {
      icon: Heart,
      title: "Community Building",
      description: "Creating lasting friendships and supportive living environments",
      stats: "94% Satisfaction Rate",
      color: "from-purple-500 to-pink-500",
      features: ["Lifelong friendships", "Support networks", "Cultural exchange"]
    },
    {
      icon: Globe,
      title: "National Reach",
      description: "Expanding our impact across cities and educational institutions nationwide",
      stats: "45+ Cities Covered",
      color: "from-orange-500 to-red-500",
      features: ["Pan-India presence", "Growing network", "Local support teams"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      university: "IIT Delhi",
      image: "PS",
      content: "UniMate transformed my college experience. I found not just a roommate, but a lifelong friend. The platform made the entire process seamless and stress-free.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Medical Student",
      university: "AIIMS Mumbai",
      image: "RK",
      content: "As a medical student with a hectic schedule, UniMate helped me find the perfect study partner and roommate. Our compatibility score was spot on!",
      rating: 5
    },
    {
      name: "Ananya Reddy",
      role: "Design Student",
      university: "NID Bangalore",
      image: "AR",
      content: "The lifestyle matching feature is incredible! I found someone who shares my creative energy and sleep schedule. Couldn't be happier!",
      rating: 5
    }
  ];

  const milestones = [
    { year: "2021", title: "UniMate Founded", description: "Started with a vision to solve student housing problems", achieved: true },
    { year: "2022", title: "1000+ Students", description: "Reached our first major milestone of helping 1000+ students", achieved: true },
    { year: "2023", title: "National Expansion", description: "Expanded to 20+ cities across India", achieved: true },
    { year: "2024", title: "AI Integration", description: "Launched AI-powered matching algorithm", achieved: true },
    { year: "2025", title: "50K+ Students", description: "Goal to help 50,000+ students nationwide", achieved: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 font-medium">Back to Home</span>
          </motion.button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mb-6"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6"
            >
              Our Impact
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Transforming student lives across India by creating meaningful connections and solving the accommodation crisis one match at a time.
            </motion.p>
          </div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16"
          >
            {[
              { value: animatedStats.students, label: "Students Helped", icon: Users, color: "from-blue-500 to-cyan-500" },
              { value: animatedStats.matches, label: "Successful Matches", icon: Heart, color: "from-green-500 to-emerald-500" },
              { value: animatedStats.universities, label: "Universities", icon: GraduationCap, color: "from-purple-500 to-pink-500" },
              { value: animatedStats.cities, label: "Cities", icon: MapPin, color: "from-orange-500 to-red-500" },
              { value: `${animatedStats.satisfaction}%`, label: "Satisfaction Rate", icon: Star, color: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8 + index * 0.1 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </motion.div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Impact Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Areas of Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>
                
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full text-sm font-bold mb-4`}>
                  {category.stats}
                </div>
                
                <div className="space-y-2">
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Student Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-teal-600">{testimonial.university}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-blue-600" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-6 h-6 ${milestone.achieved ? 'bg-gradient-to-br from-teal-500 to-blue-600' : 'bg-gray-300'} rounded-full border-4 border-white shadow-lg z-10`}
                  />
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 inline-block text-left max-w-md`}
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-teal-600 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                      {milestone.achieved && (
                        <div className="mt-3 inline-flex items-center text-green-600 text-sm font-medium">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Achieved
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Be Part of Our Impact Story</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect living situation through UniMate. Your story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user-details')}
                className="px-8 py-4 bg-white text-teal-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white font-bold rounded-xl transition-all"
              >
                Partner With Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
