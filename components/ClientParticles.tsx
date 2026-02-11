'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  width: number;
  height: number;
  left: string;
  duration: number;
  delay: number;
  xOffset: number;
}

interface ClientParticlesProps {
  count?: number;
  className?: string;
}

export function ClientParticles({ count = 15, className = '' }: ClientParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate random values only on client side
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      width: 4 + Math.random() * 4,
      height: 4 + Math.random() * 4,
      left: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
      xOffset: (Math.random() - 0.5) * 50,
    }));
    setParticles(newParticles);
  }, [count]);

  if (!isMounted) return null;

  return (
    <div className={`absolute inset-0 -z-5 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            bottom: '-10px',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -800],
            opacity: [0, 1, 0],
            x: [0, particle.xOffset],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
