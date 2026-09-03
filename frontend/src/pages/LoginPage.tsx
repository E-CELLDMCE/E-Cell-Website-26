import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authApi } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { ShieldCheck, GraduationCap, ArrowRight, Sparkles, Lock, Mail, User, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);

  // Admin login credentials
  const [adminEmail, setAdminEmail] = useState('admin@ecell.com');
  const [adminPassword, setAdminPassword] = useState('adminecell26');

  // Custom student dev login
  const [studentEmail, setStudentEmail] = useState('student@dmce.ac.in');
  const [studentName, setStudentName] = useState('Demo Student');

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostLogin = (user: any, token: string) => {
    login(token, user);

    // If student has not set their stdid, redirect to Onboarding
    if (user.role === 'student' && (!user.stdid || user.stdid.trim() === '')) {
      toast.info('Welcome! Please complete your student profile to continue.');
      navigate('/onboarding');
      return;
    }

    toast.success(`Welcome back, ${user.name}!`);
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      // Return to attempted page or /events
      const from = (location.state as any)?.from?.pathname || '/events';
      navigate(from);
    }
  };

  // Google OAuth / Student Login
  const handleGoogleLogin = async (customEmail?: string, customName?: string) => {
    setIsLoading(true);
    try {
      const email = customEmail || studentEmail || 'student@dmce.ac.in';
      const name = customName || studentName || 'DMCE Student';
      const res = await authApi.googleCallback({
        email,
        name,
        oauth_provider: 'google',
        oauth_id: 'google_' + Math.random().toString(36).substring(2, 10),
      });
      handlePostLogin(res.user, res.access_token);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to sign in with Google'));
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-seeded Demo Students for easy testing
  const handleQuickStudentLogin = async (seedName: string, seedEmail: string, seedStdid: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.devLogin({
        email: seedEmail,
        name: seedName,
        role: 'student',
        stdid: seedStdid,
      });
      handlePostLogin(res.user, res.access_token);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Dev login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  // Admin Password Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      toast.error('Please enter both admin email and password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.adminLogin({
        email: adminEmail.trim(),
        password: adminPassword,
      });
      handlePostLogin(res.user, res.access_token);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Invalid email or password'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 85% 15%, #e00018 0%, #9b0010 20%, transparent 48%),
          radial-gradient(circle at 10% 80%, #d00012 0%, #780008 25%, transparent 52%),
          linear-gradient(135deg, #180000 0%, #050000 48%, #170000 100%)
        `,
      }}
    >
      {/* Background glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Auth Card */}
      <div className="w-full max-w-lg bg-black/85 backdrop-blur-2xl border border-yellow-500/70 rounded-[2.5rem] px-8 sm:px-12 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative z-10">
        
        {/* Header Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/ecell-logo.png"
            alt="E-Cell DMCE Logo"
            className="h-16 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            E-Cell <span className="text-yellow-400">Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Access student registration, tickets, and administrative controls
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-900/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-900/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Login
          </button>
        </div>

        {/* TAB 1: STUDENT LOGIN */}
        {activeTab === 'student' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <p className="text-sm text-neutral-300">
                Sign in with your college credentials to participate in events, form teams, and access digital tickets.
              </p>
            </div>

            {/* Google OAuth Simulation Button */}
            <button
              onClick={() => handleGoogleLogin()}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-full bg-white text-neutral-900 font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-neutral-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              {isLoading ? 'Connecting...' : 'Sign in with Google'}
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink mx-4 text-xs uppercase font-bold text-neutral-500 tracking-wider">
                Or Quick Test Accounts
              </span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            {/* Pre-seeded demo students for instant verification */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider text-center">
                One-Click Seeded Students (In Database):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickStudentLogin('Rahul Sharma', 'rahul.sharma@college.edu', 'STD2026001')}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/60 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-white group-hover:text-yellow-400">Rahul</p>
                  <p className="text-[10px] text-neutral-400">STD2026001</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStudentLogin('Ananya Patel', 'ananya.patel@college.edu', 'STD2026002')}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/60 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-white group-hover:text-yellow-400">Ananya</p>
                  <p className="text-[10px] text-neutral-400">STD2026002</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStudentLogin('Vikram Singh', 'vikram.singh@college.edu', 'STD2026003')}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/60 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-white group-hover:text-yellow-400">Vikram</p>
                  <p className="text-[10px] text-neutral-400">STD2026003</p>
                </button>
              </div>
            </div>

            {/* First-time Student test */}
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 text-center">
              <p className="text-xs text-neutral-300">
                Want to test the <span className="text-yellow-400 font-bold">First-Time Onboarding</span> flow?
              </p>
              <button
                type="button"
                onClick={() => handleGoogleLogin(`newstudent_${Date.now()}@dmce.ac.in`, 'New Innovator')}
                className="mt-2 text-xs font-bold text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                Sign in as New Student without Student ID &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ADMIN LOGIN */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@ecell.com"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-yellow-400" />
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black text-sm uppercase tracking-wider hover:from-yellow-400 hover:to-amber-500 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? 'Verifying Admin...' : 'Authenticate Superadmin'}
            </button>

            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-[11px] text-neutral-400">
                Default Superadmin: <code className="text-yellow-400">admin@ecell.com</code> • Password: <code className="text-yellow-400">adminecell26</code>
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default LoginPage;