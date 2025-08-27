"use client";

import { motion } from "motion/react";
import TypewriterText from "@/components/TypewriterText";
import CNCPartViewer from "@/components/3d/CNCPartViewer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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
    {
      text: "STEROIDS",
      className: "text-industrial-black font-stencil",
    },
  ];

  const supportingWords = [
    {
      text: "Because",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "in",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "the",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "era",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "of",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "idea",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "to",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "app",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "in",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "mins",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "Manufacturing",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "shouldn't",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "take",
      className: "text-industrial-black font-stencil",
    },
    {
      text: "weeks",
      className: "text-industrial-black font-stencil",
    },
  ];

  // Cover animation effect removed

  // Animation timing: typewriter duration (words.length * 0.3s + stagger)
  // Show supporting text when headline typewriter completes
  const [showSupportingText, setShowSupportingText] = useState(false);

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-2">
      {/* Interactive Grid Background */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <InteractiveGridPattern
          className="w-full h-full"
          width={40}
          height={40}
          squares={[80, 50]}
          squaresClassName="stroke-industrial-medium/50 hover:fill-black hover:stroke-black transition-all duration-200"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-5 gap-8 w-full pl-6 pr-0 pt-2">
        {/* Left Side - Text Content */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <TypewriterText
              text="CNC MACHINING ON STEROIDS"
              delay={100}
              highlightWord="STEROIDS"
              className="text-4xl md:text-6xl lg:text-7xl font-stencil font-bold text-left"
              onComplete={() => setShowSupportingText(true)}
            />
          </motion.div>

          {/* Supporting Text with Typewriter animation after main typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            {showSupportingText && (
              <div className="opacity-90">
                <TypewriterText
                  text="Because in the era of idea to app in mins Manufacturing shouldn't take weeks"
                  delay={20}
                  className="text-base md:text-lg lg:text-xl text-left font-stencil"
                />
              </div>
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ShimmerButton
              className="px-8 py-4 bg-industrial-black text-white font-stencil-display font-bold text-lg border-2 border-industrial-black transition-all duration-300 shadow-lg pill-cut-corner-filled"
              shimmerColor="#ffffff"
              shimmerDuration="3s"
              borderRadius="8px"
            >
              GET STARTED
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Right Side - 3D Viewer */}
        <div className="lg:col-span-2 flex items-end justify-end pb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-lg mt-16"
          >
            <CNCPartViewer />
          </motion.div>
        </div>
      </div>
    </section>
  );
}