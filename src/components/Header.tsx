import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenConcierge: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenConfigurator, onOpenConcierge, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Showroom", id: "showroom" },
    { name: "Collection", id: "collection" },
    { name: "VIP Concierge", id: "concierge" },
    { name: "Virtual Tour", id: "virtual" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#050505]/95 backdrop-blur-md py-3 shadow-md border-white/10"
          : "bg-[#050505]/60 backdrop-blur-sm py-5 border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-5 md:px-[80px]">
        {/* Left corner: Menu & Logo */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#D4AF37] hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <a
            id="header-brand-logo"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="h-10 md:h-12 flex items-center transition-transform hover:scale-[1.02]"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs0WMBM7vbk0lDcOUOrovBTpusc2CNy2Mk4ACbjMpyjR4OG04-xEJGqIjnHyDTIiY_5eNZDMqTgNHacN2Ieb4_9IC0tYGJnsxHjeX1MQTd6BsnE8Cwl6A6LM1YXhZCw_1Am2-_19wqFBhFtv8e_IsbJV52WyON7GsqryIga5tLPGJj39Z1k2JMC2Myo5fPEoqpPzBoVllt6kntaXF5B9pHOc-h25n7lCClEzWzFtMf1hUJBfJTIi28JmwES41ja4mGqWoHbPODPAg"
              alt="AutoBourn Logo"
              className="h-9 md:h-11 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Center Links (Desktop only) */}
        <nav id="desktop-navbar" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollToSection(link.id)}
              className="text-white/60 hover:text-[#D4AF37] transition-colors font-semibold uppercase tracking-[0.2em] text-[11px] focus:outline-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right tools */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            id="360-configurator-direct-btn"
            onClick={onOpenConfigurator}
            className="relative overflow-hidden bg-[#D4AF37] text-black px-4 md:px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-lg hover:opacity-95 transition-all focus:outline-none cursor-pointer active:scale-95"
            style={{
              backgroundImage: "linear-gradient(135deg, #D4AF37 0%, #aa862c 100%)"
            }}
          >
            <span className="relative z-10">360 Configurator</span>
            {/* Shimmer overlay */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rotate-[45deg] bg-linear-to-br from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_5s_infinite]" />
          </button>
          
          <button
            id="member-portal-btn"
            onClick={onOpenConcierge}
            className="p-1.5 text-white/80 hover:text-[#D4AF37] transition-colors focus:outline-none rounded-full hover:bg-white/10"
            title="VIP Membership Portal"
          >
            <User className="w-5.5 h-5.5" />
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Sourced Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[280px] h-full bg-[#0a0a0a] border-r border-white/10 shadow-2xl p-6 transition-transform duration-300 flex flex-col justify-between ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <span className="font-playfair font-bold text-lg tracking-wider text-[#D4AF37]">NAVIGATION</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-white/60 hover:text-[#D4AF37]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection(link.id);
                  }}
                  className="text-left py-1 text-white/80 hover:text-[#D4AF37] text-sm font-semibold uppercase tracking-widest border-b border-white/5"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full bg-[#D4AF37] text-black py-3 font-bold uppercase text-[11px] tracking-widest hover:bg-[#aa862c] transition-all rounded-xs"
            >
              Start 360 Configurator
            </button>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full border border-white/20 bg-white/5 text-white py-3 font-bold uppercase text-[11px] tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-xs"
            >
              VIP Concierge Advisor
            </button>
            <p className="text-[9px] text-white/40 uppercase tracking-widest text-center mt-3">
              EST. 2008 • Marine Drive Central
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
