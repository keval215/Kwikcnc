"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

const specs = [
  { label: "Precision", value: "±0.001", unit: "inches", icon: "⚡" },
  { label: "Speed", value: "24", unit: "hr turnaround", icon: "🚀" },
  { label: "Materials", value: "50+", unit: "certified", icon: "🔧" },
  { label: "Capacity", value: "10k", unit: "parts/month", icon: "⚙️" },
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function TechnologySection() {
  return (
    <section className="relative py-20 bg-industrial-light">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #343a40 1px, transparent 1px),
            linear-gradient(180deg, #343a40 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-stencil font-bold text-industrial-black mb-6">
            CUTTING-EDGE TECHNOLOGY
          </h2>
          <p className="text-xl text-industrial-medium max-w-3xl mx-auto font-stencil-display">
            Our state-of-the-art CNC machines deliver unparalleled precision and speed
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg border border-industrial-medium hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{spec.icon}</div>
              <div className="font-stencil text-3xl font-bold text-industrial-black mb-2">
                {spec.label === "Materials" ? (
                  <><AnimatedCounter end={50} />+</>
                ) : spec.label === "Capacity" ? (
                  <><AnimatedCounter end={10} />k</>
                ) : spec.label === "Speed" ? (
                  <><AnimatedCounter end={24} /></>
                ) : (
                  spec.value
                )}
              </div>
              <div className="text-industrial-medium font-stencil-display">
                {spec.unit}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Machine Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "5-AXIS MILLS",
              description: "Complex geometries with single setup precision",
              features: ["±0.0001\" tolerance", "Titanium capable", "Automated tool changes"]
            },
            {
              title: "SWISS LATHES",
              description: "High-volume production with exceptional quality",
              features: ["Live tooling", "Sub-spindle operations", "Bar feeding"]
            },
            {
              title: "EDM SYSTEMS",
              description: "Intricate patterns and tight tolerances",
              features: ["Wire & sinker EDM", "Hardened materials", "Complex contours"]
            }
          ].map((machine, index) => (
            <motion.div
              key={machine.title}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-6 shadow-lg border border-industrial-medium"
            >
              <h3 className="font-stencil text-xl font-bold text-industrial-black mb-3">
                {machine.title}
              </h3>
              <p className="text-industrial-medium mb-4 font-stencil-display">
                {machine.description}
              </p>
              <ul className="space-y-2">
                {machine.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-industrial-medium">
                    <span className="w-2 h-2 bg-industrial-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}