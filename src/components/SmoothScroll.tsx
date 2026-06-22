"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis scroll with GSAP ticker
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);

    // Disable lag smoothing in GSAP for better sync
    gsap.ticker.lagSmoothing(0);

    // Store lenis globally for component actions
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      (window as unknown as { lenis: Lenis | undefined }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
