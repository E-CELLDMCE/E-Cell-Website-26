import React from 'react';

export const SpeakersSection: React.FC = () => {
  const speakers = [
    {
      name: 'MS. ANNAMIKA SHUKLA',
      role: '(CORPORATE COMMUNICATION TRAINER & PUBLIC SPEAKING COACH)',
      image: '/img_vid/speaker1.jpeg',
    },
    {
      name: 'MR. AMAR KHANNA',
      role: '( FOUNDER OF ANGRYTRADERS )',
      image: '/img_vid/speaker2..png',
    },
    {
      name: 'MR. RAJ PADHIYAR',
      role: '(FOUNDER & CEO: DIGITAL GURUKUL)',
      image: '/img_vid/speaker3.jpeg',
    },
  ];

  return (
    <section
      id="speakers"
      className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900"
      style={{
        background:
          'radial-gradient(ellipse 110% 80% at 50% 25%, rgba(180, 20, 35, 0.3) 0%, rgba(20, 2, 4, 0.85) 50%, #000000 100%)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-[#FFC700] drop-shadow-[0_2px_15px_rgba(255,199,0,0.35)] font-heading">
            OUR PREVIOUS SPEAKERS
          </h2>
        </div>

        {/* 3 Horizontal Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start justify-items-center">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="flex flex-col items-center w-full max-w-[340px] group"
            >
              {/* Photo Frame with rounded corners */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border-2 border-neutral-800 group-hover:border-[#FFC700]/70 shadow-[0_15px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_20px_50px_rgba(255,199,0,0.2)] transition-all duration-500">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/img_vid/ecell-logo.png';
                  }}
                />
              </div>

              {/* Text Below Card: Line 1 (Name in purple #9B51E0) & Line 2 (Role in white) */}
              <div className="w-full text-center mt-4 sm:mt-5 px-2">
                <h3 className="text-[#9B51E0] font-extrabold uppercase tracking-wider text-base sm:text-lg font-heading">
                  {speaker.name}
                </h3>
                <p className="text-white text-xs sm:text-sm font-semibold tracking-wide mt-1 leading-snug">
                  {speaker.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
