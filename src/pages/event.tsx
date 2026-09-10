import { useState } from 'react';
import Navbar from '../components/Navbar';
import InitiativeBackground from '../components/InitiativeBackground';

export default function Event() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flagshipSlide, setFlagshipSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);

  return (
    <div className="min-h-screen bg-[#030001] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950 relative overflow-x-hidden">
      
      <InitiativeBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          
          {/* CURRENT EVENTS SECTION */}
          <section id="current" className="py-16 px-6 max-w-7xl mx-auto text-white">
            <h2 className="text-3xl font-extrabold text-center tracking-wider text-amber-400 mb-12 uppercase">
              E-Cell Orientation
            </h2>
            <div className="flex flex-col items-center">
              
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 aspect-[4/5] flex items-center justify-center border border-amber-500/30 overflow-hidden">
                <img 
                  src="/coming-soon.png" 
                  alt="Coming Soon Banner" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="mt-8 max-w-xl text-center">
                <h4 className="text-lg font-bold text-amber-400 mb-2">About the event</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Orientation is the flagship introductory event of E-CELL DMCE, designed to welcome aspiring entrepreneurs, innovators, and future leaders into the world of entrepreneurship. The session introduces students to the vision, opportunities, and ecosystem of E-CELL while inspiring them to transform creative ideas into impactful ventures.
                </p>
              </div>
              
              <button className="mt-8 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all flex items-center gap-2 border border-red-400 cursor-pointer">
                Register Now <span className="text-lg">&rarr;</span>
              </button>
              
              <div className="flex gap-2 mt-6">
                {[0, 1, 2, 3].map((idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'}`}
                  ></button>
                ))}
              </div>
            </div>
          </section>

          {/* FLAGSHIP EVENTS SECTION */}
          <section id="flagship" className="py-16 px-6 max-w-7xl mx-auto text-white border-t border-red-900/40">
            <h2 className="text-3xl font-extrabold text-center tracking-wider text-amber-400 mb-12 uppercase">
              Our Flagship Events
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 w-full bg-white rounded-2xl shadow-2xl p-6 aspect-[4/3] flex items-center justify-center border border-amber-500/30">
                <span className="text-slate-400 font-medium">Enspire Poster Placeholder</span>
              </div>
              <div className="flex flex-col justify-center space-y-8 bg-black/20 p-6 rounded-2xl border border-red-900/30 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#128101;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">200+</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Students Engaged</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#127881;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">10+</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Fun Activities</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#127979;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">7+</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Foods &amp; Jewellery Stalls</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center justify-center mb-8">
                <div className="h-[1px] bg-amber-500/50 w-24"></div>
                <h3 className="px-4 text-xl font-bold text-amber-400">Glimpse Of Enspire26</h3>
                <div className="h-[1px] bg-amber-500/50 w-24"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="h-48 rounded-full border-2 border-amber-400 bg-red-950/50 shadow-inner flex items-center justify-center"></div>
                <div className="h-48 rounded-full border-2 border-amber-400 bg-neutral-900/50 shadow-inner flex items-center justify-center"></div>
                <div className="h-48 rounded-full border-2 border-amber-400 bg-neutral-900/50 shadow-inner flex items-center justify-center"></div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-amber-400 mb-3">About the event</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                E-Cell DMCE is a student-driven community dedicated to fostering innovation, creativity, and entrepreneurship by helping students transform ideas into impactful ventures. Through workshops, competitions, mentorship, networking, and industry exposure, we nurture entrepreneurial skills and turn potential into action.
              </p>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2, 3].map((idx) => (
                <button 
                  key={idx} 
                  onClick={() => setFlagshipSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${flagshipSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'}`}
                ></button>
              ))}
            </div>
          </section>

          {/* PREVIOUS EVENTS SECTION */}
          <section id="previous" className="py-16 px-6 max-w-7xl mx-auto text-white border-t border-red-900/40">
            <h2 className="text-3xl font-extrabold text-center tracking-wider text-amber-400 mb-12 uppercase">
              Our Previous Events
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              <div className="lg:col-span-2 w-full bg-white rounded-2xl shadow-2xl p-4 aspect-[4/3] flex items-center justify-center border border-amber-500/30 overflow-hidden">
                <img 
                  src="/orientation-poster.jpg" 
                  alt="Orientation Poster" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-center space-y-8 bg-black/20 p-6 rounded-2xl border border-red-900/30 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#128101;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">150+</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Students Engaged</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#127881;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">2</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Fun Activities</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-amber-400 text-3xl font-bold">&#127907;</div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">7+</div>
                    <div className="text-xs text-slate-300 tracking-wide uppercase">Faculty Guidance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center justify-center mb-8">
                <div className="h-[1px] bg-amber-500/50 w-24"></div>
                <h3 className="px-4 text-xl font-bold text-amber-400">Glimpse Of The Event</h3>
                <div className="h-[1px] bg-amber-500/50 w-24"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="h-48 rounded-full border-2 border-amber-400 bg-neutral-900/50 shadow-inner"></div>
                <div className="h-48 rounded-full border-2 border-amber-400 bg-neutral-900/50 shadow-inner"></div>
                <div className="h-48 rounded-full border-2 border-amber-400 bg-neutral-900/50 shadow-inner"></div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-amber-400 mb-3">About the event</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Orientation is the flagship introductory event of E-CELL DMCE, designed to welcome aspiring entrepreneurs, innovators, and future leaders into the world of entrepreneurship. The session introduces students to the vision, opportunities, and ecosystem of E-CELL while inspiring them to transform creative ideas into impactful ventures.
              </p>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2, 3].map((idx) => (
                <button 
                  key={idx} 
                  onClick={() => setPreviousSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${previousSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'}`}
                ></button>
              ))}
            </div>
          </section>

        </main>

        <footer id="contact" className="w-full bg-black/60 border-t border-red-950 text-slate-400 text-xs py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
            <div>
              <div className="text-amber-400 font-black tracking-widest text-lg mb-4">E-CELL</div>
              <p className="leading-relaxed text-slate-400">Location: Datta Meghe College of Engineering, Navi Mumbai</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About us</a></li>
                <li><a href="#current" className="hover:text-amber-400 transition-colors">Event</a></li>
                <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a></li>
                <li><a href="#team" className="hover:text-amber-400 transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                <li><a href="#register" className="hover:text-amber-400 transition-colors">Register</a></li>
                <li><a href="#volunteer" className="hover:text-amber-400 transition-colors">Volunteer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Contact Us</h4>
              <ul className="space-y-2">
                <li>&#9993; ecelldmce14@gmail.com</li>
                <li>&#128247; - ecell_dmce</li>
                <li>&#128188; - E-CELL_DMCE</li>
                <li>&#127760; - E-CELL_DMCE</li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 text-slate-500">
            &copy; 2026 E-CELL | E-CELL DMCE. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}