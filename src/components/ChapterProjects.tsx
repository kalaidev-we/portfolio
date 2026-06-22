"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, CheckCircle2 } from "lucide-react";

export default function ChapterProjects() {
  // RFID Simulator State
  const [rfidStatus, setRfidStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [rfidLog, setRfidLog] = useState<string[]>(["[SYSTEM] RFID Reader standby."]);
  const [scannedBook, setScannedBook] = useState<string | null>(null);

  // CRM Simulator State
  const [crmActiveTab, setCrmActiveTab] = useState<"students" | "tracking" | "architecture" | "roadmap">("students");

  const books = [
    { title: "Clean Code", author: "Robert C. Martin", id: "BK-9025-A" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", id: "BK-4321-X" },
    { title: "The Pragmatic Programmer", author: "Andy Hunt", id: "BK-8842-M" },
  ];

  // RFID simulation logic
  const handleRfidScan = () => {
    if (rfidStatus !== "idle") return;
    setRfidStatus("scanning");
    setRfidLog([
      "[SYSTEM] Initializing HF RFID Transceiver...",
      "[READER] Carrier frequency 13.56 MHz stabilized.",
      "[READER] Polling passive tags...",
    ]);

    setTimeout(() => {
      const selectedBook = books[Math.floor(Math.random() * books.length)];
      setScannedBook(selectedBook.title);
      setRfidLog((prev) => [
        ...prev,
        `[TAG] Found ISO 15693 tag: UID=E00401${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
        `[RESOLVING] Accessing local database register...`,
        `[RESOLVING] Match found: ${selectedBook.title} (${selectedBook.id})`,
      ]);

      setTimeout(() => {
        setRfidStatus("success");
        setRfidLog((prev) => [
          ...prev,
          `[DATABASE] Writing record: Checked out to ID=PSG-IT-2601`,
          `[SYSTEM] Gate servo released. Check-out transaction completed.`,
          `[IMPACT] Transaction completed in 1.4s. Manual queue time saved!`,
        ]);
      }, 800);

    }, 1200);
  };

  const resetRfid = () => {
    setRfidStatus("idle");
    setScannedBook(null);
    setRfidLog(["[SYSTEM] RFID Reader standby. Ready for tag scan."]);
  };

  return (
    <section 
      id="chapter-3" 
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
        <div className="font-mono text-xs text-accent tracking-widest uppercase">
          [ CHAPTER 03: Featured Projects ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
          Cinematic Case Studies
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto"></div>
        <p className="text-sm sm:text-base text-cream/60 max-w-xl mx-auto">
          Take a deep look into detailed systems I have engineered from the ground up, merging physical hardware with web stacks.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-24">

        {/* Project 1: RFID Library System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 border border-accent/25">
                COMPLETED
              </span>
              <span className="font-mono text-[10px] text-highlight uppercase tracking-widest bg-highlight/10 px-2 py-0.5 border border-highlight/25">
                ROLE: TEAM LEAD
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-cream tracking-tight uppercase leading-tight">
              RFID-Based Smart Library Automation System
            </h3>

            <div className="o-dashline"></div>

            <div className="space-y-4 text-sm font-light text-cream/70 leading-relaxed">
              <p>
                <strong className="text-cream block font-mono text-xs uppercase tracking-wider mb-1">[ THE PROBLEM ]</strong>
                Traditional libraries face bottlenecks with manual barcode scanning, leading to long queues, manual cataloging errors, and poor book tracking efficiency.
              </p>
              <p>
                <strong className="text-cream block font-mono text-xs uppercase tracking-wider mb-1">[ THE SOLUTION ]</strong>
                We built an IoT-enabled system incorporating high-frequency (13.56 MHz) RFID transceivers coupled to a secure web dashboard, permitting rapid self check-in and self check-out of cataloged books.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 font-mono text-center">
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="text-accent text-lg font-bold">75%</div>
                <div className="text-[9px] text-cream/55 uppercase">Wait Reduction</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="text-highlight text-lg font-bold">100%</div>
                <div className="text-[9px] text-cream/55 uppercase">Automated Log</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="text-cream text-lg font-bold">1.4s</div>
                <div className="text-[9px] text-cream/55 uppercase">Scan Time</div>
              </div>
            </div>
          </div>

          {/* Interactive RFID Simulator Widget */}
          <div className="lg:col-span-6">
            <div className="glass p-6 border-cream/10 rounded-none relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between border-b border-cream/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Radio size={14} className={`text-accent ${rfidStatus === "scanning" ? "animate-ping" : ""}`} />
                  <span className="font-mono text-xs uppercase tracking-wider text-cream/80">RFID ANTENNA (HF-13.56Mhz)</span>
                </div>
                <span className="font-mono text-[9px] text-cream/40">PSG_POLYTECH_LABS_2026</span>
              </div>

              {/* Graphical scan zone */}
              <div className="relative h-40 bg-bgDark/60 border border-white/5 flex items-center justify-center overflow-hidden">
                
                {/* Antennas Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.05)_0%,transparent_70%)]"></div>

                <AnimatePresence mode="wait">
                  {rfidStatus === "idle" && (
                    <motion.div 
                      key="idle" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="text-center space-y-3 z-10"
                    >
                      <div className="h-12 w-20 border-2 border-dashed border-cream/20 mx-auto flex items-center justify-center text-cream/30 text-xs">
                        [ BOOK ]
                      </div>
                      <button 
                        onClick={handleRfidScan}
                        className="px-4 py-1.5 bg-accent text-bgDark font-mono text-[10px] uppercase tracking-widest hover:shadow-[0_0_15px_rgba(255,122,60,0.3)] transition-all"
                      >
                        Simulate RFID Scan
                      </button>
                    </motion.div>
                  )}

                  {rfidStatus === "scanning" && (
                    <motion.div 
                      key="scanning"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-3 z-10"
                    >
                      <motion.div 
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-12 w-20 bg-accent/20 border-2 border-accent mx-auto flex items-center justify-center text-accent text-xs font-mono font-semibold shadow-[0_0_15px_rgba(255,122,60,0.2)]"
                      >
                        SCANNING
                      </motion.div>
                      <div className="text-[10px] font-mono text-highlight animate-pulse">[ SCANNING FREQUENCY CARRIER... ]</div>
                    </motion.div>
                  )}

                  {rfidStatus === "success" && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-3 z-10"
                    >
                      <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto glow-orange" />
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono text-cream font-bold">{scannedBook}</div>
                        <div className="text-[9px] font-mono text-green-400 uppercase tracking-widest">[ TRANSACTION GRANTED ]</div>
                      </div>
                      <button 
                        onClick={resetRfid}
                        className="px-3 py-1 border border-cream/20 hover:border-cream text-cream/70 hover:text-cream font-mono text-[9px] uppercase tracking-wider"
                      >
                        Reset Reader
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Monospace Logger */}
              <div className="space-y-1 bg-black/40 p-4 font-mono text-[10px] text-cream/65 border border-white/5 h-36 overflow-y-auto no-scrollbar">
                {rfidLog.map((log, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">
                    <span className="text-highlight font-semibold">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: CRM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
          {/* Interactive CRM Dashboard Panel Simulator on Left for Layout Balance */}
          <div className="lg:col-span-6 order-last lg:order-first">
            <div className="glass border-cream/10 rounded-none overflow-hidden flex flex-col h-[400px]">
              
              {/* Fake CRM Window Bar */}
              <div className="flex items-center justify-between bg-white/5 px-4 py-3 border-b border-cream/10">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-highlight/40"></div>
                  <span className="font-mono text-[10px] text-cream/55 uppercase tracking-widest ml-2">AriseCRM v1.0.4-dev</span>
                </div>
                <div className="font-mono text-[9px] bg-highlight/15 text-highlight border border-highlight/20 px-2 py-0.5">
                  STATUS: ACTIVE
                </div>
              </div>

              {/* Module Tab Selector */}
              <div className="grid grid-cols-4 bg-black/20 border-b border-cream/5 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer">
                <div 
                  onClick={() => setCrmActiveTab("students")}
                  className={`py-2 border-r border-cream/5 transition-all ${crmActiveTab === "students" ? "bg-accent/10 text-accent font-semibold" : "text-cream/50 hover:text-cream"}`}
                >
                  Students
                </div>
                <div 
                  onClick={() => setCrmActiveTab("tracking")}
                  className={`py-2 border-r border-cream/5 transition-all ${crmActiveTab === "tracking" ? "bg-accent/10 text-accent font-semibold" : "text-cream/50 hover:text-cream"}`}
                >
                  Project Tracker
                </div>
                <div 
                  onClick={() => setCrmActiveTab("architecture")}
                  className={`py-2 border-r border-cream/5 transition-all ${crmActiveTab === "architecture" ? "bg-accent/10 text-accent font-semibold" : "text-cream/50 hover:text-cream"}`}
                >
                  Architecture
                </div>
                <div 
                  onClick={() => setCrmActiveTab("roadmap")}
                  className={`py-2 transition-all ${crmActiveTab === "roadmap" ? "bg-accent/10 text-accent font-semibold" : "text-cream/50 hover:text-cream"}`}
                >
                  Roadmap
                </div>
              </div>

              {/* Interactive Tab Area */}
              <div className="flex-1 p-6 bg-bgDark/45 overflow-y-auto no-scrollbar font-mono text-xs">
                <AnimatePresence mode="wait">
                  
                  {/* Students Tab */}
                  {crmActiveTab === "students" && (
                    <motion.div 
                      key="students" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-3"
                    >
                      <div className="text-[10px] text-cream/40 uppercase tracking-widest mb-1 font-bold">[ STUDENT & INTERNSHIP REGISTRY ]</div>
                      
                      <div className="space-y-2">
                        <div className="p-2 border border-white/5 bg-white/[0.01] flex items-center justify-between">
                          <div>
                            <div className="text-cream font-semibold">Harish Kumar</div>
                            <div className="text-[9px] text-cream/50">Diploma IT | PSG Tech</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px]">INTERNSHIP ACTIVE</span>
                          </div>
                        </div>

                        <div className="p-2 border border-white/5 bg-white/[0.01] flex items-center justify-between">
                          <div>
                            <div className="text-cream font-semibold">Sanjay R.</div>
                            <div className="text-[9px] text-cream/50">B.Tech IT | CIT</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px]">PENDING APPROVAL</span>
                          </div>
                        </div>

                        <div className="p-2 border border-white/5 bg-white/[0.01] flex items-center justify-between">
                          <div>
                            <div className="text-cream font-semibold">Naveen M.</div>
                            <div className="text-[9px] text-cream/50">Diploma ECE | PSG Tech</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px]">COMPLETED</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Project Tracker Tab */}
                  {crmActiveTab === "tracking" && (
                    <motion.div 
                      key="tracking" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="text-[10px] text-cream/40 uppercase tracking-widest mb-1 font-bold">[ WORKFLOW & PROJECT MILESTONES ]</div>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-cream">RFID Smart Library</span>
                            <span className="text-accent font-bold">100%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-full"></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-cream">AriseCRM Backend Core</span>
                            <span className="text-highlight font-bold">75%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-highlight w-[75%]"></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-cream">Client UI Wireframes</span>
                            <span className="text-green-400 font-bold">90%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 w-[90%]"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Architecture Tab */}
                  {crmActiveTab === "architecture" && (
                    <motion.div 
                      key="architecture" 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0 }}
                      className="space-y-3 text-center py-4"
                    >
                      <div className="text-[10px] text-cream/40 uppercase tracking-widest mb-2 font-bold">[ STACK PIPELINE ]</div>
                      
                      <div className="flex flex-col items-center space-y-2 text-[10px]">
                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-cream w-44">
                          CLIENT APPLICATION (REACT)
                        </div>
                        <div className="text-accent">↓ (API Route Hook)</div>
                        <div className="px-3 py-1 bg-accent/10 border border-accent/25 text-accent w-44">
                          NEXT.JS EDGE CONTROLLER
                        </div>
                        <div className="text-highlight">↓ (PostgreSQL Connector)</div>
                        <div className="px-3 py-1 bg-highlight/10 border border-highlight/25 text-highlight w-44 font-bold">
                          SUPABASE DATA ENGINE
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Roadmap Tab */}
                  {crmActiveTab === "roadmap" && (
                    <motion.div 
                      key="roadmap" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-3"
                    >
                      <div className="text-[10px] text-cream/40 uppercase tracking-widest mb-1 font-bold">[ FEATURE PIPELINES ]</div>
                      
                      <div className="space-y-2 text-[11px] font-mono">
                        <div className="flex items-center space-x-2 text-green-400">
                          <span>✓</span>
                          <span>Student Enrollment Engine [DONE]</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-400">
                          <span>✓</span>
                          <span>Supabase Database Schema Setup [DONE]</span>
                        </div>
                        <div className="flex items-center space-x-2 text-accent">
                          <span className="animate-pulse">▶</span>
                          <span>Internship Analytics Dashboard [BUILDING]</span>
                        </div>
                        <div className="flex items-center space-x-2 text-cream/45">
                          <span>○</span>
                          <span>Automated Client Invoicing Module [Q4-26]</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Text details on Right */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[10px] text-highlight uppercase tracking-widest bg-highlight/10 px-2 py-0.5 border border-highlight/25">
                IN ACTIVE DEVELOPMENT
              </span>
              <span className="font-mono text-[10px] text-cream/60 uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/10">
                ROLE: FULL STACK DEVELOPER
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-cream tracking-tight uppercase leading-tight">
              Project Center Management CRM
            </h3>

            <div className="o-dashline"></div>

            <div className="space-y-4 text-sm font-light text-cream/70 leading-relaxed">
              <p>
                <strong className="text-cream block font-mono text-xs uppercase tracking-wider mb-1">[ THE CHALLENGE ]</strong>
                Running a technology business or project development lab manually leads to massive inefficiencies. Tracking student registrations, internship hours, project milestones, and client communications on excel sheets is error-prone.
              </p>
              <p>
                <strong className="text-cream block font-mono text-xs uppercase tracking-wider mb-1">[ THE SYSTEM ]</strong>
                I am building a completely custom SaaS CRM from scratch. Engineered with a secure dashboard structure, it offers modular panels to administer students, track internship timelines, record code footprints, and handle client logs.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cream/60">
                Next.js 15
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cream/60">
                TypeScript
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cream/60">
                Supabase
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cream/60">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
