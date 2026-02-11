'use client';

import { motion } from 'framer-motion';
import { TemplateConfig, TemplateType } from '@/types/greeting';
import { Check, Eye } from 'lucide-react';
import { useState } from 'react';

interface TemplatePreviewProps {
  templates: TemplateConfig[];
  selectedTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

interface PreviewModalProps {
  template: TemplateConfig;
  isOpen: boolean;
  onClose: () => void;
}

function PreviewModal({ template, isOpen, onClose }: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview card */}
        <div
          className="aspect-[3/4] relative p-6 flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${template.previewColors[0]} 0%, ${template.previewColors[1]} 50%, ${template.previewColors[2]} 100%)`,
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id={`preview-pattern-${template.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#preview-pattern-${template.id})`} />
            </svg>
          </div>

          {/* Icon */}
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {template.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white text-center mb-2 font-calligraphy">
            {template.name}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-center text-sm px-4">
            {template.description}
          </p>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

export function TemplatePreview({ templates, selectedTemplate, onSelect }: TemplatePreviewProps) {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              type="button"
              onClick={() => onSelect(template.id)}
              className={`w-full relative overflow-hidden rounded-xl border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-amber-500 ring-2 ring-amber-500/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              suppressHydrationWarning
            >
              {/* Preview thumbnail */}
              <div
                className="aspect-[4/5] relative p-3 flex flex-col items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${template.previewColors[0]} 0%, ${template.previewColors[1]} 50%, ${template.previewColors[2]} 100%)`,
                }}
              >
                {/* Icon */}
                <motion.div
                  className="text-3xl sm:text-4xl mb-2"
                  animate={selectedTemplate === template.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {template.icon}
                </motion.div>

                {/* Name */}
                <h4 className="text-white font-semibold text-xs sm:text-sm text-center leading-tight">
                  {template.name}
                </h4>

                {/* Selected indicator */}
                {selectedTemplate === template.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
                    layoutId="selected-indicator"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}

                {/* Hover overlay with preview button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <motion.div
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(template);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/20 text-white text-xs flex items-center gap-1 hover:bg-white/30 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </motion.div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <PreviewModal
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </>
  );
}
