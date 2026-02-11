'use client';

import { BlazingStallion } from './templates/BlazingStallion';
import { PhoenixHorse } from './templates/PhoenixHorse';
import { EmperorSteed } from './templates/EmperorSteed';
import { CelestialHorse } from './templates/CelestialHorse';
import { GoldenLotus } from './templates/GoldenLotus';
import { DragonHorse } from './templates/DragonHorse';
import { Greeting } from '@/types/greeting';

interface GreetingCardProps {
  greeting: Greeting;
}

export function GreetingCard({ greeting }: GreetingCardProps) {
  switch (greeting.template) {
    case 'blazing-stallion':
      return <BlazingStallion greeting={greeting} />;
    case 'phoenix-horse':
      return <PhoenixHorse greeting={greeting} />;
    case 'emperor-steed':
      return <EmperorSteed greeting={greeting} />;
    case 'celestial-horse':
      return <CelestialHorse greeting={greeting} />;
    case 'golden-lotus':
      return <GoldenLotus greeting={greeting} />;
    case 'dragon-horse':
      return <DragonHorse greeting={greeting} />;
    default:
      return <BlazingStallion greeting={greeting} />;
  }
}
