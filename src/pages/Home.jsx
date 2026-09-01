import React, { useState } from 'react';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home', active: true },
    { name: 'ABOUT US', href: '#about', active: false },
    { name: 'EVENT', href: '#event', active: false },
    { name: 'GALLERY', href: '#gallery', active: false },
    { name: 'TEAM', href: '#team', active: false },
    { name: 'INITIATIVE', href: '#initiative', active: false },
    { name: 'BLOGS', href: '#blogs', active: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* ----------------- NAVBAR ----------------- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="flex flex-col space-y-0.5">
              <span className="h-1 w-6 bg-red-600 rounded-full"></span>
              <span className="h-1 w-4 bg-red-500 rounded-full"></span>
              <span className="h-1 w-2 bg-red-400 rounded-full"></span>
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              CELL <span className="text-xs font-semibold text-neutral-400 block -mt-1 tracking-widest">DMCE</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs lg:text-sm font-semibold tracking-wider transition-colors duration-200 ${
                  link.active
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-neutral-200 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-neutral-300 hover:text-white focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-neutral-800 px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium tracking-wide ${
                  link.active ? 'text-yellow-400' : 'text-neutral-300 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ----------------- HERO / GROUP PHOTO SECTION ----------------- */}
        <section id="home" className="w-full bg-black py-4 px-2 sm:px-4">
          <div className="max-w-6xl mx-auto">
            {/* Image Card Container with Cyan Border */}
            <div className="relative w-full rounded-sm overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              {/* Main Team Photo */}
              <div className="relative h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] w-full bg-neutral-900">
                <img
                  src="/assets/ecell-team.jpg" 
                  alt="E-CELL Team"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Subtle vignette/contrast overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Bold Center Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    E-CELL 25 - 26
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- WHAT IS E-CELL SECTION ----------------- */}
        <section
          id="about"
          className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-[#2a0404] via-[#1a0202] to-black"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(220, 20, 20, 0.45), transparent 70%),
              radial-gradient(circle at 80% 60%, rgba(180, 0, 0, 0.25), transparent 50%),
              linear-gradient(to bottom, #000000 0%, transparent 15%, transparent 85%, #000000 100%)
            `
          }}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Section Header */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)] mb-6">
              WHAT IS E-CELL ?
            </h2>

            {/* Description Paragraph */}
            <p className="text-neutral-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto px-2 mb-16 sm:mb-20">
              Entrepreneurship Cell (E-Cell) of Datta Meghe College of Engineering is a
              student-driven community dedicated to promoting innovation, creativity, and
              the spirit of entrepreneurship. It serves as a platform where students can
              learn, network, and turn ideas into successful ventures through workshops,
              competitions, mentorship, and industry collaborations.
            </p>

            {/* Metrics & Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-center justify-center pt-4">
              
              {/* Metric 1 */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  10 YEARS
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  14 HEADS
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center">
                <div className="leading-none text-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white block">
                    100+
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white block mt-1">
                    MEMBERS
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

{/* Thin black separator */}
<div className="h-[8px] w-full bg-black"></div>

{/* ----------------- PREVIOUS SPEAKERS ----------------- */}
<section className="relative w-full bg-black text-white overflow-hidden">

  {/* Previous Speakers */}
  <div className="relative py-16 sm:py-20 px-6">

    {/* Red glow in background */}
    <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse 120% 85% at 100% 20%, rgba(220, 20, 20, 0.45) 0%, rgba(150, 15, 25, 0.55) 35%, rgba(80, 10, 18, 0.2) 60%, transparent 70%)",
  }}
></div>

    <div className="relative z-10 max-w-6xl mx-auto">

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-black uppercase text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.35)] mb-16">
        OUR PREVIOUS SPEAKERS
      </h2>

      {/* Speakers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">

        {/* Speaker 1 */}
        <div className="flex flex-col items-center text-center">

          {/* Image Placeholder */}
          <div className="w-42 h-42 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-[22px] bg-neutral-700">
          </div>

          <h3 className="mt-5 text-sm sm:text-base font-bold text-purple-700 uppercase">
            MS. ANNAMIKA SHUKLA
          </h3>

          <p className="mt-1 text-[13px] sm:text-[14px] uppercase text-white max-w-[280px] leading-relaxed">
            (CORPORATE COMMUNICATION TRAINER
            <br />
            & PUBLIC SPEAKING COACH)
          </p>

        </div>


        {/* Speaker 2 */}
        <div className="flex flex-col items-center text-center">

          {/* Image Placeholder */}
          <div className="w-42 h-42 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-[22px] bg-neutral-700">
          </div>

          <h3 className="mt-5 text-sm sm:text-base font-bold text-purple-700 uppercase">
            MR. AMAR KHANNA
          </h3>

          <p className="mt-1 text-[13px] sm:text-[14px] uppercase text-white max-w-[280px] leading-relaxed">
            (FOUNDER OF ANGRYTRADERS)
          </p>

        </div>


        {/* Speaker 3 */}
        <div className="flex flex-col items-center text-center">

          {/* Image Placeholder */}
          <div className="w-42 h-42 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-[22px] bg-neutral-700">
          </div>

          <h3 className="mt-5 text-sm sm:text-base font-bold text-purple-700 uppercase">
            MR. RAJ PADHIYAR
          </h3>

          <p className="mt-1 text-[13px] sm:text-[14px] uppercase text-white max-w-[280px] leading-relaxed">
            (FOUNDER & CEO: DIGITAL GURUKUL)
          </p>

        </div>

      </div>

    </div>
  </div>


  {/* ----------------- SPONSORS ----------------- */}

  <div className="relative py-10 sm:py-20 px-6">

    {/* Red background glow */}
    <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse 140% 95% at 100% 20%, rgba(220, 20, 20, 0.45) 0%, rgba(150, 15, 25, 0.55) 35%, rgba(80, 10, 18, 0.2) 60%, transparent 70%)",
  }}
></div>

    <div className="relative z-10 max-w-6xl mx-auto">

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-black uppercase text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.35)] mb-14">
        OUR SPONSORS
      </h2>


      {/* Four Sponsor Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center">

        {/* Sponsor 1 */}
        <div
  className="w-36 h-36 sm:w-36 sm:h-36 rounded-[24px] p-[7px] flex items-center justify-center"
  style={{
    background:
      "linear-gradient(145deg, #5c0505 0%, #b91c1c 45%, #450303 100%)",
  }}
>
  <div className="w-30 h-30 sm:w-28 sm:h-28 rounded-[15px] bg-white">
  </div>
</div>

        {/* Sponsor 2 */}
        <div
  className="w-36 h-36 sm:w-36 sm:h-36 rounded-[24px] p-[7px] flex items-center justify-center"
  style={{
    background:
      "linear-gradient(145deg, #5c0505 0%, #b91c1c 45%, #450303 100%)",
  }}
>
  <div className="w-30 h-30 sm:w-28 sm:h-28 rounded-[15px] bg-white">
  </div>
</div>

        {/* Sponsor 3 */}
        <div
  className="w-36 h-36 sm:w-36 sm:h-36 rounded-[24px] p-[7px] flex items-center justify-center"
  style={{
    background:
      "linear-gradient(145deg, #5c0505 0%, #b91c1c 45%, #450303 100%)",
  }}
>
  <div className="w-30 h-30 sm:w-28 sm:h-28 rounded-[15px] bg-white">
  </div>
</div>

        {/* Sponsor 4 */}
        <div
  className="w-36 h-36 sm:w-36 sm:h-36 rounded-[24px] p-[7px] flex items-center justify-center"
  style={{
    background:
      "linear-gradient(145deg, #5c0505 0%, #b91c1c 45%, #450303 100%)",
  }}
>
  <div className="w-40 h-30 sm:w-28 sm:h-28 rounded-[15px] bg-white">
  </div>
</div>

      </div>


      {/* Bottom Logos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 mt-16 items-end justify-items-center">

        {/* Alumni */}
        <div className="flex flex-col items-center gap-3">
  <div className="w-40 h-30 invisible"></div>

  <span className="text-xl sm:text-2xl font-black text-yellow-400 uppercase">
    
  </span>
</div>


        {/* E-CELL */}
        <div className="flex flex-col items-center gap-3">
  <div className="w-40 h-30 invisible"></div>

  <span className="text-xl sm:text-2xl font-black text-yellow-400 uppercase">
    
  </span>
</div>


        {/* NEC */}
        <div className="flex flex-col items-center gap-3">
  <div className="w-40 h-30 invisible"></div>

  <span className="text-xl sm:text-2xl font-black text-yellow-400 uppercase">
    
  </span>
</div>


        {/* Enspire */}
        <div className="flex flex-col items-center gap-3">
  <div className="w-40 h-30 invisible"></div>

  <span className="text-xl sm:text-2xl font-black text-yellow-400 uppercase">
    
  </span>
</div>

      </div>

    </div>
  </div>

</section>
      </main>
    </div>
  );
};

export default Home;
