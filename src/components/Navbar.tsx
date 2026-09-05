import React, { useState } from 'react';

interface NavLink {
  name: string;
  href: string;
  active: boolean;
}

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

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
    <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 pt-3">
      {/* 
        - rounded-full creates the capsule/pill shape with circular ends
        - w-[96%] max-w-[1400px] makes it long and wide across large monitors
        - py-2.5 on mobile, py-3.5 on desktop
      */}
      <div className="w-[96%] max-w-[1400px] mx-auto bg-black/95 backdrop-blur-md rounded-full border border-neutral-800 px-5 sm:px-10 py-2.5 lg:py-3.5 flex items-center justify-between transition-all shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        
        {/* ================= LEFT: LOGO ================= */}
        <a href="#home" className="flex items-center space-x-2.5 lg:space-x-3 flex-shrink-0">
          <div className="flex flex-col justify-between w-5 h-4 lg:w-6 lg:h-5 py-0.5">
            <span className="block h-[2.5px] lg:h-[3px] w-full bg-white rounded-full"></span>
            <span className="block h-[2.5px] lg:h-[3px] w-full bg-yellow-400 rounded-full"></span>
            <span className="block h-[2.5px] lg:h-[3px] w-full bg-white rounded-full"></span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg lg:text-2xl font-black tracking-wider text-white">
              E-CELL
            </span>
            <span className="text-[9px] lg:text-[11px] font-bold tracking-[0.25em] text-yellow-400 uppercase mt-0.5">
              DMCE
            </span>
          </div>
        </a>
        
        {/* ================= CENTER: DESKTOP INLINE NAV ================= */}
        <nav className="hidden lg:flex items-center lg:space-x-12 xl:space-x-16">
          {navLinks.map((link: NavLink) => (
            <div key={link.name} className="relative flex flex-col items-center">
              <a
                href={link.href}
                className={`font-extrabold uppercase transition-colors duration-200 py-1 text-xs tracking-wider lg:text-[15px] xl:text-base lg:tracking-[0.18em] ${
                  link.active
                    ? 'text-yellow-400'
                    : 'text-neutral-200 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </a>

              {/* Yellow active underline */}
              {link.active && (
                <span className="absolute -bottom-1 w-full h-[3px] bg-yellow-400 rounded-full" />
              )}
            </div>
          ))}
        </nav>

        {/* ================= RIGHT: DESKTOP PROFILE ICON ================= */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <a
            href="#"
            title="Student Dashboard"
            aria-label="Student Dashboard"
            className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
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
        <div className="lg:hidden flex items-center space-x-2.5">
          <a
            href="#"
            aria-label="Student Dashboard"
            className="w-8 h-8 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="8" r="3.5" />
              <path strokeLinecap="round" d="M5.5 19.5c1.2-2.5 3.5-3.5 6.5-3.5s5.3 1 6.5 3.5" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white hover:text-yellow-400 focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileOpen && (
        <div className="lg:hidden mt-2 w-[96%] mx-auto bg-black/95 border border-neutral-800 rounded-3xl p-4 space-y-2">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`block py-2 px-3 text-sm font-bold tracking-wider rounded-xl transition-colors ${
                link.active
                  ? 'text-yellow-400 bg-neutral-900'
                  : 'text-neutral-200 hover:text-yellow-400 hover:bg-neutral-900'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;