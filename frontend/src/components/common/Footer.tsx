import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-black text-white border-t border-neutral-800 pt-16 pb-12 overflow-hidden">
      {/* Subtle top crimson glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/ecell-logo.png"
                alt="E-CELL DMCE"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl font-black tracking-widest text-white">
                <span className="text-red-500">E</span>-CELL DMCE
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Entrepreneurship Cell of Datta Meghe College of Engineering. Fostering a vibrant ecosystem of student innovators, tech pioneers, and future business leaders.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                title="Twitter / X"
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Website */}
              <a
                href="https://dmce.ac.in"
                target="_blank"
                rel="noreferrer"
                title="DMCE Website"
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Events & Competitions</Link>
              </li>
              <li>
                <Link to="/tickets" className="hover:text-white transition-colors">My Entry Tickets</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Student & Admin Portal</Link>
              </li>
              <li>
                <a href="#speakers" className="hover:text-white transition-colors">Keynote Speakers</a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-white transition-colors">Partners & Sponsors</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-4">
              Flagship Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <span className="text-white font-medium">E-Summit Annual:</span> Startup Pitch Tank
              </li>
              <li>
                <span className="text-white font-medium">Hack-a-Preneur:</span> 24h Build Sprint
              </li>
              <li>
                <span className="text-white font-medium">Ideathon:</span> Innovation Prototype Fair
              </li>
              <li>
                <span className="text-white font-medium">Speaker Series:</span> C-Suite & Founders
              </li>
              <li>
                <span className="text-white font-medium">Incubation Support:</span> Mentorship & Seed
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-4">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Sector 3, Airoli, Navi Mumbai, Maharashtra 400708</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:ecell@dmce.ac.in" className="hover:text-white transition-colors">
                  ecell@dmce.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-yellow-400 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} E-CELL DMCE. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with pure passion by <span className="text-neutral-300 font-semibold">E-Cell Tech Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
