import { Menu, User, X, Home, Info, Zap, Heart, Settings, LifeBuoy, MessageSquare, LogOut, ChevronDown, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const navLinks = [
    { name: 'Home', icon: Home },
    { name: 'About Us', icon: Info },
    { name: 'Features', icon: Zap },
    { name: 'Impact', icon: Heart }
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate receiving notifications
  useEffect(() => {
    const simulateNotifications = () => {
      // Simulate roommate match or message notification
      const randomNotification = Math.random() > 0.7;
      if (randomNotification) {
        setNotificationCount(prev => prev + 1);
      }
    };

    // Simulate notification every 10 seconds for demo
    const interval = setInterval(simulateNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const scrollToSection = (section: string) => {
    const id = section.toLowerCase().replace(/ /g, '-');
    
    // Handle navigation to different pages
    if (section === 'About Us') {
      navigate('/about-us');
      setMobileMenuOpen(false);
      return;
    }
    
    if (section === 'Impact') {
      navigate('/impact');
      setMobileMenuOpen(false);
      return;
    }
    
    if (section === 'Features') {
      navigate('/features');
      setMobileMenuOpen(false);
      return;
    }
    
    if (location.pathname !== '/') {
      navigate(`/?section=${encodeURIComponent(id)}`);
      setMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-teal-600">UniMate</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.name)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={clearNotifications}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="text-gray-600" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center space-x-2 h-10 px-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Profile"
                >
                  <User className="text-teal-600" size={20} />
                  <ChevronDown className="text-gray-500" size={16} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setProfileOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      <User size={16} />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setProfileOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-gray-200"></div>
                    <button
                      onClick={() => {
                        navigate('/contact');
                        setProfileOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MessageSquare size={16} />
                      <span>Feedback</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/help');
                        setProfileOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LifeBuoy size={16} />
                      <span>Help/Support</span>
                    </button>
                    <div className="border-t border-gray-200"></div>
                    <button
                      onClick={async () => {
                        await signOut(auth);
                        setProfileOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/user-details');
                }}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.name)}
                  className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-teal-600 py-2 font-medium transition-colors duration-200"
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:bg-gray-50 py-3 px-2 font-medium transition-colors duration-200"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/help');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:bg-gray-50 py-2 px-2 transition-colors duration-200"
                >
                  Help/Support
                </button>
                <button
                  onClick={async () => {
                    await signOut(auth);
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="block w-full text-left text-gray-700 hover:bg-gray-50 py-2 px-2 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/user-details');
                }}
                className="block w-full bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
