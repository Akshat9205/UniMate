import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Benefits from '../components/Benefits';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (!section) return;

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    params.delete('section');
    const nextSearch = params.toString();
    navigate({ pathname: '/', search: nextSearch ? `?${nextSearch}` : '' }, { replace: true });
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <FinalCTA />
      <Footer />
    </div>
  );
}
