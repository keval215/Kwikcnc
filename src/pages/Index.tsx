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
          "fixed inset-0 opacity-60 z-0"
        )}
        width={30}
        height={30}
        squares={[60, 60]}
        squaresClassName="stroke-white/40 fill-transparent hover:fill-white/20 hover:stroke-white/80"
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
