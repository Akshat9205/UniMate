import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import heroImage from '../assets/images.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="absolute inset-0">
        <img src={heroImage} alt="UniMate" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="text-teal-600 font-bold text-xl">UniMate</div>
                </div>

                <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 text-center lg:text-left">
                  Login
                </h1>
                <p className="mt-2 text-gray-500 text-center lg:text-left">Please enter your details</p>

                <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-teal-700 font-medium hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {error && <div className="text-sm text-red-600">{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-800 hover:bg-slate-900 disabled:opacity-60 disabled:hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {loading ? 'Please wait...' : 'Sign in'}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="h-5 w-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-bold">
                      G
                    </span>
                    Continue with Google
                  </button>

                  <div className="text-sm text-gray-600 text-center lg:text-left">
                    Are you new?{' '}
                    <Link to="/signup" className="text-teal-700 font-semibold hover:underline">
                      Create an Account
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-full min-h-[520px]">
                <img src={heroImage} alt="UniMate" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 via-transparent to-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
