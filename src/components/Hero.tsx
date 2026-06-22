"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ThreeCanvas from "./ThreeCanvas";
import Magnetic from "./Magnetic";
import { Terminal, MapPin, Cpu, Briefcase } from "lucide-react";

const words = [
  "Building Digital Experiences",
  "Developing Intelligent Systems",
  "Leading Innovative Projects",
  "Creating Solutions That Matter",
];

export default function Hero() {
  const ageRef = useRef<HTMLSpanElement>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Real-time Age Counter (Direct DOM manipulation for 60fps performance without React re-renders)
  useEffect(() => {
    const birthDate = new Date("2005-10-15T00:00:00");
    let frameId: number;

    const updateAge = () => {
      const now = new Date();
      const diffTime = now.getTime() - birthDate.getTime();
      const ageInYears = diffTime / (365.2425 * 24 * 60 * 60 * 1000);
      
      if (ageRef.current) {
        ageRef.current.innerText = ageInYears.toFixed(9);
      }
      frameId = requestAnimationFrame(updateAge);
    };

    frameId = requestAnimationFrame(updateAge);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText((prev) => prev.slice(0, -1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypewriterText((prev) => currentWord.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && typewriterText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before delete
    } else if (isDeleting && typewriterText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, wordIndex]);

  // Handle Scroll to Journey
  const scrollToJourney = () => {
    const nextSection = document.getElementById("chapter-1");
    if (nextSection) {
      (window as unknown as { lenis?: { scrollTo: (t: HTMLElement) => void } }).lenis?.scrollTo(nextSection);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-bgDark py-8 px-6 md:px-12 lg:px-24">
      {/* Background WebGL particle field */}
      <ThreeCanvas />

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.08, 0.15, 0.08], y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 md:left-24 text-[10px] md:text-xs font-mono text-highlight hidden md:block"
        >
          <pre>{`const arise = new Agency("AriseAgency");\nawait arise.launch({ services: ["AI", "Web"] });`}</pre>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0.05, 0.12, 0.05], y: [15, -15, 15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-10 md:right-24 text-[10px] md:text-xs font-mono text-accent hidden md:block"
        >
          <pre>{`rfid.on("scan", (uid) => {\n  library.checkOut(uid);\n  log("RFID Scanned: " + uid);\n});`}</pre>
        </motion.div>
        <motion.div 
          animate={{ opacity: [0.06, 0.1, 0.06], x: [-10, 10, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 text-[10px] md:text-xs font-mono text-cream/40 hidden lg:block"
        >
          <pre>{`import tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64, activation='relu')\n])`}</pre>
        </motion.div>
      </div>

      {/* Top Header Navigation */}
      <div className="w-full flex items-center justify-between z-10 border-b border-cream/5 pb-4 font-mono text-xs text-cream/70">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="tracking-widest"
        >
          [ KALAIARASU.S ]
        </motion.div>
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2">
            <MapPin size={12} className="text-accent" />
            <span>Namakkal, TN</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs tracking-wider">AVAILABLE FOR HIRE</span>
          </div>
        </div>
      </div>

      {/* Main Hero Body */}
      <div className="flex-1 flex flex-col justify-center z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Typographic Headline & Tagline */}
          <div className="lg:col-span-8 space-y-6">
            <div className="font-mono text-xs md:text-sm text-accent tracking-widest uppercase">
              [ CHAPTER 00: The Beginning ]
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream uppercase leading-[0.95]">
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="block"
              >
                Kalaiarasu
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight"
              >
                Subramaniam
              </motion.span>
            </h1>

            <div className="h-6 font-mono text-sm sm:text-lg text-cream/80 typewriter-cursor">
              {typewriterText}
            </div>

            <p className="max-w-xl text-xs sm:text-sm md:text-base text-cream/60 leading-relaxed font-sans font-light">
              Aspiring Full Stack Developer, Tech Entrepreneur, and AI & IoT enthusiast. Graduate of PSG Polytechnic College with a vision to merge physical hardware and digital architectures into intelligent products.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-highlight uppercase">
                <Briefcase size={10} />
                <span>Full Stack</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-accent uppercase">
                <Cpu size={10} />
                <span>IoT & AI</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cream/70 uppercase">
                <Terminal size={10} />
                <span>Entrepreneur</span>
              </span>
            </div>
          </div>

          {/* Call to Actions & Magnetic Buttons */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col lg:space-y-4 gap-4 justify-start lg:justify-center items-start lg:items-end">
            <Magnetic>
              <button 
                onClick={scrollToJourney}
                className="group relative px-6 py-3 bg-accent text-bgDark font-mono text-xs uppercase tracking-widest rounded-none overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,122,60,0.4)]"
              >
                Explore Journey
              </button>
            </Magnetic>
            <Magnetic>
              <a 
                href="mailto:skalaiarasu3@gmail.com" 
                className="group inline-block px-6 py-3 border border-cream/20 text-cream font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
              >
                Hire Me
              </a>
            </Magnetic>
          </div>

        </div>
      </div>

      {/* Bottom Technical Widget Bar */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-cream/5 font-mono text-[10px] md:text-xs text-cream/60 z-10">
        
        {/* Real-time Age Widget */}
        <div className="flex flex-col space-y-1">
          <span className="text-accent uppercase tracking-wider">[ RUNNING TIME ]</span>
          <div className="text-cream text-xs md:text-sm font-semibold tabular-nums tracking-widest">
            AGE: <span ref={ageRef} className="text-highlight">20.000000000</span> YRS
          </div>
        </div>

        {/* Founder Indicator */}
        <div className="flex flex-col space-y-1">
          <span className="text-highlight uppercase tracking-wider">[ STARTUP LABS ]</span>
          <div className="text-cream text-xs md:text-sm font-semibold">
            FOUNDER & CEO: <a href="#chapter-5" className="hover:text-accent underline transition-all">AriseAgency</a>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div 
          onClick={scrollToJourney}
          className="flex flex-col sm:items-end space-y-1 cursor-pointer group"
        >
          <span className="text-cream/50 uppercase tracking-wider group-hover:text-accent transition-all">
            [ SCROLL OR CLICK TO PROCEED ]
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-cream font-semibold group-hover:translate-y-1 transition-transform duration-300">▼</span>
            <div className="h-[2px] w-12 bg-cream/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent animate-pulse-slow"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
