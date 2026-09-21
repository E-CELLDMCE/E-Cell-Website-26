import React from 'react';

const BACKBONE_MEMBERS = [
  {
    name: 'Late Mr. Sameer Ekbote',
    image: "/img_vid/Ekbote_Sir.png",
  },
  {
    name: 'Dr. Aruna Henry',
    image: "/img_vid/Aruna_Ma'am.png",
  },
  {
    name: 'Dr. Meghana Chatterjee',
    image: "/img_vid/Meghana_Ma'am.png",
  },
];

export const BackboneSection: React.FC = () => {
  return (
    <section
      id="backbone"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-500/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-[#FFC700] drop-shadow-[0_2px_15px_rgba(255,199,0,0.35)] font-heading">
            E-CELL'S BACKBONE
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The pillars who laid the foundation and continue to inspire the entrepreneurial
            spirit at DMCE. Their vision and dedication shaped E-Cell into what it is today.
          </p>
        </div>

        {/* 3 Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {BACKBONE_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center w-full max-w-[300px] group"
            >
              {/* Red Framed Photo Card */}
              <div
                className="w-full aspect-[3/4] rounded-2xl p-[3px] transition-transform duration-300 group-hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(145deg, #991b1b 0%, #dc2626 50%, #7f1d1d 100%)',
                }}
              >
                <div className="w-full h-full rounded-[13px] overflow-hidden bg-neutral-900">
                  <img
                    src={member.image}
                    alt={member.name}
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
                  {member.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BackboneSection;
