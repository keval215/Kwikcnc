import { CometCard } from "@/components/ui/comet-card";
import { Wrench, Factory } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Scroll-triggered TypewriterText component
const ScrollTriggeredTypewriter = ({ 
  text, 
  delay = 150, 
  className = "" 
}: { 
  text: string; 
  delay?: number; 
  className?: string; 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing animation
  useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, isVisible]);

  // Cursor blinking effect - only show while typing
  useEffect(() => {
    if (currentIndex < text.length) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    } else {
      // Hide cursor when typing is complete
      setShowCursor(false);
    }
  }, [currentIndex, text.length]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <span className="font-stencil text-black">
        {displayText}
      </span>
      {showCursor && (
        <span className="inline-block w-0.5 h-8 md:h-12 bg-black ml-1 animate-pulse" />
      )}
    </div>
  );
};

export default function WhoAreYouSection() {
  return (
    <section className="py-32 -mt-24 bg-transparent text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 relative z-30">
        {/* Section Header */}
        <div className="text-center mb-12 relative z-40">
          <div className="text-4xl md:text-5xl font-stencil font-bold mb-4 flex justify-center">
            <div className="min-w-[400px] md:min-w-[500px] text-center">
              <ScrollTriggeredTypewriter 
                text="Who Are You?" 
                delay={150}
                className="text-black"
              />
            </div>
          </div>
          <p className="text-xl text-gray-700 font-stencil-display font-semibold">
            To serve you better, tell us who you are:
          </p>
        </div>

        {/* Two Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto relative z-30">
          {/* Card 1 - I want CNC machined Parts */}
          <CometCard>
            <button
              type="button"
              className="flex w-full h-64 cursor-pointer flex-col items-center justify-center rounded-[16px] border-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-10 transition-all duration-300 hover:from-[#3a3a3a] hover:to-[#2a2a2a]"
              aria-label="I want CNC machined Parts"
            >
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="p-4 rounded-full bg-gray-600/20 border border-gray-500/30">
                    <Wrench className="w-10 h-10 text-gray-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-stencil">
                  I want CNC machined Parts
                </h3>
                <div className="flex items-center justify-center text-gray-300 font-stencil-display">
                  <span className="text-sm">Take me there</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </button>
          </CometCard>

          {/* Card 2 - I provide CNC machining services */}
          <CometCard>
            <button
              type="button"
              className="flex w-full h-64 cursor-pointer flex-col items-center justify-center rounded-[16px] border-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-10 transition-all duration-300 hover:from-[#3a3a3a] hover:to-[#2a2a2a]"
              aria-label="I provide CNC machining services"
            >
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="p-4 rounded-full bg-gray-600/20 border border-gray-500/30">
                    <Factory className="w-10 h-10 text-gray-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-stencil">
                  I provide CNC machining services
                </h3>
                <div className="flex items-center justify-center text-gray-300 font-stencil-display">
                  <span className="text-sm">Take me there</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </button>
          </CometCard>
        </div>
      </div>
    </section>
  );
}