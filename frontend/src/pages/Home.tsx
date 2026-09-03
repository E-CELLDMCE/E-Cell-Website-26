import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Quote,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const Home: React.FC = () => {
  const speakers = [
    {
      name: 'MS. ANNAMIKA SHUKLA',
      role: 'CORPORATE COMMUNICATION TRAINER & PUBLIC SPEAKING COACH',
      image: '/images/speaker_annamika.jpg',
      tag: 'Leadership & Voice',
    },
    {
      name: 'MR. AMAR KHANNA',
      role: 'FOUNDER OF ANGRYTRADERS',
      image: '/images/speaker_amar.jpg',
      tag: 'Fintech & Markets',
    },
    {
      name: 'MR. RAJ PADHIYAR',
      role: 'FOUNDER & CEO: DIGITAL GURUKUL',
      image: '/images/speaker_raj.jpg',
      tag: 'EdTech & Growth',
    },
  ];

  const backboneMembers = [
    {
      name: 'Siddharth Mhatre',
      role: 'Overall Coordinator / President',
      dept: 'Computer Engineering',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tanvi Deshmukh',
      role: 'Vice President & Head of Operations',
      dept: 'Information Technology',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Aarav Kulkarni',
      role: 'Chief Technology Officer',
      dept: 'Computer Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Riya Shenoy',
      role: 'Head of Public Relations & Media',
      dept: 'Electronics & Telecom',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const sponsorLogos = [
    { name: 'ALUMNI ASSOCIATION', subtitle: 'DMCE ALUMNI NETWORK', icon: '🎓' },
    { name: 'E-CELL NETWORK', subtitle: 'NATIONAL STUDENT CHAPTER', icon: '⚡' },
    { name: 'NEC', subtitle: 'NATIONAL ENTREPRENEURSHIP CHALLENGE', icon: '🏆' },
    { name: 'ENSPIRE', subtitle: 'ANNUAL E-SUMMIT FEST', icon: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ----------------- 1. HERO / GROUP PHOTO SECTION (Figma Replica) ----------------- */}
      <section id="home" className="w-full pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Cyan Glow Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.35)] group"
          >
            {/* Main Team Photo */}
            <div className="relative h-[360px] sm:h-[460px] md:h-[540px] lg:h-[600px] w-full bg-neutral-950 overflow-hidden">
              <img
                src="/images/ecell-team.jpg"
                alt="E-CELL DMCE Team"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80';
                }}
              />

              {/* Gradient dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20 pointer-events-none" />

              {/* Bold Center Overlay Text: "E-CELL 25 - 26" */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <span className="inline-block text-xs sm:text-sm font-black tracking-widest text-cyan-300 uppercase bg-cyan-950/70 border border-cyan-500/40 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    Datta Meghe College of Engineering
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]">
                    E-CELL 25 - 26
                  </h1>
                  <p className="mt-3 text-sm sm:text-lg md:text-xl font-medium text-neutral-200 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Building the next generation of founders, thinkers, and changemakers.
                  </p>
                </motion.div>

                {/* Quick Call to Action inside hero */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center"
                >
                  <Link
                    to="/events"
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50 hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Explore Events
                  </Link>
                  <a
                    href="#about"
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                  >
                    Discover E-Cell
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- 2. WHAT IS E-CELL SECTION (Figma Replica) ----------------- */}
      <section
        id="about"
        className="relative w-full py-20 sm:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(220, 20, 20, 0.45), transparent 70%),
            radial-gradient(circle at 80% 60%, rgba(180, 0, 0, 0.25), transparent 50%),
            linear-gradient(to bottom, #000000 0%, #160202 50%, #000000 100%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-yellow-400 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] mb-8"
          >
            WHAT IS E-CELL ?
          </motion.h2>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto px-2 mb-16 sm:mb-20"
          >
            Entrepreneurship Cell (E-Cell) of Datta Meghe College of Engineering is a
            student-driven community dedicated to promoting innovation, creativity, and
            the spirit of entrepreneurship. It serves as a platform where students can
            learn, network, and turn ideas into successful ventures through workshops,
            competitions, mentorship, and industry collaborations.
          </motion.p>

          {/* Metrics & Key Highlights (10 YEARS, 14 HEADS, 100+ MEMBERS) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-center justify-center pt-4">
            
            {/* Metric 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-black/50 border border-neutral-800 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-all group"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                10 YEARS
              </span>
              <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">
                Of Legacy & Leadership
              </span>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-black/50 border border-neutral-800 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-all group"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                14 HEADS
              </span>
              <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">
                Departmental Leads
              </span>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-2xl bg-black/50 border border-neutral-800 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-all group"
            >
              <div className="leading-none">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors block">
                  100+
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors block mt-1">
                  MEMBERS
                </span>
              </div>
              <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">
                Active Student Innovators
              </span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Thin black separator */}
      <div className="h-[8px] w-full bg-black border-y border-neutral-900" />

      {/* ----------------- 3. PREVIOUS SPEAKERS (Figma Replica) ----------------- */}
      <section id="speakers" className="relative w-full bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Red radial background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 120% 85% at 100% 20%, rgba(220, 20, 20, 0.45) 0%, rgba(150, 15, 25, 0.55) 35%, rgba(80, 10, 18, 0.2) 60%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
              OUR PREVIOUS SPEAKERS
            </h2>
            <p className="mt-3 text-sm text-neutral-400 uppercase tracking-widest">
              Industry titans, founders, and leaders who inspired our students
            </p>
          </motion.div>

          {/* Speakers 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-stretch">
            {speakers.map((speaker, idx) => (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-yellow-400/60 hover:shadow-[0_10px_35px_rgba(250,204,21,0.15)] transition-all duration-300 group"
              >
                {/* Speaker Image Card with rounded border */}
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-[24px] overflow-hidden border-2 border-neutral-700 group-hover:border-yellow-400 transition-colors shadow-xl bg-neutral-800">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-yellow-400 border border-yellow-400/30">
                    {speaker.tag}
                  </div>
                </div>

                {/* Speaker Name */}
                <h3 className="mt-6 text-base sm:text-lg font-black text-purple-400 group-hover:text-purple-300 uppercase tracking-wide">
                  {speaker.name}
                </h3>

                {/* Speaker Designation */}
                <p className="mt-2 text-xs sm:text-sm uppercase font-semibold text-neutral-300 max-w-[280px] leading-relaxed">
                  {speaker.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 4. OUR SPONSORS (Figma Replica) ----------------- */}
      <section id="sponsors" className="relative w-full bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Red background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 140% 95% at 100% 20%, rgba(220, 20, 20, 0.45) 0%, rgba(150, 15, 25, 0.55) 35%, rgba(80, 10, 18, 0.2) 60%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
              OUR SPONSORS & PARTNERS
            </h2>
            <p className="mt-2 text-sm text-neutral-400 uppercase tracking-widest">
              Empowered by premier alumni, institutions, and innovation hubs
            </p>
          </motion.div>

          {/* Four Sponsor Cards from Figma */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {sponsorLogos.map((s, idx) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-[26px] p-[6px] flex items-center justify-center cursor-pointer group shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #5c0505 0%, #b91c1c 45%, #450303 100%)',
                }}
              >
                <div className="w-full h-full rounded-[20px] bg-neutral-950 flex flex-col items-center justify-center p-3 text-center border border-red-900/40 group-hover:border-yellow-400/60 transition-colors">
                  <span className="text-3xl sm:text-4xl mb-2">{s.icon}</span>
                  <span className="text-[11px] sm:text-xs font-black text-yellow-400 tracking-wider uppercase">
                    {s.name}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-neutral-400 mt-1 uppercase leading-tight font-medium">
                    {s.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Partner Logos Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 items-center justify-items-center pt-8 border-t border-neutral-900">
            <div className="flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest uppercase">
                ALUMNI
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">DMCE Alumni</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest uppercase">
                E-CELL
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">IIT Bombay Fellow</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest uppercase">
                NEC
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Top 10 Finalist</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest uppercase">
                ENSPIRE
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Flagship Conclave</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 5. E-CELL'S BACKBONE (Core Team) ----------------- */}
      <section id="backbone" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950/80 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold tracking-widest text-red-500 uppercase bg-red-950/60 border border-red-500/30 px-3.5 py-1 rounded-full">
              Leadership & Drive
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              E-CELL'S BACKBONE
            </h2>
            <p className="mt-2 text-sm text-neutral-400 uppercase tracking-widest">
              Meet the core council driving DMCE's entrepreneurial revolution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {backboneMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-black/80 border border-neutral-800 hover:border-red-500/60 p-5 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-neutral-700 group-hover:border-red-500 transition-colors shadow-lg mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-red-400 uppercase mt-1">
                  {member.role}
                </p>
                <span className="text-[11px] text-neutral-400 mt-1">
                  {member.dept}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 6. E-CELL ADVISOR SECTION ----------------- */}
      <section id="advisor" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-gradient-to-br from-neutral-950 via-[#180303] to-black border-2 border-red-900/60 p-8 sm:p-12 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Advisor Photo */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-yellow-400/80 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                  <img
                    src="/images/ecell_advisor.jpg"
                    alt="Prof. Dr. Arun K. Sharma"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md py-1 px-2 rounded text-center border border-yellow-400/30">
                    <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider">
                      Faculty Advisor
                    </span>
                  </div>
                </div>
              </div>

              {/* Advisor Message */}
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Quote className="w-6 h-6 rotate-180" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Words from E-Cell Advisor
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Prof. Dr. Arun K. Sharma
                </h3>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Dean of Innovation, R&D & Incubation • DMCE
                </p>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed italic pt-2">
                  "At Datta Meghe College of Engineering, our vision is not only to build exemplary engineers, but to nurture bold problem-solvers and enterprise creators. E-Cell has been the cradle where students transform technical ingenuity into tangible enterprises that touch lives."
                </p>

                <div className="pt-3 flex flex-wrap gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> 10+ Incubated Startups
                  </span>
                  <span className="flex items-center gap-1.5 text-yellow-400">
                    <Award className="w-4 h-4" /> National Innovation Fellow
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- 7. CTA / JOIN THE MOVEMENT ----------------- */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black text-center border-t border-neutral-900">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white">
            READY TO BUILD <span className="text-yellow-400">YOUR VISION ?</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Participate in upcoming pitch battles, hackathons, and workshops. Complete your profile and secure your access passes.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/events"
              className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50 hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all transform hover:scale-105"
            >
              Browse Active Events
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-neutral-900 text-white border border-neutral-700 hover:border-yellow-400 hover:text-yellow-400 transition-all"
            >
              Student & Admin Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
