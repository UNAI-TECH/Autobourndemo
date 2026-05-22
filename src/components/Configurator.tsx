import { useState, FormEvent } from "react";
import { FLEET_CARS, COLOR_PRESETS, WHEEL_PRESETS, INTERIOR_PRESETS, BACKGROUND_PRESETS } from "../data";
import { ConfigOptions } from "../types";
import { Sliders, Check, HelpCircle, Sparkles, Volume2, ShieldCheck, ShoppingBag, Eye } from "lucide-react";

interface ConfiguratorProps {
  initialCarId?: string;
  onClose: () => void;
}

export default function Configurator({ initialCarId = "amg-gt", onClose }: ConfiguratorProps) {
  const [selectedCarId, setSelectedCarId] = useState(initialCarId);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedWheelIndex, setSelectedWheelIndex] = useState(0);
  const [selectedInteriorIndex, setSelectedInteriorIndex] = useState(0);
  const [selectedBgIndex, setSelectedBgIndex] = useState(0);
  
  // Custom packages
  const [trackPack, setTrackPack] = useState(false);
  const [conciergeSync, setConciergeSync] = useState(false);
  
  // Confirmed success state
  const [orderSent, setOrderSent] = useState(false);

  // Parse active car specifications
  const activeCar = FLEET_CARS.find(c => c.id === selectedCarId) || FLEET_CARS[0];
  const activeColor = COLOR_PRESETS[selectedColorIndex];
  const activeWheel = WHEEL_PRESETS[selectedWheelIndex];
  const activeInterior = INTERIOR_PRESETS[selectedInteriorIndex];
  const activeBg = BACKGROUND_PRESETS[selectedBgIndex];

  // Pricing arithmetic
  const getNumericBase = (str: string) => {
    // Parse approximate numeric base
    if (str.includes("Crore")) {
      return parseFloat(str.replace(/[^\d.]/g, "")) * 10000000;
    } else if (str.includes("Lakh")) {
      return parseFloat(str.replace(/[^\d.]/g, "")) * 100000;
    }
    return 2500000;
  };

  const basePriceNum = getNumericBase(activeCar.price);
  const wheelPremium = selectedWheelIndex > 0 ? 450000 : 0;
  const interiorPremium = selectedInteriorIndex > 0 ? 620000 : 0;
  const trackPremium = trackPack ? 250000 : 0;
  const conciergePremium = conciergeSync ? 150000 : 0;
  const totalInvestment = basePriceNum + wheelPremium + interiorPremium + trackPremium + conciergePremium;

  const formatRupees = (num: number) => {
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Crore`;
    }
    return `₹ ${(num / 100000).toFixed(2)} Lakh`;
  };

  const handleReservation = (e: FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden font-inter animate-fade-in">
      
      {/* 1. Left Viewport Panel: 360 Visual rendering canvas */}
      <div className={`flex-1 relative flex flex-col justify-between p-6 transition-all duration-700 ${activeBg.bgClass}`}>
        
        {/* Viewport Header buttons */}
        <div className="flex justify-between items-center z-10 text-white drop-shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-full bg-black/40 border border-white/15">
              <Sliders className="w-5 h-5 text-[#D4AF37]" />
            </span>
            <div>
              <h3 className="font-playfair text-xl font-bold tracking-wide">360 Design Studio</h3>
              <p className="text-[9px] font-sans text-neutral-400 font-bold uppercase tracking-widest">
                Active Selection: {activeCar.brand}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 transition-all cursor-pointer focus:outline-none"
          >
            ✕ Dismiss Studio
          </button>
        </div>

        {/* Core Car interactive visual composition plane */}
        <div className="flex-1 flex flex-col items-center justify-center relative my-6">
          
          {/* Active car and optional backdrop details overlay */}
          <div className="absolute inset-x-0 top-6 text-center drop-shadow-md px-4">
            <h1 className="font-playfair text-3xl md:text-5xl font-semibold text-white/10 tracking-widest uppercase drop-shadow-sm pointer-events-none select-none">
              {activeCar.name}
            </h1>
            <p className="font-inter italic text-[#D4AF37] font-semibold text-xs tracking-wider uppercase mt-1">
              Location: {activeBg.name}
            </p>
          </div>

          {/* Core Composite Car Visual */}
          <div className="relative w-full max-w-4xl aspect-[16/10] flex items-center justify-center select-none">
            {/* Soft Ambient shadow under the car */}
            <div className="absolute bottom-[20%] w-4/5 h-[8%] bg-black/35 rounded-full blur-xl animate-pulse" />
            
            {/* Core Composite Car Visual */}
            <img
              src={activeCar.image}
              alt={activeCar.name}
              className="w-full h-auto object-contain relative z-10 filter transition-all duration-1000 drag-none"
              referrerPolicy="no-referrer"
              style={{
                filter: selectedColorIndex > 0 ? "drop-shadow(2px 5px 12px rgba(0,0,0,0.15))" : "none"
              }}
            />
            
            {/* Applied Color Tint Layer representing metallic liquid finishes */}
            <div
              className="absolute inset-0 z-11 pointer-events-none rounded-2xl mix-blend-color transition-colors duration-1000"
              style={{
                backgroundColor: activeColor.tintColor,
                maskImage: `url(${activeCar.image})`,
                WebkitMaskImage: `url(${activeCar.image})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat"
              }}
            />
          </div>

          {/* Quick HUD Parameters details */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4 px-4 filter drop-shadow-sm">
            <div className="bg-black/60 border border-white/15 backdrop-blur-md px-5 py-3 rounded-xl text-center text-xs w-28 text-white">
              <span className="block text-neutral-400 font-bold uppercase text-[8px] tracking-widest">PROPULSION</span>
              <span className="font-semibold text-[11px] line-clamp-1 mt-0.5">{activeCar.engineType}</span>
            </div>
            <div className="bg-black/60 border border-white/15 backdrop-blur-md px-5 py-3 rounded-xl text-center text-xs w-28 text-white">
              <span className="block text-neutral-400 font-bold uppercase text-[8px] tracking-widest">POWER</span>
              <span className="font-semibold text-[11px] mt-0.5">{activeCar.horsepower} HP</span>
            </div>
            <div className="bg-black/60 border border-white/15 backdrop-blur-md px-5 py-3 rounded-xl text-center text-xs w-28 text-white">
              <span className="block text-neutral-400 font-bold uppercase text-[8px] tracking-widest">VELOCITY</span>
              <span className="font-semibold text-[11px] mt-0.5">{activeCar.topSpeed}</span>
            </div>
          </div>
        </div>

        {/* Viewport bottom interactive footer bars */}
        <div className="flex flex-col sm:flex-row justify-between items-center z-10 gap-4 mt-2">
          {/* Sourced environment switcher */}
          <div className="flex bg-black/50 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {BACKGROUND_PRESETS.map((bg, index) => (
              <button
                key={bg.id}
                onClick={() => setSelectedBgIndex(index)}
                className={`text-[9px] uppercase tracking-wider font-bold py-1.5 px-3 rounded-full transition-all focus:outline-none cursor-pointer ${
                  selectedBgIndex === index ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                {bg.id.replace("-", " ")}
              </button>
            ))}
          </div>

          <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-white/50 drop-shadow-xs flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> Simulated 3D ambient light refraction applied
          </p>
        </div>
      </div>

      {/* 2. Right Selector Menu Panel: Specification & Customisation cards */}
      <div className="w-full md:w-[420px] bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between h-auto md:h-full overflow-y-auto shrink-0">
        
        {/* Menu Form scroll area */}
        <div className="p-6 md:p-8 space-y-7 flex-1">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Configurator Menu</span>
            <h4 className="font-playfair text-2.5xl font-bold">Commission Blueprint</h4>
            <p className="text-xs text-white/50 mt-1">Specify custom specs to calculate exact premium metrics.</p>
          </div>

          {/* Model toggle selection */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">1. CORE MODEL</label>
            <div className="grid grid-cols-2 gap-2">
              {FLEET_CARS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCarId(car.id);
                  }}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between focus:outline-none cursor-pointer ${
                    selectedCarId === car.id
                      ? "bg-white/5 border-[#D4AF37] text-white shadow-lg"
                      : "bg-[#111111]/40 border-white/10 text-white/40 hover:border-white/15 hover:text-white/70"
                  }`}
                >
                  <span className="font-semibold block truncate leading-tight">{car.name}</span>
                  <span className="text-[10px] text-[#D4AF37] font-bold mt-1.5">{car.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">2. LIQUID FINISH</label>
              <span className="text-[10px] text-[#D4AF37] font-semibold italic">{activeColor.name}</span>
            </div>
            <div className="flex gap-2.5">
              {COLOR_PRESETS.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-7.5 h-7.5 rounded-full border-2 transition-all p-0.5 focus:outline-none cursor-pointer hover:scale-105 active:scale-95 ${
                    selectedColorIndex === index ? "border-[#D4AF37] scale-103 shadow-lg" : "border-transparent"
                  }`}
                  title={color.name}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/25"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Wheel Picker */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">3. FORGED ALLOY WHEELS</label>
            <div className="space-y-2">
              {WHEEL_PRESETS.map((wheel, index) => (
                <button
                  key={wheel.id}
                  onClick={() => setSelectedWheelIndex(index)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3.5 focus:outline-none cursor-pointer ${
                    selectedWheelIndex === index
                      ? "bg-white/5 border-[#D4AF37] text-white shadow-md"
                      : "bg-[#111111]/40 border-white/10 text-white/40 hover:border-white/15 hover:text-white/70"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border border-white/15 flex items-center justify-center shrink-0 mt-0.5 ${
                    selectedWheelIndex === index ? "bg-[#D4AF37] border-none" : ""
                  }`}>
                    {selectedWheelIndex === index && <Check className="w-2.5 h-2.5 text-black" />}
                  </span>
                  <div>
                    <h5 className="font-semibold text-white">{wheel.name}</h5>
                    <p className="text-[10px] text-white/50 font-light mt-0.5">{wheel.description}</p>
                    {index > 0 && <p className="text-[9px] text-[#D4AF37] font-semibold mt-1">+ ₹ 4,50,000</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Leather Cabin options */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">4. LUXURY INTERIOR STRUCTURE</label>
            <div className="space-y-2">
              {INTERIOR_PRESETS.map((int, index) => (
                <button
                  key={int.id}
                  onClick={() => setSelectedInteriorIndex(index)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3.5 focus:outline-none cursor-pointer ${
                    selectedInteriorIndex === index
                      ? "bg-white/5 border-[#D4AF37] text-white shadow-md"
                      : "bg-[#111111]/40 border-white/10 text-white/40 hover:border-white/15 hover:text-white/70"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border border-white/15 flex items-center justify-center shrink-0 mt-0.5 ${
                    selectedInteriorIndex === index ? "bg-[#D4AF37] border-none" : ""
                  }`}>
                    {selectedInteriorIndex === index && <Check className="w-2.5 h-2.5 text-black" />}
                  </span>
                  <div>
                    <h5 className="font-semibold text-white">{int.name}</h5>
                    <p className="text-[10px] text-white/50 font-light mt-0.5">{int.description}</p>
                    {index > 0 && <p className="text-[9px] text-[#D4AF37] font-semibold mt-1">+ ₹ 6,20,000</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-on optional packages */}
          <div className="space-y-2.5">
            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">5. PERFORMANCE MODULES</label>
            
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-3 bg-[#111111]/40 border border-white/10 p-3 rounded-xl cursor-pointer hover:border-white/15">
                <input
                  type="checkbox"
                  checked={trackPack}
                  onChange={(e) => setTrackPack(e.target.checked)}
                  className="rounded text-[#D4AF37] focus:ring-0 bg-transparent border-white/15 w-4 h-4 accent-[#D4AF37]"
                />
                <div>
                  <p className="font-semibold text-white/80">Track validation calibration (+ ₹2.5 L)</p>
                  <p className="text-[10px] text-white/50">Carbon composite chassis stabilizers and F1 mode.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 bg-[#111111]/40 border border-white/10 p-3 rounded-xl cursor-pointer hover:border-white/15">
                <input
                  type="checkbox"
                  checked={conciergeSync}
                  onChange={(e) => setConciergeSync(e.target.checked)}
                  className="rounded text-[#D4AF37] focus:ring-0 bg-transparent border-white/15 w-4 h-4 accent-[#D4AF37]"
                />
                <div>
                  <p className="font-semibold text-white/80">Concierge automated GPS link (+ ₹1.5 L)</p>
                  <p className="text-[10px] text-white/50">Mumbai showroom direct connection and diagnostics.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Breakdown summary calculations */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2.5 text-xs">
            <h5 className="font-playfair font-bold text-sm tracking-wide flex items-center gap-1.5 border-b border-white/10 pb-1.5 text-white">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Investment Summary
            </h5>
            <div className="flex justify-between text-[11px] text-white/50">
              <span>{activeCar.name} Base:</span>
              <span>{activeCar.price}</span>
            </div>
            {wheelPremium > 0 && (
              <div className="flex justify-between text-[11px] text-white/50">
                <span>Diamond-Cut Wheels:</span>
                <span>₹ 4.5 Lakh</span>
              </div>
            )}
            {interiorPremium > 0 && (
              <div className="flex justify-between text-[11px] text-white/50">
                <span>Cabin Nappa leather:</span>
                <span>₹ 6.2 Lakh</span>
              </div>
            )}
            {(trackPack || conciergeSync) && (
              <div className="flex justify-between text-[11px] text-white/50">
                <span>Selected Performance Packs:</span>
                <span>{formatRupees(trackPremium + conciergePremium)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-white/10">
              <span className="uppercase tracking-wider text-[10px] text-[#D4AF37] flex items-center gap-1">
                Total Commission Estimation
              </span>
              <span className="text-[#D4AF37]">{formatRupees(totalInvestment)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Submission Actions drawer */}
        <div className="p-6 bg-[#050505] border-t border-white/10 rounded-b-3xl">
          {orderSent ? (
            <div className="text-center py-4 bg-emerald-500/15 border border-emerald-500/35 rounded-xl p-3 text-xs text-white">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2 animate-bounce" />
              <p className="font-bold uppercase tracking-wider text-[10px] text-emerald-400">Commission Transmitted Securely</p>
              <p className="text-[11px] text-white/60 mt-0.5">Julian Sterling is reviewing your carbon-alloy configuration.</p>
            </div>
          ) : (
            <button
              onClick={handleReservation}
              className="w-full bg-[#D4AF37] hover:bg-[#aa862c] text-black py-4.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-black" /> Transmit Commission To Showroom
            </button>
          )}
          <p className="text-center text-[9px] text-white/40 font-medium uppercase tracking-widest mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Verified Secure High-Net Worth encryption link
          </p>
        </div>

      </div>
    </div>
  );
}
