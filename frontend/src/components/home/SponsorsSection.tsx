import React from 'react';

export const SponsorsSection: React.FC = () => {
  const sponsors = [
    { image: '/img_vid/sponser1.jpeg', alt: 'Sponsor 1' },
    { image: '/img_vid/sponser2.jpg', alt: 'Sponsor 2' },
    { image: '/img_vid/sponser3.jpg', alt: 'Sponsor 3' },
  ];

  return (
    <section
      id="sponsors"
      className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900"
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(180, 20, 35, 0.25) 0%, rgba(20, 2, 4, 0.8) 55%, #000000 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-[#FFC700] drop-shadow-[0_2px_15px_rgba(255,199,0,0.35)] font-heading">
            OUR SPONSORS
          </h2>
        </div>

        {/* Sponsor Cards Row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.alt}
              className="group flex-shrink-0"
            >
              {/* Red border frame */}
              <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-2xl p-[3px] transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, #991b1b 0%, #dc2626 50%, #7f1d1d 100%)',
                }}
              >
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <img
                    src={sponsor.image}
                    alt={sponsor.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/img_vid/ecell-logo.png';
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
