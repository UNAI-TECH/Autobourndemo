import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Glasses, Play, ShieldAlert, CheckCircle, Volume2, Calendar, Radio } from "lucide-react";
import { FLEET_CARS } from "../data";

export default function VirtualShowroom() {
  const [vrActive, setVrActive] = useState(false);
  const [panAngle, setPanAngle] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  
  // Audio Synth triggers
  const [soundActive, setSoundActive] = useState(false);
  const [activeSoundCar, setActiveSoundCar] = useState("amg-gt");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Scheduling details
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("amg-gt");

  // Interactively pan the panoramic simulated showroom
  const handlePan = (e: ChangeEvent<HTMLInputElement>) => {
    setPanAngle(parseInt(e.target.value));
  };

  // Audio synthesis notes
  const startEngineSound = (carId: string) => {
    try {
      if (soundActive) {
        stopEngineSound();
        return;
      }

      const activeCar = FLEET_CARS.find(c => c.id === carId);
      const baseFreq = activeCar?.soundFrequency || 80;

      // Instantiate local AudioContext
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      audioCtxRef.current = audioCtx;

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNodeRef.current = gainNode;

      // Low frequency rumble
      const osc1 = audioCtx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
      osc1Ref.current = osc1;

      // Sub harmonic for growl
      const osc2 = audioCtx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(baseFreq * 0.5, audioCtx.currentTime);
      osc2Ref.current = osc2;

      // Connect nodes
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      setSoundActive(true);
      setActiveSoundCar(carId);

    } catch (err) {
      console.warn("Could not leverage Web Audio API:", err);
    }
  };

  const accelerateSound = () => {
    if (!soundActive || !audioCtxRef.current || !osc1Ref.current) return;
    const activeCar = FLEET_CARS.find(c => c.id === activeSoundCar);
    const baseFreq = activeCar?.soundFrequency || 80;
    const now = audioCtxRef.current.currentTime;

    // Simulate acceleration pitch ramp
    osc1Ref.current.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 1.2);
    if (osc2Ref.current) {
      osc2Ref.current.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 1.2);
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.18, now + 0.3);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.12, now + 1.5);
    }

    // Decay pitch back to idle
    setTimeout(() => {
      if (osc1Ref.current && audioCtxRef.current) {
        const resetTime = audioCtxRef.current.currentTime;
        osc1Ref.current.frequency.exponentialRampToValueAtTime(baseFreq, resetTime + 1.8);
        if (osc2Ref.current) {
          osc2Ref.current.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, resetTime + 1.8);
        }
      }
    }, 1300);
  };

  const stopEngineSound = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      osc1Ref.current = null;
      osc2Ref.current = null;
      audioCtxRef.current = null;
      setSoundActive(false);
    } catch {
      setSoundActive(false);
    }
  };

  const submitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setScheduleModal(false);
      setBookingSuccess(false);
      setBookingDate("");
      setBookingTime("");
    }, 2800);
  };

  return (
    <section 
      id="virtual" 
      className="py-32 relative bg-[#050505] text-white overflow-hidden"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-15">
        <img
          alt="Luxury Showroom Background"
          className="w-full h-full object-cover select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2BGl4Rz7izPTY3q9_Xw0qTK7F-kdeSB-l7nBnp9JzT4KlDnj1x_EgqzY4zdQ0KSqq56ygKi5xPDjSCP9s8xYU46Fda4LMkcuX1JI4wI3OYJHu9iQ26L-5Tu7fShlw2arsndFf9sbbQjVqFYAa5ES4BJ450s5Chfc1fotc6GyEwwb3fzaL2-9nK4H_Sw2jaaBnRupvgtoOym8LgIpNpb0IaHAsL0bn0wdhHDCs-LT-LIwE2eLJaZ2hklEyQBzLCvOO9j0xQAGClN8"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
          
          {/* Left Text details */}
          <div className="space-y-8">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight">
              Virtual Reality <br />
              <span className="italic text-[#D4AF37] font-normal">Experience Center</span>
            </h2>
            
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-inter font-[300]">
              Step inside our hyper-realistic 8K showroom from any location. Inspect every stitch, hear every engine note, and feel the luxury before it arrives at your doorstep. We deliver direct VR headsets for absolute configuration immersion.
            </p>

            <div className="flex flex-wrap gap-4 font-inter">
              <button
                onClick={() => setVrActive(true)}
                className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#aa862c] text-black px-7 py-4.5 rounded-full font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer active:scale-95 shadow-lg"
              >
                <Glasses className="w-4 h-4 animate-pulse text-black" />
                Enter Virtual Showroom
              </button>
              
              <button
                onClick={() => setScheduleModal(true)}
                className="border border-white/20 hover:border-[#D4AF37] hover:bg-white/5 text-white px-7 py-4.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all cursor-pointer active:scale-95"
              >
                Schedule VR Session
              </button>
            </div>
          </div>

          {/* Right Media container */}
          <div className="relative group">
            <div className="aspect-[16/10] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-3 relative cursor-pointer overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA04id48w9lJ_X-9YvYIwlGSdBA-xUTKEm2ukeVFEr5d58QwfA7aon8iHv0GKYymW4p_FwAR7U_Rny1thB6-u8y5jvyRUTdyumDSVZB7IhqPTw0-KLrxu4qTXrdg6k-5OIMkTGg2jQYM52gpl3ik1rRxmxAvcZF70q0I74PQCunqMKQAV7MzcWp7IKzTHPQD00TJl78nuuFur91YZdSTGgM8akiOieXym7KvxkAVRLW4MWp9gzwoN0B0ny5BlstZztAJcA1GpJTkgk"
                alt="Audi Showroom Simulator"
                className="w-full h-full object-cover rounded-xl opacity-80 group-hover:scale-103 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              
              {/* Play / Interactive Engine note simulator UI overlay */}
              <div 
                onClick={() => startEngineSound(activeSoundCar)}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/20 transition-all rounded-xl"
              >
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform text-black">
                  {soundActive ? (
                    <span className="w-4 h-4 bg-black rounded-xs animate-ping" />
                  ) : (
                    <Play className="w-6 h-6 fill-black ml-1 text-black" />
                  )}
                </div>
                
                <p className="mt-4 font-playfair italic text-[#D4AF37] text-sm tracking-wide">
                  {soundActive ? "Engine Running (Web Synth)" : "Hear Bespoke Engine Notes"}
                </p>
              </div>
            </div>

            {/* Interactive Soundboard beneath if active */}
            {soundActive && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0d0d0d] text-white p-4 rounded-xl border border-white/15 shadow-2xl flex items-center gap-4 z-20 min-w-[320px] font-inter">
                <Volume2 className="w-5 h-5 text-[#D4AF37] animate-bounce shrink-0" />
                <div className="flex-1 text-left text-xs">
                  <p className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[9px] text-[#D4AF37]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                    Now Simulating
                  </p>
                  <p className="font-semibold text-[13px]">{FLEET_CARS.find(c => c.id === activeSoundCar)?.name}</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={accelerateSound}
                    className="bg-[#D4AF37] text-black px-3 py-1.5 rounded-md font-bold text-[10px] uppercase hover:bg-[#aa862c] transition-colors focus:outline-none"
                  >
                    Throttle rev
                  </button>
                  <button
                    onClick={stopEngineSound}
                    className="bg-white/10 text-white px-3 py-1.5 rounded-md font-bold text-[10px] uppercase hover:bg-white/15 transition-colors focus:outline-none"
                  >
                    Mute
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 360 PANORAMA SIMULATION VIEW OVERLAY MODE */}
      {vrActive && (
        <div className="fixed inset-0 z-55 bg-black/95 flex flex-col justify-between p-6 font-inter">
          <div className="flex justify-between items-center text-white">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">IMMERSIVE PREVIEW</span>
              <h4 className="font-playfair text-xl md:text-2xl font-bold">8K Showroom Simulator</h4>
            </div>
            <button
              onClick={() => {
                setVrActive(false);
                stopEngineSound();
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer"
            >
              Exit VR Panel
            </button>
          </div>

          {/* Panoramic scrolling environment viewer */}
          <div className="relative flex-1 my-8 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
            <div 
              className="absolute inset-0 w-[200%] transition-transform duration-300 ease-out flex"
              style={{
                transform: `translateX(-${panAngle}%)`,
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2BGl4Rz7izPTY3q9_Xw0qTK7F-kdeSB-l7nBnp9JzT4KlDnj1x_EgqzY4zdQ0KSqq56ygKi5xPDjSCP9s8xYU46Fda4LMkcuX1JI4wI3OYJHu9iQ26L-5Tu7fShlw2arsndFf9sbbQjVqFYAa5ES4BJ450s5Chfc1fotc6GyEwwb3fzaL2-9nK4H_Sw2jaaBnRupvgtoOym8LgIpNpb0IaHAsL0bn0wdhHDCs-LT-LIwE2eLJaZ2hklEyQBzLCvOO9j0xQAGClN8"
                alt="Panoramic interior"
                className="w-1/2 h-full object-cover brightness-50"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2BGl4Rz7izPTY3q9_Xw0qTK7F-kdeSB-l7nBnp9JzT4KlDnj1x_EgqzY4zdQ0KSqq56ygKi5xPDjSCP9s8xYU46Fda4LMkcuX1JI4wI3OYJHu9iQ26L-5Tu7fShlw2arsndFf9sbbQjVqFYAa5ES4BJ450s5Chfc1fotc6GyEwwb3fzaL2-9nK4H_Sw2jaaBnRupvgtoOym8LgIpNpb0IaHAsL0bn0wdhHDCs-LT-LIwE2eLJaZ2hklEyQBzLCvOO9j0xQAGClN8"
                alt="Panoramic interior secondary copy"
                className="w-1/2 h-full object-cover brightness-50"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Target sight overlays */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              </div>
            </div>

            {/* Float details panel in showroom */}
            <div className="absolute bottom-6 left-6 max-w-sm bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs">
              <p className="font-bold uppercase tracking-wider text-[10px] text-[#D4AF37] mb-1">Interactive Advisor</p>
              <p className="text-white/80 leading-relaxed font-[300]">
                Drag the panoramic slider below to rotate and inspect the carbon-infused pillars and luxury grand-tourers. Click the Sound Trigger above to experience acoustics.
              </p>
            </div>
          </div>

          {/* Rotation Controller bar */}
          <div className="max-w-md mx-auto w-full flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-[10px] font-bold text-white/50 space-nowrap">PAN 0°</span>
            <input
              type="range"
              min="0"
              max="50"
              value={panAngle}
              onChange={handlePan}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <span className="text-[10px] font-bold text-white/50 space-nowrap">PAN 360°</span>
          </div>
        </div>
      )}

      {/* SCHEDULE VR WIZARD MODAL */}
      {scheduleModal && (
        <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-inter">
          <div className="bg-[#0a0a0a] text-white rounded-3xl max-w-md w-full p-6 md:p-8 relative border border-white/15 shadow-2xl">
            <button
              onClick={() => setScheduleModal(false)}
              className="absolute top-4 right-4 bg-white/5 hover:bg-white/15 text-white/80 p-1.5 rounded-full border border-white/10 cursor-pointer transition-colors"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-playfair text-2xl font-bold">Session Scheduled</h4>
                <p className="text-sm text-white/60 max-w-xs mx-auto">
                  A high-fidelity Oculus VR unit is being allocated. Our liaison officer will call you to confirm secure courier dispatch details.
                </p>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">EXCLUSIVE LIAISON</span>
                  <h3 className="font-playfair text-2xl font-bold">Schedule VR Session</h3>
                  <p className="text-xs text-white/50 mt-1">We supply complete Oculus gear straight to your door step.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Target Vehicle</label>
                    <select
                      value={selectedPreference}
                      onChange={(e) => setSelectedPreference(e.target.value)}
                      className="w-full bg-[#111111] border border-white/10 text-white rounded-lg py-2.5 px-3 text-xs focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                    >
                      {FLEET_CARS.map(c => (
                        <option key={c.id} value={c.id} className="bg-neutral-900">{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 text-white rounded-lg py-2.5 px-3 text-xs focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Time Segment</label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 text-white rounded-lg py-2.5 px-3 text-xs focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-sans"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-black py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#aa862c] transition-colors shadow-lg mt-2 cursor-pointer"
                >
                  Confirm Priority Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
