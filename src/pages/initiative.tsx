import React from 'react';
import Navbar from '../components/Navbar';
import InitiativeBackground from '../layouts/InitiativeBackground';

import necLogo from '../assets/NEC LOGO.png';
import alumniLogo from '../assets/ALUMNI LOGO 2.png';
import enspireLogo from '../assets/enspire logo 5.png';


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
    link: '#',
    imageSrc: necLogo,
    imageAlt: 'National Entrepreneurship Competition',
    // Brightened with boosted contrast and an ambient gold illumination
    imgClassName: 'scale-[1.04] brightness-110',
    containerPadding: 'p-4',
  },
  {
    titleLines: ['ALUMINI', 'CELL'],
    link: '#',
    imageSrc: alumniLogo,
    imageAlt: 'Alumni Cell',
    imgClassName: 'scale-[1.14]',
    containerPadding: 'p-5',
  },
  {
    titleLines: ['ENSPIRE', 'EVENTS'],
    link: '#',
    imageSrc: enspireLogo,
    imageAlt: 'Enspire Events',
    // Enlarged significantly and padded minimally so it fills the squircle box
    imgClassName: 'scale-[1.4] brightness-110',
    containerPadding: 'p-2',
  },
];

const Initiative: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050102] text-white relative flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <InitiativeBackground />

      <main className="relative z-10 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto text-center">
          {/* Beveled Gold Heading */}
          <h1
            className="uppercase font-black text-center tracking-[0.18em] select-none"
            style={{
              fontFamily: '"Inconsolata", monospace',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: '1.1',
              marginBottom: '3rem',
              background: 'linear-gradient(180deg, #FFE873 0%, #E8A800 60%, #B87800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            OUR INITIATIVE
          </h1>

          {/* Description Paragraph */}
          <p
            className="max-w-7xl mx-auto text-center px-4 sm:px-8 text-neutral-100 font-semibold leading-relaxed"
            style={{
              fontFamily: '"Inclusive Sans", sans-serif',
              fontSize: 'clamp(1.1rem, 1.45vw, 1.35rem)',
              lineHeight: '1.7',
              marginBottom: '4.5rem',
            }}
          >
            E-Cell DMCE operates as an active growth platform that transforms high-potential concepts
            into impactful ventures. By combining competitive flagship summits with direct access to
            alumni founders and industry leaders, the initiative equips students with the resources,
            strategic guidance, and network needed to build, launch, and scale successful enterprises.
          </p>

          {/* 3 Spread Out Cards Container with Clean Inline Column Gap */}
         <div
  className="flex flex-col md:flex-row items-center md:items-start justify-center max-w-6xl mx-auto px-4 gap-12 md:gap-32"
>
            {initiatives.map((item, index) => (
          <div
  key={index}
  className="w-full max-w-[280px] flex flex-col items-center"
>
                {/* Yellow Squircle Box with Image */}
                <div
  className={`w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 bg-black rounded-[38px] sm:rounded-[44px] flex items-center justify-center ${item.containerPadding || 'p-5'} overflow-hidden transition-all duration-300 hover:scale-[1.03]`}
  style={{
    border: '3px solid #facc15',
    boxShadow: '0 0 20px rgba(250, 204, 21, 0.25)',
  }}
>
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className={`w-full h-full object-contain pointer-events-none select-none transition-transform duration-300 ${item.imgClassName || ''}`}
                  />
                </div>

               {/* Multiline Card Titles */}
<div
  className="mt-6 mb-4 min-h-[58px] flex flex-col items-center justify-start text-center"
  style={{ fontFamily: '"Inconsolata", monospace' }}
>
  {item.titleLines.map((line, lIdx) => (
    <h3
      key={lIdx}
      className="text-lg sm:text-xl md:text-2xl font-black tracking-wide text-yellow-400 uppercase leading-snug"
    >
      {line}
    </h3>
  ))}
</div>

                {/* Yellow Know More Pill Button */}
                <a
                  href={item.link}
                  className="w-[160px] h-[40px] flex items-center justify-center bg-yellow-400 text-black text-sm sm:text-base font-extrabold tracking-wide rounded-full hover:bg-yellow-300 active:scale-95 transition-all"
                  style={{
                    fontFamily: '"Inclusive Sans", sans-serif',
                    boxShadow: '0 0 15px rgba(250, 204, 21, 0.45)',
                  }}
                >
                  Know More
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer
        className="relative z-10 bg-black/85 backdrop-blur-sm border-t border-neutral-800 text-neutral-400 text-xs sm:text-sm pt-8 pb-5 px-6 sm:px-12 lg:px-16"
        style={{ fontFamily: '"Inclusive Sans", sans-serif' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-6">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col space-y-0.5">
                <span className="h-1 w-6 bg-red-600 rounded-full"></span>
                <span className="h-1 w-4 bg-red-500 rounded-full"></span>
                <span className="h-1 w-2 bg-red-400 rounded-full"></span>
              </div>
              <span
                className="text-2xl font-black tracking-wider text-yellow-400"
                style={{ fontFamily: '"Inconsolata", monospace' }}
              >
                CELL
                <span className="text-[10px] block tracking-widest text-neutral-400 -mt-1 font-semibold">
                  DMCE
                </span>
              </span>
            </div>
            <p className="text-neutral-300 flex items-start space-x-2 text-xs leading-relaxed max-w-xs">
              <span className="text-red-500 font-bold">📍</span>
              <span>Location: Datta Meghe College of Engineering, Navi Mumbai</span>
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-2 text-sm">Quick Links</h4>
            <ul className="space-y-1 text-xs text-neutral-400">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">About us</a></li>
              <li><a href="#event" className="hover:text-yellow-400 transition-colors">Event</a></li>
              <li><a href="#gallery" className="hover:text-yellow-400 transition-colors">Gallery</a></li>
              <li><a href="#team" className="hover:text-yellow-400 transition-colors">Team</a></li>
              <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-2 text-sm">Resources</h4>
            <ul className="space-y-1 text-xs text-neutral-400">
              <li><a href="#faqs" className="hover:text-yellow-400 transition-colors">FAQs</a></li>
              <li><a href="#register" className="hover:text-yellow-400 transition-colors">Register</a></li>
              <li><a href="#volunteer" className="hover:text-yellow-400 transition-colors">Volunteer</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-2 text-sm">Legal</h4>
            <ul className="space-y-1 text-xs text-neutral-400">
              <li><a href="#privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-yellow-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-2 text-sm">Contact Us</h4>
            <ul className="space-y-1 text-xs text-neutral-300">
              <li>M – Ecell.dmce.14@gmail.com</li>
              <li>📷 – ecell_dmce</li>
              <li>in – ECell_DMCE</li>
              <li>f – ECell_DMCE</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-4 text-center text-xs text-neutral-500">
          © 2026 ECELL | E-CELL DMCE. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Initiative;