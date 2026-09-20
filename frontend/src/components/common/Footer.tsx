import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 65% 80% at 100% 100%,
              rgba(160, 0, 15, 0.85) 0%,
              rgba(100, 0, 10, 0.55) 30%,
              rgba(40, 0, 5, 0.25) 55%,
              transparent 75%
            ),
            radial-gradient(
              ellipse 55% 55% at 0% 80%,
              rgba(70, 0, 10, 0.35),
              transparent 70%
            )
          `,
        }}
      />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.65fr_1.3fr_1fr] gap-3">

            {/* Brand + Location */}
            <div>
              <div className="mb-5">
                <Link to="/" className="inline-block cursor-pointer">
                  <img
                    src="/team/ecell-logo.png"
                    alt="E-Cell DMCE"
                    className="w-32 sm:w-40 h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>

              <p className="text-base text-neutral-400 leading-relaxed max-w-[240px]">
                📍 Location: Datta Meghe
                <br />
                College of Engineering, Navi
                <br />
                Mumbai
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-bold mb-4">
                Quick Links
              </h3>

              <div className="space-y-1.5 text-sm sm:text-base text-neutral-400">
                <Link to="/" className="block hover:text-yellow-400 transition-colors cursor-pointer">Home</Link>
                <Link to="/about-us" className="block hover:text-yellow-400 transition-colors cursor-pointer">About Us</Link>
                <Link to="/events" className="block hover:text-yellow-400 transition-colors cursor-pointer">Events</Link>
                <Link to="/gallery" className="block hover:text-yellow-400 transition-colors cursor-pointer">Gallery</Link>
                <Link to="/team" className="block hover:text-yellow-400 transition-colors cursor-pointer">Team</Link>
                <Link to="/initiatives" className="block hover:text-yellow-400 transition-colors cursor-pointer">Initiatives</Link>
                <Link to="/blogs" className="block hover:text-yellow-400 transition-colors cursor-pointer">Blogs</Link>
              </div>
            </div>

            {/* Resources + Legal */}
            <div className="grid grid-cols-2 gap-4">

              {/* Resources */}
              <div>
                <h3 className="text-base font-bold mb-4">
                  Resources
                </h3>

                <div className="space-y-1.5 text-sm sm:text-base text-neutral-400">
                  <Link to="/blogs" className="block hover:text-yellow-400 transition-colors cursor-pointer">FAQs</Link>
                  <Link to="/login" className="block hover:text-yellow-400 transition-colors cursor-pointer">Register</Link>
                  <Link to="/about-us" className="block hover:text-yellow-400 transition-colors cursor-pointer">Volunteer</Link>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-base font-bold mb-4">
                  Legal
                </h3>

                <div className="space-y-1.5 text-sm sm:text-base text-neutral-400">
                  <a href="#privacy" className="block hover:text-yellow-400 transition-colors cursor-pointer">Privacy Policy</a>
                  <a href="#terms" className="block hover:text-yellow-400 transition-colors cursor-pointer">Terms & Conditions</a>
                </div>
              </div>

            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-base font-bold mb-4">
                Contact Us
              </h3>

              <div className="space-y-3 text-sm text-neutral-400">

                {/* Email */}
                <a
                  href="mailto:Ecell.dmce.14@gmail.com"
                  className="flex items-center gap-3 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors"
                  />
                  <span>Ecell.dmce.14@gmail.com</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ecell_dmce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors"
                  />
                  <span>Ecell_dmce</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ecell-dmce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors"
                  />
                  <span>Ecell_DMCE</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/ecelldmce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors"
                  />
                  <span>Ecell_DMCE</span>
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <p className="text-center text-sm sm:text-base text-neutral-400 py-4">
            © 2025 ECELL | E-CELL DMCE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;