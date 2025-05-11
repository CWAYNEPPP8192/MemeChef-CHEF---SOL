import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import RecipeCreationSection from "@/components/home/RecipeCreationSection";
import CookoffSection from "@/components/home/CookoffSection";
import FarmingSection from "@/components/home/FarmingSection";
import CharitySection from "@/components/home/CharitySection";
import TokenomicsRoadmapSection from "@/components/home/TokenomicsRoadmapSection";
import CTASection from "@/components/home/CTASection";
import { useEffect } from "react";

export default function Home() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <RecipeCreationSection />
      <CookoffSection />
      <FarmingSection />
      <CharitySection />
      <TokenomicsRoadmapSection />
      <CTASection />
    </>
  );
}
