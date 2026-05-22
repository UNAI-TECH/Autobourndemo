import { CarSpec, ColorPreset, WheelPreset, InteriorPreset, LocationPreset } from "./types";

export const FLEET_CARS: CarSpec[] = [
  {
    id: "amg-gt",
    name: "AMG GT 4-Door Coupe",
    brand: "Mercedes-AMG",
    tagline: "Mastery in Every Curve.",
    description: "An elite racing lineage fused with full grand touring luxury. Performance that commands respect and handles like a true hypercar.",
    price: "₹ 1.82 Crore",
    horsepower: 639,
    topSpeed: "315 km/h",
    acceleration: "3.2s",
    engineType: "4.0L V8 BiTurbo with EQ Boost",
    soundFrequency: 75, // Deep roar V8
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALVSUFahLgauS855byWWKn0DytKACu4uQMtPz3b2d0V5XKC4FXhoO28IH04puXTFQ2vTim4rKKC-tsp0kl7pdb9qLh2GNrG369kEF75NRyDSNueByDf_cH_Qnd6unNnj4IM6rGX1acakD2m0YlukdlUZcbrj7TPcF3w1iQH1VDo4F5H5oDMGcwuN_y3BlGjP0EdMwBBXyrO464REEwuwYZPdf_K_NL9lF7YSjHuo2lZEX5WUnqZPJbeqeddNPSK1zunrHYAohfKug"
  },
  {
    id: "q8-etron",
    name: "Q8 Sportback e-tron",
    brand: "Audi",
    tagline: "Progress through Technology.",
    description: "Where timeless design philosophy meets the future of electric mobility. Progressive elegance with cutting-edge active aerodynamics.",
    price: "₹ 1.25 Crore",
    horsepower: 408,
    topSpeed: "200 km/h",
    acceleration: "5.6s",
    engineType: "Dual Motor Electric Quattro",
    soundFrequency: 110, // Modern electric hum
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH-0Pjfo7WPqRHaqpB5xJl8zeDDsO-jalgoMVMA0fUdWQUUl0tfRe4up5KQeEZlSHaONRD7nDDGyqS7hVvXurQmk3aaO5XpJjw0iu00U9EIJCdIerKAe-mzZypBJvFKoTvddThsb88FPSg4K6m-C7-F-vKxKUIjRgh_wbdS3Ujr_Oq2ACaANNiEA8lmxdz7IcWVOcx-ik4stxipDpGM7i-3osjKZk34Yuo6EE_bJ2uHGJv-5sTyVykL-KM_StOIC0DElRQ9TbJ_PM"
  },
  {
    id: "jaguar-xf",
    name: "Jaguar XF Gran Turismo",
    brand: "Jaguar",
    tagline: "Quiet Luxury. Pure Power.",
    description: "Effortless elegance that commands respect on every road it touches. British refinement, crafted meticulously for ultimate driver comfort.",
    price: "₹ 76.8 Lakh",
    horsepower: 250,
    topSpeed: "250 km/h",
    acceleration: "6.5s",
    engineType: "2.0L Turbocharged Ingenium i4",
    soundFrequency: 85, // Smooth direct inline tone
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLeRKC7aODidR-wCHSVOVzGZ7rcW4bpnYXVpBxUE7dcFIeNxWf5esUc6mW535H8nN54YXx-9o0Fv6TE2QG3jAik6GARn-gF1KQRq8cSziBTyWCNeelzZOYcMFtFmjC_Biljg2mxa9bZfO_D1hxrja_tWc-F2_sv7cP802SxY-q1jht33QcVOd-N4HM8Zp7-mN4YpzUmI2PWw5tNpSosE7_8Txu6aDcg18qLHSfOwtBYlCJmvQam32exs01xXdHbuf_hjCB24YSXBQ"
  },
  {
    id: "xuv700-executive",
    name: "XUV700 Luxury AX7 L",
    brand: "AutoBourn Bespoke",
    tagline: "Unmatched Command. Pure Luxury.",
    description: "Our high-end custom armor of the legendary crossover. Outfitted with bespoke Nappa leather, gold trim accents, active ADAS, and customized multi-stage sound dampers.",
    price: "₹ 26.5 Lakh",
    horsepower: 200,
    topSpeed: "195 km/h",
    acceleration: "9.2s",
    engineType: "2.0L mStallion Turbocharged Petrol",
    soundFrequency: 90, // Refined refined punchy inline 4
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY0ZlljCH87lVygWeMsnKPMBTKN0ZQ7XF54RTXdixOggDRV1HZuJHEB0DGTBTs8BakoWXZ_EGpAGVXABgfvCODunswyL5qnjLCMJypLSd73LDk6Xb4iJ_lfY2xf3U7ICeIwN94QTqs1sI9FOJJxpgustV0_J7keULTRA3qRUum4HUSDRKkN8PKcKiZJ-3H_ldSQJ8XgrQKJ0cKfhMEgqdmJxKb2lHYFjXg2oxUb_tfDUo_xGlULS5oxx5hTk8Og2pQG40qryZYOFk" // Fallback using collection hotlink 2
  }
];

export const COLOR_PRESETS: ColorPreset[] = [
  { id: "silver", name: "Liquid Titanium Silver", hex: "#dadada", tintColor: "rgba(218, 218, 218, 0.15)" },
  { id: "carbon-grey", name: "Obsidian Metallic Grey", hex: "#3a3a3d", tintColor: "rgba(58, 58, 61, 0.35)" },
  { id: "crimson-red", name: "Heritage Performance Crimson", hex: "#b6171e", tintColor: "rgba(182, 23, 30, 0.25)" },
  { id: "deep-ocean", name: "Bespoke Navy Velvet Blue", hex: "#0b203c", tintColor: "rgba(11, 32, 60, 0.4)" },
  { id: "champagne-gold", name: "Sovereign Gold Pearl", hex: "#dfccb7", tintColor: "rgba(223, 204, 183, 0.3)" }
];

export const WHEEL_PRESETS: WheelPreset[] = [
  { id: "aerodynamic", name: "21\" Aero Monoblock Multi-Spoke", description: "Minimal drag, progressive aesthetic forged in lightweight alloy." },
  { id: "sport-spoke", name: "22\" Diamond-Cut Twin 5-Spoke", description: "Bespoke classic performance look with race track validation." },
  { id: "matte-black", name: "21\" Satin Black Carbon-Fibre Weave", description: "Aggressive ultra-light design, lowering unsprung mass by 14%." }
];

export const INTERIOR_PRESETS: InteriorPreset[] = [
  { id: "alpine-leather", name: "Premium Off-White Alpine Nappa Leather", description: "Full-grain ethically sourced leather with pristine cross-stitching." },
  { id: "carbon-fiber", name: "Dynamic carbon fibre composite structures", description: "Deep charcoal matte weaves paired with Alcantara premium lining." },
  { id: "classic-wood", name: "Regal Matte Open-Pore Walnut Trim", description: "Hand-finished dark walnut roots echoing classic bespoke heritage." }
];

export const BACKGROUND_PRESETS: LocationPreset[] = [
  { id: "showroom", name: "Mumbai Gallery Glasshouse", bgClass: "bg-radial from-[rgba(245,245,245,0.9)] to-[rgba(220,220,225,0.9)]" },
  { id: "night-city", name: "Marine Drive Promenade - Neon Night", bgClass: "bg-radial from-[rgba(15,20,30,0.95)] to-[rgba(5,5,10,0.98)] text-white" },
  { id: "racing-track", name: "Buddh International F1 Circuit", bgClass: "bg-radial from-[rgba(210,210,210,0.92)] to-[rgba(150,150,155,0.95)]" }
];

export const ACCORDION_FAQS = [
  {
    title: "How does the custom procurement process operate?",
    content: "Our VIP advisers coordinate globally from custom manufacturing facilities. Once configured, your commission is finalized, handcrafted, transported under priority secure logistics, and delivered straight to your exclusive venue."
  },
  {
    title: "What is featured in the AutoBourn Private Membership?",
    content: "Membership offers exclusive 24/7 dedicated concierge access, custom design privileges, priority servicing pickup, private track testing entry, invitation-only unveilings, and direct personal interface for all custom fleet needs."
  },
  {
    title: "Can I simulate configurations in full Virtual Reality?",
    content: "Yes. Our virtual showroom provides real-time model renders in 8K high-definition. If you schedule a VR Session, a high-fidelity VR headset is custom delivered to your residence with an adviser online to configure your vehicle in real-time."
  }
];
