'use client';

import { motion } from 'framer-motion';

interface HorseSilhouetteProps {
  variant: 'running' | 'winged' | 'armored';
  className?: string;
  animate?: boolean;
}

export function HorseSilhouette({ variant, className = '', animate = true }: HorseSilhouetteProps) {
  const baseClasses = `transition-transform duration-300 ${className}`;

  if (variant === 'running') {
    return (
      <motion.svg
        viewBox="0 0 200 150"
        className={baseClasses}
        animate={animate ? { x: [0, 10, 0] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <filter id="fireGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Running Horse Silhouette */}
        <path
          d="M30 120 Q40 110 50 115 L60 105 Q70 100 80 105 L90 95 Q100 85 110 90 L120 80 Q130 75 140 80 L150 70 Q155 65 160 70 L165 60 Q170 55 175 60 L180 50 L175 45 Q170 40 165 45 L160 35 Q155 30 150 35 L145 25 Q140 20 135 25 L130 30 Q125 35 120 40 L110 50 Q100 55 90 50 L80 45 Q70 40 60 45 L50 50 Q40 55 30 60 L20 65 Q15 70 20 75 L25 85 Q30 90 25 95 L20 105 Q15 110 20 115 Z"
          fill="url(#fireGradient)"
          filter="url(#fireGlow)"
          className="animate-breathe"
        />
        {/* Fire from hooves */}
        <motion.g
          animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <ellipse cx="35" cy="120" rx="8" ry="15" fill="#f97316" opacity="0.8" />
          <ellipse cx="65" cy="115" rx="6" ry="12" fill="#f97316" opacity="0.7" />
          <ellipse cx="120" cy="105" rx="6" ry="12" fill="#f97316" opacity="0.7" />
          <ellipse cx="155" cy="85" rx="5" ry="10" fill="#f97316" opacity="0.6" />
        </motion.g>
      </motion.svg>
    );
  }

  if (variant === 'winged') {
    return (
      <motion.svg
        viewBox="0 0 200 150"
        className={baseClasses}
        animate={animate ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="50%" stopColor="#be185d" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="purpleGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Left Wing */}
        <motion.path
          d="M100 75 Q70 40 30 35 Q60 50 80 75 Q60 70 40 80 Q70 85 100 75"
          fill="url(#phoenixGradient)"
          filter="url(#purpleGlow)"
          opacity="0.9"
          animate={animate ? { rotateY: [0, 30, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '100px 75px' }}
        />
        {/* Right Wing */}
        <motion.path
          d="M100 75 Q130 40 170 35 Q140 50 120 75 Q140 70 160 80 Q130 85 100 75"
          fill="url(#phoenixGradient)"
          filter="url(#purpleGlow)"
          opacity="0.9"
          animate={animate ? { rotateY: [0, -30, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '100px 75px' }}
        />
        {/* Horse Body */}
        <path
          d="M85 75 Q85 55 100 50 Q115 55 115 75 Q115 95 100 100 Q85 95 85 75 M90 100 L85 120 M110 100 L115 120 M95 55 Q90 40 95 30 M105 55 Q110 40 105 30"
          fill="url(#phoenixGradient)"
          filter="url(#purpleGlow)"
        />
        {/* Tail */}
        <motion.path
          d="M85 85 Q60 90 50 100 Q60 95 85 90"
          fill="#ea580c"
          animate={animate ? { rotate: [-5, 5, -5] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '85px 85px' }}
        />
      </motion.svg>
    );
  }

  // Armored variant
  return (
    <motion.svg
      viewBox="0 0 200 150"
      className={baseClasses}
      animate={animate ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="armorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="goldShine">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feSpecularLighting result="spec" in="blur" specularConstant="1.2" specularExponent="20" lightingColor="#fff">
            <fePointLight x="100" y="-50" z="200"/>
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>
      </defs>
      {/* Armored Horse */}
      <g className="animate-shine">
        {/* Body */}
        <path
          d="M60 80 Q60 50 90 45 Q120 50 130 70 Q140 90 120 100 L110 120 M90 100 L85 120 M70 75 L50 70 M120 70 L140 65"
          fill="url(#armorGradient)"
          stroke="#92400e"
          strokeWidth="2"
          filter="url(#goldShine)"
        />
        {/* Head */}
        <path
          d="M90 45 Q85 30 95 25 Q105 30 100 45"
          fill="url(#armorGradient)"
          stroke="#92400e"
          strokeWidth="2"
          filter="url(#goldShine)"
        />
        {/* Armor details */}
        <circle cx="90" cy="60" r="8" fill="#fcd34d" opacity="0.8" />
        <circle cx="110" cy="65" r="6" fill="#fcd34d" opacity="0.8" />
        <circle cx="100" cy="80" r="10" fill="#fcd34d" opacity="0.8" />
        {/* Mane */}
        <path
          d="M95 25 Q100 20 105 25 Q110 30 105 35 Q100 30 95 35"
          fill="#dc2626"
        />
      </g>
    </motion.svg>
  );
}
