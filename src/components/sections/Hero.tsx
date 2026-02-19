"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Particles() {
  const points = useRef<THREE.Points>(null);

  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 6;
  }

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" />
    </points>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-between px-12 overflow-hidden">
      {/* Left Text */}
      <div className="z-10 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-semibold text-white leading-tight"
        >
          From raw data to intelligent action
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg text-white/70"
        >
          Xai transforms complex information into structured intelligence and
          actionable insights.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-white text-black rounded-md font-medium"
        >
          Explore Intelligence
        </motion.button>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <color attach="background" args={["#0a0a0a"]} />
          <ambientLight intensity={0.5} />
          <Particles />
        </Canvas>
      </div>
    </section>
  );
}
