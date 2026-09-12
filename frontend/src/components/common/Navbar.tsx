import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldCheck } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const isHomePage = location.pathname === '/';

  // Hide navbar on scroll down, show on scroll up — original behaviour
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'HOME',       href: '#home' },
    { name: 'ABOUT US',  href: '#about' },
    { name: 'EVENTS',    href: '/events' },
    { name: 'GALLERY',   href: '#gallery' },
    { name: 'TEAM',      href: '/team' },
    { name: 'INITIATIVE',href: '#initiative' },
    { name: 'BLOGS',     href: '#blogs' },
  ];

  // Determine if a nav link is active based on current route / hash
  const isActive = (href: string): boolean => {
    if (href.startsWith('/')) {
      // Exact route match (e.g. /events, /team)
      return location.pathname === href;
    }
    // Hash-based: only considered "active" when on the home page
    // (we don't track scroll position — just highlight HOME when on /)
    if (href === '#home') return isHomePage;
    return false;
  };

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith('#')) {
      if (!isHomePage) {
        // Navigate to home, then the browser will load the hash
        navigate('/' + href);
      } else {
        const elem = document.querySelector(href);
        if (elem && window.__lenis) {
          window.__lenis.scrollTo(elem as HTMLElement, { offset: -70 });
        } else if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleLogout = () => {
    setIsMobileOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-3 sm:px-6 pt-3 font-sans selection:bg-yellow-400 selection:text-black transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-[96%] max-w-[1400px] mx-auto bg-black/90 backdrop-blur-sm rounded-full border border-neutral-800 px-5 md:px-8 py-2.5 md:py-3 flex items-center justify-between transition-all shadow-[0_8px_30px_rgba(0,0,0,0.5)]">

        {/* ================= LEFT: LOGO ================= */}
        <Link
          to="/"
          className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 relative z-10"
        >
          <img
            src="/img_vid/ecell-logo.png"
            alt="E-CELL DMCE"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </Link>

        {/* ================= CENTER: DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-12 xl:gap-14">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <div
                key={link.name}
                className="relative flex flex-col items-center group"
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-bold uppercase transition-colors duration-200 py-1 text-[16px] lg:text-[17px] xl:text-[18px] tracking-wide cursor-pointer bg-transparent border-0 outline-none ${
                    active
                      ? 'text-yellow-400'
                      : 'text-neutral-50 hover:text-yellow-400'
                  }`}
                >
                  {link.name}
                </button>

                {/* Yellow active underline */}
                {active ? (
                  <span className="absolute -bottom-1.5 w-full h-0.5 bg-yellow-400 rounded-full" />
                ) : (
                  <span className="absolute -bottom-1.5 w-0 h-0.5 bg-yellow-400 rounded-full transition-all duration-200 group-hover:w-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* ================= RIGHT: DESKTOP AUTH / PROFILE ================= */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0 relative z-10">
          {user ? (
            <>
              {/* User name + role */}
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-white leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-neutral-400 tracking-wide uppercase">
                  {isAdmin ? (
                    <span className="text-red-400 font-bold bg-red-950/60 border border-red-500/30 px-1.5 py-0.5 rounded">
                      ADMIN
                    </span>
                  ) : (
                    `${user.role}${user.stdid ? ` • ${user.stdid}` : ''}`
                  )}
                </span>
              </div>

              {/* Admin panel link */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-xs font-bold tracking-widest px-3 py-1 rounded-full border border-red-500/50 bg-red-950/40 text-red-300 hover:bg-red-900/50 hover:border-red-400 transition-all uppercase"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  ADMIN
                </Link>
              )}

              {/* Logout — styled as the original yellow profile circle, but with logout icon */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Not logged in — original yellow circular profile icon → goes to /login */
            <Link
              to="/login"
              title="Login / Student Dashboard"
              aria-label="Login"
              className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path
                  strokeLinecap="round"
                  d="M5.5 19.5c1.2-2.5 3.5-3.5 6.5-3.5s5.3 1 6.5 3.5"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* ================= MOBILE CONTROLS ================= */}
        <div className="md:hidden flex items-center space-x-3 relative z-10">

          {/* Profile / logout icon */}
          {user ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-9 h-9 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-400 active:bg-yellow-400/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="w-9 h-9 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-400 active:bg-yellow-400/10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path
                  strokeLinecap="round"
                  d="M5.5 19.5c1.2-2.5 3.5-3.5 6.5-3.5s5.3 1 6.5 3.5"
                />
              </svg>
            </Link>
          )}

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white hover:text-yellow-400 focus:outline-none p-1.5 bg-neutral-900 rounded-full border border-neutral-800 cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ================= MOBILE DROPDOWN ================= */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-3 sm:px-6 mt-3">
          <nav className="w-[96%] mx-auto bg-black/95 backdrop-blur-sm border border-neutral-800 rounded-3xl p-4 space-y-1.5 shadow-2xl">

            {/* User info banner */}
            {user && (
              <div className="pb-3 mb-1 border-b border-neutral-800">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-neutral-400">{user.email} ({user.role})</p>
              </div>
            )}

            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left py-3 px-4 text-sm font-bold tracking-wider rounded-xl transition-colors cursor-pointer border-0 outline-none ${
                    active
                      ? 'text-yellow-400 bg-neutral-900'
                      : 'text-neutral-100 hover:text-yellow-400 hover:bg-neutral-900/70'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            {/* Tickets link for logged-in users */}
            {user && (
              <button
                onClick={() => handleNavClick('/tickets')}
                className="block w-full text-left py-3 px-4 text-sm font-bold tracking-wider rounded-xl transition-colors text-neutral-100 hover:text-yellow-400 hover:bg-neutral-900/70 cursor-pointer border-0 outline-none"
              >
                MY TICKETS
              </button>
            )}

            {/* Admin panel for admins */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('/admin')}
                className="block w-full text-left py-3 px-4 text-sm font-bold tracking-wider rounded-xl transition-colors text-red-400 hover:text-red-300 hover:bg-neutral-900/70 cursor-pointer border-0 outline-none"
              >
                ADMIN PANEL
              </button>
            )}

            {/* Auth action at bottom */}
            <div className="pt-3 mt-1 border-t border-neutral-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-red-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 uppercase cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full py-3 rounded-full text-center bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm tracking-widest uppercase shadow-lg shadow-red-900/40"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
