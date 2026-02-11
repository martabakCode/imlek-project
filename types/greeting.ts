import { Timestamp } from 'firebase/firestore';

export type TemplateType = 
  | 'blazing-stallion' 
  | 'phoenix-horse' 
  | 'emperor-steed'
  | 'celestial-horse'
  | 'golden-lotus'
  | 'dragon-horse';

export type FireIntensity = 'low' | 'medium' | 'high';

export interface Greeting {
  id: string;
  senderName: string;
  receiverName: string;
  message?: string;
  template: TemplateType;
  fireIntensity: FireIntensity;
  createdAt: Timestamp;
  viewCount: number;
  shareCount: number;
}

export interface GreetingFormData {
  senderName: string;
  receiverName: string;
  message: string;
  template: TemplateType;
  fireIntensity: FireIntensity;
}

export interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  gradient: string;
  icon: string;
  previewColors: string[];
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'blazing-stallion',
    name: 'Blazing Stallion',
    description: 'Wild horse running with blazing fire effects',
    gradient: 'from-red-900 via-orange-800 to-black',
    icon: '🔥',
    previewColors: ['#0a0a0a', '#dc2626', '#f97316'],
  },
  {
    id: 'phoenix-horse',
    name: 'Phoenix Horse',
    description: 'Winged horse with mystical purple aura',
    gradient: 'from-purple-900 via-pink-800 to-orange-800',
    icon: '✨',
    previewColors: ['#4c1d95', '#be185d', '#ea580c'],
  },
  {
    id: 'emperor-steed',
    name: "Emperor's Steed",
    description: 'Regal armored horse with golden decorations',
    gradient: 'from-red-800 via-red-900 to-amber-900',
    icon: '👑',
    previewColors: ['#7f1d1d', '#fbbf24', '#92400e'],
  },
  {
    id: 'celestial-horse',
    name: 'Celestial Horse',
    description: 'Heavenly horse galloping among the stars',
    gradient: 'from-indigo-950 via-blue-900 to-cyan-900',
    icon: '🌟',
    previewColors: ['#1e1b4b', '#3b82f6', '#06b6d4'],
  },
  {
    id: 'golden-lotus',
    name: 'Golden Lotus',
    description: 'Elegant horse with lotus flowers and water ripples',
    gradient: 'from-teal-900 via-emerald-800 to-yellow-700',
    icon: '🪷',
    previewColors: ['#134e4a', '#10b981', '#eab308'],
  },
  {
    id: 'dragon-horse',
    name: 'Dragon Horse',
    description: 'Mythical Long Ma with dragon scales and flames',
    gradient: 'from-rose-900 via-red-900 to-amber-700',
    icon: '🐉',
    previewColors: ['#881337', '#dc2626', '#f59e0b'],
  },
];
