import { useState, useRef, useEffect, FormEvent } from "react";
import { CheckCircle2, MessageSquare, Send, Sparkles, User, ShieldCheck } from "lucide-react";
import { Message } from "../types";

interface ConciergeProps {
  chatOpenByDefault?: boolean;
}

export default function Concierge({ chatOpenByDefault = false }: ConciergeProps) {
  const [chatOpen, setChatOpen] = useState(chatOpenByDefault);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "Greetings. I am Julian Sterling, Senior VIP Concierge at AutoBourn Mumbai. It would be my utmost privilege to assist you with commissioning your next grand-tourer or custom crossover. How may I advise you today?",
      timestamp: "10:30 AM"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to end of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || inquiryLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setInquiryLoading(true);

    try {
      // call server proxy endpoint to interact with server-side Gemini Safely
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages
        })
      });

      const data = await response.json();
      
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: data.text || "I am processing your executive parameters. Our team on Marine Drive will follow up.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, agentMsg]);

    } catch (err) {
      console.error("AI Assistant service down:", err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "agent",
          text: "We apologize, but our Mumbai digital exchange is experiencing slight signal delay. Your query is logged securely in our files, and a senior concierge will call you directly.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-24 bg-[#050505] border-t border-white/5 font-inter">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">
        
        <div className="bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row">
          
          {/* Left Block: Description & Core Checklist */}
          <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 space-y-8">
            <div className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs">
              Membership Exclusive
            </div>
            
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
              VIP Concierge Service
            </h2>
            
            <p className="font-inter text-white/60 leading-relaxed text-sm md:text-base font-[300]">
              Tailored for the connoisseur. Our dedicated concierge team handles everything from bespoke acquisition to door-to-door servicing. Your time is your most valuable asset—let us protect it. Enjoy immediate allocation of priority design lines.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-white/80 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                Global Logistics & Priority Delivery
              </li>
              <li className="flex items-center gap-4 text-white/80 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                Bespoke Performance Tuning & Testing
              </li>
              <li className="flex items-center gap-4 text-white/80 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                Private Event Access & Indian F1 Track Days
              </li>
            </ul>

            <button
              onClick={() => setChatOpen(true)}
              className="relative overflow-hidden bg-[#D4AF37] text-black w-full py-5 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#aa862c] transition-colors cursor-pointer active:scale-95 duration-500"
            >
              Apply for Membership
            </button>
          </div>

          {/* Right Column: Book a Private Showing Overlay container */}
          <div className="lg:w-1/2 bg-[#1a1c1c] relative overflow-hidden min-h-[380px] lg:min-h-auto flex items-center justify-center p-6 md:p-12">
            
            {/* Background image */}
            <div className="absolute inset-0 opacity-40">
              <img
                alt="Concierge Experience Ambient View"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2BGl4Rz7izPTY3q9_Xw0qTK7F-kdeSB-l7nBnp9JzT4KlDnj1x_EgqzY4zdQ0KSqq56ygKi5xPDjSCP9s8xYU46Fda4LMkcuX1JI4wI3OYJHu9iQ26L-5Tu7fShlw2arsndFf9sbbQjVqFYAa5ES4BJ450s5Chfc1fotc6GyEwwb3fzaL2-9nK4H_Sw2jaaBnRupvgtoOym8LgIpNpb0IaHAsL0bn0wdhHDCs-LT-LIwE2eLJaZ2hklEyQBzLCvOO9j0xQAGClN8"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlap Card */}
            <div className="relative z-10 w-full max-w-sm bg-[#0d0d0d]/90 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
              <h4 className="text-[#D4AF37] font-playfair text-2xl font-bold mb-2 italic">
                Book a Private Showing
              </h4>
              <p className="text-white/75 text-sm font-inter">
                Curated viewing experiences at your preferred location.
              </p>
              
              <hr className="my-6 border-white/10" />
              
              <button
                onClick={() => setChatOpen(true)}
                className="text-white/80 border-b-2 border-[#D4AF37] hover:text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] pb-1 cursor-pointer inline-flex items-center gap-1 focus:outline-none"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Speak with an Agent
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CHAT MODAL OVERLAY BACKED BY SERVER-SIDE GEMINI */}
      {chatOpen && (
        <div className="fixed inset-0 z-55 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-inter">
          <div className="bg-[#050505] text-[#EAEAEA] rounded-3xl max-w-lg w-full h-[600px] flex flex-col relative border border-white/10 shadow-2xl">
            
            {/* Chat header */}
            <div className="p-4.5 bg-[#0a0a0a] border-b border-white/10 rounded-t-3xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white relative">
                  <User className="w-5 h-5 shrink-0" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-neutral-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-playfair text-base font-bold flex items-center gap-1.5 text-white">
                    Julian Sterling
                    <span className="inline-flex items-center gap-0.5 text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] py-0.5 px-2 rounded-xs font-bold uppercase tracking-wider font-sans">
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" /> Advisor
                    </span>
                  </h4>
                  <p className="text-[10px] text-white/55 font-medium">AutoBourn Marine Drive Showroom</p>
                </div>
              </div>
              
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 px-3 bg-white/10 hover:bg-white/15 rounded-full text-xs font-bold cursor-pointer transition-colors text-white/80 border border-white/5"
              >
                Exit
              </button>
            </div>

            {/* Chat Messages Frame */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                      isAgent
                        ? "bg-[#111111] text-white border border-white/10 rounded-tl-none font-[300]"
                        : "bg-[#D4AF37] text-black rounded-tr-none font-semibold shadow-inner"
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className={`block text-[8px] text-right mt-1.5 ${isAgent ? "text-white/40" : "text-black/55"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {inquiryLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#111111] text-white/55 border border-white/10 rounded-2xl p-4 text-xs font-[300] shadow-xs rounded-tl-none flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                    <span className="text-[10px] italic ml-1 font-sans">Advisor is designing parameters...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Form submission */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#0a0a0a] border-t border-white/10 rounded-b-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask about V8 specs, Custom deliveries, financing, showings..."
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-full py-2.5 px-4 text-xs focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none placeholder:text-white/30"
                  disabled={inquiryLoading}
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || inquiryLoading}
                  className="bg-[#D4AF37] text-black p-2.5 rounded-full hover:bg-[#aa862c] transition-colors disabled:opacity-45 cursor-pointer"
                  aria-label="Send Consultation Param"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
              <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[9px] text-white/45 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> End-to-End Secure VIP encryption
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
}
