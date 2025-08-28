"use client";

import { motion } from "motion/react";
import { HyperText } from "@/components/magicui/hyper-text";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 h-16 flex items-center"

    >
      {/* Navbar Container with fixed greyish background */}
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between px-6 py-2 rounded-2xl bg-gray-200/90 backdrop-blur-md shadow-lg border border-gray-400/40">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <h1 className="font-stencil text-2xl md:text-3xl font-bold text-industrial-black">
              KWIKCNC
            </h1>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-flex px-6 py-3 bg-industrial-black text-white hover:bg-white hover:text-industrial-black hover:ring-2 hover:ring-industrial-black font-stencil-display font-bold transition-all duration-300 pill-cut-corner">
              <HyperText animateOnLoad={false} triggerOnHover={true}>GET QUOTE</HyperText>
            </button>

            <button className="px-6 py-3 bg-industrial-black text-white hover:bg-white hover:text-industrial-black hover:ring-2 hover:ring-industrial-black font-stencil-display font-bold transition-all duration-300 pill-cut-corner">
              <HyperText animateOnLoad={false} triggerOnHover={true}>JOIN KWIK</HyperText>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="sm:hidden flex flex-col space-y-1"
          >
            <span className="w-6 h-0.5 bg-industrial-black"></span>
            <span className="w-6 h-0.5 bg-industrial-black"></span>
            <span className="w-6 h-0.5 bg-industrial-black"></span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}