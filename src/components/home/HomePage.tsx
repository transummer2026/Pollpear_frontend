import CallToActionSection from "@/components/home/Section/CallToActionSection";
import HeroSection from "@/components/home/Section/HeroSection";
import HowItWorksSection from "@/components/home/Section/HowItWorksSection";
import PollTypesSection from "@/components/home/Section/PollTypesSection";
import PublicSideSection from "@/components/home/Section/PublicSideSection";
import RoomsSection from "@/components/home/Section/RoomsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <PollTypesSection />
        <PublicSideSection />
        <RoomsSection />
        <HowItWorksSection />
        <CallToActionSection />
      </main>
    </div>
  );
}
