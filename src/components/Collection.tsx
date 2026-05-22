import { useState } from "react";
import { FLEET_CARS } from "../data";
import { CarSpec } from "../types";
import { Eye, Settings2, Sliders, Activity, Zap, Play, Info } from "lucide-react";

interface CollectionProps {
  onOpenConfigurator: (carId: string) => void;
}

export default function Collection({ onOpenConfigurator }: CollectionProps) {
  const [selectedCar, setSelectedCar] = useState<CarSpec | null>(null);

  const carouselImages = [
    {
      id: "jaguar-xf",
      label: "Jaguar Fleet",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwA-ctBMWrLE5lNz1b19MTWilHhg4W9UlSvEyzjxJRAN8kjcnwSJtdoM6gKAODmDCCLCL-YP6SjxZFJos6FB2tc3DTZwxrwggSAyIzOWlUS8xEcyog4iny7GkCxkMeVJKNiLcI67KDCsrFE84PkZ8n9EnuBEotrRxxZUfYXXFto9MddQuMDjZG1UHTFPmcGAv1u2DY7dg4B41t8ckAOW2LOFjCFuykmzDJyOm8akyCD5pp8hVVRDQUbQ1HkqDNyzAlLPdcE0ZYLM"
    },
    {
      id: "xuv700-executive",
      label: "Bespoke SUV Edition",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY0ZlljCH87lVygWeMsnKPMBTKN0ZQ7XF54RTXdixOggDRV1HZuJHEB0DGTBTs8BakoWXZ_EGpAGVXABgfvCODunswyL5qnjLCMJypLSd73LDk6Xb4iJ_lfY2xf3U7ICeIwN94QTqs1sI9FOJJxpgustV0_J7keULTRA3qRUum4HUSDRKkN8PKcKiZJ-3H_ldSQJ8XgrQKJ0cKfhMEgqdmJxKb2lHYFjXg2oxUb_tfDUo_xGlULS5oxx5hTk8Og2pQG40qryZYOFk"
    },
    {
      id: "amg-gt",
      label: "Mercedes AMG GT",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzQNVYHywLrztquz4nFRrrJ90yDsLufcGOqnLLKg9WQeke6QHoh3UC0dl3YLCDbgZ8c6TSfiUFrQwAvvTcvbLQlxeTGe5bswo4hiP1e0cm_PVDSBj9GHkUu9uA6gwrquecDIBm0I9-aTigBChHBunS4V6_HM6y19264oYdPxG8xN6Z6Oc8Xvm_D7U6a0KJZJTV9AlLiuNYAlCVbWajVV49AnZtq6ARK88wg8EDQSvagFMuHD82VKtmSp80YNKkzp66uh6i9wUmf_M"
    },
    {
      id: "q8-etron",
      label: "Audi Progressive Fleet",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuATPB573jVXOGTXioKwKONEVpDH2qlRGwyMd74shDQ-TZySzKCbn_dIRK6tZqytVpld-MZmB9MjZwuTMpdgaqGDdsRG0UaQogs--gnyRa5LMqduzT7YyH3Kdyxq4dI9prKGc9uO7mN-iMwAnKlQvNKXBvKHUig5Jl_ESK_psGd0_0-KjdSIG6JXsjzpMZGfmSPcJYEcucl3wf9AJR-uRFYaKxUXnv_aIMUqV8SAE21QufNtwRUO8uSGh7ILtEl7K-q7tUM0j2Q4_eU"
    }
  ];

  return (
    <section 
      id="collection" 
      className="py-24 bg-[#050505] border-y border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px] mb-12 text-center animate-fade-in">
        <h2 className="font-playfair text-[32px] md:text-5xl mb-4 font-bold tracking-tight text-white">
          The Automatic Collection
        </h2>
        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold">
          Continuously Updated Performance
        </p>
      </div>

      {/* Marquee Glide Track */}
      <div className="relative mb-20">
        <div className="flex gap-8 hover:[animation-play-state:paused] animate-[glide_35s_linear_infinite] whitespace-nowrap py-4">
          {/* Double content array to make a perfect seamless loop */}
          {[...carouselImages, ...carouselImages].map((car, idx) => {
            const staticCarData = FLEET_CARS.find(fc => fc.id === car.id);
            return (
              <div
                key={`${car.id}-${idx}`}
                onClick={() => staticCarData && setSelectedCar(staticCarData)}
                className="min-w-[280px] md:min-w-[480px] aspect-[16/10] bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer group shrink-0 border border-white/5"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    alt={car.label}
                    className="w-full h-full object-cover filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    src={car.url}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle label hover and action overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center text-white">
                    <div>
                      <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1 font-inter">
                        {staticCarData?.brand || "AutoBourn"}
                      </p>
                      <h4 className="font-playfair text-lg font-bold">
                        {staticCarData?.name || car.label}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <span className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet Showcase Grid Section */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">
        <div className="text-center mb-10">
          <p className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-white/75 text-xs font-semibold tracking-wider uppercase mb-3">
            Interactive Roster
          </p>
          <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold">
            Select Your Commission
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET_CARS.map((car) => (
            <div
              key={car.id}
              className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 hover:bg-white/5 hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/5 mb-4 bg-black relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-black/85 text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#D4AF37]/20 rounded-xs">
                    {car.price}
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block font-inter">
                  {car.brand}
                </span>
                <h4 className="font-playfair text-xl font-bold text-white mt-1 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {car.name}
                </h4>
                <p className="text-xs text-white/65 line-clamp-2 leading-relaxed mb-4 font-inter font-[300]">
                  {car.description}
                </p>

                {/* Performance Chips overlay */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[9px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-sm font-semibold tracking-wider uppercase text-white/60">
                    {car.horsepower} HP
                  </span>
                  <span className="text-[9px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-sm font-semibold tracking-wider uppercase text-white/60">
                    0-60: {car.acceleration}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-white/10">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2.5 px-3 rounded-full font-bold uppercase tracking-wider text-[9px] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#D4AF37]" /> Specs
                </button>
                <button
                  onClick={() => onOpenConfigurator(car.id)}
                  className="bg-[#D4AF37] hover:bg-[#aa862c] text-black py-2.5 px-3 rounded-full font-bold uppercase tracking-wider text-[9px] transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" /> Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Detail Specs Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] rounded-3xl max-w-2xl w-full p-6 md:p-8 relative border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 bg-white/5 hover:bg-white/15 text-white/80 p-2 rounded-full border border-white/10 transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            <div className="mb-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-inter">
                {selectedCar.brand} Specification Registry
              </span>
              <h3 className="font-playfair text-3xl font-bold text-white mt-1">
                {selectedCar.name}
              </h3>
              <p className="font-inter italic text-[#D4AF37]/80 text-sm mt-1">
                "{selectedCar.tagline}"
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#111111] flex items-center justify-center p-2">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs parameters */}
              <div className="space-y-3.5">
                <h4 className="font-playfair text-lg font-bold text-[#D4AF37] pb-1 border-b border-white/10">
                  Technical Data
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-inter">
                  <div className="text-white/55">Base Investment:</div>
                  <div className="font-semibold text-white">{selectedCar.price}</div>

                  <div className="text-white/55">Power Rating:</div>
                  <div className="font-semibold text-white">{selectedCar.horsepower} HP</div>

                  <div className="text-white/55">Top Velocity:</div>
                  <div className="font-semibold text-white">{selectedCar.topSpeed}</div>

                  <div className="text-white/55">0 - 100 km/h:</div>
                  <div className="font-semibold text-white">{selectedCar.acceleration}</div>

                  <div className="text-white/55">Propulsion Unit:</div>
                  <div className="font-semibold text-white line-clamp-1">{selectedCar.engineType}</div>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/70 bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-inter font-[300]">
              {selectedCar.description}
            </p>

            <div className="grid grid-cols-2 gap-3.5 font-inter">
              <button
                onClick={() => setSelectedCar(null)}
                className="w-full border border-white/10 text-white/80 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 cursor-pointer"
              >
                Close Registry
              </button>
              <button
                onClick={() => {
                  setSelectedCar(null);
                  onOpenConfigurator(selectedCar.id);
                }}
                className="w-full bg-[#D4AF37] text-black py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#aa862c] transition-all cursor-pointer"
              >
                Open Configurator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
