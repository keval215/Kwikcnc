"use client";

import { motion } from "motion/react";
import { HyperText } from "@/components/magicui/hyper-text";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <h1 className="font-stencil text-2xl md:text-3xl font-bold text-primary">
            KWIKCNC
          </h1>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            className="hidden sm:inline-flex bg-transparent border-2 border-industrial-black text-industrial-black hover:bg-industrial-black hover:text-white font-stencil-display font-bold transition-all duration-300"
          >
            <HyperText>GET QUOTE</HyperText>
          </Button>
          
          <Button
            size="lg"
            className="bg-industrial-black text-white hover:bg-industrial-dark font-stencil-display font-bold border-2 border-industrial-black transition-all duration-300"
          >
            <HyperText>JOIN KWIK</HyperText>
          </Button>
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
    </motion.nav>
  );
}