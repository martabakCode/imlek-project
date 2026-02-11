'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface GoldenLotusProps {
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

// Lotus flower component
function LotusFlower({ delay, x, y, scale = 1 }: { delay: number; x: number; y: number; scale?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${scale})` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
    >
      <motion.svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id={`lotusGrad-${Math.floor(x)}-${Math.floor(y)}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        {/* Lotus petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
          <ellipse
            key={i}
            cx="30"
            cy="20"
            rx="8"
            ry="18"
            fill={`url(#lotusGrad-${Math.floor(x)}-${Math.floor(y)})`}
            opacity="0.9"
            transform={`rotate(${rotation} 30 30)`}
          />
        ))}
        {/* Center */}
        <circle cx="30" cy="30" r="8" fill="#fcd34d" />
      </motion.svg>
    </motion.div>
  );
}

// Water ripple effect
function WaterRipple({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-teal-400/30 pointer-events-none"
      style={{
        width: 100,
        height: 40,
        left: '50%',
        bottom: '20%',
        transform: 'translateX(-50%)',
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.5, 2, 3], opacity: [0.5, 0.3, 0] }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

// Koi fish
function KoiFish({ direction = 'right', delay = 0 }: { direction?: 'left' | 'right'; delay?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: '15%',
        left: direction === 'right' ? '-10%' : '110%',
      }}
      animate={{
        x: direction === 'right' ? ['0%', '120vw'] : ['0%', '-120vw'],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        width="60"
        height="30"
        viewBox="0 0 60 30"
        style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'none' }}
      >
        <defs>
          <linearGradient id="koiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path
          d="M5 15 Q15 5 30 15 Q45 25 55 15 Q45 20 30 15 Q15 10 5 15"
          fill="url(#koiGrad)"
          opacity="0.7"
        />
        <circle cx="10" cy="13" r="2" fill="#000" />
      </svg>
    </motion.div>
  );
}

export function GoldenLotus({ greeting }: GoldenLotusProps) {
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
        background: 'linear-gradient(to bottom, #134e4a 0%, #0f766e 30%, #115e59 60%, #14532d 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
    >
      {/* Water texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 40 50 50 T100 50' fill='none' stroke='%232dd4bf' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Lotus flowers - static positions */}
      <LotusFlower delay={0.5} x={5} y={70} scale={0.8} />
      <LotusFlower delay={0.7} x={85} y={75} scale={0.9} />
      <LotusFlower delay={0.9} x={10} y={85} scale={0.6} />
      <LotusFlower delay={1.1} x={80} y={88} scale={0.7} />

      {/* Water ripples */}
      <WaterRipple delay={0} />
      <WaterRipple delay={1} />
      <WaterRipple delay={2} />

      {/* Koi fish - client only */}
      {isClient && (
        <>
          <KoiFish direction="right" delay={0} />
          <KoiFish direction="left" delay={7} />
        </>
      )}

      {/* Gradient overlay for depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(20, 83, 45, 0.6), transparent)',
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
        {/* Main card */}
        <div
          className="relative max-w-lg w-full rounded-3xl p-6 sm:p-10 overflow-hidden"
          style={{
            background: 'rgba(19, 78, 74, 0.6)',
            border: '2px solid rgba(251, 191, 36, 0.4)',
            boxShadow: hovered
              ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(251, 191, 36, 0.2)'
              : '0 25px 50px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Large lotus behind */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-20 pointer-events-none">
            <LotusFlower delay={0} x={0} y={0} scale={3} />
          </div>

          {/* Horse in lotus */}
          <motion.div
            className="mb-6 sm:mb-8 flex justify-center relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              <svg viewBox="0 0 200 150" className="w-48 h-36 sm:w-64 sm:h-48 relative z-10">
                <defs>
                  <linearGradient id="lotusHorseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <filter id="lotusGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Horse standing in lotus */}
                <path
                  d="M60 110 L60 70 Q60 50 80 45 Q100 50 100 70 L100 110 M70 110 L65 130 M90 110 L95 130 M75 45 Q70 30 75 20 M85 45 Q90 30 85 20"
                  fill="none"
                  stroke="url(#lotusHorseGrad)"
                  strokeWidth="4"
                  filter="url(#lotusGlow)"
                  strokeLinecap="round"
                />
                {/* Lotus base */}
                <ellipse cx="80" cy="135" rx="50" ry="15" fill="#fbbf24" opacity="0.3" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
            <h1
              className="font-calligraphy text-4xl sm:text-5xl md:text-6xl mb-2"
              style={{
                background: 'linear-gradient(to right, #fbbf24, #f59e0b, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(251, 191, 36, 0.3)',
              }}
            >
              金蓮駿馬
            </h1>
            <p className="font-serif-cn text-base sm:text-lg text-amber-200">
              Golden Lotus & Noble Horse
            </p>
          </motion.div>

          {/* Receiver name */}
          <motion.div
            className="text-center mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <p className="text-teal-200 text-xs sm:text-sm mb-1 font-inter">Wishing prosperity to</p>
              <h2
                className="font-serif-cn text-2xl sm:text-3xl md:text-4xl"
                style={{
                  color: '#fff',
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
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

          {/* Lotus divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/50" />
            <span className="text-amber-400 text-xl">🪷</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/50" />
          </motion.div>

          {/* Sender */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <p className="text-teal-200 text-sm font-inter">
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
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(244, 114, 182, 0.2))',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <span className="text-lg sm:text-xl">🐴</span>
              <span className="text-amber-200 text-xs sm:text-sm font-inter">Fire Horse Year 2026</span>
              <span className="text-lg sm:text-xl">🪷</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
