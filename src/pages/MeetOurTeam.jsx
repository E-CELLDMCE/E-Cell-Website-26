import React from "react";
import ecellLogo from "../assets/ecell-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const MeetOurTeam = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================= TEAM PAGE ================= */}
      <section className="relative min-h-screen bg-black overflow-hidden">

        {/* Background Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 55% at 0% 0%,
                rgba(150, 0, 15, 0.95) 0%,
                rgba(100, 0, 10, 0.65) 28%,
                rgba(40, 0, 5, 0.25) 55%,
                transparent 75%
              ),
              radial-gradient(
                ellipse 75% 55% at 100% 100%,
                rgba(150, 0, 15, 0.9) 0%,
                rgba(90, 0, 10, 0.6) 30%,
                rgba(35, 0, 5, 0.25) 55%,
                transparent 75%
              ),
              linear-gradient(
                135deg,
                #160004 0%,
                #080002 35%,
                #000000 55%,
                #080002 75%,
                #180004 100%
              )
            `,
          }}
        />

        {/* ================= SUBTLE HEADING LIGHT ================= */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[22%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 20%, rgba(220, 20, 20, 0.28), transparent 70%)",
          }}
        />

        {/* ================= PAGE CONTENT ================= */}
        <div className="relative z-10 min-h-screen flex flex-col">

          {/* Heading */}
          {/* Heading */}
{/* Heading */}
<div className="pt-16 sm:pt-20">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)] mb-6">
      MEET OUR TEAM
    </h2>
  </div>
</div>

          {/* Team Area */}
          <div className="flex-1 relative">

            {/*
              Team members will be added here later.
              Keeping this area empty for now preserves
              the layout shown in the reference.
            */}

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="relative bg-black text-white overflow-hidden">

        {/* Footer Red Gradient */}
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

          {/* Footer Main Content */}
          <div className="max-w-6xl mx-auto px-8 pt-14 pb-8">

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.65fr_1.3fr_1fr] gap-3">


              {/* ================= BRAND ================= */}
              <div>

                <div className="mb-5">

                  <img
                    src={ecellLogo}
                    alt="E-Cell DMCE"
                    className="w-40 h-auto object-contain"
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


              {/* ================= QUICK LINKS ================= */}
              <div>

                <h3 className="text-base font-bold mb-4">
                  Quick Links
                </h3>

                <div className="space-y-1 text-base text-neutral-400">

                  <p>Home</p>
                  <p>About us</p>
                  <p>Event</p>
                  <p>Gallery</p>
                  <p>Team</p>
                  <p>Contact</p>

                </div>

              </div>


              {/* ================= RESOURCES + LEGAL ================= */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <h3 className="text-base font-bold mb-4">
                    Resources
                  </h3>

                  <div className="space-y-1 text-base text-neutral-400">

                    <p>FAQs</p>
                    <p>Register</p>
                    <p>Volunteer</p>

                  </div>

                </div>


                <div>

                  <h3 className="text-base font-bold mb-4">
                    Legal
                  </h3>

                  <div className="space-y-1 text-base text-neutral-400">

                    <p>Privacy Policy</p>
                    <p>Terms &amp; Conditions</p>

                  </div>

                </div>

              </div>


              {/* ================= CONTACT ================= */}
              <div>

                <h3 className="text-base font-bold mb-4">
                  Contact Us
                </h3>

                <div className="space-y-3 text-sm text-neutral-400">


                  {/* Email */}
                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell.dmce.14@gmail.com
                    </span>

                  </p>


                  {/* Instagram */}
                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell_dmce
                    </span>

                  </p>


                  {/* LinkedIn */}
                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell_DMCE
                    </span>

                  </p>


                  {/* Facebook */}
                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell_DMCE
                    </span>

                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================= COPYRIGHT ================= */}
          <div className="border-t border-white/60">

            <p className="text-center text-sm sm:text-base text-neutral-400 py-4">
              © 2025 ECELL | E-CELL DMCE. All Rights Reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default MeetOurTeam;