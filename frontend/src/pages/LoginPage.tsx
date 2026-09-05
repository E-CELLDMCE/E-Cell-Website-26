import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authApi } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { neonAuthClient } from '../neonAuth';
import { ShieldCheck, GraduationCap, Mail, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [isAwaitingGoogleSession, setIsAwaitingGoogleSession] = useState(false);

  // Admin login credentials
  const [adminEmail, setAdminEmail] = useState('admin@ecell.com');
  const [adminPassword, setAdminPassword] = useState('adminecell26');

  const { login, isAdmin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

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

  // Watch for Neon Auth session after Google OAuth redirect completes,
  // then forward it to the existing backend google-callback endpoint.
  useEffect(() => {
    // Detect OAuth return: either we previously started the flow (state flag),
    // or Neon just redirected us back here with its callback params in the URL.
    // Neon uses `neon_auth_session_verifier` (popup flow) or standard OAuth
    // `code`/`state`/`error` params (redirect flow).
    const url = new URL(window.location.href);
    const cameFromOAuth =
      isAwaitingGoogleSession ||
      url.searchParams.has('neon_auth_session_verifier') ||
      url.searchParams.has('code') ||
      url.searchParams.has('state') ||
      url.searchParams.has('error');

    if (!cameFromOAuth) return;

    let cancelled = false;
    const finalizeLogin = async (sessionUser: any) => {
      if (cancelled) return;
      setIsAwaitingGoogleSession(false);
      setIsLoading(true);
      const res = await authApi.googleCallback({
        email: sessionUser.email,
        name: sessionUser.name || sessionUser.email.split('@')[0],
        oauth_id: sessionUser.id || undefined,
        oauth_provider: 'google',
      });
      handlePostLogin(res.user, res.access_token);
    };

    // Use the plain default getSession() — no forceFetch / refresh-forcing
    // options — so it issues a GET-only read of the cached session. Only
    // forced-refresh options cause Better Auth to trigger the deferred
    // POST refresh path, which Neon's Auth server rejects with 405
    // METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED.
    const tryGetSession = async (attempt = 0): Promise<any | null> => {
      try {
        const { data } = await neonAuthClient.getSession();
        if (data?.user?.email) return data.user;
      } catch {
        // fall through to retry
      }
      if (attempt >= 8) return null;
      await new Promise((r) => setTimeout(r, 500 * Math.min(attempt + 1, 4)));
      return tryGetSession(attempt + 1);
    };

    const cleanupUrl = () => {
      if (
        url.searchParams.has('neon_auth_session_verifier') ||
        url.searchParams.has('code') ||
        url.searchParams.has('state') ||
        url.searchParams.has('error')
      ) {
        window.history.replaceState({}, '', window.location.origin + window.location.pathname);
      }
    };

    const checkSession = async () => {
      const sessionUser = await tryGetSession();
      if (cancelled) return;
      if (!sessionUser) {
        toast.error('Google sign-in completed but no session was established. Please try again.');
        setIsAwaitingGoogleSession(false);
        setIsLoading(false);
        cleanupUrl();
        return;
      }
      cleanupUrl();
      try {
        await finalizeLogin(sessionUser);
      } catch (err: any) {
        toast.error(getErrorMessage(err, 'Failed to complete Google sign-in'));
        setIsAwaitingGoogleSession(false);
        setIsLoading(false);
      }
    };

    void checkSession();
  }, [isAwaitingGoogleSession, toast]);

  // Real Neon-powered Google OAuth trigger (opens account chooser).
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await neonAuthClient.signIn.social({
        provider: 'google',
        callbackURL: '/login',
      });
      // Neon will redirect back; effect above will pick up the session.
      setIsAwaitingGoogleSession(true);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(getErrorMessage(err, 'Failed to start Google sign-in'));
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

            {/* Real Google OAuth via Neon Auth */}
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
              {isLoading ? 'Connecting to Google...' : 'Sign in with Google'}
            </button>
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