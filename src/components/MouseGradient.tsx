"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGradient() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 35, stiffness: 150, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250); // offset half of the glow width (500px)
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,60,0.05)_0%,rgba(79,140,255,0.04)_40%,transparent_70%)] blur-[30px] will-change-transform"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
}
