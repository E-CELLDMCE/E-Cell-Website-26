import React from 'react';

const InitiativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#040102] z-0 select-none">
      {/* ================= 1. SUBTLE FILM GRAIN TEXTURE OVERLAY ================= */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-screen">
        <filter id="filmGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#filmGrain)" />
      </svg>

      {/* ================= 2. DEEP RED ATMOSPHERIC TINTS ================= */}
      {/* Top-Left: Softened & Pulled Back Crimson Spotlight */}
      <div 
        className="absolute -top-20 -left-20 w-[450px] sm:w-[650px] lg:w-[850px] h-[450px] sm:h-[650px] lg:h-[850px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #991b1b 0%, #5a0808 32%, #2a0304 55%, transparent 75%)',
          filter: 'blur(65px)',
          opacity: 0.72,
        }}
      />

      {/* Bottom-Right & Bottom Edge: Boosted Crimson Flood */}
      <div 
        className="absolute -bottom-16 -right-16 w-[700px] sm:w-[950px] lg:w-[1300px] h-[700px] sm:h-[950px] lg:h-[1300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 65% 65%, #dc2626 0%, #b91c1c 25%, #7f1d1d 45%, #450a0a 65%, transparent 80%)',
          filter: 'blur(65px)',
          opacity: 0.98,
        }}
      />

      {/* Bottom-Left Ambient Crimson Underglow for elements */}
      <div 
        className="absolute bottom-16 -left-20 w-[500px] sm:w-[700px] lg:w-[850px] h-[400px] sm:h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(185, 28, 28, 0.75) 0%, rgba(127, 29, 29, 0.4) 40%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Direct Bottom Floor Glow */}
      <div 
        className="absolute -bottom-32 left-1/4 w-[600px] sm:w-[900px] lg:w-[1200px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(185, 28, 28, 0.75) 0%, rgba(127, 29, 29, 0.45) 45%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Global Diagonal Wash */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(153,27,27,0.12) 0%, transparent 40%, transparent 55%, rgba(185,28,28,0.3) 100%)',
        }}
      />

      {/* Center Blackout Core */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 48%, #040102 30%, transparent 100%)',
        }}
      />

      {/* ================= 3. TOP-RIGHT CONCENTRIC RIBBON ================= */}
      <div className="absolute top-10 sm:top-14 lg:top-18 -right-6 w-[480px] sm:w-[720px] md:w-[900px] lg:w-[1150px] pointer-events-none">
        <svg viewBox="0 0 650 320" fill="none" className="w-full h-auto">
          <defs>
            <linearGradient id="richCrimsonTR" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#dc2626" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#991b1b" stopOpacity="0.65" />
              <stop offset="90%" stopColor="#450a0a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1a0002" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <g stroke="url(#richCrimsonTR)">
            <path d="M 0,20   C 140,115 280,185 430,180 C 515,178 580,185 650,192" strokeWidth="2.4" />
            <path d="M 18,0   C 155,105 295,175 445,170 C 525,168 590,175 650,182" strokeWidth="2.3" />
            <path d="M 38,0   C 170,95  310,165 460,160 C 538,158 600,165 650,172" strokeWidth="2.2" />
            <path d="M 58,0   C 185,85  325,155 475,150 C 550,148 610,155 650,162" strokeWidth="2.1" />
            <path d="M 78,0   C 200,78  340,145 490,140 C 560,138 620,145 650,152" strokeWidth="2.0" />
            <path d="M 98,0   C 215,70  355,135 505,130 C 572,128 630,135 650,142" strokeWidth="1.9" />
            <path d="M 118,0  C 230,62  370,125 520,120 C 585,118 640,125 650,132" strokeWidth="1.8" />
          </g>
        </svg>
      </div>

      {/* ================= 4. BOTTOM-LEFT BASE RIBBON ================= */}
      <div className="absolute bottom-2 sm:bottom-6 -left-6 w-[480px] sm:w-[720px] md:w-[900px] lg:w-[1150px] pointer-events-none rotate-180">
        <svg viewBox="0 0 650 320" fill="none" className="w-full h-auto">
          <g stroke="url(#richCrimsonTR)">
            <path d="M 0,20   C 140,115 280,185 430,180 C 515,178 580,185 650,192" strokeWidth="2.4" />
            <path d="M 18,0   C 155,105 295,175 445,170 C 525,168 590,175 650,182" strokeWidth="2.3" />
            <path d="M 38,0   C 170,95  310,165 460,160 C 538,158 600,165 650,172" strokeWidth="2.2" />
            <path d="M 58,0   C 185,85  325,155 475,150 C 550,148 610,155 650,162" strokeWidth="2.1" />
            <path d="M 78,0   C 200,78  340,145 490,140 C 560,138 620,145 650,152" strokeWidth="2.0" />
            <path d="M 98,0   C 215,70  355,135 505,130 C 572,128 630,135 650,142" strokeWidth="1.9" />
            <path d="M 118,0  C 230,62  370,125 520,120 C 585,118 640,125 650,132" strokeWidth="1.8" />
          </g>
        </svg>
      </div>

      {/* ================= 5. LOWER-LEFT FLOATING GEOMETRIC VECTOR ACCENTS ================= */}
      <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-10 lg:left-14 w-60 sm:w-80 pointer-events-none opacity-85">
        <svg viewBox="0 0 300 240" fill="none" className="w-full h-auto">
          <defs>
            <linearGradient id="vectorRedFade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#450a0a" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Precision Dot Array */}
          <g fill="#ef4444" opacity="0.45">
            <circle cx="15" cy="25" r="1.5" />
            <circle cx="35" cy="25" r="1.5" />
            <circle cx="55" cy="25" r="1.5" />
            <circle cx="75" cy="25" r="1.5" />

            <circle cx="15" cy="45" r="1.5" />
            <circle cx="35" cy="45" r="1.5" />
            <circle cx="55" cy="45" r="1.5" />
            <circle cx="75" cy="45" r="1.5" />

            <circle cx="15" cy="65" r="1.5" />
            <circle cx="35" cy="65" r="1.5" />
            <circle cx="55" cy="65" r="1.5" />
            <circle cx="75" cy="65" r="1.5" />
          </g>

          {/* Nested Cyber Rings */}
          <circle cx="160" cy="110" r="42" stroke="url(#vectorRedFade)" strokeWidth="1.4" strokeDasharray="4 6" opacity="0.7" />
          <circle cx="160" cy="110" r="28" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
          <circle cx="160" cy="110" r="12" stroke="#ef4444" strokeWidth="1.2" opacity="0.6" />
          <circle cx="160" cy="110" r="2.5" fill="#ef4444" opacity="0.9" />

          {/* Sweeping S-Curve Strands */}
          <path d="M 10,170 C 80,140 120,200 200,160 C 240,140 270,150 290,170" stroke="url(#vectorRedFade)" strokeWidth="1.2" />
          <path d="M 25,185 C 95,155 135,215 215,175 C 255,155 285,165 300,180" stroke="url(#vectorRedFade)" strokeWidth="1.0" opacity="0.7" />

          {/* Diagonal Crosshairs / Tech Ticks */}
          <path d="M 95,95 L 115,115" stroke="#ef4444" strokeWidth="1.2" opacity="0.5" />
          <path d="M 115,95 L 95,115" stroke="#ef4444" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>

      {/* ================= 6. AMBIENT STAR SPECKS ================= */}
      <span className="absolute top-[32%] left-[4.5%] w-[1.5px] h-[1.5px] bg-white/45 rounded-full" />
      <span className="absolute top-[22%] right-[2%] w-[1.5px] h-[1.5px] bg-red-400/50 rounded-full" />
      <span className="absolute bottom-[36%] left-[12%] w-[2px] h-[2px] bg-red-400/70 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
      <span className="absolute bottom-[24%] left-[7.5%] w-[1.5px] h-[1.5px] bg-white/40 rounded-full" />
      <span className="absolute bottom-[16%] left-[16%] w-[1px] h-[1px] bg-red-300/60 rounded-full" />
      <span className="absolute bottom-[9%] right-[14%] w-[1.5px] h-[1.5px] bg-red-200/60 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
    </div>
  );
};

export default InitiativeBackground;