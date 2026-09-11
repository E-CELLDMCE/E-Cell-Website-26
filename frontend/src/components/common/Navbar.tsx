import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, ShieldCheck, Ticket, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

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
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EVENTS', href: '/events' },
    { name: 'SPEAKERS', href: '#speakers' },
    { name: 'SPONSORS', href: '#sponsors' },
    { name: 'BACKBONE', href: '#backbone' },
    { name: 'ADVISOR', href: '#advisor' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center cursor-pointer group">
          <img
            src="/img_vid/ecell-logo.png"
            alt="E-CELL DMCE"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-heading">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="nav-underline text-xs font-bold tracking-widest text-neutral-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer py-1 uppercase"
            >
              {link.name}
            </button>
          ))}

          {/* Direct link to My Tickets if authenticated */}
          {user && (
            <Link
              to="/tickets"
              className="text-xs font-bold tracking-widest flex items-center gap-1.5 text-neutral-300 hover:text-yellow-400 transition-colors uppercase"
            >
              <Ticket className="w-3.5 h-3.5 text-yellow-400" />
              MY TICKETS
            </Link>
          )}

          {/* Direct link to Admin Panel if admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-xs font-bold tracking-widest flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/50 bg-red-950/40 text-red-300 hover:bg-red-900/50 hover:border-red-400 transition-all shadow-[0_0_12px_rgba(220,38,38,0.3)] uppercase"
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
                <span className="text-xs font-bold text-white leading-tight font-sans">
                  {user.name}
                </span>
                <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-sans">
                  {isAdmin ? (
                    <span className="text-red-400 font-bold bg-red-950/60 border border-red-500/30 px-1.5 py-0.5 rounded">
                      ADMIN
                    </span>
                  ) : (
                    `${user.role} ${user.stdid ? `• ${user.stdid}` : ''}`
                  )}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white border border-red-500/50 hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all transform hover:scale-105 active:scale-95 font-heading"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          {user && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="text-neutral-300 hover:text-white p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-red-400" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {user && (
            <div className="pb-3 border-b border-neutral-800">
              <p className="text-sm font-bold text-white">{user.name}</p>
              <p className="text-xs text-neutral-400">{user.email} ({user.role})</p>
            </div>
          )}

          <div className="flex flex-col space-y-3 font-heading">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-sm font-bold tracking-widest text-neutral-300 hover:text-yellow-400 transition-colors uppercase cursor-pointer"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('/events')}
              className="text-left py-2 text-sm font-bold tracking-widest text-neutral-300 hover:text-yellow-400 flex items-center gap-2 uppercase cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-yellow-400" />
              EXPLORE EVENTS
            </button>

            {user && (
              <button
                onClick={() => handleNavClick('/tickets')}
                className="text-left py-2 text-sm font-bold tracking-widest text-neutral-300 hover:text-yellow-400 flex items-center gap-2 uppercase cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-yellow-400" />
                MY TICKETS
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('/admin')}
                className="text-left py-2 text-sm font-bold tracking-widest text-red-400 hover:text-red-300 flex items-center gap-2 uppercase cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-red-500" />
                ADMIN PANEL
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-red-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 uppercase font-heading cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 rounded-full text-center bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm tracking-widest uppercase shadow-lg shadow-red-900/40 font-heading"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
