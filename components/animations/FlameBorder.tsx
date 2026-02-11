'use client';

import { motion } from 'framer-motion';

interface FlameBorderProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function FlameBorder({ children, className = '', intensity = 'medium' }: FlameBorderProps) {
  const borderWidth = {
    low: '2px',
    medium: '4px',
    high: '6px',
  }[intensity];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        borderRadius: '12px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[3px] rounded-[15px] -z-10"
        style={{
          background: 'conic-gradient(from 0deg, #dc2626, #f97316, #facc15, #f97316, #dc2626)',
          backgroundSize: '200% 200%',
          animation: 'flameBorder 3s linear infinite',
        }}
      />
      {/* Inner border */}
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          border: `${borderWidth} solid transparent`,
          borderImage: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706) 1',
          borderRadius: 'inherit',
        }}
      />
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}
