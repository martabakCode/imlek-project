'use client';

import { useMemo } from 'react';
import { FireIntensity } from '@/types/greeting';

interface FireParticlesProps {
  intensity: FireIntensity;
  className?: string;
}

export function FireParticles({ intensity, className = '' }: FireParticlesProps) {
  const particleCount = {
    low: 10,
    medium: 20,
    high: 30,
  }[intensity];

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 2 + Math.random() * 4,
    }));
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full animate-rise"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            background: `radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(249, 115, 22, 0.8) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(251, 191, 36, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}

interface FireBurstProps {
  isActive: boolean;
  onComplete: () => void;
}

export function FireBurst({ isActive, onComplete }: FireBurstProps) {
  const burstParticles = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      angle: (i * 72) + Math.random() * 30,
      distance: 50 + Math.random() * 50,
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {burstParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(220, 38, 38, 0.8) 50%, transparent 100%)',
            animation: 'burst 0.5s ease-out forwards',
            '--angle': `${particle.angle}deg`,
            '--distance': `${particle.distance}px`,
          } as React.CSSProperties}
          onAnimationEnd={particle.id === 0 ? onComplete : undefined}
        />
      ))}
      <style jsx>{`
        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
