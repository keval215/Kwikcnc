import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TechnologySection from "@/components/sections/TechnologySection";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none relative">
      {/* Global Interactive Grid Background */}
      <InteractiveGridPattern
        className={cn(
          "fixed inset-0 opacity-20 pointer-events-none"
        )}
        width={20}
        height={20}
        numSquares={80}
        maxOpacity={0.3}
      />
      
      <SmoothCursor />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TechnologySection />
      </main>
    </div>
  );
};

export default Index;
