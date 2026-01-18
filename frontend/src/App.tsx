import { Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ContactUs from './pages/ContactUs';
import UserDetails from './pages/UserDetails';
import MatchResults from './pages/MatchResults';
import AboutUs from './pages/AboutUs';
import Impact from './pages/Impact';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import HelpSupportCenter from './components/HelpSupportCenter';
import Features from './pages/Features';
import RoommatePreferenceForm from './components/RoommatePreferenceForm';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/match-results" element={<MatchResults />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/help-center" element={<HelpSupportCenter />} />
        <Route path="/roommate-preferences" element={<RoommatePreferenceForm />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
