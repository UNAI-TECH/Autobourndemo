interface FooterProps {
  onOpenConfigurator: () => void;
  onOpenConcierge: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onOpenConfigurator, onOpenConcierge, onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-[#050505] text-white py-16 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">
        
        {/* Upper footer grid */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 text-[#f9f9f9]/80">
          
          {/* Slogan details column */}
          <div className="space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block transition-transform hover:scale-[1.01]"
            >
              <img
                alt="AutoBourn White Logo"
                className="h-10 md:h-12 w-auto brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujbucD9SkdSILwoR3IRkfLJzhNzHZiN_vlsLRaWUEtWA6Ul7_ycqNGOkvzib5RmibsBa5jt4uZ9mvbhwwo43VU7lkI5EWqV67KxU8JlYE1WOc2C_43ApCOk3xA20FH67M0QyfJpxqiB1_2jLKLkSUzVmBLLqNRFWmtO4izNvG8nUjEL8AlML0l-dw0NF3N-mkbPaNQ2HZ6LypPVxXLB95rCOj_bIQ6UIybcz9EDILsfSMe_aUXlwoIuQXc"
                referrerPolicy="no-referrer"
              />
            </a>
            <p className="text-white/35 text-xs max-w-xs leading-relaxed uppercase tracking-wider font-semibold font-inter">
              Excellence in luxury automotive procurement and lifecycle management since 2008.
            </p>
          </div>

          {/* Links structure columns */}
          <div className="flex gap-16 md:gap-20">
            {/* Nav column 1: Fleet */}
            <div className="space-y-4 font-inter">
              <h6 className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px]">
                The Fleet
              </h6>
              <ul className="space-y-2 text-white/50 text-xs font-medium">
                <li>
                  <button
                    onClick={() => onScrollToSection("collection")}
                    className="hover:text-white hover:underline transition-all cursor-pointer text-left"
                  >
                    Inventory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onScrollToSection("showroom")}
                    className="hover:text-white hover:underline transition-all cursor-pointer text-left"
                  >
                    Heritage
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenConfigurator}
                    className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer text-left"
                  >
                    Configurator
                  </button>
                </li>
              </ul>
            </div>

            {/* Nav column 2: Concierge */}
            <div className="space-y-4 font-inter">
              <h6 className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px]">
                Concierge
              </h6>
              <ul className="space-y-2 text-white/50 text-xs font-medium">
                <li>
                  <button
                    onClick={onOpenConcierge}
                    className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer text-left"
                  >
                    VIP Access
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onScrollToSection("contact")}
                    className="hover:text-white hover:underline transition-all cursor-pointer text-left"
                  >
                    Maintenance
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onScrollToSection("virtual")}
                    className="hover:text-white hover:underline transition-all cursor-pointer text-left"
                  >
                    VR Showroom
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-medium font-inter">
            © 2026 AutoBourn India. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium font-inter">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); onOpenConcierge(); }}>Membership</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
