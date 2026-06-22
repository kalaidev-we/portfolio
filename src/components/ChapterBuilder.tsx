"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface SkillNode {
  name: string;
  category: "Programming" | "Web" | "Database" | "AI" | "Hardware" | "Tools";
  level: string;
  projects: string;
  related: string[];
  angle: number;
  speed: number;
  distance: number;
  radius: number;
}

export default function ChapterBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  // Raw skill data
  const skillsData: Omit<SkillNode, "angle" | "speed" | "distance" | "radius">[] = [
    // Programming
    { name: "Python", category: "Programming", level: "90% (Expert)", projects: "RFID Library controller, AI automated pipelines", related: ["TensorFlow", "OpenCV", "Linux"] },
    { name: "PHP", category: "Programming", level: "85% (Advanced)", projects: "CRM Core engines, client portals", related: ["MySQL", "HTML", "CSS"] },
    { name: "Java", category: "Programming", level: "80% (Intermediate)", projects: "Academic object analysis systems", related: ["C++", "C"] },
    { name: "JavaScript", category: "Programming", level: "92% (Expert)", projects: "CRM Portal dashboard, AriseAgency frontend", related: ["React", "Node.js", "Supabase"] },
    { name: "C", category: "Programming", level: "80% (Core Developer)", projects: "Arduino firmware, microcontrollers", related: ["Arduino", "C++"] },
    { name: "C++", category: "Programming", level: "78% (Core Developer)", projects: "Intelligent systems programming", related: ["C", "Java"] },

    // Web
    { name: "HTML", category: "Web", level: "95% (Expert)", projects: "All client websites and layouts", related: ["CSS", "React"] },
    { name: "CSS", category: "Web", level: "90% (Advanced)", projects: "Custom UI frameworks, styling guides", related: ["HTML", "React", "Figma"] },
    { name: "React", category: "Web", level: "90% (Advanced)", projects: "CRM client interfaces, SPA frontends", related: ["JavaScript", "Node.js", "Supabase"] },
    { name: "Node.js", category: "Web", level: "85% (Advanced)", projects: "Secure backend microservices", related: ["JavaScript", "MySQL", "React"] },

    // Database
    { name: "MySQL", category: "Database", level: "88% (Advanced)", projects: "RFID logs DB, client databases", related: ["PHP", "Node.js"] },
    { name: "Firebase", category: "Database", level: "82% (Intermediate)", projects: "Real-time state trackers", related: ["React", "JavaScript"] },
    { name: "Supabase", category: "Database", level: "86% (Advanced)", projects: "CRM system hosting, authentication API", related: ["React", "JavaScript"] },

    // AI
    { name: "TensorFlow", category: "AI", level: "75% (Core)", projects: "Machine learning analytical modules", related: ["Python", "OpenCV"] },
    { name: "OpenCV", category: "AI", level: "80% (Intermediate)", projects: "Image recognition nodes for smart systems", related: ["Python", "TensorFlow", "Raspberry Pi"] },

    // Hardware
    { name: "Arduino", category: "Hardware", level: "88% (IoT Pro)", projects: "RFID check-in terminals, IoT sensors", related: ["C", "Raspberry Pi"] },
    { name: "Raspberry Pi", category: "Hardware", level: "82% (IoT Pro)", projects: "Intelligent systems server hubs", related: ["Python", "Arduino", "Linux"] },

    // Tools
    { name: "Git", category: "Tools", level: "90% (Expert)", projects: "All version tracking, collaborative code repo", related: ["GitHub", "VS Code"] },
    { name: "GitHub", category: "Tools", level: "88% (Advanced)", projects: "Open-source commits, continuous integration", related: ["Git", "Docker"] },
    { name: "VS Code", category: "Tools", level: "95% (Expert)", projects: "Primary development workspace", related: ["Git", "Figma"] },
    { name: "Linux", category: "Tools", level: "85% (Advanced)", projects: "Server deployment, shell scripting", related: ["Docker", "Raspberry Pi"] },
    { name: "Docker", category: "Tools", level: "78% (Intermediate)", projects: "Containerized CRM architecture", related: ["Linux", "GitHub"] },
    { name: "Figma", category: "Tools", level: "82% (UI/UX Designer)", projects: "Client mockups, wireframes", related: ["Canva", "HTML", "CSS"] },
    { name: "Canva", category: "Tools", level: "85% (Creative)", projects: "Branding materials, social media decks", related: ["Figma"] },
  ];

  // Initialize nodes with orbital geometry
  const nodesRef = useRef<SkillNode[]>([]);
  if (nodesRef.current.length === 0) {
    nodesRef.current = skillsData.map((skill, idx) => {
      // Map categories to specific orbits
      let distance = 110;
      if (skill.category === "Programming") distance = 110;
      else if (skill.category === "Web") distance = 160;
      else if (skill.category === "Database") distance = 210;
      else if (skill.category === "AI") distance = 260;
      else if (skill.category === "Hardware") distance = 300;
      else if (skill.category === "Tools") distance = 345;

      return {
        ...skill,
        angle: Math.random() * Math.PI * 2,
        speed: (0.002 + Math.random() * 0.004) * (idx % 2 === 0 ? 1 : -1), // Random speeds, alternating directions
        distance,
        radius: 6,
      };
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 700;
    let height = 700;
    let scale = 1;
    let animationId: number;
    let isVisible = true;

    // Handle canvas dimensions and screen responsiveness
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        width = parent.clientWidth;
        height = parent.clientWidth; // Keep 1:1 aspect ratio
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        // Scale galaxy elements according to container width
        scale = width / 700;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track cursor coordinates
    let mouseX = -9999;
    let mouseY = -9999;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      setHoveredSkill(null);
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Track visibility to throttle execution
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Render loop
    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isVisible) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Orbit Rings
      const orbits = [110, 160, 210, 260, 300, 345];
      ctx.strokeStyle = "rgba(255, 237, 214, 0.05)";
      ctx.lineWidth = 1;
      orbits.forEach((orbitDist) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitDist * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Center Node "KALAIARASU"
      ctx.fillStyle = "#001528";
      ctx.strokeStyle = "rgba(255, 122, 60, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glowing core effect
      ctx.fillStyle = "rgba(255, 122, 60, 0.05)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Center Node Label
      ctx.fillStyle = "#FFEDD6";
      ctx.font = `bold ${10 * scale}px var(--font-space-mono)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("KALAI", centerX, centerY - 4 * scale);
      ctx.fillText("ARASU", centerX, centerY + 8 * scale);

      // Find hovered node
      let currentlyHovered: SkillNode | null = null;

      nodesRef.current.forEach((node) => {
        const x = centerX + node.distance * Math.cos(node.angle) * scale;
        const y = centerY + node.distance * Math.sin(node.angle) * scale;
        const radius = node.radius * scale * 2.2; // Hitbox radius multiplier

        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          currentlyHovered = node;
        }
      });

      if (currentlyHovered) {
        setHoveredSkill(currentlyHovered);
      }

      // Draw Connection Lines if a node is hovered
      if (currentlyHovered) {
        const activeNode = currentlyHovered as SkillNode;
        const x1 = centerX + activeNode.distance * Math.cos(activeNode.angle) * scale;
        const y1 = centerY + activeNode.distance * Math.sin(activeNode.angle) * scale;

        // Draw connections to related nodes
        nodesRef.current.forEach((target) => {
          if (activeNode.related.includes(target.name)) {
            const x2 = centerX + target.distance * Math.cos(target.angle) * scale;
            const y2 = centerY + target.distance * Math.sin(target.angle) * scale;

            ctx.strokeStyle = "rgba(79, 140, 255, 0.35)"; // Accent blue line
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4 * scale, 4 * scale]);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // Draw Skill Nodes
      nodesRef.current.forEach((node) => {
        // Update angle slowly if not hovered
        const isHovered = hoveredSkill?.name === node.name;
        if (!isHovered) {
          node.angle += node.speed;
        }

        const x = centerX + node.distance * Math.cos(node.angle) * scale;
        const y = centerY + node.distance * Math.sin(node.angle) * scale;

        // Node Glow
        if (isHovered) {
          ctx.fillStyle = "rgba(255, 122, 60, 0.25)";
          ctx.beginPath();
          ctx.arc(x, y, 16 * scale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw core node circle
        ctx.fillStyle = isHovered ? "#FF7A3C" : "rgba(255, 237, 214, 0.2)";
        ctx.strokeStyle = isHovered ? "#FFEDD6" : "rgba(255, 237, 214, 0.4)";
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(x, y, (isHovered ? 6 : 4) * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node Name Label
        if (isHovered || width > 500) {
          ctx.fillStyle = isHovered ? "#FF7A3C" : "rgba(255, 237, 214, 0.65)";
          ctx.font = `${isHovered ? "bold" : ""} ${9 * scale}px var(--font-space-mono)`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(node.name, x + 8 * scale, y);
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [hoveredSkill]);

  return (
    <section 
      id="chapter-2" 
      ref={containerRef}
      className="relative w-full bg-bgDark py-24 px-6 md:px-12 lg:px-24 border-t border-cream/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Storytelling content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="font-mono text-xs text-accent tracking-widest uppercase">
            [ CHAPTER 02: The Builder ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream uppercase">
            SKILL GALAXY
          </h2>
          <div className="h-[1px] w-20 bg-accent/30"></div>
          
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-light">
            Instead of boring static progress bars, my technology ecosystem represents how systems coexist. Center nodes feed energy to programming languages, database structures, physical devices, and tools.
          </p>

          <p className="text-xs text-cream/50 font-mono italic">
            &ldquo;Hover/drag the nodes in the galaxy to trace integration lines, experience matrices, and project footprints.&rdquo;
          </p>

          {/* Interactive Node Matrix Information Panel */}
          <div className="glass p-6 border-cream/10 rounded-none min-h-[220px] flex flex-col justify-between relative overflow-hidden">
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5">
                    {hoveredSkill.category}
                  </span>
                  <span className="font-mono text-[10px] text-highlight uppercase tracking-wider">
                    {hoveredSkill.level}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-2xl font-bold text-cream tracking-tight uppercase">
                    {hoveredSkill.name}
                  </h4>
                </div>

                <div className="o-dashline my-2"></div>

                {/* Stats */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-highlight font-mono block text-[9px] uppercase tracking-wider">[ PRODUCTION FOOTPRINT ]</span>
                    <span className="text-cream/80 font-light">{hoveredSkill.projects}</span>
                  </div>
                  <div>
                    <span className="text-accent font-mono block text-[9px] uppercase tracking-wider">[ RELATED ARCHITECTURES ]</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {hoveredSkill.related.map((rel) => (
                        <span key={rel} className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-cream/60">
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8">
                <Brain className="h-10 w-10 text-accent/30 animate-pulse" />
                <div className="space-y-1">
                  <div className="font-mono text-xs text-cream/55 uppercase tracking-widest">[ GALAXY AUTO-ORBIT ACTIVE ]</div>
                  <div className="font-mono text-[10px] text-cream/35">HOVER NODES TO RESOLVE COMPILER INDEX</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: HTML5 Galaxy Canvas */}
        <div className="lg:col-span-7 flex justify-center items-center relative">
          <div className="relative w-full max-w-[600px] aspect-square flex justify-center items-center">
            {/* Background grid lines for styling */}
            <div className="absolute inset-0 border border-white/[0.02] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 rotate-45 border border-white/[0.02] rounded-full pointer-events-none"></div>
            <canvas 
              ref={canvasRef}
              className="z-10 cursor-pointer block select-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
