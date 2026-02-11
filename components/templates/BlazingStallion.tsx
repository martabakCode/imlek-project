'use client';

import { motion } from 'framer-motion';
import { FireParticles } from '../animations/FireParticles';
import { HorseSilhouette } from '../animations/HorseSilhouette';
import { FlameBorder } from '../animations/FlameBorder';
import { FireBurst } from '../animations/FireParticles';
import { useState, useRef } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface BlazingStallionProps {
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

const horseVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    x: 10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  gallop: {
    x: [0, 30, 0],
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export function BlazingStallion({ greeting }: BlazingStallionProps) {
  const [showBurst, setShowBurst] = useState(false);
  const [isGalloping, setIsGalloping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);

  const handleClick = () => {
    if (isGalloping) return;
    setIsGalloping(true);
    setShowBurst(true);
    
    // Screen shake effect
    if (cardRef.current) {
      cardRef.current.style.animation = 'shake 0.3s ease-in-out';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.animation = '';
        }
      }, 300);
    }

    setTimeout(() => {
      setIsGalloping(false);
    }, 400);
  };

  const handleBurstComplete = () => {
    setShowBurst(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(to top, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={handleClick}
    >
      {/* Fire gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(220, 38, 38, 0.6) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 100%)',
        }}
      />

      {/* Fire particles */}
      <FireParticles intensity={greeting.fireIntensity} />

      {/* Fire burst effect */}
      <FireBurst isActive={showBurst} onComplete={handleBurstComplete} />

      {/* Main content card */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <FlameBorder className="max-w-lg w-full" intensity={greeting.fireIntensity}>
          <div className="text-center">
            {/* Horse silhouette */}
            <motion.div
              className="mb-6"
              variants={horseVariants}
              animate={isGalloping ? 'gallop' : 'visible'}
              whileHover="hover"
            >
              <HorseSilhouette
                variant="running"
                className="w-64 h-48 mx-auto"
                animate={!isGalloping}
              />
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="font-calligraphy text-5xl md:text-6xl mb-4 animate-glow"
              variants={itemVariants}
              style={{
                color: '#fbbf24',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(220, 38, 38, 0.5)',
              }}
            >
              恭喜发财
            </motion.h1>

            {/* English subtitle */}
            <motion.p
              className="font-serif-cn text-2xl md:text-3xl mb-6"
              variants={itemVariants}
              style={{
                color: '#f97316',
                textShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
              }}
            >
              Gong Xi Fa Cai
            </motion.p>

            {/* Receiver name */}
            <motion.div
              className="mb-6"
              variants={itemVariants}
            >
              <p className="text-gray-400 text-sm mb-2 font-inter">For</p>
              <h2
                className="font-serif-cn text-3xl md:text-4xl"
                style={{
                  color: '#fff',
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                }}
              >
                {greeting.receiverName}
              </h2>
            </motion.div>

            {/* Message */}
            {greeting.message && (
              <motion.p
                className="text-gray-300 text-lg mb-6 font-inter italic"
                variants={itemVariants}
              >
                &ldquo;{greeting.message}&rdquo;
              </motion.p>
            )}

            {/* Divider */}
            <motion.div
              className="w-32 h-1 mx-auto mb-6 rounded-full"
              variants={itemVariants}
              style={{
                background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
              }}
            />

            {/* Sender */}
            <motion.p
              className="text-gray-400 text-sm font-inter"
              variants={itemVariants}
            >
              From <span className="text-amber-400">{greeting.senderName}</span>
            </motion.p>

            {/* Year badge */}
            <motion.div
              className="mt-6 inline-block px-4 py-2 rounded-full"
              variants={itemVariants}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
              }}
            >
              <span className="text-white font-bold font-inter">Year of the Fire Horse 2026</span>
            </motion.div>
          </div>
        </FlameBorder>
      </motion.div>

      {/* Screen shake keyframes */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </motion.div>
  );
}
