"use client";

import { motion } from "framer-motion";
import { Globe, Cpu, Layers, Paintbrush, TrendingUp, Calendar, Users2 } from "lucide-react";

interface ServiceItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  tech: string[];
}

export default function ChapterEntrepreneur() {
  const services: ServiceItem[] = [
    {
      icon: Globe,
      title: "Web Development",
      desc: "Full-scale corporate applications, high-performance web applications, server-side rendered architectures, and headless CMS integrations.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Layers,
      title: "Software Development",
      desc: "Custom database portals, microservice backend structures, API integrations, and robust desktop automation software.",
      tech: ["Node.js", "Supabase", "MySQL", "PHP"],
    },
    {
      icon: Cpu,
      title: "AI Solutions",
      desc: "Autonomous workflow pipelines, predictive models, data extraction engines, and computer vision systems.",
      tech: ["Python", "TensorFlow", "OpenCV", "LangChain"],
    },
    {
      icon: Paintbrush,
      title: "Design Solutions",
      desc: "Interactive wireframes, comprehensive branding strategies, Awwwards-inspired UI/UX, and graphical branding vectors.",
      tech: ["Figma", "Canva", "Illustrator", "CSS Gradients"],
    },
  ];

  return (
    <section 
      id="chapter-5" 
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Startup Story & Growth Animation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="font-mono text-xs text-accent tracking-widest uppercase">
            [ CHAPTER 05: Entrepreneurial Journey ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
            Building More Than Projects
          </h2>
          <div className="h-[1px] w-20 bg-accent/30"></div>

          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-light">
            In May 2026, I founded <strong className="text-cream font-semibold">AriseAgency</strong> to translate software ideas into sustainable business solutions. Transitioning from developer to startup founder meant creating architectures that do not just compile, but scale and deliver real business impact.
          </p>

          {/* Startup info tags */}
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="border border-white/5 p-3 bg-white/[0.01]">
              <div className="text-cream/50 uppercase text-[9px] tracking-wider flex items-center space-x-1.5 mb-1">
                <Calendar size={10} className="text-accent" />
                <span>INCORPORATED</span>
              </div>
              <div className="text-cream font-semibold">MAY 2026</div>
            </div>
            <div className="border border-white/5 p-3 bg-white/[0.01]">
              <div className="text-cream/50 uppercase text-[9px] tracking-wider flex items-center space-x-1.5 mb-1">
                <Users2 size={10} className="text-highlight" />
                <span>CLIENT PORTFOLIO</span>
              </div>
              <div className="text-cream font-semibold">15+ CLIENTS SERVED</div>
            </div>
          </div>

          {/* Client Growth Chart Simulation */}
          <div className="glass p-6 border-cream/10 rounded-none space-y-4">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp size={14} className="text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider text-cream/80">Client Growth Velocity</span>
              </div>
              <span className="font-mono text-[9px] text-green-400">EXPLOSIVE EARLY GROWTH</span>
            </div>

            {/* SVG line chart */}
            <div className="relative h-28 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,237,214,0.03)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,237,214,0.03)" strokeWidth="0.5" />
                
                {/* Chart Path */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  d="M0,30 L15,28 L30,22 L55,18 L75,8 L100,2"
                  fill="none"
                  stroke="#FF7A3C"
                  strokeWidth="1"
                />

                {/* Glow under line */}
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.15 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 1 }}
                  d="M0,30 L15,28 L30,22 L55,18 L75,8 L100,2 L100,30 L0,30 Z"
                  fill="url(#gradient-grow)"
                />

                <defs>
                  <linearGradient id="gradient-grow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF7A3C" />
                    <stop offset="100%" stopColor="#FF7A3C" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Grid Labels */}
              <div className="absolute inset-0 flex justify-between items-end font-mono text-[8px] text-cream/40 px-1">
                <span>May 2026 (Inc.)</span>
                <span>June 2026 (15+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Services Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="glass p-6 border-cream/10 hover:border-highlight/30 transition-all duration-300 rounded-none relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
              >
                {/* Decorative floating dots */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,140,255,0.04)_0%,transparent_70%)] pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

                <div className="space-y-4">
                  {/* Service Icon */}
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-full text-highlight w-fit group-hover:text-accent group-hover:border-accent/30 transition-colors duration-300">
                    <Icon size={18} />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-cream uppercase tracking-tight group-hover:text-accent transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-cream/60 leading-relaxed font-light">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                {/* Tech tag list */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-4">
                  {svc.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-cream/40">
                      {t}
                    </span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
