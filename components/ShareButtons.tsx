'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Share2, Copy, Check, Facebook, Twitter, MessageCircle, Link2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  ariaLabel?: string;
}

function MagneticButton({ children, onClick, className = '', variant = 'primary', ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = {
    primary: 'bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 px-3 sm:px-4 py-2 rounded-full text-sm',
    icon: 'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white',
  }[variant];

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      className={`relative overflow-hidden ${baseClasses} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple effect container */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Check out this Imlek greeting! 🐴🔥',
          url: url,
        });
      } catch {
        setShowShareMenu(!showShareMenu);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <MagneticButton onClick={handleShare} variant="primary" ariaLabel="Share greeting">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Share</span>
        </MagneticButton>
        
        <MagneticButton onClick={handleCopyLink} variant="secondary" ariaLabel={copied ? 'Link copied' : 'Copy link'}>
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400 hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </MagneticButton>
      </div>

      {/* Social share buttons */}
      <motion.div
        className="flex items-center gap-2 sm:gap-3"
        initial={false}
        animate={{
          height: showShareMenu ? 'auto' : 0,
          opacity: showShareMenu ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <MagneticButton
          onClick={shareToFacebook}
          variant="icon"
          className="bg-blue-600 hover:bg-blue-700"
          ariaLabel="Share to Facebook"
        >
          <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
        </MagneticButton>
        
        <MagneticButton
          onClick={shareToTwitter}
          variant="icon"
          className="bg-sky-500 hover:bg-sky-600"
          ariaLabel="Share to Twitter"
        >
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
        </MagneticButton>
        
        <MagneticButton
          onClick={shareToWhatsApp}
          variant="icon"
          className="bg-green-600 hover:bg-green-700"
          ariaLabel="Share to WhatsApp"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </MagneticButton>
      </motion.div>
    </div>
  );
}
