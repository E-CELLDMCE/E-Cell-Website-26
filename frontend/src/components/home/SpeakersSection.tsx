import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SpeakersSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const speakers = [
    {
      name: 'MS. ANNAMIKA SHUKLA',
      role: 'Corporate Communication Trainer & Public Speaking Coach',
      image: '/img_vid/speaker_annamika.jpg',
      tag: 'Leadership & Voice',
      bio: 'Renowned executive coach empowering aspiring tech founders with commanding public presentation and pitch mastery.',
    },
    {
      name: 'MR. AMAR KHANNA',
      role: 'Founder of AngryTraders',
      image: '/img_vid/speaker_amar.jpg',
      tag: 'Fintech & Markets',
      bio: 'Pioneering financial strategist and high-frequency trading educator simplifying systematic wealth building.',
    },
    {
      name: 'MR. RAJ PADHIYAR',
      role: 'Founder & CEO: Digital Gurukul',
      image: '/img_vid/speaker_raj.jpg',
      tag: 'EdTech & Growth',
      bio: 'Visionary edtech entrepreneur recognized as a leading digital evangelist, mentoring thousands of young ventures.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.speaker-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 110% 80% at 100% 25%, rgba(225, 29, 72, 0.4) 0%, rgba(150, 15, 25, 0.3) 35%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4 shadow-lg">
            <Mic className="w-3.5 h-3.5 text-yellow-400" />
            <span>THOUGHT LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] font-heading">
            OUR PREVIOUS SPEAKERS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 uppercase tracking-widest font-heading max-w-2xl mx-auto">
            Industry titans, founders, and leaders who inspired DMCE innovators
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="speaker-card flex flex-col items-center text-center p-7 rounded-[32px] bg-neutral-950/90 border border-neutral-800 hover:border-yellow-400/80 hover:shadow-[0_15px_45px_rgba(250,204,21,0.2)] transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-[28px] overflow-hidden border-2 border-neutral-700 group-hover:border-yellow-400 transition-all duration-500 shadow-2xl bg-neutral-900 mb-6">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-yellow-400 border border-yellow-400/40 shadow-lg">
                  {speaker.tag}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-400 uppercase tracking-wide font-heading transition-colors">
                {speaker.name}
              </h3>
              <p className="mt-2 text-xs uppercase font-bold text-rose-400 tracking-wider">{speaker.role}</p>
              <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-[280px]">{speaker.bio}</p>
              <div className="mt-6 pt-4 border-t border-neutral-900 w-full flex items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-yellow-400/80 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Keynote Conclave Speaker
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
