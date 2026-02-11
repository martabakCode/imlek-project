'use client';

import { motion } from 'framer-motion';

interface AncientCoinProps {
  className?: string;
  size?: number;
}

export function AncientCoin({ className = '', size = 60 }: AncientCoinProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ rotateY: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, #fbbf24 0%, #d97706 70%, #92400e 100%)',
          backfaceVisibility: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            border: `3px solid #92400e`,
            background: 'radial-gradient(circle, #fcd34d 0%, #fbbf24 100%)',
          }}
        >
          <span style={{ fontSize: size * 0.25, color: '#92400e', fontWeight: 'bold' }}>財</span>
        </div>
      </div>
      {/* Back */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, #f59e0b 0%, #d97706 70%, #92400e 100%)',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            border: `3px solid #92400e`,
            background: 'radial-gradient(circle, #fcd34d 0%, #fbbf24 100%)',
          }}
        >
          <span style={{ fontSize: size * 0.25, color: '#92400e', fontWeight: 'bold' }}>富</span>
        </div>
      </div>
    </motion.div>
  );
}
