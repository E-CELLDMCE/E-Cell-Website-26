import React from "react";
import ecellLogo from "../assets/ecell-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">


      {/* ================= MAIN PAGE ================= */}
      <main className="relative bg-black overflow-hidden">

        {/* Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse 75% 35% at 0% 8%,
                rgba(150, 0, 15, 0.75),
                transparent 70%
              ),
              radial-gradient(
                ellipse 70% 40% at 100% 75%,
                rgba(150, 0, 15, 0.65),
                transparent 70%
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


        <div className="relative z-10">


          {/* ================================================= */}
          {/* ORIGIN OF E-CELL */}
          {/* ================================================= */}

          <section className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6 lg:px-10">

  <div
    className="
    max-w-6xl mx-auto
      relative
      bg-gradient-to-br
      from-[#a90000]
      via-[#520000]
      to-[#180000]
      px-5
      pb-8
      pt-10
      sm:px-8
      lg:px-12
    "
  >

    <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:gap-12">

      {/* PHOTO */}
      <div className="-mt-14 h-[260px] w-full max-w-[480px] shrink-0 bg-[#292929] sm:h-[290px]">
        {/* Actual Origin of E-Cell image goes here */}
      </div>

      {/* TITLE */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)] mb-7">
        ORIGIN OF E-CELL
      </h2>

    </div>

  </div>

</section>



          {/* ================================================= */}
          {/* MISSION STATEMENT */}
          {/* ================================================= */}

          <section className="px-6 py-10 sm:py-12">

            <div className="max-w-3xl mx-auto text-center">

              <p
                className="
                  text-white
                  text-sm
                  sm:text-base
                  md:text-xl
                  font-semibold
                  tracking-[0.09em]
                  leading-relaxed
                "
              >
                To empower students to transform entrepreneurial
                ideas into impactful ventures by cultivating a
                culture of innovation, execution, and continuous
                learning.
              </p>

            </div>

          </section>



          {/* ================================================= */}
          {/* OUR REACH */}
          {/* ================================================= */}

          <section className="px-4 sm:px-8">

            <div 
  className=" 
    max-w-6xl
    mx-auto 
    bg-gradient-to-b
from-[#120000]
via-[#4a0003]
to-[#8f0007]
    px-6 
    py-7 
    sm:py-9 
    min-h-[310px]
    sm:min-h-[350px]
  " 
>

              <h2 
  className=" 
    text-center 
    text-xl 
    sm:text-2xl 
    md:text-3xl 
    font-black 
    text-yellow-400 
    drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)]
    uppercase 
    mb-15 
  " 
>
  OUR REACH
</h2>


              <div className="grid grid-cols-3 gap-3 sm:gap-8">

  {/* Facebook */}
<div className="flex flex-col items-center text-center">

  <FontAwesomeIcon
    icon={faFacebookF}
    className="text-white text-3xl sm:text-4xl md:text-5xl mb-3"
  />

  {/* Counter */}
  <div className="flex items-center mb-1">

    {/* First 0 */}
    <div className="bg-[#3d0002] rounded-md px-3 py-1">
      <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
        0
      </p>
    </div>

    {/* Decimal point */}
    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
      .
    </span>

    {/* Second 0 */}
    <div className="bg-[#3d0002] rounded-md px-3 py-1">
      <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
        0
      </p>
    </div>

    {/* K+ */}
    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold ml-1">
      K+
    </span>

  </div>

  <p className="text-white text-xs sm:text-sm md:text-base font-semibold">
    followers
  </p>

</div>


{/* Instagram */}
<div className="flex flex-col items-center text-center">

  <FontAwesomeIcon
    icon={faInstagram}
    className="text-white text-3xl sm:text-4xl md:text-5xl mb-3"
  />

  {/* Counter */}
  <div className="flex items-center mb-1">

    {/* First 0 */}
    <div className="bg-[#3d0002] rounded-md px-3 py-1">
      <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
        0
      </p>
    </div>

    {/* Decimal point */}
    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
      .
    </span>

    {/* Second 0 */}
    <div className="bg-[#3d0002] rounded-md px-3 py-1">
      <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
        0
      </p>
    </div>

    {/* K+ */}
    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold ml-1">
      K+
    </span>

  </div>

  <p className="text-white text-xs sm:text-sm md:text-base font-semibold">
    followers
  </p>

</div>


{/* LinkedIn */}
<div className="flex flex-col items-center text-center">

  <FontAwesomeIcon
    icon={faLinkedinIn}
    className="text-white text-3xl sm:text-4xl md:text-5xl mb-3"
  />

  {/* Counter */}
  <div className="flex items-center mb-1">

  {/* First 0 */}
  <div className="bg-[#3d0002] rounded-l-md px-3 py-1">
    <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
      0
    </p>
  </div>

  {/* Second 0 */}
  <div className="bg-[#3d0002] px-3 py-1 border-l border-[#720005]">
    <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
      0
    </p>
  </div>

  {/* Third 0 */}
  <div className="bg-[#3d0002] rounded-r-md px-3 py-1 border-l border-[#720005]">
    <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
      0
    </p>
  </div>

</div>

  <p className="text-white text-xs sm:text-sm md:text-base font-semibold">
    followers
  </p>

</div>

</div>

            </div>

          </section>



          {/* ================================================= */}
          {/* 2014 HISTORY */}
          {/* ================================================= */}

          <section className="px-5 sm:px-8 py-12 sm:py-16">

            <div className="max-w-xl mx-auto relative">

              {/* Decorative glow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-[55px]
                  bg-red-700/20
                  blur-3xl
                  pointer-events-none
                "
              ></div>


              <div
  className="
    relative
    overflow-hidden
    rounded-[50px]
    bg-white/5
    backdrop-blur-md
    border border-white/10
  "
>

                {/* PHOTO PLACEHOLDER */}

                <div
  className="
    relative
    w-full
    aspect-[1.8/1]
    rounded-[50px]
    bg-neutral-700
    overflow-hidden
    flex
    items-center
    justify-center
  "
>

                  {/* Photo will be added here later */}

                  <span
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      text-6xl
                      sm:text-7xl
                      md:text-8xl
                      font-['Times_New_Roman']
                      text-white
                    "
                  >
                    2014
                  </span>

                </div>


                {/* HISTORY TEXT */}

                <div className="text-center pt-7 pb-11 sm:pt-9 sm:pb-13">

                  <p
                  className="
                  text-white
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-['Times_New_Roman']
                  leading-relaxed
  "
>
                    Founded in August 2014
                    <br />
                    by Ankit Jaiswal.
                  </p>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>



      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="relative bg-black text-white overflow-hidden">

        {/* Footer Gradient */}
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

          <div className="max-w-6xl mx-auto px-8 pt-14 pb-8">

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-[1.2fr_0.65fr_1.3fr_1fr]
                gap-3
              "
            >

              {/* BRAND */}

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


              {/* QUICK LINKS */}

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


              {/* RESOURCES + LEGAL */}

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
                    <p>Terms & Conditions</p>

                  </div>

                </div>

              </div>


              {/* CONTACT */}

              <div>

                <h3 className="text-base font-bold mb-4">
                  Contact Us
                </h3>

                <div className="space-y-3 text-sm text-neutral-400">

                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell.dmce.14@gmail.com
                    </span>

                  </p>


                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell_dmce
                    </span>

                  </p>


                  <p className="flex items-center gap-3">

                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="w-5 h-5 text-white"
                    />

                    <span>
                      Ecell_DMCE
                    </span>

                  </p>


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


          {/* COPYRIGHT */}

          <div className="border-t border-white/10">

            <p className="text-center text-sm sm:text-base text-neutral-400 py-4">
              © 2025 ECELL | E-CELL DMCE. All Rights Reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default AboutUs;