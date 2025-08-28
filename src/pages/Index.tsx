import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StoryCarousel from "@/components/sections/StoryCarousel";
import WhoAreYouSection from "@/components/sections/WhoAreYouSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none relative">
      <SmoothCursor />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <StoryCarousel />
        <WhoAreYouSection />
      </main>
    </div>
  );
};

export default Index;
