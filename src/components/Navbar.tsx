import React, { useEffect, useState } from 'react';

import ecellLogo from '../assets/ECELL LOGO.png';

interface NavLink {
  name: string;
  href: string;
  active: boolean;
}

const Navbar: React.FC = () => {
  // Mobile menu state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Navbar visibility state
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Hide navbar when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation links
  const navLinks: NavLink[] = [
    { name: 'HOME', href: '#home', active: true },
    { name: 'ABOUT US', href: '#about', active: false },
    { name: 'EVENTS', href: '#events', active: false },
    { name: 'GALLERY', href: '#gallery', active: false },
    { name: 'TEAM', href: '#team', active: false },
    { name: 'INITIATIVE', href: '#initiative', active: false },
    { name: 'BLOGS', href: '#blogs', active: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-3 sm:px-6 pt-3 font-sans selection:bg-yellow-400 selection:text-black transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-[99.4%] max-w-none mx-auto bg-black/95 backdrop-blur-sm rounded-full border border-neutral-800 px-12 py-3 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)]">

        {/* ================= LEFT: LOGO ================= */}
        <a
          href="#home"
          className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 relative z-10"
        >
          <div className="flex flex-col leading-none">
            <img
              src={ecellLogo}
              alt="E-CELL DMCE"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </div>
        </a>

        {/* ================= CENTER: DESKTOP INLINE NAV ================= */}
        <nav className="hidden md:flex items-center gap-16">
          {navLinks.map((link: NavLink) => (
            <div
              key={link.name}
              className="relative flex flex-col items-center group"
            >
              <a
                href={link.href}
                className={`font-black uppercase transition-colors duration-200 py-1 text-[18px] tracking-[0.16em] ${
                  link.active
                    ? 'text-yellow-400'
                    : 'text-neutral-50 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </a>

              {/* Yellow active underline */}
              {link.active ? (
                <span className="absolute -bottom-1.5 w-full h-0.5 bg-yellow-400 rounded-full" />
              ) : (
                /* Hover underline animation */
                <span className="absolute -bottom-1.5 w-0 h-0.5 bg-yellow-400 rounded-full transition-all duration-200 group-hover:w-full" />
              )}
            </div>
          ))}
        </nav>

        {/* ================= RIGHT: DESKTOP PROFILE ICON ================= */}
        <div className="hidden md:flex items-center flex-shrink-0 relative z-10">
          <a
            href="#dashboard"
            title="Student Dashboard"
            aria-label="Student Dashboard"
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
          </a>
        </div>

        {/* ================= MOBILE CONTROLS ================= */}
        <div className="md:hidden flex items-center space-x-3 relative z-10">

          {/* Profile Icon */}
          <a
  href="#dashboard"
  title="Student Dashboard"
  aria-label="Student Dashboard"
  className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-all duration-300"
>
           <svg
  className="w-6 h-6"
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
          </a>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white hover:text-yellow-400 focus:outline-none p-1.5 bg-neutral-900 rounded-full border border-neutral-800"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileOpen ? (
                /* X Icon */
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                /* Hamburger Icon */
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

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-3 sm:px-6 mt-3">
          <nav className="w-[96%] mx-auto bg-black/95 backdrop-blur-sm border border-neutral-800 rounded-3xl p-4 space-y-1.5 shadow-2xl">
            {navLinks.map((link: NavLink) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`block py-3 px-4 text-sm font-bold tracking-wider rounded-xl transition-colors ${
                  link.active
                    ? 'text-yellow-400 bg-neutral-900'
                    : 'text-neutral-100 hover:text-yellow-400 hover:bg-neutral-900/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;