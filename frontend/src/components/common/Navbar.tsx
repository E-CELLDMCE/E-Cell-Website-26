import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, ShieldCheck, Ticket } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Event', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Initiatives', href: '/initiatives' },
    { name: 'Blogs', href: '/blogs' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center cursor-pointer group flex-shrink-0">
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
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-heading">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname === link.href || location.pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-xs font-bold tracking-widest uppercase transition-colors duration-200 py-1.5 cursor-pointer group ${
                  isActive ? 'text-yellow-400' : 'text-neutral-300 hover:text-yellow-400'
                }`}
              >
                <span>{link.name}</span>
                {/* Subtle yellow underline on active or hover */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-yellow-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}

          {/* Admin Panel Direct Link for Admins */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-xs font-bold tracking-widest flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/50 bg-red-950/40 text-red-300 hover:bg-red-900/50 hover:border-red-400 transition-all shadow-[0_0_12px_rgba(220,38,38,0.3)] uppercase"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              ADMIN
            </Link>
          )}
        </nav>

        {/* Right side: Auth Action */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/tickets"
                className="text-xs font-bold tracking-widest flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors uppercase font-heading"
              >
                <Ticket className="w-3.5 h-3.5 text-yellow-400" />
                MY TICKETS
              </Link>

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
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer active:scale-95"
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
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="text-neutral-300 hover:text-white p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 cursor-pointer active:scale-95"
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

          <div className="flex flex-col space-y-2.5 font-heading">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname === link.href || location.pathname.startsWith(link.href + '/');

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 text-sm font-bold tracking-widest uppercase transition-colors ${
                    isActive ? 'text-yellow-400' : 'text-neutral-300 hover:text-yellow-400'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                  )}
                </Link>
              );
            })}

            {user && (
              <Link
                to="/tickets"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-bold tracking-widest text-neutral-300 hover:text-yellow-400 flex items-center gap-2 uppercase cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-yellow-400" />
                MY TICKETS
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-bold tracking-widest text-red-400 hover:text-red-300 flex items-center gap-2 uppercase cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-red-500" />
                ADMIN PANEL
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-red-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 uppercase font-heading cursor-pointer active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 rounded-full text-center bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm tracking-widest uppercase shadow-lg shadow-red-900/40 font-heading active:scale-95"
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
