import React from 'react';

const InitiativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#030001] z-0">
      {/* ================= 1. AMBIENT CORNER GLOWS ================= */}
      {/* Top-Left deep crimson bloom */}
      <div 
        className="absolute -top-20 -left-20 w-[420px] sm:w-[600px] lg:w-[750px] h-[420px] sm:h-[600px] lg:h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(225, 10, 25, 0.85) 0%, rgba(140, 0, 15, 0.5) 35%, rgba(60, 0, 8, 0.2) 65%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Bottom-Right ambient bloom */}
      <div 
        className="absolute -bottom-24 -right-24 w-[420px] sm:w-[600px] lg:w-[750px] h-[420px] sm:h-[600px] lg:h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 70%, rgba(225, 10, 25, 0.75) 0%, rgba(140, 0, 15, 0.45) 35%, rgba(60, 0, 8, 0.15) 65%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Center Blackout Vignette (Keeps initiative cards legible) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, #030001 25%, transparent 100%)',
        }}
      />

      {/* ================= 2. TOP-RIGHT EXACT CONCENTRIC STRIPES ================= */}
      <svg
        className="absolute top-0 right-0 w-[300px] sm:w-[480px] lg:w-[650px] h-auto select-none pointer-events-none"
        viewBox="0 0 600 350"
        fill="none"
      >
        <defs>
          {/* Linear gradient to naturally fade lines into darkness as they travel right */}
          <linearGradient id="topLineFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#dc2626" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#991b1b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.4" />
          </linearGradient>

          {/* Subtle neon glow filter */}
          <filter id="redNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 8 Parallel lines running diagonally from top-left, dipping, and flattening right */}
        <g stroke="url(#topLineFade)" filter="url(#redNeonGlow)">
          <path d="M 0,10   C 110,105 220,185 360,185 C 450,185 530,175 600,165" strokeWidth="2.0" />
          <path d="M 12,0   C 122,95  232,175 372,175 C 462,175 542,165 600,155" strokeWidth="1.9" />
          <path d="M 28,0   C 138,95  248,175 388,175 C 478,175 558,165 600,150" strokeWidth="1.8" />
          <path d="M 44,0   C 154,95  264,175 404,175 C 494,175 565,160 600,145" strokeWidth="1.7" />
          <path d="M 60,0   C 170,95  280,175 420,175 C 500,175 570,160 600,140" strokeWidth="1.6" />
          <path d="M 76,0   C 186,95  296,175 436,175 C 510,175 575,155 600,135" strokeWidth="1.5" />
          <path d="M 92,0   C 202,95  312,175 452,175 C 520,175 580,155 600,130" strokeWidth="1.4" />
          <path d="M 108,0  C 218,95  328,175 468,175 C 530,175 585,150 600,125" strokeWidth="1.3" />
        </g>
      </svg>

      {/* ================= 3. BOTTOM-LEFT INVERTED STRIPES ================= */}
      <svg
        className="absolute bottom-0 left-0 w-[300px] sm:w-[480px] lg:w-[650px] h-auto select-none pointer-events-none rotate-180"
        viewBox="0 0 600 350"
        fill="none"
      >
        <g stroke="url(#topLineFade)" filter="url(#redNeonGlow)">
          <path d="M 0,10   C 110,105 220,185 360,185 C 450,185 530,175 600,165" strokeWidth="2.0" />
          <path d="M 12,0   C 122,95  232,175 372,175 C 462,175 542,165 600,155" strokeWidth="1.9" />
          <path d="M 28,0   C 138,95  248,175 388,175 C 478,175 558,165 600,150" strokeWidth="1.8" />
          <path d="M 44,0   C 154,95  264,175 404,175 C 494,175 565,160 600,145" strokeWidth="1.7" />
          <path d="M 60,0   C 170,95  280,175 420,175 C 500,175 570,160 600,140" strokeWidth="1.6" />
          <path d="M 76,0   C 186,95  296,175 436,175 C 510,175 575,155 600,135" strokeWidth="1.5" />
          <path d="M 92,0   C 202,95  312,175 452,175 C 520,175 580,155 600,130" strokeWidth="1.4" />
          <path d="M 108,0  C 218,95  328,175 468,175 C 530,175 585,150 600,125" strokeWidth="1.3" />
        </g>
      </svg>

      {/* ================= 4. AMBIENT PARTICLES / DUST ================= */}
      <span className="absolute top-[28%] left-[8%] w-1 h-1 bg-white/40 rounded-full blur-[0.5px]" />
      <span className="absolute top-[38%] right-[7%] w-1 h-1 bg-red-400/50 rounded-full blur-[0.5px]" />
      <span className="absolute bottom-[28%] left-[10%] w-1 h-1 bg-red-300/40 rounded-full blur-[0.5px]" />
      <span className="absolute bottom-[14%] right-[18%] w-1 h-1 bg-white/30 rounded-full blur-[0.5px]" />
    </div>
  );
};

export default InitiativeBackground;
