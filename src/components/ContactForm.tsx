import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, ShieldCheck, FileCheck, Sparkles, AlertCircle } from "lucide-react";
import { ACCORDION_FAQS } from "../data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Performance Collection");
  const [inquiry, setInquiry] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [responseLetter, setResponseLetter] = useState<string | null>(null);
  const [budgetRange, setBudgetRange] = useState("");
  const [errorText, setErrorText] = useState("");

  // FAQ Accordion states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setErrorText("");
    setResponseLetter(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, interest, inquiry })
      });

      const data = await response.json();
      if (data.error) {
        setErrorText(data.error);
      } else {
        setResponseLetter(data.message);
        setBudgetRange(data.suggestedBudgetRange);
      }
    } catch {
      setErrorText("Failed to establish secure communications with AutoBourn Mumbai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] border-t border-white/5 font-inter">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">
        
        {/* Core details & Inquiry Form */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start mb-24">
          
          {/* Left Details column */}
          <div className="space-y-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-white">
              Let's start your <br />
              <span className="text-[#D4AF37] italic font-normal">legacy today.</span>
            </h2>

            <div className="space-y-10">
              {/* Box 1: Showroom address */}
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-widest text-[10px] text-[#D4AF37] mb-2 font-inter">
                    Showroom Global
                  </h5>
                  <p className="text-white/60 leading-relaxed text-sm font-[300]">
                    Luxury Hub, Marine Drive Central <br />
                    Mumbai, India 400021
                  </p>
                </div>
              </div>

              {/* Box 2: Secure Phone */}
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-widest text-[10px] text-[#D4AF37] mb-2 font-inter">
                    Private Line
                  </h5>
                  <p className="text-white/80 text-sm font-semibold font-inter">
                    +91 22 8800 4500
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form Card */}
          <div className="relative">
            {responseLetter ? (
              /* High-end generated VIP response letter */
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl p-8 relative overflow-hidden space-y-5 shadow-xl animate-fade-in">
                <div className="absolute top-0 right-0 p-4 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest rounded-bl-xl flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5" /> High-Priority Sourced
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] font-inter">AutoBourn General Secretariat</span>
                  <p className="text-xs text-white/55 mt-0.5">Reference ID: COMM-VIP-{Date.now().toString().slice(-4)}</p>
                </div>

                <div className="font-playfair text-[13px] md:text-sm leading-relaxed text-white/80 italic space-y-4 whitespace-pre-line font-[350]">
                  {responseLetter}
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs space-y-1.5">
                  <p className="font-bold text-[#D4AF37] uppercase tracking-wider text-[9px] font-inter flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 animate-pulse" /> Allocation Metrics
                  </p>
                  <p className="text-white/50 font-[300]">Expected Commission Allocation Budget limit:</p>
                  <p className="font-bold text-[14px] text-[#D4AF37]">{budgetRange}</p>
                </div>

                <button
                  onClick={() => setResponseLetter(null)}
                  className="w-full text-center py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] cursor-pointer focus:outline-none transition-colors"
                >
                  Submit Alternative Inquiry
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleFormSubmit}
                className="space-y-6 bg-[#0a0a0a] p-8 md:p-10 rounded-2xl border border-white/10 shadow-md relative"
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1 bg-transparent">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-white/55 font-inter">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Julian Sterling"
                      className="w-full bg-transparent border-b-2 border-white/15 focus:border-[#D4AF37] text-white py-2 text-xs transition-colors outline-none focus:ring-0 font-medium placeholder:text-white/20"
                      disabled={loading}
                    />
                  </div>

                  {/* Interest selector */}
                  <div className="space-y-1 bg-transparent">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-white/55 font-inter">
                      Interest Choice
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/15 focus:border-[#D4AF37] text-white py-2 text-xs transition-colors outline-none focus:ring-0 font-semibold cursor-pointer"
                      disabled={loading}
                    >
                      <option value="Performance Collection" className="bg-neutral-900 text-white">Performance Collection</option>
                      <option value="Heritage Masters" className="bg-neutral-900 text-white">Heritage Masters</option>
                      <option value="Bespoke Concierge Selection" className="bg-neutral-900 text-white">Bespoke Concierge</option>
                    </select>
                  </div>
                </div>

                {/* Textarea inquiry */}
                <div className="space-y-1 bg-transparent">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-white/55 font-inter">
                    Inquiry Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-transparent border-b-2 border-white/15 focus:border-[#D4AF37] text-white py-2 text-xs transition-colors outline-none focus:ring-0 font-[300]"
                    disabled={loading}
                  />
                </div>

                {errorText && (
                  <p className="text-xs text-amber-500 font-sans flex items-center gap-1.5 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0 hover:scale-110 transition-transform" />
                    {errorText}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="relative overflow-hidden bg-[#D4AF37] text-black w-full py-4.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg transition-transform hover:bg-[#aa862c] focus:outline-none cursor-pointer active:scale-97 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-black rounded-full animate-ping" />
                      <span className="animate-pulse font-semibold">Encrypting Liaison Channel...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>Send Secure Message</span>
                    </>
                  )}
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rotate-[45deg] bg-linear-to-br from-transparent via-white/15 to-transparent translate-x-[-100%] animate-[shimmer_6s_infinite]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ ACCORDION COMPONENT INTEGRATION */}
        <div className="border-t border-white/10 pt-20 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">Showroom FAQ</span>
            <h3 className="font-playfair text-3xl font-bold tracking-tight text-white">Frequently Asked Enquiries</h3>
          </div>

          <div className="space-y-4">
            {ACCORDION_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex justify-between items-center bg-[#0d0d0d] hover:bg-white/5 focus:outline-none transition-colors cursor-pointer text-white"
                  >
                    <span className="font-playfair font-bold text-sm md:text-base leading-tight">
                      {faq.title}
                    </span>
                    <span className={`text-xl font-sans text-[#D4AF37] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}>
                      +
                    </span>
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[160px] opacity-100 p-5 border-t border-white/10" : "max-h-0 opacity-0 bg-transparent"
                  }`}>
                    <p className="text-xs text-white/60 leading-relaxed font-[300] font-inter">
                      {faq.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
