'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GreetingForm } from '@/components/GreetingForm';
import { GreetingFormData } from '@/types/greeting';
import { db, isDemoConfig } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ClientParticles } from '@/components/ClientParticles';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateGreeting = async (formData: GreetingFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if using demo config
      if (isDemoConfig) {
        console.warn('⚠️ Using DEMO mode. Configure Firebase for production use.');
        console.log('📖 See FIREBASE_SETUP.md for instructions');

        // For demo: create a mock greeting ID and redirect
        // In real app, you'd either use localStorage or the emulator
        const mockId = 'demo-' + Date.now();

        // Store in localStorage for demo viewing
        localStorage.setItem(`greeting-${mockId}`, JSON.stringify({
          ...formData,
          id: mockId,
          createdAt: new Date().toISOString(),
          viewCount: 0,
          shareCount: 0,
        }));

        // Redirect to the mock greeting page
        router.push(`/greeting/${mockId}`);
        return;
      }

      // Validate template
      const validTemplates = ['blazing-stallion', 'phoenix-horse', 'emperor-steed', 'celestial-horse', 'golden-lotus', 'dragon-horse'];
      if (!validTemplates.includes(formData.template)) {
        throw new Error('Invalid template selected');
      }

      // Validate fire intensity
      const validIntensities = ['low', 'medium', 'high'];
      if (!validIntensities.includes(formData.fireIntensity)) {
        throw new Error('Invalid fire intensity selected');
      }

      // Create greeting document
      const docRef = await addDoc(collection(db, 'greetings'), {
        senderName: formData.senderName.trim(),
        receiverName: formData.receiverName.trim(),
        message: formData.message.trim() || null,
        template: formData.template,
        fireIntensity: formData.fireIntensity,
        createdAt: serverTimestamp(),
        viewCount: 0,
        shareCount: 0,
      });

      // Redirect to the greeting page
      router.push(`/greeting/${docRef.id}`);
    } catch (err: any) {
      console.error('Error creating greeting:', err);

      // Check for permission error
      if (err?.code === 'permission-denied' || err?.message?.includes('permission')) {
        setError(
          'Firebase permission denied. Please set up Firestore security rules. See FIREBASE_SETUP.md'
        );
      } else {
        setError(err?.message || 'Failed to create greeting. Please try again.');
      }

      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom right, #1a0a0a 0%, #0a0a0a 50%, #1a0a1a 100%)',
        }}
      />

      {/* Demo mode banner */}
      {isDemoConfig && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-50 bg-amber-600 text-white text-center py-2 px-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <p className="text-sm font-inter">
            ⚠️ DEMO MODE: Firebase not configured.
            <a href="/FIREBASE_SETUP.md" className="underline ml-2">View Setup Guide</a>
          </p>
        </motion.div>
      )}

      {/* Ambient fire particles background - Client only */}
      <ClientParticles count={15} />

      {/* Content */}
      <div className={`container mx-auto px-4 ${isDemoConfig ? 'py-20' : 'py-12 md:py-20'}`}>
        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🐴</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white font-inter">
              Imlek<span className="text-amber-400">Greeting</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-inter">Year of the Fire Horse 2026</p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            className="max-w-xl mx-auto mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-center font-inter"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{error}</p>
            {error.includes('permission') && (
              <a
                href="/FIREBASE_SETUP.md"
                className="text-amber-400 underline text-sm mt-2 inline-block"
              >
                📖 How to fix this
              </a>
            )}
          </motion.div>
        )}

        {/* Form */}
        <GreetingForm onSubmit={handleCreateGreeting} isLoading={isLoading} />

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 pb-8 text-gray-500 text-sm font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>© 2026 Imlek Greeting Generator. Celebrate with fire and prosperity.</p>
          <p className="mt-2 text-xs">
            <span className="text-amber-500"> Horse</span> •
            <span className="text-red-500"> Fire</span> •
            <span className="text-orange-400"> Prosperity</span>
          </p>
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              🥞 Crafted with love by{' '}
              <a
                href="https://martabakcode.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                MartabakCode
              </a>
            </p>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
