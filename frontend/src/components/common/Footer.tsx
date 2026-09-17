import React from "react";
import ecellLogo from "../../assets/ecell-logo.png";

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
                <img
                  src={ecellLogo}
                  alt="E-Cell DMCE"
                  className="w-32 sm:w-40 h-auto object-contain"
                />
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
              <h3 className="text-base font-bold mb-4 font-[Poppins]">
                Quick Links
              </h3>

              <div className="space-y-1 text-sm sm:text-base text-neutral-400">
                <p>Home</p>
                <p>About us</p>
                <p>Event</p>
                <p>Gallery</p>
                <p>Team</p>
                <p>Contact</p>
              </div>
            </div>

            {/* Resources + Legal */}
            <div className="grid grid-cols-2 gap-4">

              {/* Resources */}
              <div>
                <h3 className="text-base font-bold mb-4 font-[Poppins]">
                  Resources
                </h3>

                <div className="space-y-1 text-sm sm:text-base text-neutral-400">
                  <p>FAQs</p>
                  <p>Register</p>
                  <p>Volunteer</p>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-base font-bold mb-4 font-[Poppins]">
                  Legal
                </h3>

                <div className="space-y-1 text-sm sm:text-base text-neutral-400">
                  <p>Privacy Policy</p>
                  <p>Terms & Conditions</p>
                </div>
              </div>

            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-base font-bold mb-4 font-[Poppins]">
                Contact Us
              </h3>

              <div className="space-y-3 text-sm text-neutral-400">

                {/* Email */}
                <p className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-5 h-5 text-white"
                  />
                  <span>Ecell.dmce.14@gmail.com</span>
                </p>

                {/* Instagram */}
                <p className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="w-5 h-5 text-white"
                  />
                  <span>Ecell_dmce</span>
                </p>

                {/* LinkedIn */}
                <p className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="w-5 h-5 text-white"
                  />
                  <span>Ecell_DMCE</span>
                </p>

                {/* Facebook */}
                <p className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="w-5 h-5 text-white"
                  />
                  <span>Ecell_DMCE</span>
                </p>

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