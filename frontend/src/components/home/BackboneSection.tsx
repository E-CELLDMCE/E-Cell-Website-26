import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Mail, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CouncilMember {
  name: string;
  role: string;
  department: string;
  quote: string;
  image?: string;
  linkedin?: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Yash Vardhan',
    role: 'President / General Secretary',
    department: 'Computer Engineering',
    quote: 'Fostering a bold culture of relentless execution and student-led ventures.',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Tanvi Deshmukh',
    role: 'Vice President / Joint Secretary',
    department: 'Information Technology',
    quote: 'Connecting visionary young minds with industry leaders and angel capital.',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Aaryan Patil',
    role: 'Technical & Web Head',
    department: 'Computer Engineering',
    quote: 'Architecting cutting-edge digital experiences for 5,000+ campus innovators.',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Riya Kulkarni',
    role: 'Events & PR Head',
    department: 'Electronics & Telecomm',
    quote: 'Bringing Mumbai’s biggest entrepreneurship summits right into DMCE.',
    linkedin: 'https://linkedin.com',
  },
];

export const BackboneSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner reveal animation
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Member cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="backbone"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <Users className="w-3.5 h-3.5 text-rose-500" />
            <span>The Council</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
            THE <span className="text-rose-500 glow-text-red">BACKBONE</span> OF E-CELL
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-body">
            Passionate student leaders, strategists, and creators dedicating their craft to powering Mumbai's premier campus startup hub.
          </p>
        </div>

        {/* Full Team Panorama Banner */}
        <div
          ref={bannerRef}
          className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] group"
        >
          <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src="/img_vid/ecell-team.jpg"
              alt="E-Cell DMCE Team"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              onError={(e) => {
                // Fallback placeholder if image not found
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </div>

          {/* Banner bottom details */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-600/90 text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                Team 2024–2025
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-heading">
                50+ Visionaries. One Unstoppable Mission.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-handwritten text-lg sm:text-xl text-yellow-300 mt-1">
                "Together we turn impossible campus concepts into scalable ventures."
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-900/80 px-4 py-2 rounded-full border border-neutral-700">
                14 Department Heads • 100+ Committee Members
              </span>
            </div>
          </div>
        </div>

        {/* Core Council Leadership Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {COUNCIL_MEMBERS.map((member, i) => (
            <div
              key={member.name}
              className="relative p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-rose-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.2)] group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Member Avatar / Icon Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600/20 to-neutral-900 border border-rose-500/30 flex items-center justify-center font-heading font-black text-rose-400 text-lg group-hover:scale-110 transition-transform">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white font-heading group-hover:text-yellow-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {member.department}
                  </p>
                </div>

                <p className="text-xs text-neutral-400 italic leading-relaxed border-l-2 border-rose-500/40 pl-3">
                  "{member.quote}"
                </p>
              </div>

              {/* Social Link */}
              <div className="pt-5 mt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                  Connect
                </span>
                <div className="flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-rose-600 transition-colors"
                      title="LinkedIn"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  <a
                    href="mailto:contact@ecelldmce.com"
                    className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-rose-600 transition-colors"
                    title="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BackboneSection;
