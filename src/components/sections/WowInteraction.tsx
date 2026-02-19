"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 800;

function MorphingField({ progressRef }: { progressRef: any }) {
  const group = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const randomPositions: THREE.Vector3[] = [];
    const spherePositions: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      randomPositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ),
      );

      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      const radius = 5;

      spherePositions.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ),
      );
    }

    return { randomPositions, spherePositions };
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;

    group.current.children.forEach((child: any, i: number) => {
      const from = particles.randomPositions[i];
      const to = particles.spherePositions[i];
      child.position.lerpVectors(from, to, progressRef.current);
    });
  });

  return (
    <group ref={group}>
      {particles.randomPositions.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#a78bfa"
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function WowInteraction() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[140vh] flex items-center justify-center bg-linear-to-b from-[#252628] to-[#08090a] overflow-hidden z-50"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)]" />

      {/* Text Layer */}
      <div ref={textRef} className="absolute z-10 text-center max-w-2xl px-6">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white">
          From Chaos to Structure
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/60">
          Systems reorganize in response to interaction.
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 14], fov: 55 }}>
        <fog attach="fog" args={["#000000", 10, 25]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#a78bfa" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1.5}
          color="#6366f1"
        />
        <MorphingField progressRef={progressRef} />
      </Canvas>
    </section>
  );
}
