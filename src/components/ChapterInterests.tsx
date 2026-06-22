"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Brain, Cpu, Terminal, Briefcase, Paintbrush, ShieldCheck, Landmark } from "lucide-react";

interface InterestItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: "accent" | "highlight" | "cream";
  // Scattered initial layout coordinates
  top: string;
  left: string;
}

export default function ChapterInterests() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const interests: InterestItem[] = [
    { name: "Full Stack Development", icon: Globe, color: "highlight", top: "15%", left: "10%" },
    { name: "Artificial Intelligence", icon: Brain, color: "accent", top: "25%", left: "55%" },
    { name: "IoT & Embedded Systems", icon: Cpu, color: "accent", top: "50%", left: "15%" },
    { name: "Open Source Development", icon: Terminal, color: "cream", top: "70%", left: "45%" },
    { name: "Entrepreneurship", icon: Briefcase, color: "highlight", top: "10%", left: "75%" },
    { name: "UI/UX Design", icon: Paintbrush, color: "cream", top: "45%", left: "70%" },
    { name: "Cybersecurity", icon: ShieldCheck, color: "highlight", top: "75%", left: "10%" },
    { name: "Public Administration", icon: Landmark, color: "cream", top: "75%", left: "75%" },
  ];

  return (
    <section 
      id="chapter-7" 
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5 select-none"
    >
      {/* Narrative Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-6">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ CHAPTER 07: Interests ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
          Floating Interests
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>
        <p className="text-sm sm:text-base text-cream/60 max-w-xl mx-auto">
          Core concepts, methodologies, and domains that capture my focus. Grab, fling, and explore the tags below.
        </p>
      </div>

      {/* Constraints boundary wrapper for drag action */}
      <div 
        ref={constraintsRef}
        className="relative max-w-5xl mx-auto h-[450px] bg-black/20 border border-white/5 rounded-none overflow-hidden"
      >
        {/* Background micro grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,237,214,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,237,214,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        {/* Floating draggable cards */}
        {interests.map((item, idx) => {
          const Icon = item.icon;
          
          let borderColor = "border-white/10 text-cream";
          let shadowGlow = "hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]";
          
          if (item.color === "accent") {
            borderColor = "border-accent/20 hover:border-accent text-accent";
            shadowGlow = "hover:shadow-[0_0_15px_rgba(255,122,60,0.15)]";
          } else if (item.color === "highlight") {
            borderColor = "border-highlight/20 hover:border-highlight text-highlight";
            shadowGlow = "hover:shadow-[0_0_15px_rgba(79,140,255,0.15)]";
          }

          return (
            <motion.div
              key={idx}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragMomentum={true}
              whileDrag={{ scale: 1.08, zIndex: 50 }}
              initial={{ 
                opacity: 0,
                scale: 0.8,
                top: item.top,
                left: item.left
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                delay: idx * 0.05 
              }}
              // Slow floating drift in background
              animate={{
                y: [0, -8, 8, 0],
                x: [0, 5, -5, 0],
              }}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{
                top: item.top,
                left: item.left,
              }}
            >
              <div 
                className={`glass px-4 py-3 border ${borderColor} ${shadowGlow} rounded-none flex items-center space-x-2.5 font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300`}
                // Floating drift loop settings
                style={{
                  animation: `float-drift ${6 + idx}s ease-in-out infinite`,
                }}
              >
                <Icon size={14} />
                <span className="font-semibold select-none">{item.name}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Small interaction reminder overlay */}
        <div className="absolute bottom-3 left-4 font-mono text-[9px] text-cream/35 flex items-center space-x-1.5 uppercase pointer-events-none">
          <span>[ DRAG_GALAXY_CONSTRAINTS: BOUNDED ]</span>
        </div>
      </div>
    </section>
  );
}
