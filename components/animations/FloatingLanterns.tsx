'use client';

import { motion } from 'framer-motion';

interface LanternProps {
  delay?: number;
  x?: number;
  scale?: number;
}

function Lantern({ delay = 0, x = 0, scale = 1 }: LanternProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: '10%' }}
      animate={{
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width="40"
        height="60"
        viewBox="0 0 40 60"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Lantern string */}
        <line x1="20" y1="0" x2="20" y2="10" stroke="#92400e" strokeWidth="2" />
        {/* Lantern body */}
        <ellipse cx="20" cy="30" rx="15" ry="20" fill="#dc2626" />
        <ellipse cx="20" cy="30" rx="12" ry="17" fill="#ef4444" />
        {/* Top and bottom caps */}
        <rect x="10" y="10" width="20" height="5" fill="#fbbf24" rx="2" />
        <rect x="10" y="45" width="20" height="5" fill="#fbbf24" rx="2" />
        {/* Tassel */}
        <line x1="20" y1="50" x2="20" y2="60" stroke="#fbbf24" strokeWidth="2" />
        <line x1="17" y1="55" x2="17" y2="58" stroke="#fbbf24" strokeWidth="1" />
        <line x1="23" y1="55" x2="23" y2="58" stroke="#fbbf24" strokeWidth="1" />
        {/* Chinese character */}
        <text x="20" y="32" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">福</text>
        {/* Glow */}
        <circle cx="20" cy="30" r="18" fill="url(#lanternGlow)" opacity="0.3" />
        <defs>
          <radialGradient id="lanternGlow">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

interface FloatingLanternsProps {
  count?: number;
  className?: string;
}

export function FloatingLanterns({ count = 5, className = '' }: FloatingLanternsProps) {
  const lanterns = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + (i * 20) + Math.random() * 10,
    delay: i * 0.5,
    scale: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {lanterns.map((lantern) => (
        <Lantern
          key={lantern.id}
          x={lantern.x}
          delay={lantern.delay}
          scale={lantern.scale}
        />
      ))}
    </div>
  );
}
