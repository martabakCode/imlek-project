'use client';

import { motion } from 'framer-motion';
import { FireParticles } from '../animations/FireParticles';
import { useRef, useState, useEffect } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface DragonHorseProps {
  greeting: Greeting;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Static dragon scales for SSR
const STATIC_SCALES = [
  { id: 0, x: 10, y: 15 },
  { id: 1, x: 25, y: 25 },
  { id: 2, x: 40, y: 10 },
  { id: 3, x: 55, y: 30 },
  { id: 4, x: 70, y: 20 },
  { id: 5, x: 85, y: 35 },
  { id: 6, x: 15, y: 40 },
  { id: 7, x: 35, y: 45 },
  { id: 8, x: 50, y: 55 },
  { id: 9, x: 65, y: 50 },
  { id: 10, x: 80, y: 45 },
  { id: 11, x: 5, y: 55 },
  { id: 12, x: 90, y: 60 },
  { id: 13, x: 20, y: 5 },
  { id: 14, x: 45, y: 25 },
  { id: 15, x: 75, y: 5 },
  { id: 16, x: 30, y: 60 },
  { id: 17, x: 60, y: 40 },
  { id: 18, x: 95, y: 25 },
  { id: 19, x: 8, y: 35 },
];

// Dragon scale component
function DragonScale({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-4 h-4 rounded-sm"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: 'linear-gradient(135deg, #dc2626, #f59e0b)',
        transform: 'rotate(45deg)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: 1 }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Dragon pearl
function DragonPearl() {
  return (
    <motion.div
      className="absolute w-16 h-16 rounded-full"
      style={{
        background: 'radial-gradient(circle at 30% 30%, #fef3c7, #fbbf24, #d97706)',
        boxShadow: '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        boxShadow: [
          '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)',
          '0 0 60px rgba(251, 191, 36, 1), 0 0 100px rgba(220, 38, 38, 0.6)',
          '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
}

export function DragonHorse({ greeting }: DragonHorseProps) {
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
        background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 30%, #991b1b 60%, #b45309 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
    >
      {/* Dragon scale background pattern - static for SSR */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STATIC_SCALES.map((scale) => (
          <DragonScale key={scale.id} x={scale.x} y={scale.y} delay={scale.id * 0.1} />
        ))}
      </div>

      {/* Fire particles */}
      <FireParticles intensity={greeting.fireIntensity} />

      {/* Dragon silhouette in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <path
            d="M50 150 Q100 100 150 120 Q200 80 250 100 Q300 60 350 90 L380 80 Q390 85 380 95 L390 100 Q380 110 370 105 Q350 130 320 120 Q280 140 250 130 Q200 160 150 140 Q100 170 60 150 Z"
            fill="#7f1d1d"
          />
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Main card */}
        <div
          className="relative max-w-lg w-full rounded-3xl p-6 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(69, 10, 10, 0.9), rgba(127, 29, 29, 0.8))',
            border: '3px solid transparent',
            backgroundClip: 'padding-box',
            boxShadow: hovered
              ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(220, 38, 38, 0.4)'
              : '0 25px 50px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Animated border */}
          <div
            className="absolute -inset-[3px] rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(45deg, #dc2626, #f59e0b, #dc2626, #f59e0b)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 4s ease infinite',
            }}
          />

          {/* Dragon pearl */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            variants={itemVariants}
          >
            <DragonPearl />
          </motion.div>

          {/* Dragon Horse (Long Ma) SVG */}
          <motion.div
            className="mt-8 mb-6 sm:mb-8 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Dragon aura */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 70%)',
                  transform: 'scale(1.8)',
                }}
              />
              <svg viewBox="0 0 200 150" className="w-48 h-36 sm:w-72 sm:h-56 relative z-10">
                <defs>
                  <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                  <filter id="dragonGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Dragon horse body */}
                <motion.path
                  d="M40 120 Q50 100 70 100 L90 90 Q110 80 130 85 L150 75 Q160 70 170 75 L175 65 Q180 60 185 65 L190 55 L185 50 Q180 45 175 50 L170 40 Q165 35 160 40 L155 45 Q150 50 145 55 L130 65 Q110 70 95 65 L75 60 Q60 55 50 60 L40 65 Q30 70 35 75 L40 85 Q45 90 40 95 L35 105 Q30 110 35 115 Z"
                  fill="url(#dragonGrad)"
                  filter="url(#dragonGlow)"
                  animate={isClient ? { 
                    d: [
                      "M40 120 Q50 100 70 100 L90 90 Q110 80 130 85 L150 75 Q160 70 170 75 L175 65 Q180 60 185 65 L190 55 L185 50 Q180 45 175 50 L170 40 Q165 35 160 40 L155 45 Q150 50 145 55 L130 65 Q110 70 95 65 L75 60 Q60 55 50 60 L40 65 Q30 70 35 75 L40 85 Q45 90 40 95 L35 105 Q30 110 35 115 Z",
                      "M42 118 Q52 98 72 98 L92 88 Q112 78 132 83 L152 73 Q162 68 172 73 L177 63 Q182 58 187 63 L192 53 L187 48 Q182 43 177 48 L172 38 Q167 33 162 38 L157 43 Q152 48 147 53 L132 63 Q112 68 97 63 L77 58 Q62 53 52 58 L42 63 Q32 68 37 73 L42 83 Q47 88 42 93 L37 103 Q32 108 37 113 Z",
                      "M40 120 Q50 100 70 100 L90 90 Q110 80 130 85 L150 75 Q160 70 170 75 L175 65 Q180 60 185 65 L190 55 L185 50 Q180 45 175 50 L170 40 Q165 35 160 40 L155 45 Q150 50 145 55 L130 65 Q110 70 95 65 L75 60 Q60 55 50 60 L40 65 Q30 70 35 75 L40 85 Q45 90 40 95 L35 105 Q30 110 35 115 Z"
                    ]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Dragon horns */}
                <path
                  d="M160 40 L165 25 L170 35 M170 35 L175 20 L180 30"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Dragon whiskers */}
                <motion.path
                  d="M180 55 Q200 50 210 60 M185 60 Q205 65 215 55"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  fill="none"
                  animate={isClient ? { d: ["M180 55 Q200 50 210 60 M185 60 Q205 65 215 55", "M180 55 Q200 60 210 50 M185 60 Q205 55 215 65", "M180 55 Q200 50 210 60 M185 60 Q205 65 215 55"] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Flame breath */}
                <motion.path
                  d="M190 50 Q210 40 220 50 Q230 45 240 55"
                  fill="none"
                  stroke="url(#dragonGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.8"
                  animate={isClient ? { 
                    d: ["M190 50 Q210 40 220 50 Q230 45 240 55", "M190 50 Q210 55 220 45 Q230 50 240 40", "M190 50 Q210 40 220 50 Q230 45 240 55"],
                    opacity: [0.8, 0.4, 0.8]
                  } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
            <h1
              className="font-calligraphy text-4xl sm:text-5xl md:text-6xl mb-2"
              style={{
                color: '#fbbf24',
                textShadow: `
                  0 0 20px rgba(220, 38, 38, 0.8),
                  0 0 40px rgba(245, 158, 11, 0.5),
                  3px 3px 0 rgba(127, 29, 29, 0.8)
                `,
              }}
            >
              龍馬精神
            </h1>
            <p className="font-serif-cn text-base sm:text-lg text-amber-200">
              Spirit of Dragon Horse
            </p>
          </motion.div>

          {/* Receiver name */}
          <motion.div
            className="text-center mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl"
              style={{
                background: 'rgba(220, 38, 38, 0.2)',
                border: '2px solid rgba(251, 191, 36, 0.4)',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
              }}
            >
              <p className="text-red-200 text-xs sm:text-sm mb-1 font-inter">Bestowed upon</p>
              <h2
                className="font-serif-cn text-2xl sm:text-3xl md:text-4xl"
                style={{
                  color: '#fff',
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                }}
              >
                {greeting.receiverName}
              </h2>
            </div>
          </motion.div>

          {/* Message */}
          {greeting.message && (
            <motion.p
              className="text-amber-100 text-center text-base sm:text-lg mb-4 sm:mb-6 font-inter italic max-w-md mx-auto px-2"
              variants={itemVariants}
            >
              &ldquo;{greeting.message}&rdquo;
            </motion.p>
          )}

          {/* Divider with dragon */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/50" />
            <motion.span 
              className="text-2xl sm:text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐉
            </motion.span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/50" />
          </motion.div>

          {/* Sender */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <p className="text-red-200 text-sm font-inter">
              From <span className="text-amber-400 font-bold font-serif-cn">{greeting.senderName}</span>
            </p>
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="mt-6 sm:mt-8 text-center"
            variants={itemVariants}
          >
            <div
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #f59e0b)',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)',
              }}
            >
              <span className="text-white text-xs sm:text-sm font-bold font-inter">Fire Horse Year 2026</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
}
