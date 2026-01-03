import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">RoomMatch</h3>
            <p className="text-gray-400 leading-relaxed">
              Smart hostel roommate matching for better student living experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 RoomMatch. Built for college project evaluation and demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
