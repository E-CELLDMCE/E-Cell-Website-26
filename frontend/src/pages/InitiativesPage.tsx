import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InitiativeBackground from '../components/InitiativeBackground';

interface InitiativeCard {
  titleLines: string[];
  link: string;
  imageSrc: string;
  imageAlt: string;
  imgClassName?: string;
  containerPadding?: string;
}

const initiatives: InitiativeCard[] = [
  {
    titleLines: ['NATIONAL', 'ENTREPRENEURSHIP', 'COMPETITION'],
    link: '/initiatives/nec',
    imageSrc: '/img_vid/nec-logo.png',
    imageAlt: 'National Entrepreneurship Competition',
    imgClassName: 'scale-[1.05] brightness-110',
    containerPadding: 'p-4 sm:p-5',
  },
  {
    titleLines: ['ALUMNI', 'CELL'],
    link: '/initiatives/alumni',
    imageSrc: '/img_vid/Alumni_logo.png',
    imageAlt: 'Alumni Cell',
    imgClassName: 'scale-[1.15] translate-y-[12%]',
    containerPadding: 'p-4 sm:p-5',
  },
  {
    titleLines: ['ENSPIRE'],
    link: '/initiatives/enspire',
    imageSrc: '/img_vid/enspire_logo.png',
    imageAlt: 'Enspire',
    imgClassName: 'scale-[1.35] brightness-110',
    containerPadding: 'p-4 sm:p-5',
  },
];

export const InitiativesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030001] text-white relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Decorative Layer */}
      <InitiativeBackground />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Beveled Gold Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase font-black text-center tracking-[0.18em] select-none text-3xl sm:text-5xl md:text-6xl font-heading mb-6 sm:mb-8"
            style={{
              background: 'linear-gradient(180deg, #FFE873 0%, #E8A800 60%, #B87800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            OUR INITIATIVE
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center px-4 sm:px-8 text-neutral-200 font-medium text-sm sm:text-base md:text-lg leading-relaxed mb-12 sm:mb-16"
          >
            E-Cell DMCE operates as an active growth platform that transforms high-potential concepts
            into impactful ventures. By combining competitive flagship summits with direct access to
            alumni founders and industry leaders, the initiative equips students with the resources,
            strategic guidance, and network needed to build, launch, and scale successful enterprises.
          </motion.p>

          {/* 3 Spread Out Cards Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center md:items-start justify-center max-w-6xl mx-auto px-4 gap-12 md:gap-16 lg:gap-24"
          >
            {initiatives.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-[280px] flex flex-col items-center group"
              >
                {/* Yellow Squircle Box with Image */}
                <div
                  className={`w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 bg-black rounded-[38px] sm:rounded-[44px] flex items-center justify-center ${
                    item.containerPadding || 'p-5'
                  } overflow-hidden transition-all duration-300 group-hover:scale-[1.04]`}
                  style={{
                    border: '3px solid #facc15',
                    boxShadow: '0 0 22px rgba(250, 204, 21, 0.28)',
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className={`w-full h-full object-contain pointer-events-none select-none transition-transform duration-300 ${
                      item.imgClassName || ''
                    }`}
                  />
                </div>

                {/* Multiline Card Titles */}
                <div className="mt-5 mb-5 h-[80px] sm:h-[90px] md:h-[100px] flex flex-col items-center justify-center text-center font-heading">
                  {item.titleLines.map((line, lIdx) => (
                    <h3
                      key={lIdx}
                      className="text-base sm:text-lg md:text-xl font-black tracking-wider text-yellow-400 uppercase leading-snug"
                    >
                      {line}
                    </h3>
                  ))}
                </div>

                {/* Yellow Know More Pill Button */}
                <Link
                  to={item.link}
                  className="w-[160px] h-[40px] flex items-center justify-center bg-yellow-400 text-black text-xs sm:text-sm font-black uppercase tracking-wider rounded-full hover:bg-yellow-300 active:scale-95 transition-all duration-200 font-heading"
                  style={{
                    boxShadow: '0 0 16px rgba(250, 204, 21, 0.45)',
                  }}
                >
                  Know More
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default InitiativesPage;
