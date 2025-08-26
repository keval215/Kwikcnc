import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cover } from "@/components/ui/cover";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  highlightWord?: string;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 100,
  highlightWord,
  className = "",
  onComplete
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const renderText = () => {
    if (!highlightWord) {
      return displayText;
    }

    const parts = displayText.split(highlightWord);
    if (parts.length === 1) {
      return displayText;
    }

    return (
      <>
        {parts[0]}
        {displayText.includes(highlightWord) && (
          <Cover className="inline-block mx-1 font-stencil-bold">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block"
            >
              {highlightWord}
            </motion.span>
          </Cover>
        )}
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`inline-block ${className}`}>
      <span className="font-stencil-bold text-industrial-black">
        {renderText()}
      </span>
      {showCursor && (
        <span className="typewriter-cursor bg-industrial-black ml-1" />
      )}
    </div>
  );
};

export default TypewriterText;
