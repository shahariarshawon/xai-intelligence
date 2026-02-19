"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Ingest Data",
    desc: "Collect raw signals from distributed sources and pipelines.",
  },
  {
    title: "Analyze with AI",
    desc: "Machine learning models structure and interpret complexity.",
  },
  {
    title: "Generate Insight",
    desc: "Actionable intelligence emerges from structured patterns.",
  },
];

export default function InsightFlow() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-linear-to-b from-[#0a0a0a] to-[#08090a]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-5xl px-12">
          <div className="absolute left-6 top-0 h-full w-[2px] bg-white/10">
            <motion.div
              style={{ scaleY: lineScale }}
              className="origin-top w-full h-full bg-linear-to-b from-violet-400 to-indigo-500"
            />
          </div>

          <div className="space-y-32">
            {steps.map((step, i) => {
              const start = i / steps.length;
              const end = (i + 1) / steps.length;

              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.2, 1],
              );

              const y = useTransform(scrollYProgress, [start, end], [60, 0]);

              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [0.9, 1],
              );

              return (
                <motion.div
                  key={step.title}
                  style={{ opacity, y, scale }}
                  className="relative pl-20"
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 45,
                    }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className="absolute left-0 top-2 w-12 h-12 
                               border border-violet-500/40
                               bg-[#252628]
                               backdrop-blur-md rounded-lg"
                  />

                  <h2 className="text-4xl font-semibold text-white">
                    {step.title}
                  </h2>

                  <p className="mt-4 text-lg text-white/60 max-w-xl">
                    {step.desc}
                  </p>

                  <motion.div
                    style={{
                      scaleX: useTransform(
                        scrollYProgress,
                        [start, end],
                        [0, 1],
                      ),
                    }}
                    className="origin-left h-[2px] bg-[#252628] mt-6"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
