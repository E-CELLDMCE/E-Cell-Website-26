import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, User, ShieldCheck, Ticket, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const isHomePage = location.pathname === '/';

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (!isHomePage) {
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

  const navLinks = [
    { name: 'HOME', href: '#home', isAnchor: true },
    { name: 'ABOUT US', href: '#about', isAnchor: true },
    { name: 'EVENTS', href: '/events', isAnchor: false },
    { name: 'SPEAKERS', href: '#speakers', isAnchor: true },
    { name: 'SPONSORS', href: '#sponsors', isAnchor: true },
    { name: 'BACKBONE', href: '#backbone', isAnchor: true },
    { name: 'ADVISOR', href: '#advisor', isAnchor: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
          <img
            src="/images/ecell-logo.png"
            alt="E-CELL DMCE"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Graceful fallback if image path ever differs
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-white flex items-center gap-1.5">
              <span className="text-red-500">E</span>-CELL
              <span className="text-[10px] uppercase font-bold tracking-widest bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded ml-1">
                DMCE
              </span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400">
              Innovate • Ideate • Inspire
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={`text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                location.pathname === link.href
                  ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                  : 'text-neutral-300 hover:text-yellow-400 hover:scale-105'
              }`}
            >
              {link.name}
            </button>
          ))}

          {/* Direct link to My Tickets if authenticated */}
          {user && (
            <Link
              to="/tickets"
              className={`text-xs font-bold tracking-wider flex items-center gap-1.5 transition-colors ${
                location.pathname === '/tickets' ? 'text-yellow-400' : 'text-neutral-300 hover:text-yellow-400'
              }`}
            >
              <Ticket className="w-3.5 h-3.5 text-yellow-400" />
              MY TICKETS
            </Link>
          )}

          {/* Direct link to Admin Panel if admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-xs font-bold tracking-wider flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'bg-red-950/80 border-red-500 text-red-200 shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                  : 'border-red-900/60 bg-red-950/30 text-red-300 hover:bg-red-900/40 hover:border-red-500'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              ADMIN PANEL
            </Link>
          )}
        </nav>

        {/* Right side: Auth Action */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-neutral-400 tracking-wider uppercase">
                  {user.role} {user.stdid ? `• ${user.stdid}` : ''}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50 hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all transform hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          {user && (
            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="text-neutral-300 hover:text-white p-2 rounded-lg bg-neutral-900 border border-neutral-800"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {user && (
            <div className="pb-3 border-b border-neutral-800">
              <p className="text-sm font-bold text-white">{user.name}</p>
              <p className="text-xs text-neutral-400">{user.email} ({user.role})</p>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-1.5 text-sm font-bold tracking-wider text-neutral-300 hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('/events')}
              className="text-left py-1.5 text-sm font-bold tracking-wider text-neutral-300 hover:text-yellow-400 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-yellow-400" />
              EXPLORE EVENTS
            </button>

            {user && (
              <button
                onClick={() => handleNavClick('/tickets')}
                className="text-left py-1.5 text-sm font-bold tracking-wider text-neutral-300 hover:text-yellow-400 flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-yellow-400" />
                MY TICKETS
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('/admin')}
                className="text-left py-1.5 text-sm font-bold tracking-wider text-red-400 hover:text-red-300 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-red-500" />
                ADMIN PANEL
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-red-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2.5 rounded-xl text-center bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-900/30"
              >
                LOGIN / REGISTER
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
