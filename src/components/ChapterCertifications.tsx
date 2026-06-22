"use client";

import { MouseEvent, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, GraduationCap, Server } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  verifyId: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  details: string;
}

// Reusable custom 3D Tilt Card component
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Limit rotation to 8 degrees in any direction
    const rotateX = ((yc - y) / yc) * 8;
    const rotateY = ((x - xc) / xc) * 8;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 0.15s ease-out, border 0.3s ease, box-shadow 0.3s ease",
      }}
      className="glass p-6 border-cream/10 rounded-none relative overflow-hidden transition-all hover:shadow-[0_12px_32px_rgba(255,122,60,0.06)] hover:border-accent/30 flex flex-col justify-between h-[220px] select-none group"
    >
      {/* Decorative holographic gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-highlight/[0.02] to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      {children}
    </div>
  );
}

export default function ChapterCertifications() {
  const certifications: Certificate[] = [
    {
      title: "AI & ML Internship",
      issuer: "Yale IT Hub",
      date: "August 2025",
      verifyId: "CRED-YALE-AI-824",
      icon: GraduationCap,
      details: "Practical hands-on training in machine learning modeling, computer vision pipelines, and deep neural network designs.",
    },
    {
      title: "Python Programming with Industry Applications",
      issuer: "PSG Nodal Center",
      date: "September 2025",
      verifyId: "CRED-PSG-PY-921",
      icon: Award,
      details: "Specialized training focusing on advanced Python structures, script optimizations, and corporate backend scripting.",
    },
    {
      title: "Building and Programming of Intelligent Systems (IoT)",
      issuer: "PSG Nodal Center",
      date: "January 2026",
      verifyId: "CRED-PSG-IOT-312",
      icon: Server,
      details: "Comprehensive training in embedded microcontroller architectures, sensor node integrations, and wireless communication.",
    },
    {
      title: "Ethical Hacking Workshop",
      issuer: "Systech",
      date: "February 2026",
      verifyId: "CRED-SYS-EH-749",
      icon: ShieldCheck,
      details: "Practiced penetration testing methodologies, security audits, firewall bypasses, and secure coding practices.",
    },
  ];

  return (
    <section 
      id="chapter-6" 
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      {/* Narrative Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ CHAPTER 06: Certifications & Learning ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
          Achievement Wall
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>
        <p className="text-sm sm:text-base text-cream/60 max-w-xl mx-auto">
          Credential registrations and technical qualifications validating my academic coursework and independent system studies.
        </p>
      </div>

      {/* Grid Wall of 3D Tilt Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, idx) => {
          const Icon = cert.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            >
              <TiltCard>
                <div className="space-y-4">
                  {/* Top line */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-cream/40 uppercase tracking-widest">{cert.date}</span>
                    <Icon size={16} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-cream uppercase tracking-tight line-clamp-2 min-h-[40px]">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-[10px] text-highlight uppercase tracking-wider mt-1">{cert.issuer}</p>
                  </div>

                  {/* Dashed line */}
                  <div className="o-dashline my-2"></div>

                  {/* Details summary */}
                  <p className="text-[11px] text-cream/65 font-light leading-relaxed line-clamp-3">
                    {cert.details}
                  </p>
                </div>

                {/* Secure verify code bottom */}
                <div className="font-mono text-[8px] text-cream/35 tracking-widest pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>[ VERIFIED REGISTER ]</span>
                  <span className="text-highlight group-hover:text-accent transition-colors">{cert.verifyId}</span>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
