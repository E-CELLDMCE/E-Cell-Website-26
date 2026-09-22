import React, { useEffect, useState } from "react";
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

const timelineData = [
  {
    year: "2014",
    description: "Founded in 2014 by Ankit Jaiswal",
  },
  {
    year: "2015",
    description: "First ENSPIRE held on 24 January 2015",
  },
  {
    year: "2016",
    description: "First ENSPIRE held on 6 February 2016.",
  },
  {
    year: "2017",
    description: "Participated in the National Entrepreneurship Challenge.",
  },
  {
    year: "2018",
    description: "Won the basic track for NEC.",
  },
  {
    year: "2019",
    description: "ENSPIRE 2019 featured Entrepreneurship sessions.",
  },
  {
    year: "2020",
    description: "New leadership team took E-CELL forward.",
  },
  {
    year: "2021",
    description: "Hosted Hussle Behind the Curtains and What If...?",
  },
  {
    year: "2022",
    description: "Continued entrepreneurship activities and initiatives.",
  },
  {
    year: "2023",
    description: "Expanded E-CELL's digital presence and activities.",
  },
  {
    year: "2024",
    description: "Secured 5th in the State Challenge and Top 20 in India at NEC.",
  },
  {
    year: "2025",
    description: "ENSPIRE 2025 featured speakers, competitions, and innovation.",
  },
];

const AboutUs = () => {

  return (
    <div className="about-us-page min-h-screen bg-black text-white overflow-hidden">


      {/* ================= MAIN PAGE ================= */}
      <main className="relative bg-black overflow-hidden pt-28">

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
      <div className="-mt-14 h-[260px] w-full max-w-[480px] shrink-0 overflow-hidden sm:h-[290px]">
  <img
    src="/img_vid/OriginOfEcell.jpg"
    alt="Origin of E-CELL"
    className="h-full w-full object-cover"
  />
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

          <section className="mt-30 px-14 sm:px-20">

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


              <div className="grid grid-cols-3 gap-1 sm:gap-8">

  {/* Facebook */}
  <div className="flex min-w-0 flex-col items-center text-center">

    <FontAwesomeIcon
      icon={faFacebookF}
      className="text-white text-3xl sm:text-4xl md:text-5xl mb-2"
    />

    <div className="flex items-center justify-center whitespace-nowrap">

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="text-white text-base sm:text-xl font-bold px-1">
        .
      </span>

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="text-white text-base sm:text-xl font-bold ml-1">
        K+
      </span>

    </div>

    <p className="text-white text-xs sm:text-sm md:text-base font-semibold mt-2">
      followers
    </p>

  </div>


  {/* Instagram */}
  <div className="flex min-w-0 flex-col items-center text-center">

    <FontAwesomeIcon
      icon={faInstagram}
      className="text-white text-3xl sm:text-4xl md:text-5xl mb-2"
    />

    <div className="flex items-center justify-center whitespace-nowrap">

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="text-white text-base sm:text-xl font-bold px-1">
        .
      </span>

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="text-white text-base sm:text-xl font-bold ml-1">
        K+
      </span>

    </div>

    <p className="text-white text-xs sm:text-sm md:text-base font-semibold mt-2">
      followers
    </p>

  </div>


  {/* LinkedIn */}
  <div className="flex min-w-0 flex-col items-center text-center">

    <FontAwesomeIcon
      icon={faLinkedinIn}
      className="text-white text-3xl sm:text-4xl md:text-5xl mb-2"
    />

    <div className="flex items-center justify-center whitespace-nowrap">

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-l-md bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border-l border-red-900 bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-r-md border-l border-red-900 bg-[#650005] text-white text-base sm:text-xl font-bold">
        0
      </span>

    </div>

    <p className="text-white text-xs sm:text-sm md:text-base font-semibold mt-2">
      followers
    </p>

  </div>

</div>

            </div>

          </section>



{/* ================================================= */}
{/* HISTORY */}
{/* ================================================= */}

<section className="px-5 sm:px-8 pt-12 pb-20 sm:pt-12 sm:pb-24 overflow-hidden">
  <div className="w-full relative">

    {/* Red glow */}
    <div className="absolute inset-0 rounded-[55px] bg-red-700/20 blur-3xl pointer-events-none"></div>

    {/* Carousel viewport */}
    <div className="relative overflow-hidden">

      {/* Continuously moving track */}
      <div className="history-carousel-track flex gap-12 sm:gap-16 lg:gap-20">

        {/* First copy */}
        {timelineData.map((item, index) => (
          <div
            key={`first-${item.year}-${index}`}
            className="w-[calc(100vw-40px)] max-w-xl shrink-0"
          >
            <div className="relative overflow-hidden rounded-[50px] bg-white/5 backdrop-blur-md border border-white/10">

              <div className="relative w-full h-[300px] rounded-[55px] overflow-hidden">
  <img
    src={`/img_vid/TimeLine${item.year}.jpg`}
    alt={`E-CELL ${item.year}`}
    className="absolute inset-0 h-full w-full object-cover"
  />

  {item.year !== "2024" && (
  <span
    className={`absolute inset-0 z-10 flex items-center justify-center text-8xl sm:text-9xl md:text-[10rem] font-['Times_New_Roman'] text-white ${
      item.year === "2018" ? "pt-10 sm:pt-12 md:pt-14" : ""
    }`}
  >
    {item.year}
  </span>
)}
</div>

              <div className="text-center pt-20 pb-11 sm:pt-9 sm:pb-13 min-h-[240px]">
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-['Times_New_Roman'] leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          </div>
        ))}

        {/* Second identical copy for seamless looping */}
        {timelineData.map((item, index) => (
          <div
  key={`second-${item.year}-${index}`}
  className="history-card w-[calc(100vw-40px)] max-w-xl shrink-0"
>
            <div className="relative overflow-hidden rounded-[50px] bg-white/5 backdrop-blur-md border border-white/10">

  {/* Year / Image */}
 <div className="relative w-full h-[300px] rounded-[55px] overflow-hidden">
  <img
    src={`/img_vid/TimeLine${item.year}.jpg`}
    alt={`E-CELL ${item.year}`}
    className="absolute inset-0 h-full w-full object-cover"
  />

  {item.year !== "2024" && (
  <span
    className={`absolute inset-0 z-10 flex items-center justify-center text-8xl sm:text-9xl md:text-[10rem] font-['Times_New_Roman'] text-white ${
      item.year === "2018" ? "pt-16 sm:pt-18 md:pt-20" : ""
    }`}
  >
    {item.year}
  </span>
)}
</div>

  {/* Description */}
 <div className="text-center pt-20 pb-11 sm:pt-9 sm:pb-13 min-h-[240px]">
  <p className="text-white text-xl sm:text-2xl md:text-3xl font-['Times_New_Roman'] leading-relaxed">
    {item.description}
  </p>
</div>

</div>
          </div>
        ))}

      </div>
    </div>
  </div>
</section>

        </div>

      </main>

    </div>
  );
};

export default AboutUs;
