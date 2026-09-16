import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

interface EventHead {
  name: string;
  role: string;
  image: string;
}

const eventHeads: EventHead[] = [
  {
    name: 'AKSHADA SANGORE',
    role: 'EVENT INITIATIVE HEAD',
    image: '/img_vid/Event_initiative_head_1.png',
  },
  {
    name: 'KOMAL SAHU',
    role: 'EVENT INITIATIVE HEAD',
    image: '/img_vid/Event_initiative_head_2.png',
  },
];

const eventImages = [
  {
    src: '/img_vid/event_1.png',
    alt: 'ENSPIRE Keynote Speaker Session',
  },
  {
    src: '/img_vid/event_2.png',
    alt: 'ENSPIRE Interactive VR & Technology Demo',
  },
  {
    src: '/img_vid/group_photo.png',
    alt: 'ENSPIRE Summit Participants & Team',
  },
  {
    src: '/img_vid/group_photo_enspire.png',
    alt: 'ENSPIRE 25 Celebration',
  },
];

export const EnspirePage: React.FC = () => {
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
            {/* Centered ENSPIRE Interlocking Rings Logo */}
            <div className="relative shrink-0 flex items-center justify-center group mb-2 sm:mb-4">
              {/* Gold aura glow behind logo */}
              <div className="absolute inset-0 bg-yellow-400/25 rounded-full blur-2xl transform scale-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

              <img
                src="/img_vid/enspire_logo.png"
                alt="ENSPIRE Logo"
                className="relative z-10 w-44 sm:w-60 md:w-72 lg:w-80 h-auto object-contain drop-shadow-[0_0_35px_rgba(250,204,21,0.4)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center font-heading">
              <h1 className="m-0 font-black uppercase tracking-wider text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.4)] select-none">
                <span className="underline decoration-yellow-400 decoration-4 sm:decoration-[6px] underline-offset-4 sm:underline-offset-8">
                  ENSPIRE
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-yellow-400">
                VISION TO VICTORY
              </p>
            </div>
          </motion.div>
        </section>


        {/* ================= 2. "ABOUT ENSPIRE" SECTION ================= */}
        <motion.section
          id="about-enspire"
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
              ENSPIRE
            </span>
          </h2>

          {/* Descriptive Paragraphs */}
          <div className="mt-6 text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed sm:leading-loose font-sans max-w-[850px] mx-auto text-center font-normal space-y-4">
            <p>
              ENSPIRE is designed to bring together brilliant minds from the worlds of Finance, Business, and Entrepreneurship. Whether you're a budding entrepreneur, a finance enthusiast, or simply curious about the future of business, this event is your gateway to knowledge, networking, and exciting challenges.
            </p>
            <p>
              The 11th Edition of one of the most dynamic Business and Entrepreneurial Summits is set to inspire, innovate, and transform ideas into success. Get ready for an event where visionaries shape the future. Join us on March 17th, 18th & 19th, 2025, as we redefine Entrepreneurship, Finance, and Leadership, turning bold visions into lasting victories. This is Enspire '25. This is Vision to Victory.
            </p>
          </div>
        </motion.section>


        {/* ================= 3. "EVENT GALLERY" SECTION ================= */}
        <motion.section
          id="event-gallery"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-5xl mx-auto w-full"
        >
          {/* 4 Event Photos (2 Columns Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto">
            {eventImages.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-3xl sm:rounded-[40px] p-[6px] sm:p-[8px] bg-gradient-to-br from-yellow-400/95 via-yellow-500/80 to-amber-600/95 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.18)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)]"
              >
                <div className="overflow-hidden rounded-2xl sm:rounded-[32px] w-full aspect-[4/3] bg-black">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
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
          className="max-w-4xl mx-auto w-full text-center pb-8"
        >
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider font-heading drop-shadow-[0_0_20px_rgba(250,204,21,0.4)] text-white">
            CONTACT{' '}
            <span className="text-yellow-400">
              US
            </span>
          </h2>

          {/* Two Event Initiative Head Profile Cards */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-20">
            {eventHeads.map((head) => (
              <div
                key={head.name}
                className="flex flex-col items-center text-center group w-full max-w-[260px]"
              >
                {/* Profile Photo with Gold Border */}
                <div className="relative shrink-0 w-36 sm:w-44 aspect-[3/4] rounded-[36px] sm:rounded-[44px] p-[6px] sm:p-[7px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border border-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.25)]">
                  <div className="overflow-hidden rounded-[30px] sm:rounded-[37px] w-full h-full bg-black">
                    <img
                      src={head.image}
                      alt={`${head.name} - ${head.role}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mt-4 text-lg sm:text-xl font-black uppercase text-yellow-400 tracking-wide font-heading leading-tight drop-shadow-[0_0_12px_rgba(250,204,21,0.25)]">
                  {head.name}
                </h3>

                {/* Role */}
                <p className="mt-1 text-xs sm:text-sm font-bold uppercase text-white tracking-widest font-heading">
                  {head.role}
                </p>

                {/* Social Icons */}
                <div className="mt-3.5 flex items-center justify-center gap-3">
                  {/* LinkedIn */}
                  <span
                    aria-label={`${head.name} LinkedIn`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </span>

                  {/* Mail */}
                  <span
                    aria-label={`Email ${head.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default EnspirePage;
