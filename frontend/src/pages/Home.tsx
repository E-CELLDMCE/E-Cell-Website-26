import React from 'react';

import PortalHero from '../components/home/PortalHero';
import AboutSection from '../components/home/AboutSection';
import SpeakersSection from '../components/home/SpeakersSection';
import SponsorsSection from '../components/home/SponsorsSection';
import BackboneSection from '../components/home/BackboneSection';
import AdvisorSection from '../components/home/AdvisorSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-rose-600 selection:text-white overflow-hidden">
      
      {/* 1. HERO — Single video (recap.mp4) scroll-driven docking & typography reveal */}
      <PortalHero />

      {/* 2. ABOUT — E-Cell Mission, Metrics & Counter animations */}
      <AboutSection />

      {/* 3. PREVIOUS SPEAKER — Keynote speakers showcase */}
      <SpeakersSection />

      {/* 4. SPONSOR — Brand partners & corporate sponsors */}
      <SponsorsSection />

      {/* 5. E-CELL BACKBONE — Team photo & core council */}
      <BackboneSection />

      {/* 6. E-CELL ADVISOR — Faculty advisor profile */}
      <AdvisorSection />

    </div>
  );
};

export default Home;
