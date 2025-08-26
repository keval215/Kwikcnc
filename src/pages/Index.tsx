import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TechnologySection from "@/components/sections/TechnologySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none relative">
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
