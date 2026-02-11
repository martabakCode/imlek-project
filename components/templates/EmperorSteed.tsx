'use client';

import { motion } from 'framer-motion';
import { HorseSilhouette } from '../animations/HorseSilhouette';
import { AncientCoin } from '../animations/AncientCoin';
import { FireParticles } from '../animations/FireParticles';
import { useRef, useState } from 'react';
import { useTilt } from '@/hooks/useMousePosition';
import { Greeting } from '@/types/greeting';

interface EmperorSteedProps {
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

export function EmperorSteed({ greeting }: EmperorSteedProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);
  const [coinsAnimated, setCoinsAnimated] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setCoinsAnimated(true)}
    >
      {/* Cloud pattern background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='50' viewBox='0 0 100 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 35 Q25 20 40 25 Q50 10 70 20 Q85 15 90 30 Q95 35 85 40 L20 40 Q10 40 20 35' fill='none' stroke='%23fbbf24' stroke-width='1'/%3E%3C/svg%3E")`,
          animation: 'cloudDrift 60s linear infinite',
        }}
      />

      {/* Animated fire columns on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(220, 38, 38, 0.8), transparent)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(220, 38, 38, 0.8), transparent)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

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
        {/* Imperial frame */}
        <div
          className="relative max-w-xl w-full p-1 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #fbbf24 100%)',
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)',
          }}
        >
          {/* Inner frame border */}
          <div
            className="rounded-lg p-1"
            style={{
              background: '#7f1d1d',
            }}
          >
            <div
              className="rounded-lg p-8 md:p-12"
              style={{
                background: 'linear-gradient(to bottom, #7f1d1d 0%, #5c1616 100%)',
                border: '2px solid rgba(251, 191, 36, 0.5)',
              }}
            >
              {/* Corner coins */}
              <div className="absolute top-4 left-4">
                <AncientCoin size={50} />
              </div>
              <div className="absolute top-4 right-4">
                <AncientCoin size={50} />
              </div>
              <div className="absolute bottom-4 left-4">
                <AncientCoin size={50} />
              </div>
              <div className="absolute bottom-4 right-4">
                <AncientCoin size={50} />
              </div>

              {/* Armored horse */}
              <motion.div
                className="mb-8 flex justify-center"
                variants={itemVariants}
              >
                <div className="relative">
                  {/* Golden aura */}
                  <div
                    className="absolute inset-0 blur-2xl animate-shine"
                    style={{
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
                      transform: 'scale(1.3)',
                    }}
                  />
                  <HorseSilhouette
                    variant="armored"
                    className="w-64 h-52 relative z-10"
                    animate={true}
                  />
                </div>
              </motion.div>

              {/* Calligraphy title */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <h1
                  className="font-calligraphy text-6xl md:text-7xl mb-2"
                  style={{
                    color: '#fbbf24',
                    textShadow: `
                      2px 2px 0 #92400e,
                      -1px -1px 0 #92400e,
                      4px 4px 0 rgba(0,0,0,0.3),
                      0 0 40px rgba(251, 191, 36, 0.6)
                    `,
                  }}
                >
                  恭喜发财
                </h1>
                <motion.div
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{
                    background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
                  }}
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Receiver name */}
              <motion.div
                className="text-center mb-6"
                variants={itemVariants}
              >
                <div
                  className="inline-block px-6 py-3 rounded-lg"
                  style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                  }}
                >
                  <p className="text-amber-200 text-sm mb-1 font-inter">Bestowed upon</p>
                  <h2
                    className="font-serif-cn text-3xl md:text-4xl"
                    style={{
                      color: '#fff',
                      textShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
                    }}
                  >
                    {greeting.receiverName}
                  </h2>
                </div>
              </motion.div>

              {/* Message */}
              {greeting.message && (
                <motion.p
                  className="text-amber-100 text-center text-lg mb-6 font-inter italic max-w-md mx-auto"
                  variants={itemVariants}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  &ldquo;{greeting.message}&rdquo;
                </motion.p>
              )}

              {/* Imperial seal */}
              <motion.div
                className="flex justify-center mb-6"
                variants={itemVariants}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center border-2"
                  style={{
                    background: 'rgba(220, 38, 38, 0.8)',
                    borderColor: '#fbbf24',
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                  }}
                >
                  <span className="font-calligraphy text-2xl text-amber-400">馬</span>
                </div>
              </motion.div>

              {/* Sender */}
              <motion.div
                className="text-center"
                variants={itemVariants}
              >
                <p className="text-amber-200 text-sm font-inter">
                  Respectfully, <span className="text-amber-400 font-bold font-serif-cn">{greeting.senderName}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Year indicator */}
        <motion.div
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div
            className="inline-block px-6 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
            }}
          >
            <span className="text-red-900 font-bold font-inter">Fire Horse Year 2026</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Cloud drift animation */}
      <style jsx>{`
        @keyframes cloudDrift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 0; }
        }
      `}</style>
    </motion.div>
  );
}
