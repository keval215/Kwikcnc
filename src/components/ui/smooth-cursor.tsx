"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none"
        className="text-industrial-black"
      >
        <path 
          d="M0 0 L20 10 L8 12 L6 20 Z" 
          fill="currentColor"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}