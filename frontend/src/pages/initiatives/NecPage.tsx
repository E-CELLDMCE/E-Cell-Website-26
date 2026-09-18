import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

export const NecPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      {/* ================= BACKGROUND LAYER ================= */}
      {/* 1. Base photographic ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/img_vid/Initiativepages_background.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      {/* 2. Ambient Gold/Yellow Radial Glows */}
      <div
        className="fixed top-0 left-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.18) 0%, rgba(202, 138, 4, 0.05) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(161, 98, 7, 0.04) 55%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 3. Subtle Yellow Diagonal Lines / Grid Pattern SVG */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none opacity-25 z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="gold-diagonal-pattern"
            width="50"
            height="50"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="50"
              stroke="#eab308"
              strokeWidth="0.75"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gold-diagonal-pattern)" />
      </svg>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col space-y-20 sm:space-y-28">

        {/* ================= 1. HERO SECTION ================= */}
        <section
          id="hero"
          className="w-full flex items-center justify-center pt-4 sm:pt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-5xl mx-auto"
          >
            {/* Left: Big NEC Rocket Logo */}
            <div className="relative shrink-0 flex items-center justify-center group">
              {/* Gold aura glow behind logo */}
              <div className="absolute inset-0 bg-yellow-400/25 rounded-full blur-2xl transform scale-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
              
              <img
                src="/img_vid/nec-logo.png"
                alt="National Entrepreneurship Challenge Logo"
                className="relative z-10 w-40 sm:w-56 md:w-64 lg:w-76 xl:w-80 h-auto object-contain drop-shadow-[0_0_35px_rgba(250,204,21,0.4)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Right: Stacked Headline */}
            <div className="flex flex-col text-left font-heading">
              <h1 className="m-0 flex flex-col font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] select-none">
                {/* Line 1: NATIONAL */}
                <span className="text-white flex items-center">
                  <span className="text-yellow-400 underline decoration-yellow-400 decoration-4 sm:decoration-[6px] underline-offset-4 sm:underline-offset-8 mr-1 inline-block">
                    N
                  </span>
                  ATIONAL
                </span>

                {/* Line 2: ENTREPRENEURSHIP */}
                <span className="text-yellow-400 flex items-center drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                  <span className="underline decoration-yellow-400 decoration-4 sm:decoration-[6px] underline-offset-4 sm:underline-offset-8 mr-1 inline-block">
                    E
                  </span>
                  NTREPRENEURSHIP
                </span>

                {/* Line 3: CHALLENGE */}
                <span className="text-white flex items-center">
                  <span className="text-yellow-400 underline decoration-yellow-400 decoration-4 sm:decoration-[6px] underline-offset-4 sm:underline-offset-8 mr-1 inline-block">
                    C
                  </span>
                  HALLENGE
                </span>
              </h1>
            </div>
          </motion.div>
        </section>


        {/* ================= 2. "WHAT IS NEC ?" SECTION ================= */}
        <motion.section
          id="what-is-nec"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-white">
            What is{' '}
            <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              NEC ?
            </span>
          </h2>

          {/* Descriptive Paragraph */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed sm:leading-loose font-sans max-w-[800px] mx-auto text-center font-normal">
            Entrepreneurship Cell is essential for any college because it develops students'
            entrepreneurial spirit, which we believe is instrumental for our country to develop.
            NEC is the platform that helps colleges build an actively functioning E-Cell. It's a
            5-6 month-long competition where we guide students by giving them tasks that are
            essential for any Entrepreneurship cell to work smoothly.
          </p>
        </motion.section>


        {/* ================= 3. IMAGE GALLERY SECTION ================= */}
        <motion.section
          id="gallery"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-5xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Event Image 1 */}
            <div className="relative group rounded-3xl sm:rounded-[36px] p-[6px] sm:p-[8px] bg-gradient-to-br from-yellow-400/90 via-yellow-500/70 to-amber-600/90 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]">
              <div className="overflow-hidden rounded-2xl sm:rounded-[28px] bg-black">
                <img
                  src="/img_vid/nec-event_1.png"
                  alt="E-Summit Event Banner"
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Event Image 2 */}
            <div className="relative group rounded-3xl sm:rounded-[36px] p-[6px] sm:p-[8px] bg-gradient-to-br from-yellow-400/90 via-yellow-500/70 to-amber-600/90 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]">
              <div className="overflow-hidden rounded-2xl sm:rounded-[28px] bg-black">
                <img
                  src="/img_vid/nec-event_2.png"
                  alt="Welcome to NEC Finals"
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </motion.section>


        {/* ================= 4. TEAM PHOTO SECTION (FULL WIDTH) ================= */}
        <motion.section
          id="team-photo"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-5xl mx-auto w-full"
        >
          <div className="relative group rounded-3xl sm:rounded-[36px] p-[6px] sm:p-[8px] bg-gradient-to-br from-yellow-400/90 via-yellow-500/70 to-amber-600/90 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_45px_rgba(250,204,21,0.3)]">
            <div className="overflow-hidden rounded-2xl sm:rounded-[28px] bg-black">
              <img
                src="/img_vid/nec-group.png"
                alt="NEC Participants and Organizing Team"
                className="w-full h-auto object-cover max-h-[520px] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.section>


        {/* ================= 5. CONTACT US SECTION ================= */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto w-full text-center pb-8"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-400 tracking-wider font-heading drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
            CONTACT US
          </h2>

          {/* Centered Profile Card */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <div className="flex items-center gap-6 sm:gap-8 text-left bg-neutral-950/60 p-4 sm:p-6 rounded-3xl border border-yellow-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(250,204,21,0.08)]">
              {/* Profile Photo with Gold Border */}
              <div className="relative shrink-0 w-28 sm:w-36 md:w-40 rounded-[28px] sm:rounded-[36px] p-[5px] sm:p-[6px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border border-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.25)]">
                <div className="overflow-hidden rounded-[22px] sm:rounded-[30px] bg-black">
                  <img
                    src="/img_vid/nec-chairperson.png"
                    alt="Aditya Dongre - Chairperson"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>

              {/* Contact Info & Details */}
              <div className="flex flex-col justify-center">
                {/* Name */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-yellow-400 tracking-wide font-heading leading-tight drop-shadow-[0_0_12px_rgba(250,204,21,0.25)]">
                  ADITYA DONGRE
                </h3>

                {/* Role */}
                <p className="mt-1 text-xs sm:text-sm font-bold uppercase text-white tracking-widest font-heading">
                  CHAIRPERSON
                </p>

                {/* Icon Buttons */}
                <div className="mt-4 flex items-center gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/ecell-dmce/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Aditya Dongre LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                  >
                    <FaLinkedin className="w-4.5 h-4.5" />
                  </a>

                  {/* Mail */}
                  <a
                    href="mailto:ecell.dmce.14@gmail.com"
                    aria-label="Email Aditya Dongre"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default NecPage;
