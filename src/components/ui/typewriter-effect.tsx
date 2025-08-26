"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { Cover } from "@/components/ui/cover";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  onComplete,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      "span",
      {
        display: "inline-block",
        opacity: 1,
      },
      {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      }
    );
    // estimate total duration and call onComplete when done
    if (onComplete) {
      const totalChars = words.reduce((acc, w) => acc + w.text.length, 0);
      const staggerDelay = 0.1; // seconds (matches stagger above)
      const charAnimDuration = 0.3; // seconds (matches duration above)
      const totalTimeMs = Math.max(0, (totalChars - 1) * staggerDelay + charAnimDuration) * 1000 + 80;
      const t = setTimeout(() => onComplete(), totalTimeMs);
      return () => clearTimeout(t);
    }
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
             <div key={`word-${idx}`} className="inline-block">
               {/* Always render typewriter effect, no cover animation for STEROIDS */}
                {word.text === "STEROIDS" ? (
                  <Cover key={`word-cover-${idx}`}>
                    {word.text.split("").map((char, index) => (
                      <motion.span
                        initial={{}}
                        key={`char-${index}`}
                        className={cn(
                          `dark:text-white text-black opacity-0 hidden`,
                          word.className
                        )}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </Cover>
                ) : (
                  word.text.split("").map((char, index) => (
                    <motion.span
                      initial={{}}
                      key={`char-${index}`}
                      className={cn(
                        `dark:text-white text-black opacity-0 hidden`,
                        word.className
                      )}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
               &nbsp;
             </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};