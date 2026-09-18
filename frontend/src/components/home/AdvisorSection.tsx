import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Quote, CheckCircle, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AdvisorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    '20+ Years of Academic & Entrepreneurial Mentorship',
    'Guided 100+ Student Startup Projects & Prototypes',
    'Institutional Lead for Innovation & Incubation (DMCE)',
    'Strong Angel & Incubation Network Across Maharashtra',
  ];

  return (
    <section
      id="advisor"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <GraduationCap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Guiding Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
            FACULTY <span className="text-yellow-400 glow-text-yellow">ADVISOR</span> & MENTOR
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-body">
            Empowering students with institutional backing, deep technical insights, and relentless entrepreneurial encouragement.
          </p>
        </div>

        {/* Advisor Showcase Card */}
        <div
          ref={cardRef}
          className="relative rounded-3xl bg-neutral-950/90 border border-neutral-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] p-8 sm:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Advisor Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-neutral-700/80 shadow-[0_0_40px_rgba(225,29,72,0.3)] group">
                <img
                  src="/img_vid/ecell_advisor.jpg"
                  alt="Prof. Dr. Arun K. Sharma"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">
                    Faculty Incharge
                  </span>
                  <p className="text-xs font-semibold text-white">
                    E-Cell DMCE
                  </p>
                </div>
              </div>
            </div>

            {/* Advisor Info & Quote Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  Mentor & Pillar
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-heading">
                  Prof. Dr. Arun K. Sharma
                </h3>
                
                <p className="text-sm sm:text-base font-semibold text-rose-400 font-heading tracking-wide">
                  Faculty Advisor, E-Cell DMCE • Professor, Mechanical Dept.
                </p>
              </div>

              {/* Quote Block */}
              <div className="relative pl-6 sm:pl-8 border-l-4 border-rose-600 space-y-3">
                <Quote className="w-8 h-8 text-rose-600/40 absolute -top-3 -left-3 pointer-events-none" />
                <p className="text-base sm:text-lg text-neutral-200 italic font-body leading-relaxed">
                  "Entrepreneurship is not merely about building commercially viable enterprises; it is about cultivating a mindset capable of identifying real-world bottlenecks, engineering rigorous solutions, and persevering through uncertainty."
                </p>
                <p className="text-xs sm:text-sm text-yellow-400 font-handwritten text-xl sm:text-2xl">
                  — Prof. Dr. Arun K. Sharma
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300"
                  >
                    <CheckCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AdvisorSection;
