"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Users, ArrowRight } from "lucide-react";

interface LeadershipRole {
  id: string;
  title: string;
  org: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  shortDesc: string;
  longDesc: string;
  achievements: string[];
}

export default function ChapterLeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ events: 0, clients: 0, team: 0, freelancers: 0 });
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  // Trigger stats count up on scroll into view
  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && active) {
          const duration = 1200; // ms
          const steps = 60;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);

            setStats({
              events: Math.floor(easeProgress * 30),
              clients: Math.floor(easeProgress * 15),
              team: Math.min(3, Math.floor(easeProgress * 4)), // max 3
              freelancers: Math.floor(easeProgress * 5),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setStats({ events: 30, clients: 15, team: 3, freelancers: 5 });
            }
          }, stepTime);

          // Disconnect observer once triggered
          observer.disconnect();
          active = false;
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const roles: LeadershipRole[] = [
    {
      id: "fine-arts",
      title: "Secretary",
      org: "Fine Arts Club, PSG Polytech",
      icon: Sparkles,
      shortDesc: "Led artistic planning, cultural festivals, and large-scale team operations.",
      longDesc: "As the Secretary of the Fine Arts Club, I was tasked with driving the creative spirit of the campus. I oversaw a committee organizing multiple major events, coordinating budget allocations, and designing event stages while leading a team of 40+ student coordinators.",
      achievements: [
        "Organized 12+ institutional cultural festivals",
        "Managed artist logistics and celebrity stage coordination",
        "Pioneered creative workshops boosting student engagement by 40%",
      ],
    },
    {
      id: "tamil-mandram",
      title: "Joint Secretary",
      org: "Tamil Mandram, PSG Polytech",
      icon: Shield,
      shortDesc: "Co-directed literary workshops, debates, and public administration forums.",
      longDesc: "Tamil Mandram is one of the most respected cultural wings at PSG. Serving as Joint Secretary, I designed public speaking modules, organized state-level debates, and coordinated public relations representing college culture.",
      achievements: [
        "Co-organized state-wide inter-collegiate speech tournaments",
        "Coordinated with government representatives and administrative guests",
        "Managed public relations and print media features",
      ],
    },
    {
      id: "arise-agency",
      title: "Founder & CEO",
      org: "AriseAgency",
      icon: Users,
      shortDesc: "Established and led a technological agency scaling software and digital designs.",
      longDesc: "AriseAgency represents my entry into technology entrepreneurship. As CEO, I align our 3 core developers and 5 freelancers to ship premium website products, database architectures, and custom CRM systems to global clients.",
      achievements: [
        "Successfully served 15+ corporate clients in under 12 months",
        "Established automated agile delivery pipelines",
        "Directed end-to-end full stack architecture for key products",
      ],
    },
  ];

  return (
    <section 
      id="chapter-4" 
      ref={containerRef}
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      {/* Narrative Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ CHAPTER 04: The Leader ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
          Leadership Showcase
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>
        <p className="text-sm sm:text-base text-cream/60 max-w-xl mx-auto">
          Pioneering team efforts, coordinating institutional clubs, and leading digital operations from PSG to corporate clients.
        </p>
      </div>

      {/* Statistics Counter Dashboard */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
        <div className="glass p-6 text-center border-cream/10 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-cream/20">[ METRIC_01 ]</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent tabular-nums mb-1">
            {stats.events}+
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-cream/60 uppercase tracking-widest">
            Events Organized
          </div>
        </div>

        <div className="glass p-6 text-center border-cream/10 hover:border-highlight/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-cream/20">[ METRIC_02 ]</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-highlight tabular-nums mb-1">
            {stats.clients}+
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-cream/60 uppercase tracking-widest">
            Clients Served
          </div>
        </div>

        <div className="glass p-6 text-center border-cream/10 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-cream/20">[ METRIC_03 ]</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cream tabular-nums mb-1">
            {stats.team}
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-cream/60 uppercase tracking-widest">
            Core Team Members
          </div>
        </div>

        <div className="glass p-6 text-center border-cream/10 hover:border-highlight/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-cream/20">[ METRIC_04 ]</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-highlight tabular-nums mb-1">
            {stats.freelancers}
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-cream/60 uppercase tracking-widest">
            Freelancers Managed
          </div>
        </div>
      </div>

      {/* Leadership Role Expanding Cards */}
      <div className="max-w-5xl mx-auto space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isOpen = activeRoleId === role.id;

          return (
            <motion.div
              key={role.id}
              layout
              onClick={() => setActiveRoleId(isOpen ? null : role.id)}
              className="glass p-6 md:p-8 border-cream/10 hover:border-accent/30 transition-all duration-300 cursor-pointer rounded-none relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Icon & Title */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-full text-accent shadow-[0_0_10px_rgba(255,122,60,0.1)]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-cream uppercase tracking-tight">{role.title}</h3>
                    <p className="font-mono text-xs text-highlight">{role.org}</p>
                  </div>
                </div>

                {/* Short description overlay */}
                {!isOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 max-w-md text-xs sm:text-sm text-cream/50 font-light md:px-8"
                  >
                    {role.shortDesc}
                  </motion.div>
                )}

                {/* Expand Indicator */}
                <div className="text-xs font-mono text-cream/40 flex items-center space-x-1 uppercase">
                  <span>{isOpen ? "Collapse" : "Expand"}</span>
                  <motion.span animate={{ rotate: isOpen ? 90 : 0 }}>
                    <ArrowRight size={12} className="text-accent" />
                  </motion.span>
                </div>
              </div>

              {/* Expanded Story Details */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden mt-6"
                  >
                    <div className="o-dashline my-4"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                      
                      {/* Deep Story */}
                      <div className="lg:col-span-7 space-y-4">
                        <h4 className="font-mono text-xs uppercase text-accent tracking-wider">[ LEADERSHIP NARRATIVE ]</h4>
                        <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-light">
                          {role.longDesc}
                        </p>
                      </div>

                      {/* Achievements list */}
                      <div className="lg:col-span-5 space-y-3">
                        <h4 className="font-mono text-xs uppercase text-highlight tracking-wider">[ KEY IMPACTS ]</h4>
                        <ul className="space-y-2">
                          {role.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="flex items-start space-x-2 text-xs text-cream/55 font-mono">
                              <span className="text-accent">&rsaquo;</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
