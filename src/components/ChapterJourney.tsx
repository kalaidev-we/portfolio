"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, Compass, Briefcase, MapPin } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  meta: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  details: string[];
}

export default function ChapterJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the journey container for drawing the path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestones: Milestone[] = [
    {
      year: "2022",
      title: "Completed SSLC",
      subtitle: "Secondary School Education",
      description: "Laid the foundational analytical skills, initiating a deep curiosity for computing, logic, and building systems.",
      meta: "Namakkal, Tamil Nadu",
      icon: Award,
      details: ["Initiated programming with basic scripting", "Analytical problem solving focus"],
    },
    {
      year: "2024",
      title: "Completed HSC",
      subtitle: "Higher Secondary Education",
      description: "Advanced into core mathematics, physics, and computer science. Confirmed the path towards software engineering and IoT architectures.",
      meta: "Namakkal, Tamil Nadu",
      icon: Compass,
      details: ["Excelled in Physics and Mathematics", "Built simple static web interfaces"],
    },
    {
      year: "2026",
      title: "Diploma in Information Technology",
      subtitle: "PSG Polytechnic College",
      description: "Studied at the prestigious PSG Polytechnic College. Immersed in database design, networking, software engineering, and microcontrollers. Graduated with an outstanding academic record.",
      meta: "Coimbatore | 11.0218° N, 77.0028° E",
      icon: GraduationCap,
      details: ["Cumulative Grade: 80.4%", "Led RFID-based IoT final project", "Fine Arts & Tamil Mandram leadership roles"],
    },
    {
      year: "2026",
      title: "Founded AriseAgency",
      subtitle: "Technology Startup Launch",
      description: "Transitioned from student to entrepreneur. Founded AriseAgency to provide world-class web development, custom software, AI automations, and design solutions to corporate clients.",
      meta: "CEO & Founder | Active Ventures",
      icon: Briefcase,
      details: ["Served 15+ clients within first months", "Managed team of 3 core developers and 5 freelancers"],
    },
  ];

  return (
    <section 
      id="chapter-1" 
      ref={containerRef}
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      {/* Narrative Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ CHAPTER 01: The Journey ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
          Storytelling Timeline
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>
        <p className="text-lg sm:text-xl font-light text-cream/70 italic max-w-2xl mx-auto leading-relaxed">
          &ldquo;Every developer starts somewhere. Mine began with curiosity, a computer, and a desire to build solutions.&rdquo;
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Glowing Timeline Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-white/5 pointer-events-none">
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-accent via-highlight to-accent shadow-[0_0_10px_rgba(255,122,60,0.5)] origin-top"
          />
        </div>

        {/* Milestone Cards List */}
        <div className="space-y-16">
          {milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = milestone.icon;

            return (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="h-8 w-8 rounded-full bg-bgDark border-2 border-accent flex items-center justify-center shadow-[0_0_12px_rgba(255,122,60,0.3)] cursor-pointer hover:border-highlight hover:shadow-[0_0_12px_rgba(79,140,255,0.4)] transition-all duration-300"
                  >
                    <Icon className="h-3 w-3 text-cream" />
                  </motion.div>
                </div>

                {/* Content Card Side */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card p-6 md:p-8 rounded-none relative overflow-hidden"
                  >
                    {/* Corner Tag */}
                    <div className="absolute top-0 right-0 bg-white/5 border-l border-b border-white/10 px-3 py-1 font-mono text-[9px] text-cream/50 uppercase tracking-widest">
                      {milestone.year}
                    </div>

                    {/* Metadata Header */}
                    <div className="flex items-center space-x-2 text-accent font-mono text-[10px] uppercase tracking-wider mb-2">
                      <span>[ MILESTONE ]</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse"></span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-cream mb-1 tracking-tight">
                      {milestone.title}
                    </h3>
                    <div className="text-xs text-highlight font-mono mb-4 flex items-center space-x-1">
                      <MapPin size={10} />
                      <span>{milestone.meta}</span>
                    </div>

                    {/* Dashed Line */}
                    <div className="o-dashline mb-4"></div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-light mb-4">
                      {milestone.description}
                    </p>

                    {/* Details checklist */}
                    <ul className="space-y-1.5">
                      {milestone.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2 text-[11px] sm:text-xs text-cream/50 font-mono">
                          <span className="text-accent">&rsaquo;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Empty side layout placeholder to enforce grid space on desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
