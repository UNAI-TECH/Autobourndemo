export interface CarSpec {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: string;
  horsepower: number;
  topSpeed: string; // e.g. "310 km/h"
  acceleration: string; // e.g. "3.2s"
  engineType: string; // e.g. "Twin-Turbo V8" or "Dual Motor EV"
  soundFrequency: number; // For synth engine sound simulation (Hz)
  image: string; // Hotlink URL
}

export interface ConfigOptions {
  carId: string;
  color: string;
  wheels: string;
  interior: string;
  location: string;
  extraPackages: string[];
}

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  tintColor: string; // For adding custom visual overlay tinting
}

export interface WheelPreset {
  id: string;
  name: string;
  description: string;
}

export interface InteriorPreset {
  id: string;
  name: string;
  description: string;
}

export interface LocationPreset {
  id: string;
  name: string;
  bgClass: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}
