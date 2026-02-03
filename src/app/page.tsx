import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import MissionSection from "../components/MissionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ContactSection />
    </main>
  );
}
