import React from 'react';
import { motion } from 'framer-motion';

export const TeamPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black text-white px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4 max-w-md mx-auto"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-950/40 border border-yellow-500/30 px-3.5 py-1 rounded-full">
          Coming Soon
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
          Team
        </h1>
        <p className="text-sm text-neutral-400">
          Meet the minds and leaders driving E-Cell DMCE forward.
        </p>
      </motion.div>
    </div>
  );
};

export default TeamPage;
