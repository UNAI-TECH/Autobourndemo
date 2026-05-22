import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenConfigurator: (carId: string) => void;
  onScrollToSection: (id: string) => void;
}

const HERO_SLIDES = [
  {
    id: "amg-gt",
    brand: "Mercedes-AMG",
    collection: "The AMG Collection",
    titleLine1: "Mastery in",
    titleItalic: "Every Curve.",
    description: "Unrivaled performance met with precision engineering. The pinnacle of driving dynamics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALVSUFahLgauS855byWWKn0DytKACu4uQMtPz3b2d0V5XKC4FXhoO28IH04puXTFQ2vTim4rKKC-tsp0kl7pdb9qLh2GNrG369kEF75NRyDSNueByDf_cH_Qnd6unNnj4IM6rGX1acakD2m0YlukdlUZcbrj7TPcF3w1iQH1VDo4F5H5oDMGcwuN_y3BlGjP0EdMwBBXyrO464REEwuwYZPdf_K_NL9lF7YSjHuo2lZEX5WUnqZPJbeqeddNPSK1zunrHYAohfKug",
    metaText: "AMG GT 4-Door Coupe. Performance, refined."
  },
  {
    id: "q8-etron",
    brand: "Audi",
    collection: "The Audi Series",
    titleLine1: "Heritage Meets",
    titleItalic: "Performance.",
    description: "Where timeless design philosophy meets the future of electric mobility.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH-0Pjfo7WPqRHaqpB5xJl8zeDDsO-jalgoMVMA0fUdWQUUl0tfRe4up5KQeEZlSHaONRD7nDDGyqS7hVvXurQmk3aaO5XpJjw0iu00U9EIJCdIerKAe-mzZypBJvFKoTvddThsb88FPSg4K6m-C7-F-vKxKUIjRgh_wbdS3Ujr_Oq2ACaANNiEA8lmxdz7IcWVOcx-ik4stxipDpGM7i-3osjKZk34Yuo6EE_bJ2uHGJv-5sTyVykL-KM_StOIC0DElRQ9TbJ_PM",
    metaText: "Q8 Sportback e-tron. Progress through technology."
  },
  {
    id: "jaguar-xf",
    brand: "Jaguar",
    collection: "The Jaguar Fleet",
    titleLine1: "Quiet Luxury.",
    titleItalic: "Pure Power.",
    description: "Effortless elegance that commands respect on every road it touches.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLeRKC7aODidR-wCHSVOVzGZ7rcW4bpnYXVpBxUE7dcFIeNxWf5esUc6mW535H8nN54YXx-9o0Fv6TE2QG3jAik6GARn-gF1KQRq8cSziBTyWCNeelzZOYcMFtFmjC_Biljg2mxa9bZfO_D1hxrja_tWc-F2_sv7cP802SxY-q1jht33QcVOd-N4HM8Zp7-mN4YpzUmI2PWw5tNpSosE7_8Txu6aDcg18qLHSfOwtBYlCJmvQam32exs01xXdHbuf_hjCB24YSXBQ",
    metaText: "Jaguar XF. British engineering at its finest."
  }
];

const SLIDE_DURATION = 8000; // 8 seconds

export default function Hero({ onOpenConfigurator, onScrollToSection }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const slideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimers();
    return () => clearTimers();
  }, [activeIndex]);

  const startTimers = () => {
    clearTimers();
    setProgress(0);

    // Dynamic linear progress update
    const updateInterval = 50; 
    const step = (updateInterval / SLIDE_DURATION) * 100;
    
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + step;
      });
    }, updateInterval);

    // Auto switch slide after 8s
    slideTimer.current = setTimeout(() => {
      handleNext();
    }, SLIDE_DURATION);
  };

  const clearTimers = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (slideTimer.current) clearTimeout(slideTimer.current);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSlideSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section 
      id="showroom" 
      className="relative h-[92vh] min-h-[650px] md:min-h-[750px] w-full overflow-hidden bg-[#050505] pt-20"
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image zoom effect */}
            <img
              src={slide.image}
              alt={slide.brand}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                isActive ? "scale-100" : "scale-108"
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Sophisticated Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-image-overlay bg-linear-to-r from-[#050505]/95 via-[#050505]/45 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

            {/* Slide Details Content */}
            <div className="relative z-20 h-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex items-center">
              <div 
                className={`max-w-2xl transition-all duration-1000 delay-300 ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
              >
                <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-xs block mb-4">
                  {slide.collection}
                </span>
                
                <h1 className="font-playfair text-[38px] sm:text-[56px] md:text-[80px] leading-[1.1] text-white font-bold mb-6">
                  {slide.titleLine1} <br />
                  <span className="italic font-normal text-[#D4AF37] tracking-tight">{slide.titleItalic}</span>
                </h1>
                
                <p className="font-inter text-white/70 text-base sm:text-lg max-w-md leading-relaxed mb-10 font-[400]">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => onOpenConfigurator(slide.id)}
                    className="relative overflow-hidden bg-[#D4AF37] text-black px-8 py-4.5 font-bold uppercase tracking-[0.15em] text-xs rounded-full hover:bg-[#aa862c] transition-colors duration-500 shadow-xl group active:scale-95 cursor-pointer"
                  >
                    <span>Configure Now</span>
                    <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => onScrollToSection("collection")}
                    className="border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white/5 backdrop-blur-md text-white px-8 py-4.5 font-bold uppercase tracking-[0.15em] text-xs rounded-full transition-all active:scale-95 cursor-pointer"
                  >
                    View Fleet
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Manual Arrows */}
      <div className="absolute left-5 bottom-8 z-30 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
          aria-label="Previous Vehicle"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
          aria-label="Next Vehicle"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bullet Nav */}
        <div className="flex gap-2 ml-4">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideSelect(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Glassmorphic Floating Status Card (Desktop/Tablet) */}
      <div className="hidden md:block absolute right-[80px] bottom-12 z-30">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6.5 rounded-2xl border border-white/10 shadow-2xl w-80 translate-y-0 hover:-translate-y-1 transition-all duration-300">
          <h4 className="font-playfair text-xl text-[#D4AF37] mb-2 italic">Current Selection</h4>
          <p className="font-inter text-white/60 text-xs mb-5 font-[500]">
            {HERO_SLIDES[activeIndex].metaText}
          </p>
          
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37]"
              style={{
                width: `${progress}%`,
                transition: "width 50ms linear"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
