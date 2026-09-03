import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface CyberCore3DProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const CyberCore3D: React.FC<CyberCore3DProps> = ({
  className = '',
  size = 480,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isLight = theme === 'light';

    // 3. 3D Objects Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core Icosahedron Wireframe
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0xc91d22 : 0xe5252a,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.65 : 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, wireMat);
    mainGroup.add(coreMesh);

    // Inner Inner Solid Glow Core
    const innerGeo = new THREE.OctahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Outer Orbital Ring 1
    const ringGeo1 = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x64748b : 0xe5252a,
      transparent: true,
      opacity: isLight ? 0.4 : 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Outer Orbital Ring 2 (Perpendicular)
    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0xe5252a : 0x38bdf8,
      transparent: true,
      opacity: isLight ? 0.45 : 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // Outer Orbital Ring 3 (Equatorial segmented)
    const ringGeo3 = new THREE.TorusGeometry(2.8, 0.015, 16, 60);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x334155 : 0x94a3b8,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 2;
    mainGroup.add(ring3);

    // 4. Floating Vertex Points (Particle Cloud)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);

      // Red or White/Slate particles
      if (Math.random() > 0.65) {
        particleColors[i * 3] = 0.9;
        particleColors[i * 3 + 1] = 0.15;
        particleColors[i * 3 + 2] = 0.18;
      } else {
        particleColors[i * 3] = isLight ? 0.3 : 0.8;
        particleColors[i * 3 + 1] = isLight ? 0.4 : 0.9;
        particleColors[i * 3 + 2] = isLight ? 0.5 : 1.0;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 5. Mouse Interaction & Inertia
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = -(clientY / rect.height - 0.5) * 2;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Group rotation linked with mouse tilt
      mainGroup.rotation.y = time * 0.25 + mouse.x * 0.8;
      mainGroup.rotation.x = time * 0.15 + mouse.y * 0.6;

      // Independent multi-axis counter rotations
      coreMesh.rotation.y = time * 0.35;
      coreMesh.rotation.z = time * 0.2;

      innerMesh.rotation.y = -time * 0.5;
      innerMesh.rotation.x = -time * 0.3;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.3;
      ring3.rotation.x = time * 0.25;

      particleSystem.rotation.y = -time * 0.1;

      // Breathing pulsation
      const scale = 1 + Math.sin(time * 1.8) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme, size, interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: '100%', height: '100%', minHeight: '320px' }}
    />
  );
};
