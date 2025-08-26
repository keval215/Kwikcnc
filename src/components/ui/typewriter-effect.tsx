"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { Cover } from "@/components/ui/cover";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  showCover = false,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  showCover?: boolean;
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
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
             <div key={`word-${idx}`} className="inline-block">
               {word.text === "STEROIDS" && showCover ? (
                 <Cover className="bg-industrial-black text-white font-stencil">
                   {word.text}
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
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
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