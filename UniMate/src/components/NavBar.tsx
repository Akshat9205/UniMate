import { Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const navLinks = ['Home', 'About Us', 'Features', 'Impact'];
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const scrollToSection = (section: string) => {
    const id = section.toLowerCase().replace(/ /g, '-');
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
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-teal-600">UniMate</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
              >
                {link}
              </button>
            ))}

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Profile"
                >
                  <User className="text-teal-600" size={20} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-4 py-3 text-sm text-gray-700 truncate">
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      onClick={async () => {
                        await signOut(auth);
                        setProfileOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </button>
              </>
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
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="block w-full text-left text-gray-700 hover:text-teal-600 py-2 font-medium transition-colors duration-200"
              >
                {link}
              </button>
            ))}

            {currentUser ? (
              <>
                <div className="px-2 py-2 text-sm text-gray-700 truncate">
                  {currentUser.displayName || currentUser.email}
                </div>
                <button
                  onClick={async () => {
                    await signOut(auth);
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="block w-full text-left text-gray-700 hover:text-gray-900 py-2 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="block w-full text-left text-teal-600 hover:text-teal-700 py-2 font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="block w-full bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
