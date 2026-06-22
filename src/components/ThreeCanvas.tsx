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

    // 1. Create Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent background

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // Initial isometric position
    camera.position.set(160, 130, 160);

    // 3. Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentContainer.appendChild(renderer.domElement);

    // 4. Create Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x1e293b, 0.6);
    scene.add(ambientLight);

    // Moonlight (Directional cool blue light)
    const moonlight = new THREE.DirectionalLight(0x4f8cff, 0.8);
    moonlight.position.set(-80, 100, 50);
    moonlight.castShadow = true;
    moonlight.shadow.mapSize.width = 1024;
    moonlight.shadow.mapSize.height = 1024;
    moonlight.shadow.camera.near = 10;
    moonlight.shadow.camera.far = 300;
    const d = 100;
    moonlight.shadow.camera.left = -d;
    moonlight.shadow.camera.right = d;
    moonlight.shadow.camera.top = d;
    moonlight.shadow.camera.bottom = -d;
    scene.add(moonlight);

    // Desk Lamp SpotLight (Warm yellow)
    const lampSpotlight = new THREE.SpotLight(0xff9e59, 0, 120, Math.PI / 4, 0.5, 1);
    lampSpotlight.position.set(-28, 52, -26);
    lampSpotlight.castShadow = true;
    lampSpotlight.shadow.mapSize.width = 1024;
    lampSpotlight.shadow.mapSize.height = 1024;
    lampSpotlight.shadow.camera.near = 5;
    lampSpotlight.shadow.camera.far = 80;
    scene.add(lampSpotlight);

    // Spotlight Target (pointing to laptop center)
    const lampTarget = new THREE.Object3D();
    lampTarget.position.set(0, 35, -20);
    scene.add(lampTarget);
    lampSpotlight.target = lampTarget;

    // 5. Build 3D Room Assets (Procedural Geometries)
    const roomGroup = new THREE.Group();

    // Materials
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x000F1C, roughness: 0.5, metalness: 0.1 });
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x000710, roughness: 0.7 });
    const deskWoodMaterial = new THREE.MeshStandardMaterial({ color: 0x081d33, roughness: 0.6, metalness: 0.15 });
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.8 });
    const plasticMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });
    const screenBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 });
    const screenGlowMaterial = new THREE.MeshBasicMaterial({ color: 0x4f8cff }); // Glowing screen
    const windowGlassMaterial = new THREE.MeshBasicMaterial({ color: 0x1e3a8a }); // Window glow
    const bookColors = [
      new THREE.MeshStandardMaterial({ color: 0xff7a3c, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x4f8cff, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.6 }),
    ];

    // Floor Base
    const floorGeo = new THREE.BoxGeometry(160, 6, 160);
    const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Left Wall
    const wallLeftGeo = new THREE.BoxGeometry(6, 120, 160);
    const wallLeftMesh = new THREE.Mesh(wallLeftGeo, wallMaterial);
    wallLeftMesh.position.set(-80, 60, 0);
    wallLeftMesh.receiveShadow = true;
    roomGroup.add(wallLeftMesh);

    // Right Wall
    const wallRightGeo = new THREE.BoxGeometry(160, 120, 6);
    const wallRightMesh = new THREE.Mesh(wallRightGeo, wallMaterial);
    wallRightMesh.position.set(0, 60, -80);
    wallRightMesh.receiveShadow = true;
    roomGroup.add(wallRightMesh);

    // Wall Window Pane (Glowing pane on Left Wall)
    const windowGeo = new THREE.BoxGeometry(2, 60, 40);
    const windowMesh = new THREE.Mesh(windowGeo, windowGlassMaterial);
    windowMesh.position.set(-77.5, 70, 0);
    roomGroup.add(windowMesh);

    // Window Frame
    const windowFrameGeo = new THREE.BoxGeometry(3, 62, 2);
    const frameLeft = new THREE.Mesh(windowFrameGeo, plasticMaterial);
    frameLeft.position.set(-77, 70, -20);
    const frameRight = frameLeft.clone();
    frameRight.position.set(-77, 70, 20);
    roomGroup.add(frameLeft);
    roomGroup.add(frameRight);

    // Desk Setup
    const deskTopGeo = new THREE.BoxGeometry(80, 3, 45);
    const deskTop = new THREE.Mesh(deskTopGeo, deskWoodMaterial);
    deskTop.position.set(0, 35, -20);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    roomGroup.add(deskTop);

    // Desk Legs
    const legGeo = new THREE.CylinderGeometry(1.5, 1.5, 35, 8);
    const leg1 = new THREE.Mesh(legGeo, metalMaterial);
    leg1.position.set(-36, 17.5, -38);
    leg1.castShadow = true;
    leg1.receiveShadow = true;
    const leg2 = leg1.clone();
    leg2.position.set(36, 17.5, -38);
    const leg3 = leg1.clone();
    leg3.position.set(-36, 17.5, -2);
    const leg4 = leg1.clone();
    leg4.position.set(36, 17.5, -2);
    roomGroup.add(leg1, leg2, leg3, leg4);

    // Laptop Setup
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 36.5, -16);

    const laptopBaseGeo = new THREE.BoxGeometry(16, 0.4, 11);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, plasticMaterial);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Laptop Screen Assembly
    const laptopScreenGroup = new THREE.Group();
    laptopScreenGroup.position.set(0, 0.2, -5.3); // pivot point on base back edge

    const laptopLidGeo = new THREE.BoxGeometry(16, 11, 0.4);
    const laptopLid = new THREE.Mesh(laptopLidGeo, plasticMaterial);
    laptopLid.position.set(0, 5.5, -0.2);
    laptopLid.castShadow = true;
    laptopScreenGroup.add(laptopLid);

    const laptopScreenGeo = new THREE.BoxGeometry(15.2, 10.2, 0.1);
    const laptopScreen = new THREE.Mesh(laptopScreenGeo, screenGlowMaterial);
    laptopScreen.position.set(0, 5.5, 0.05);
    laptopScreenGroup.add(laptopScreen);

    // Tilt the screen back slightly
    laptopScreenGroup.rotation.x = -Math.PI / 10;
    laptopGroup.add(laptopScreenGroup);
    roomGroup.add(laptopGroup);

    // Swivel Chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 16);

    // Base Post
    const postGeo = new THREE.CylinderGeometry(1.5, 1.5, 16, 8);
    const chairPost = new THREE.Mesh(postGeo, metalMaterial);
    chairPost.position.y = 11;
    chairPost.castShadow = true;
    chairGroup.add(chairPost);

    // Five-star wheel legs
    const starGeo = new THREE.BoxGeometry(16, 1, 2);
    const starLeg1 = new THREE.Mesh(starGeo, metalMaterial);
    starLeg1.position.y = 3.5;
    chairGroup.add(starLeg1);
    const starLeg2 = starLeg1.clone();
    starLeg2.rotation.y = Math.PI / 2;
    chairGroup.add(starLeg2);

    // Seat group (to allow rotation)
    const seatGroup = new THREE.Group();
    seatGroup.position.y = 19;

    const seatGeo = new THREE.BoxGeometry(18, 2, 18);
    const chairSeat = new THREE.Mesh(seatGeo, plasticMaterial);
    chairSeat.castShadow = true;
    chairSeat.receiveShadow = true;
    seatGroup.add(chairSeat);

    const backrestGeo = new THREE.BoxGeometry(18, 16, 2);
    const chairBack = new THREE.Mesh(backrestGeo, plasticMaterial);
    chairBack.position.set(0, 9, 8.5);
    chairBack.rotation.x = -Math.PI / 36;
    chairBack.castShadow = true;
    seatGroup.add(chairBack);

    chairGroup.add(seatGroup);
    roomGroup.add(chairGroup);

    // Reading Desk Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-28, 36.5, -34);

    const lampBaseGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.8, 12);
    const lampBase = new THREE.Mesh(lampBaseGeo, metalMaterial);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Vertical Neck Pole
    const lampPoleGeo = new THREE.CylinderGeometry(0.6, 0.6, 14, 8);
    const lampPole = new THREE.Mesh(lampPoleGeo, metalMaterial);
    lampPole.position.set(0, 7.8, -1);
    lampPole.rotation.x = Math.PI / 18;
    lampPole.castShadow = true;
    lampGroup.add(lampPole);

    // Curved Upper neck
    const lampUpperGeo = new THREE.CylinderGeometry(0.6, 0.6, 12, 8);
    const lampUpper = new THREE.Mesh(lampUpperGeo, metalMaterial);
    lampUpper.position.set(0, 14.5, 2.5);
    lampUpper.rotation.x = -Math.PI / 6;
    lampUpper.castShadow = true;
    lampGroup.add(lampUpper);

    // Lamp Shade
    const shadeGeo = new THREE.ConeGeometry(3.5, 6, 16);
    const lampShade = new THREE.Mesh(shadeGeo, metalMaterial);
    lampShade.position.set(0, 15.5, 8);
    lampShade.rotation.x = Math.PI / 3;
    lampShade.castShadow = true;
    lampGroup.add(lampShade);
    roomGroup.add(lampGroup);

    // Potted Green Plant
    const plantGroup = new THREE.Group();
    plantGroup.position.set(30, 36.5, -34);

    const potGeo = new THREE.CylinderGeometry(3.5, 2.2, 5.5, 12);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x9061f9, roughness: 0.6 }); // Purple pot
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.castShadow = true;
    pot.receiveShadow = true;
    plantGroup.add(pot);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 }); // Green leaves
    const leafGeo = new THREE.SphereGeometry(3.2, 8, 8);
    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.position.set(-1.5, 3.8, 0);
    leaf1.scale.set(0.8, 1.4, 0.8);
    const leaf2 = leaf1.clone();
    leaf2.position.set(1.5, 4.2, -1);
    leaf2.scale.set(1, 1.6, 1);
    const leaf3 = leaf1.clone();
    leaf3.position.set(0, 4.5, 1.5);
    leaf3.scale.set(0.9, 1.3, 0.9);
    plantGroup.add(leaf1, leaf2, leaf3);
    roomGroup.add(plantGroup);

    // Coffee Mug (Orange)
    const mugGroup = new THREE.Group();
    mugGroup.position.set(18, 36.5, -14);
    const mugGeo = new THREE.CylinderGeometry(1.8, 1.8, 3.2, 12);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xff7a3c, roughness: 0.4 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.castShadow = true;
    mugGroup.add(mug);
    const handleGeo = new THREE.TorusGeometry(1.2, 0.4, 6, 12, Math.PI);
    const mugHandle = new THREE.Mesh(handleGeo, mugMat);
    mugHandle.position.set(1.8, 0, 0);
    mugHandle.rotation.z = -Math.PI / 2;
    mugGroup.add(mugHandle);
    roomGroup.add(mugGroup);

    // Shelves on the back wall
    const shelfGeo = new THREE.BoxGeometry(45, 1.5, 8);
    const shelf1 = new THREE.Mesh(shelfGeo, deskWoodMaterial);
    shelf1.position.set(25, 80, -75);
    shelf1.castShadow = true;
    shelf1.receiveShadow = true;
    roomGroup.add(shelf1);

    const shelf2 = new THREE.Mesh(new THREE.BoxGeometry(8, 1.5, 40), deskWoodMaterial);
    shelf2.position.set(-75, 85, -20);
    shelf2.castShadow = true;
    shelf2.receiveShadow = true;
    roomGroup.add(shelf2);

    // Books on Wall Shelves
    const bookGeo = new THREE.BoxGeometry(2, 7, 5);
    const bookCount = 7;
    for (let i = 0; i < bookCount; i++) {
      const book = new THREE.Mesh(bookGeo, bookColors[i % bookColors.length]);
      book.position.set(10 + i * 2.8, 84.3, -75);
      book.castShadow = true;
      roomGroup.add(book);
    }

    // Leaning books
    const bookLean = new THREE.Mesh(bookGeo, bookColors[1]);
    bookLean.position.set(30, 83.8, -75);
    bookLean.rotation.z = -Math.PI / 8;
    bookLean.castShadow = true;
    roomGroup.add(bookLean);

    // Add Room Group to Scene
    scene.add(roomGroup);

    // 6. Floating Tech Shapes (orbiting skill representations)
    const floatGroup = new THREE.Group();
    floatGroup.position.set(0, 60, -10);

    const tech1Geo = new THREE.TorusGeometry(5, 1.5, 8, 24);
    const tech1Mat = new THREE.MeshStandardMaterial({ color: 0x4f8cff, roughness: 0.2, metalness: 0.6 });
    const techTorus = new THREE.Mesh(tech1Geo, tech1Mat);
    techTorus.position.set(-20, 6, -10);
    techTorus.castShadow = true;
    floatGroup.add(techTorus);

    const tech2Geo = new THREE.SphereGeometry(3.8, 16, 16);
    const tech2Mat = new THREE.MeshStandardMaterial({ color: 0xff7a3c, roughness: 0.1, metalness: 0.7 });
    const techSphere = new THREE.Mesh(tech2Geo, tech2Mat);
    techSphere.position.set(22, 10, -5);
    techSphere.castShadow = true;
    floatGroup.add(techSphere);

    const tech3Geo = new THREE.CylinderGeometry(3.5, 3.5, 7, 6);
    const tech3Mat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.5 });
    const techHex = new THREE.Mesh(tech3Geo, tech3Mat);
    techHex.position.set(-6, 14, 18);
    techHex.rotation.x = Math.PI / 4;
    techHex.castShadow = true;
    floatGroup.add(techHex);

    scene.add(floatGroup);

    // 7. Ambient Particle Field (representing micro-ideas)
    const starsCount = 100;
    const starsGeo = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 500;
      starsPositions[i * 3 + 1] = Math.random() * 200 - 30;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const starSystem = new THREE.Points(starsGeo, starMaterial);
    scene.add(starSystem);

    // 8. Animation & Interaction State
    let animationId: number;
    let isVisible = true;
    let targetScroll = 0;
    let currentScroll = 0;

    // Mouse positions
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

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

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.15;
      targetMouseY = (e.clientY - height / 2) * 0.15;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    window.addEventListener("scroll", handleScroll);

    // Observer to pause when canvas is completely hidden
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(currentContainer);

    // Camera config mapper
    const getCameraConfig = (scroll: number) => {
      const config = {
        pos: new THREE.Vector3(),
        lookAt: new THREE.Vector3(),
        lampIntensity: 0.1,
        ambientIntensity: 0.6,
        moonlightIntensity: 0.8,
        screenGlow: 0.6,
      };

      if (scroll < 0.15) {
        const t = scroll / 0.15;
        config.pos.set(160, 130, 160);
        config.lookAt.set(0, 22, 0);
        config.lampIntensity = THREE.MathUtils.lerp(0.1, 0.2, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.6, 0.5, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.8, 0.7, t);
        config.screenGlow = THREE.MathUtils.lerp(0.6, 0.8, t);
      } else if (scroll < 0.35) {
        const t = (scroll - 0.15) / 0.2;
        config.pos.lerpVectors(new THREE.Vector3(160, 130, 160), new THREE.Vector3(50, 48, 50), t);
        config.lookAt.lerpVectors(new THREE.Vector3(0, 22, 0), new THREE.Vector3(0, 36, -20), t);
        config.lampIntensity = THREE.MathUtils.lerp(0.2, 0.3, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.5, 0.45, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.7, 0.6, t);
        config.screenGlow = THREE.MathUtils.lerp(0.8, 1.0, t);
      } else if (scroll < 0.55) {
        const t = (scroll - 0.35) / 0.2;
        config.pos.lerpVectors(new THREE.Vector3(50, 48, 50), new THREE.Vector3(-60, 65, 80), t);
        config.lookAt.lerpVectors(new THREE.Vector3(0, 36, -20), new THREE.Vector3(10, 42, -10), t);
        config.lampIntensity = THREE.MathUtils.lerp(0.3, 0.4, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.45, 0.4, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.6, 0.5, t);
        config.screenGlow = THREE.MathUtils.lerp(1.0, 1.1, t);
      } else if (scroll < 0.75) {
        const t = (scroll - 0.55) / 0.2;
        config.pos.lerpVectors(new THREE.Vector3(-60, 65, 80), new THREE.Vector3(25, 75, 45), t);
        config.lookAt.lerpVectors(new THREE.Vector3(10, 42, -10), new THREE.Vector3(0, 35, -20), t);
        config.lampIntensity = THREE.MathUtils.lerp(0.4, 0.5, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.4, 0.3, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.5, 0.4, t);
        config.screenGlow = THREE.MathUtils.lerp(1.1, 1.2, t);
      } else if (scroll < 0.9) {
        const t = (scroll - 0.75) / 0.15;
        config.pos.lerpVectors(new THREE.Vector3(25, 75, 45), new THREE.Vector3(100, 75, -80), t);
        config.lookAt.lerpVectors(new THREE.Vector3(0, 35, -20), new THREE.Vector3(0, 25, -10), t);
        // Dim environment light, bright lamp, strong screen glow for cozy Night-mode theme
        config.lampIntensity = THREE.MathUtils.lerp(0.5, 2.5, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.3, 0.15, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.4, 0.2, t);
        config.screenGlow = THREE.MathUtils.lerp(1.2, 1.8, t);
      } else {
        const t = (scroll - 0.9) / 0.1;
        config.pos.lerpVectors(new THREE.Vector3(100, 75, -80), new THREE.Vector3(170, 130, 170), t);
        config.lookAt.lerpVectors(new THREE.Vector3(0, 25, -10), new THREE.Vector3(0, 22, 0), t);
        config.lampIntensity = THREE.MathUtils.lerp(2.5, 1.2, t);
        config.ambientIntensity = THREE.MathUtils.lerp(0.15, 0.4, t);
        config.moonlightIntensity = THREE.MathUtils.lerp(0.2, 0.6, t);
        config.screenGlow = THREE.MathUtils.lerp(1.8, 0.8, t);
      }

      return config;
    };

    // Render loop
    const cameraLookAtVec = new THREE.Vector3(0, 22, 0);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // 1. Interpolate Scroll
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // 2. Interpolate Mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // 3. Compute target camera position from scroll
      const config = getCameraConfig(currentScroll);

      // Add mouse drift parallax shifts
      const finalCamX = config.pos.x + currentMouseX * 0.1;
      const finalCamY = config.pos.y - currentMouseY * 0.1;
      const finalCamZ = config.pos.z + currentMouseX * 0.1;

      camera.position.set(
        THREE.MathUtils.lerp(camera.position.x, finalCamX, 0.06),
        THREE.MathUtils.lerp(camera.position.y, finalCamY, 0.06),
        THREE.MathUtils.lerp(camera.position.z, finalCamZ, 0.06)
      );

      // Interpolate camera LookAt focus
      cameraLookAtVec.lerp(config.lookAt, 0.06);
      camera.lookAt(cameraLookAtVec);

      // 4. Update lights dynamically
      ambientLight.intensity = config.ambientIntensity;
      moonlight.intensity = config.moonlightIntensity;
      lampSpotlight.intensity = config.lampIntensity;

      // Update emissive screen brightness
      screenGlowMaterial.color.setHex(0x4f8cff).multiplyScalar(config.screenGlow);

      // 5. Animate individual meshes
      const elapsedTime = performance.now() * 0.001;

      // Rotate floating tech nodes
      techTorus.rotation.y = elapsedTime * 0.5;
      techTorus.rotation.x = elapsedTime * 0.2;
      techTorus.position.y = 6 + Math.sin(elapsedTime * 1.5) * 1.8;

      techSphere.rotation.z = elapsedTime * 0.3;
      techSphere.position.y = 10 + Math.cos(elapsedTime * 1.2) * 1.5;

      techHex.rotation.y = elapsedTime * 0.6;
      techHex.position.y = 14 + Math.sin(elapsedTime * 2.0) * 1.6;

      // Rotate swivel chair backrest/seat group slightly based on cursor coordinate
      seatGroup.rotation.y = THREE.MathUtils.lerp(seatGroup.rotation.y, (currentMouseX * 0.003), 0.05);

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();

      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      floorGeo.dispose();
      wallLeftGeo.dispose();
      wallRightGeo.dispose();
      windowGeo.dispose();
      windowFrameGeo.dispose();
      deskTopGeo.dispose();
      legGeo.dispose();
      laptopBaseGeo.dispose();
      laptopLidGeo.dispose();
      laptopScreenGeo.dispose();
      postGeo.dispose();
      starGeo.dispose();
      seatGeo.dispose();
      backrestGeo.dispose();
      lampBaseGeo.dispose();
      lampPoleGeo.dispose();
      lampUpperGeo.dispose();
      shadeGeo.dispose();
      potGeo.dispose();
      leafGeo.dispose();
      mugGeo.dispose();
      handleGeo.dispose();
      shelfGeo.dispose();
      bookGeo.dispose();
      tech1Geo.dispose();
      tech2Geo.dispose();
      tech3Geo.dispose();
      starsGeo.dispose();

      floorMaterial.dispose();
      wallMaterial.dispose();
      deskWoodMaterial.dispose();
      metalMaterial.dispose();
      plasticMaterial.dispose();
      screenBaseMaterial.dispose();
      screenGlowMaterial.dispose();
      windowGlassMaterial.dispose();
      potMat.dispose();
      leafMat.dispose();
      mugMat.dispose();
      tech1Mat.dispose();
      tech2Mat.dispose();
      tech3Mat.dispose();
      starMaterial.dispose();
      bookColors.forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none overflow-hidden opacity-90"
    />
  );
}
