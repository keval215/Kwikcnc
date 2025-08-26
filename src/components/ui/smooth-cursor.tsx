"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DefaultCursorSVG: React.FC = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-svg"
    >
      {/* Horizontal crosshair line */}
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2.5" />
      {/* Vertical crosshair line */}
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2.5" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};

export function SmoothCursor({ 
  cursor = <DefaultCursorSVG />, 
  springConfig = { 
    damping: 25, 
    stiffness: 400, 
    mass: 0.5, 
    restDelta: 0.01 
  } 
}: SmoothCursorProps) {
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let prevPosition: Position = { x: 0, y: 0 };
    let velocity: Position = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const position: Position = { x: e.clientX, y: e.clientY };
      
      velocity = {
        x: position.x - prevPosition.x,
        y: position.y - prevPosition.y,
      };
      
      prevPosition = position;
      
      cursorX.set(position.x);
      cursorY.set(position.y);
      
      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const rotationAmount = velocity.x * 0.1;
      const scaleAmount = Math.min(1 + speed * 0.01, 1.2);
      
      rotation.set(rotationAmount);
      scale.set(scaleAmount);

      // Check if hovering over interactive elements and update color state
      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const isInteractive = !!element && (
        element.tagName === 'BUTTON' ||
        element.tagName === 'A' ||
        element.getAttribute('role') === 'button' ||
        element.classList.contains('cursor-pointer') ||
        window.getComputedStyle(element).cursor === 'pointer'
      );
      setIsHoveringInteractive(isInteractive);
    };

    const animate = () => {
      document.addEventListener('mousemove', handleMouseMove);
      animationFrame = requestAnimationFrame(animate);
    };

    // Hide default cursor and start animation
    document.body.style.cursor = 'none';
    animate();

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [cursorX, cursorY, rotation, scale]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        rotate: rotation,
        scale: scale,
        color: isHoveringInteractive ? 'hsl(var(--industrial-white))' : 'hsl(var(--industrial-black))',
      }}
    >
      {cursor}
    </motion.div>
  );
}