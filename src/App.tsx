import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import VirtualShowroom from "./components/VirtualShowroom";
import Concierge from "./components/Concierge";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Configurator from "./components/Configurator";

export default function App() {
  // If set to model ID, full-screen immersive custom config is engaged
  const [studioCarId, setStudioCarId] = useState<string | null>(null);

  // Toggles active chat overlay directly from global actions
  const [conciergeChatState, setConciergeChatState] = useState(false);

  const handleOpenConfigurator = (carId: string = "amg-gt") => {
    setStudioCarId(carId);
  };

  const handleOpenConcierge = () => {
    setConciergeChatState(true);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#050505] text-[#EAEAEA] font-inter min-h-screen selection:bg-[#D4AF37] selection:text-black relative">
      {/* Immersive 360 Studio Mode Override Overlay Toggle */}
      {studioCarId ? (
        <Configurator
          initialCarId={studioCarId}
          onClose={() => setStudioCarId(null)}
        />
      ) : (
        <>
          {/* Main sticky navigation glass header */}
          <Header
            onOpenConfigurator={() => handleOpenConfigurator("amg-gt")}
            onOpenConcierge={handleOpenConcierge}
            onScrollToSection={handleScrollToSection}
          />

          {/* Cinematic Carousel */}
          <main className="relative">
            <Hero
              onOpenConfigurator={handleOpenConfigurator}
              onScrollToSection={handleScrollToSection}
            />

            {/* Main Showcase Collections */}
            <Collection onOpenConfigurator={handleOpenConfigurator} />

            {/* Virtual reality Center with browser synthesised engine acoustics */}
            <VirtualShowroom />

            {/* VIP Concierge Service & Chat backed by server-side Gemini */}
            <Concierge chatOpenByDefault={conciergeChatState} />


            {/* Sourced Secure inquiry form & Accordion FAQs */}
            <ContactForm />
          </main>

          {/* Footer of absolute quiet luxury branding */}
          <Footer
            onOpenConfigurator={() => handleOpenConfigurator("amg-gt")}
            onOpenConcierge={handleOpenConcierge}
            onScrollToSection={handleScrollToSection}
          />
        </>
      )}

      {/* Global Concierge trigger modal if they toggled from header menu */}
      {conciergeChatState && !studioCarId && (
        <div className="fixed inset-0 z-50">
          <Concierge chatOpenByDefault={true} />
          {/* Easy close toggle buttons backdrop */}
          <button
            onClick={() => setConciergeChatState(false)}
            className="absolute top-6 right-6 bg-[#050505] text-[#D4AF37] p-2.5 rounded-full z-55 shadow-2xl hover:bg-[#D4AF37] hover:text-[#050505] border border-[#D4AF37]/35 text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer"
          >
            x Terminate Session
          </button>
        </div>
      )}
    </div>
  );
}
