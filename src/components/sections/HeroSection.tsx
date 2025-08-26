"use client";

import { motion } from "motion/react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Cover } from "@/components/ui/cover";
import CNCPartViewer from "@/components/3d/CNCPartViewer";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const words = [
    {
      text: "CNC",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "MACHINING",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "ON",
      className: "text-industrial-black font-stencil",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Interactive Grid Background */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-0 opacity-30"
        )}
      />
      
      {/* Technical Drawing Overlays */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-industrial-medium/20 to-transparent"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #6c757d 1px, transparent 1px),
              linear-gradient(180deg, #6c757d 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        <div 
          className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-tl from-industrial-dark/20 to-transparent"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #343a40 1px, transparent 1px)
            `,
            backgroundSize: '15px 15px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 w-full max-w-7xl mx-auto px-6 pt-20">
        {/* Left Side - Text Content */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Heading with Typewriter */}
            <TypewriterEffect
              words={words}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-left"
              cursorClassName="bg-industrial-black"
            />
            
            {/* STEROIDS with Cover Effect */}
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold font-stencil">
              <Cover className="bg-industrial-black text-white">
                STEROIDS
              </Cover>
            </div>
          </motion.div>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-industrial-medium font-stencil-display font-medium">
              PRECISION • SPEED • QUALITY • INNOVATION
            </p>
            <p className="text-lg text-industrial-medium max-w-2xl leading-relaxed">
              Revolutionary CNC machining services that deliver precision parts faster than ever before. 
              Experience the future of manufacturing with our cutting-edge technology.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-industrial-black text-white font-stencil-display font-bold text-lg border-2 border-industrial-black hover:bg-transparent hover:text-industrial-black transition-all duration-300 shadow-lg hover:shadow-xl">
              START PROJECT
            </button>
            <button className="px-8 py-4 bg-transparent text-industrial-black font-stencil-display font-bold text-lg border-2 border-industrial-black hover:bg-industrial-black hover:text-white transition-all duration-300">
              VIEW CAPABILITIES
            </button>
          </motion.div>
        </div>

        {/* Right Side - 3D Viewer */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-lg"
          >
            <CNCPartViewer />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-industrial-medium rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-industrial-medium rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}