import React from 'react';

const ADVISORS = [
  {
    name: 'Prof. Anand Joshi',
    image: '/img_vid/Anand_Sir.png',
  },
  {
    name: 'Prof. Deepali Kadam',
    image: "/img_vid/Deepali_Ma'am.png",
  },
];

export const AdvisorSection: React.FC = () => {
  return (
    <section
      id="advisor"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">

        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-[#FFC700] drop-shadow-[0_2px_15px_rgba(255,199,0,0.35)] font-heading">
            E-CELL ADVISOR
          </h2>
        </div>

        {/* 2 Cards Side-by-Side */}
        <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.name}
              className="flex flex-col items-center w-full max-w-[300px] group"
            >
              {/* Red Framed Photo Card (same style as Backbone) */}
              <div
                className="w-full aspect-[3/4] rounded-2xl p-[3px] transition-transform duration-300 group-hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(145deg, #991b1b 0%, #dc2626 50%, #7f1d1d 100%)',
                }}
              >
                <div className="w-full h-full rounded-[13px] overflow-hidden bg-neutral-900">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/img_vid/ecell-logo.png';
                    }}
                  />
                </div>
              </div>

              {/* Yellow Pill Badge BELOW the card */}
              <div className="mt-4">
                <span className="inline-block px-5 py-2 rounded-full bg-[#FFC700] text-black text-sm sm:text-base font-bold tracking-wide shadow-md">
                  {advisor.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdvisorSection;
