'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface CelestialHorseProps {
  greeting: Greeting;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

// Star component
function Star({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: 'radial-gradient(circle, #fff 0%, #60a5fa 50%, transparent 100%)',
        boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)',
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Constellation lines
function Constellation() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
      <defs>
        <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <motion.path
        d="M10 20 L30 50 L60 40 L90 70 L120 30"
        stroke="url(#constellationGrad)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.path
        d="M200 100 L230 130 L260 110 L290 140"
        stroke="url(#constellationGrad)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );
}

// Shooting star
function ShootingStar() {
  return (
    <motion.div
      className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
      style={{ top: '20%', left: '-10%' }}
      animate={{
        x: ['0vw', '120vw'],
        y: ['0vh', '30vh'],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay: 5,
        repeat: Infinity,
        repeatDelay: 8,
        ease: 'easeOut',
      }}
    />
  );
}

// Static stars for SSR
const STATIC_STARS = [
  { id: 0, x: 10, y: 15, size: 3, delay: 0 },
  { id: 1, x: 25, y: 25, size: 2, delay: 0.5 },
  { id: 2, x: 40, y: 10, size: 4, delay: 1 },
  { id: 3, x: 55, y: 30, size: 2, delay: 1.5 },
  { id: 4, x: 70, y: 20, size: 3, delay: 2 },
  { id: 5, x: 85, y: 35, size: 2, delay: 0.3 },
  { id: 6, x: 15, y: 40, size: 2, delay: 0.8 },
  { id: 7, x: 35, y: 45, size: 3, delay: 1.2 },
  { id: 8, x: 50, y: 55, size: 2, delay: 1.8 },
  { id: 9, x: 65, y: 50, size: 4, delay: 0.2 },
  { id: 10, x: 80, y: 45, size: 2, delay: 2.5 },
  { id: 11, x: 5, y: 55, size: 3, delay: 0.6 },
  { id: 12, x: 90, y: 60, size: 2, delay: 1.4 },
  { id: 13, x: 20, y: 5, size: 2, delay: 0.9 },
  { id: 14, x: 45, y: 25, size: 3, delay: 1.6 },
  { id: 15, x: 75, y: 5, size: 2, delay: 0.4 },
  { id: 16, x: 30, y: 60, size: 2, delay: 2.2 },
  { id: 17, x: 60, y: 40, size: 3, delay: 0.7 },
  { id: 18, x: 95, y: 25, size: 2, delay: 1.9 },
  { id: 19, x: 8, y: 35, size: 2, delay: 1.1 },
];

export function CelestialHorse({ greeting }: CelestialHorseProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);
  const [hovered, setHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0f172a 0%, #1e1b4b 40%, #312e81 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
    >
      {/* Stars background - use static stars for SSR */}
      <div className="absolute inset-0 pointer-events-none">
        {STATIC_STARS.map((star) => (
          <Star key={star.id} {...star} />
        ))}
      </div>

      {/* Constellation lines */}
      <Constellation />

      {/* Shooting star - client only */}
      {isClient && <ShootingStar />}

      {/* Moon glow */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Moon */}
      <div
        className="absolute top-12 right-12 w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fef3c7, #fbbf24)',
          boxShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
        }}
      >
        {/* Moon craters */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-amber-600/30" />
        <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-amber-600/30" />
        <div className="absolute bottom-5 right-5 w-4 h-4 rounded-full bg-amber-600/20" />
      </div>

      {/* Nebula effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glass card */}
        <div
          className="relative max-w-lg w-full rounded-3xl p-6 sm:p-10 backdrop-blur-md"
          style={{
            background: 'rgba(30, 27, 75, 0.4)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            boxShadow: hovered
              ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(96, 165, 250, 0.3)'
              : '0 25px 50px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Celestial horse SVG */}
          <motion.div
            className="mb-6 sm:mb-8 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Star aura */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              <svg viewBox="0 0 200 150" className="w-48 h-36 sm:w-64 sm:h-48 relative z-10">
                <defs>
                  <linearGradient id="celestialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <filter id="starGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Horse silhouette with stars */}
                <path
                  d="M40 110 Q50 90 70 95 L90 80 Q110 70 130 75 L150 60 Q160 55 170 60 L175 50 Q180 45 185 50 L190 40 L185 35 Q180 30 175 35 L170 25 Q165 20 160 25 L155 30 Q150 35 145 40 L130 50 Q110 55 95 50 L75 45 Q60 40 50 45 L40 50 Q30 55 25 60 L20 65 Q15 70 20 75 L25 85 Q30 90 25 95 L20 105"
                  fill="url(#celestialGrad)"
                  filter="url(#starGlow)"
                />
                {/* Stars on horse */}
                <circle cx="60" cy="85" r="2" fill="#fff" />
                <circle cx="100" cy="70" r="2" fill="#fff" />
                <circle cx="140" cy="65" r="2" fill="#fff" />
                {/* Tail as stardust */}
                <motion.path
                  d="M25 95 Q5 100 0 110 Q10 105 25 100"
                  fill="none"
                  stroke="url(#celestialGrad)"
                  strokeWidth="3"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
            <h1
              className="font-calligraphy text-4xl sm:text-5xl md:text-6xl mb-2"
              style={{
                background: 'linear-gradient(to right, #60a5fa, #a78bfa, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(96, 165, 250, 0.5)',
              }}
            >
              天马行空
            </h1>
            <p className="font-serif-cn text-base sm:text-lg text-blue-300">
              Celestial Horse Soars Freely
            </p>
          </motion.div>

          {/* Receiver name with star effect */}
          <motion.div
            className="text-center mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full"
              style={{
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
              }}
            >
              <p className="text-blue-200 text-xs sm:text-sm mb-1 font-inter">Blessings for</p>
              <h2
                className="font-serif-cn text-2xl sm:text-3xl md:text-4xl"
                style={{
                  color: '#fff',
                  textShadow: '0 0 30px rgba(96, 165, 250, 0.8)',
                }}
              >
                {greeting.receiverName}
              </h2>
            </div>
          </motion.div>

          {/* Message */}
          {greeting.message && (
            <motion.p
              className="text-blue-100 text-center text-base sm:text-lg mb-4 sm:mb-6 font-inter italic max-w-md mx-auto px-2"
              variants={itemVariants}
            >
              &ldquo;{greeting.message}&rdquo;
            </motion.p>
          )}

          {/* Divider with stars */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-400/50" />
            <span className="text-blue-300">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-400/50" />
          </motion.div>

          {/* Sender */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <p className="text-blue-200 text-sm font-inter">
              From <span className="text-cyan-400 font-bold font-serif-cn">{greeting.senderName}</span>
            </p>
          </motion.div>

          {/* Zodiac badge */}
          <motion.div
            className="mt-6 sm:mt-8 text-center"
            variants={itemVariants}
          >
            <div
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2))',
                border: '1px solid rgba(96, 165, 250, 0.3)',
              }}
            >
              <span className="text-lg sm:text-xl">🌙</span>
              <span className="text-blue-200 text-xs sm:text-sm font-inter">Fire Horse Year 2026</span>
              <span className="text-lg sm:text-xl">⭐</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
