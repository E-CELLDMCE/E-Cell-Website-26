import React from 'react';
import CurrentEvents from '../components/CurrentEvents';
import FlagshipEvents from '../components/FlagshipEvents';
import PreviousEvents from '../components/PreviousEvents';
import Footer from '../components/Footer';

export default function EventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-red-950 to-neutral-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <main className="flex-grow">
        <CurrentEvents />
        <FlagshipEvents />
        <PreviousEvents />
      </main>
      <Footer />
    </div>
  );
}
GPUInternalError