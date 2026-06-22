"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // Particles Data
    const particleCount = 80;
    const maxDistance = 110;
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    // Initialize particles randomly inside a cube
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 600;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // slow drift velocity
      velocities.push(
        (Math.random() - 0.5) * 0.4, // vx
        (Math.random() - 0.5) * 0.4, // vy
        (Math.random() - 0.5) * 0.4  // vz
      );
    }

    // Particle Geometry & Material
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create a circular particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFF7A3C, // Accent Orange
      size: 5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: texture,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line Connections Geometry & Material
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4F8CFF, // Highlight Blue
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const connections = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(connections);

    // Animation variables
    let animationId: number;
    let isVisible = true;

    // Resize handler
    const handleResize = () => {
      if (!currentContainer) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Mouse drift factor
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.04;
      targetY = (e.clientY - height / 2) * 0.04;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Pause animation when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(currentContainer);

    // Render loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Inertia rotation towards cursor target
      scene.rotation.y += (targetX * 0.0002 - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetY * 0.0002 - scene.rotation.x) * 0.05;

      const posAttribute = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = posAttribute.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Boundary rebound inside a 600px cube space
        if (Math.abs(posArray[i3]) > 300) velocities[i3] *= -1;
        if (Math.abs(posArray[i3 + 1]) > 300) velocities[i3 + 1] *= -1;
        if (Math.abs(posArray[i3 + 2]) > 300) velocities[i3 + 2] *= -1;
      }
      posAttribute.needsUpdate = true;

      // Calculate connections
      let lineIndex = 0;
      const linePosArray = lineGeometry.getAttribute("position").array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x1 = posArray[i3];
        const y1 = posArray[i3 + 1];
        const z1 = posArray[i3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const x2 = posArray[j3];
          const y2 = posArray[j3 + 1];
          const z2 = posArray[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Draw connector line
            linePosArray[lineIndex++] = x1;
            linePosArray[lineIndex++] = y1;
            linePosArray[lineIndex++] = z1;
            linePosArray[lineIndex++] = x2;
            linePosArray[lineIndex++] = y2;
            linePosArray[lineIndex++] = z2;
          }
        }
      }

      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex / 3);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();

      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none overflow-hidden opacity-30"
    />
  );
}
