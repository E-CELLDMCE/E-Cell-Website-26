import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

interface AlumniMember {
  name: string;
  image: string;
}

const alumniMembers: AlumniMember[] = [
  {
    name: 'Ms. Shivpriya R. Sumbha',
    image: '/img_vid/Speaker_1_filled.png',
  },
  {
    name: 'Mr. Sherrin Varghese',
    image: '/img_vid/Speaker_2_filled.png',
  },
  {
    name: 'Mr. Abhijit Mehta',
    image: '/img_vid/Speaker_3_filled.png',
  },
  {
    name: 'Mr. Anand Karapurkar',
    image: '/img_vid/Speaker_4_filled.png',
  },
];

export const AlumniPage: React.FC = () => {
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
        className="fixed top-0 left-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.18) 0%, rgba(202, 138, 4, 0.05) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none z-0"
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
          className="w-full flex flex-col items-center justify-center pt-4 sm:pt-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            {/* Centered Alumni Tree Logo */}
            <div className="relative shrink-0 flex items-center justify-center group mb-2 sm:mb-4">
              {/* Gold aura glow behind logo */}
              <div className="absolute inset-0 bg-yellow-400/25 rounded-full blur-2xl transform scale-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

              <img
                src="/img_vid/Alumni_logo.png"
                alt="Alumni Initiative Logo"
                className="relative z-10 w-48 sm:w-64 md:w-76 lg:w-84 h-auto object-contain drop-shadow-[0_0_35px_rgba(250,204,21,0.4)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center font-heading">
              <h1 className="m-0 font-black uppercase tracking-wider text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.4)] select-none">
                <span className="underline decoration-yellow-400 decoration-4 sm:decoration-[6px] underline-offset-4 sm:underline-offset-8">
                  ALUMNI
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-yellow-400">
                BRIDGING IDEAS ACROSS GENERATIONS
              </p>
            </div>
          </motion.div>
        </section>


        {/* ================= 2. "ABOUT ALUMNI" SECTION ================= */}
        <motion.section
          id="about-alumni"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-white">
            ABOUT{' '}
            <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              ALUMNI
            </span>
          </h2>

          {/* Descriptive Paragraph */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed sm:leading-loose font-sans max-w-[850px] mx-auto text-center font-normal">
            The Alumni Initiative Of E-Cell Is All About Keeping The Bond Alive Between Those Who Once Dreamt Here And Those Who Are Dreaming Now. Through This Platform, We’re Bringing Together Our Alumni And Current Students So That Ideas, Stories, And Experiences Can Flow Both Ways. Alumni Can Share The Lessons They’ve Learned With The Next Generation, And The Journey’s Beyond College Can Inspire The Students To Give Their Best In Life. Most Importantly, E-Cell Celebrates Our Vision Is To Create A Community That Lives And Breathes The Spirit Of Innovation, Growing, Where Every Generation Supports The Next. It's Not Just About Giving Back; It's About Moving Forward Together, As One Community Of Innovators And Doers.
          </p>
        </motion.section>


        {/* ================= 3. "OUR ALUMNI" SECTION ================= */}
        <motion.section
          id="our-alumni"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-white text-center mb-10 sm:mb-14">
            OUR{' '}
            <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              ALUMNI
            </span>
          </h2>

          {/* 4 Alumni Profiles (2 Columns Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-2xl mx-auto justify-items-center">
            {alumniMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center group w-full max-w-[240px]"
              >
                {/* Gold Rounded Pill / Squircle Frame */}
                <div className="relative w-full aspect-[3/4] rounded-[36px] sm:rounded-[42px] p-[6px] sm:p-[8px] bg-gradient-to-br from-yellow-400/95 via-yellow-500/80 to-amber-600/95 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.18)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)]">
                  <div className="overflow-hidden rounded-[28px] sm:rounded-[34px] w-full h-full bg-neutral-950">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mt-3.5 sm:mt-4 text-center text-sm sm:text-base md:text-lg font-black uppercase text-yellow-400 tracking-wide font-heading">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </motion.section>


        {/* ================= 4. CONTACT US SECTION ================= */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto w-full text-center pb-8"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider font-heading drop-shadow-[0_0_20px_rgba(250,204,21,0.4)] text-white">
            CONTACT{' '}
            <span className="text-yellow-400">
              US
            </span>
          </h2>

          {/* Centered Profile Card */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left bg-neutral-950/60 p-5 sm:p-6 rounded-3xl border border-yellow-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(250,204,21,0.08)]">
              {/* Profile Photo with Gold Border */}
              <div className="relative shrink-0 w-32 sm:w-36 md:w-40 rounded-[32px] sm:rounded-[36px] p-[5px] sm:p-[6px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border border-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.25)]">
                <div className="overflow-hidden rounded-[26px] sm:rounded-[30px] bg-black">
                  <img
                    src="/img_vid/Alumni_initiative_head.png"
                    alt="Arya Kamble - Alumni Initiative Head"
                    className="w-full aspect-[3/4] object-cover"
                    onError={(e) => {
                      // Fallback if Alumni_initiative_head.png fails to load
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('Alumni_initiative_head_filled.png')) {
                        target.src = '/img_vid/Alumni_initiative_head_filled.png';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Contact Info & Details */}
              <div className="flex flex-col justify-center items-center sm:items-start">
                {/* Name */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-yellow-400 tracking-wide font-heading leading-tight drop-shadow-[0_0_12px_rgba(250,204,21,0.25)]">
                  ARYA KAMBLE
                </h3>

                {/* Role */}
                <p className="mt-1 text-xs sm:text-sm font-bold uppercase text-white tracking-widest font-heading">
                  ALUMNI INITIATIVE HEAD
                </p>

                {/* Social Icons */}
                <div className="mt-4 flex items-center gap-3">
                  {/* LinkedIn */}
                  <span
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer"
                  >
                    <FaLinkedin className="w-4.5 h-4.5" />
                  </span>

                  {/* Mail */}
                  <span
                    aria-label="Email"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer"
                  >
                    <Mail className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default AlumniPage;
