'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Loader2 } from 'lucide-react';
import { FireIntensity, GreetingFormData, TEMPLATES } from '@/types/greeting';
import { TemplatePreview } from './TemplatePreview';

interface GreetingFormProps {
  onSubmit: (data: GreetingFormData) => Promise<void>;
  isLoading: boolean;
}

const intensities: { value: FireIntensity; label: string; particles: number; emoji: string }[] = [
  { value: 'low', label: 'Gentle', particles: 10, emoji: '🕯️' },
  { value: 'medium', label: 'Balanced', particles: 20, emoji: '🔥' },
  { value: 'high', label: 'Intense', particles: 30, emoji: '🔥🔥' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function GreetingForm({ onSubmit, isLoading }: GreetingFormProps) {
  const [formData, setFormData] = useState<GreetingFormData>({
    senderName: '',
    receiverName: '',
    message: '',
    template: 'blazing-stallion',
    fireIntensity: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h1 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl mb-2" style={{ color: '#fbbf24' }}>
          马年大吉
        </h1>
        <p className="text-gray-400 text-sm sm:text-base font-inter">Create your Fire Horse Year greeting</p>
      </motion.div>

      {/* Sender Name */}
      <motion.div className="mb-5" variants={itemVariants}>
        <label className="block text-amber-300 text-sm font-semibold mb-2 font-inter">
          Your Name
        </label>
        <input
          type="text"
          required
          maxLength={50}
          value={formData.senderName}
          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-inter text-base sm:text-lg"
          placeholder="Enter your name"
          suppressHydrationWarning
        />
      </motion.div>

      {/* Receiver Name */}
      <motion.div className="mb-5" variants={itemVariants}>
        <label className="block text-amber-300 text-sm font-semibold mb-2 font-inter">
          Receiver&apos;s Name
        </label>
        <input
          type="text"
          required
          maxLength={50}
          value={formData.receiverName}
          onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-inter text-base sm:text-lg"
          placeholder="Who is this greeting for?"
          suppressHydrationWarning
        />
      </motion.div>

      {/* Message */}
      <motion.div className="mb-6" variants={itemVariants}>
        <label className="block text-amber-300 text-sm font-semibold mb-2 font-inter">
          Personal Message (Optional)
        </label>
        <textarea
          maxLength={200}
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none font-inter text-base"
          placeholder="Write a heartfelt message..."
          suppressHydrationWarning
        />
        <p className="text-gray-500 text-xs mt-1 text-right">{formData.message.length}/200</p>
      </motion.div>

      {/* Template Selection with Preview */}
      <motion.div className="mb-6" variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-amber-300 text-sm font-semibold font-inter">
            Choose Template
          </label>
          <span className="text-xs text-gray-500 font-inter">
            Click to select, hover to preview
          </span>
        </div>
        <TemplatePreview
          templates={TEMPLATES}
          selectedTemplate={formData.template}
          onSelect={(template) => setFormData({ ...formData, template })}
        />
      </motion.div>

      {/* Fire Intensity */}
      <motion.div className="mb-8" variants={itemVariants}>
        <label className="block text-amber-300 text-sm font-semibold mb-3 font-inter">
          Fire Intensity
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {intensities.map((intensity) => (
            <motion.button
              key={intensity.value}
              type="button"
              onClick={() => setFormData({ ...formData, fireIntensity: intensity.value })}
              className={`py-3 px-2 sm:px-4 rounded-xl border transition-all font-inter ${
                formData.fireIntensity === intensity.value
                  ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                  : 'border-gray-700 bg-white/5 text-gray-400 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg sm:text-xl mb-1 block">{intensity.emoji}</span>
              <span className="font-semibold text-xs sm:text-sm">{intensity.label}</span>
              <span className="block text-[10px] sm:text-xs opacity-70 mt-0.5">{intensity.particles}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #f97316 50%, #fbbf24 100%)',
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)',
          }}
          whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: '0 15px 40px rgba(220, 38, 38, 0.5)' }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Flame className="w-5 h-5" />
              <span>Create Greeting</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
