"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Phone, Mail, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "skalaiarasu3@gmail.com";
  const phone = "9025488266";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Easter Egg: Confetti explosion
  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FF7A3C", "#4F8CFF", "#FFEDD6"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FF7A3C", "#4F8CFF", "#FFEDD6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section 
      id="contact" 
      className="relative w-full bg-bgDark py-28 px-6 md:px-12 lg:px-24 border-t border-cream/5 flex flex-col justify-between"
    >
      {/* Decorative grid background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,122,60,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full text-center space-y-12 z-10">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ FINAL CHAPTER: Let&apos;s Build Something Amazing ]
        </div>

        {/* Cinematic Headline */}
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-cream uppercase leading-none max-w-3xl mx-auto">
          The Best Projects Are <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
            Yet To Come.
          </span>
        </h2>

        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>

        {/* Narrative Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-cream/70 leading-relaxed font-light max-w-2xl mx-auto">
          I believe technology should solve real-world problems, empower people, and create opportunities. Whether it&apos;s software, AI, IoT, or entrepreneurship, I&apos;m always looking for the next challenge. Let&apos;s combine physical systems and digital platforms into something remarkable.
        </p>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6 text-left">
          
          {/* Email Card */}
          <div className="glass p-5 border-cream/10 rounded-none flex items-center justify-between group hover:border-highlight/30 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-full text-highlight">
                <Mail size={16} />
              </div>
              <div>
                <span className="font-mono text-[9px] text-cream/40 block uppercase tracking-wider">[ SECURE_EMAIL ]</span>
                <a href={`mailto:${email}`} className="text-sm font-mono text-cream/80 hover:text-accent transition-colors">
                  {email}
                </a>
              </div>
            </div>
            <button 
              onClick={handleCopyEmail}
              className="p-2 text-cream/45 hover:text-accent hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
            >
              {copiedEmail ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="glass p-5 border-cream/10 rounded-none flex items-center justify-between group hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-full text-accent">
                <Phone size={16} />
              </div>
              <div>
                <span className="font-mono text-[9px] text-cream/40 block uppercase tracking-wider">[ CELLULAR_LINE ]</span>
                <a href={`tel:${phone}`} className="text-sm font-mono text-cream/80 hover:text-accent transition-colors">
                  +91 {phone}
                </a>
              </div>
            </div>
            <button 
              onClick={handleCopyPhone}
              className="p-2 text-cream/45 hover:text-accent hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
            >
              {copiedPhone ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-8">
          <Magnetic>
            <button 
              onClick={triggerConfetti}
              className="px-6 py-3 bg-accent text-bgDark font-mono text-xs uppercase tracking-widest rounded-none shadow-[0_0_15px_rgba(255,122,60,0.1)] hover:shadow-[0_0_25px_rgba(255,122,60,0.35)] transition-all flex items-center space-x-2"
            >
              <Sparkles size={12} />
              <span>Let&apos;s Collaborate</span>
            </button>
          </Magnetic>
          <Magnetic>
            <a 
              href="mailto:skalaiarasu3@gmail.com?subject=Collaborate%20on%20Project"
              className="px-6 py-3 border border-cream/20 text-cream hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-widest transition-all"
            >
              Email Me
            </a>
          </Magnetic>
          <Magnetic>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert("Resume PDF file placeholder. In a production build, link to actual resume.pdf asset."); }}
              className="px-6 py-3 border border-cream/20 text-cream/70 hover:text-highlight hover:border-highlight font-mono text-xs uppercase tracking-widest transition-all flex items-center space-x-1.5"
            >
              <span>View Resume</span>
              <ExternalLink size={12} />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full mt-24 pt-8 border-t border-cream/5 font-mono text-[9px] md:text-xs text-cream/35 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        <div>
          © 2026 KALAIARASU SUBRAMANIAM. ALL RIGHTS SECURED.
        </div>
        <div className="flex space-x-4">
          <span>[ STACK: NEXTJS 15 + TS + THREE.JS + LENIS ]</span>
          <span>[ VERIFICATION ID: AR-7720-M ]</span>
        </div>
      </div>
    </section>
  );
}
