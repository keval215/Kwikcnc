"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  animateOnLoad?: boolean;
  duration?: number;
  framerProps?: object;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const HyperText = ({
  children,
  className,
  animateOnLoad = true,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
}: HyperTextProps) => {
  const [displayText, setDisplayText] = useState(children.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (interations.current < children.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= interations.current
              ? children[i]
              : ALPHABET[Math.floor(Math.random() * 26)]
          )
        );
        interations.current = interations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (children.length * 10));
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [children, duration, trigger, animateOnLoad]);

  return (
    <motion.span
      className={cn(
  "font-mono",
        className,
      )}
      {...framerProps}
      onMouseEnter={triggerAnimation}
    >
      {displayText.join("")}
    </motion.span>
  );
};