import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import MissionSection from "../components/MissionSection";
import VideoSection from "../components/VideoSection";
import ContribuaSection from "../components/ContribuaSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <VideoSection />
      <ContribuaSection />
      <ContactSection />
    </main>
  );
}
