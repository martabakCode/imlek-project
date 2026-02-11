'use client';

import { motion } from 'framer-motion';
import { HorseSilhouette } from '../animations/HorseSilhouette';
import { FloatingLanterns } from '../animations/FloatingLanterns';
import { FireParticles } from '../animations/FireParticles';
import { useRef, useState } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface PhoenixHorseProps {
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

export function PhoenixHorse({ greeting }: PhoenixHorseProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #4c1d95 0%, #be185d 50%, #ea580c 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle dragon pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z' fill='%23fbbf24' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating lanterns */}
      <FloatingLanterns count={6} />

      {/* Fire particles */}
      <FireParticles intensity={greeting.fireIntensity} />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glassmorphism card */}
        <div
          className="relative max-w-xl w-full rounded-3xl p-8 md:p-12 backdrop-blur-lg"
          style={{
            background: 'rgba(76, 29, 149, 0.3)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            boxShadow: hovered
              ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(251, 191, 36, 0.3)'
              : '0 25px 50px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Winged horse */}
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Ethereal glow behind horse */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              <HorseSilhouette
                variant="winged"
                className="w-72 h-56 relative z-10"
                animate={true}
              />
            </div>
          </motion.div>

          {/* Title with circular fire effect */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1
              className="font-calligraphy text-5xl md:text-6xl mb-2"
              style={{
                background: 'linear-gradient(to right, #fbbf24, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
              }}
            >
              飞马献瑞
            </h1>
            <p className="font-serif-cn text-xl text-amber-300">
              Flying Horse Brings Prosperity
            </p>
          </motion.div>

          {/* Circular name display with fire trail */}
          <motion.div
            className="relative mb-8"
            variants={itemVariants}
          >
            {/* Rotating fire ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '3px solid transparent',
                background: 'linear-gradient(90deg, #f97316, #fbbf24, #f97316) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            
            <div
              className="rounded-full p-8 text-center"
              style={{
                background: 'radial-gradient(circle, rgba(190, 24, 93, 0.5) 0%, transparent 70%)',
              }}
            >
              <p className="text-purple-200 text-sm mb-2 font-inter">Blessings for</p>
              <h2
                className="font-serif-cn text-4xl md:text-5xl text-white"
                style={{
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
              className="text-purple-100 text-center text-lg mb-6 font-inter italic max-w-md mx-auto"
              variants={itemVariants}
            >
              &ldquo;{greeting.message}&rdquo;
            </motion.p>
          )}

          {/* Sender */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(190, 24, 93, 0.2))',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <span className="text-purple-200 text-sm font-inter">With love from</span>
              <span className="text-amber-400 font-bold font-serif-cn">{greeting.senderName}</span>
            </div>
          </motion.div>

          {/* Phoenix feather decorations */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="40" height="80" viewBox="0 0 40 80" className="opacity-60">
              <path
                d="M20 0 Q30 20 35 40 Q30 60 20 80 Q10 60 5 40 Q10 20 20 0"
                fill="url(#featherGradient)"
              />
              <defs>
                <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="40" height="80" viewBox="0 0 40 80" className="opacity-60" style={{ transform: 'scaleX(-1)' }}>
              <path
                d="M20 0 Q30 20 35 40 Q30 60 20 80 Q10 60 5 40 Q10 20 20 0"
                fill="url(#featherGradient2)"
              />
              <defs>
                <linearGradient id="featherGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
