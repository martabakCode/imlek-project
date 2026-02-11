'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db, isDemoConfig } from '@/lib/firebase';
import { Greeting } from '@/types/greeting';
import { GreetingCard } from '@/components/GreetingCard';
import { ShareButtons } from '@/components/ShareButtons';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, Home, Info } from 'lucide-react';
import Link from 'next/link';

export default function GreetingPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchGreeting = async () => {
      if (!id) return;

      try {
        // Check if this is a demo greeting (stored in localStorage)
        if (id.startsWith('demo-')) {
          setIsDemo(true);
          const stored = localStorage.getItem(`greeting-${id}`);
          
          if (stored) {
            const data = JSON.parse(stored);
            setGreeting({
              id,
              senderName: data.senderName,
              receiverName: data.receiverName,
              message: data.message,
              template: data.template,
              fireIntensity: data.fireIntensity,
              createdAt: null as any,
              viewCount: 0,
              shareCount: 0,
            });
            
            // Show share buttons after a delay
            setTimeout(() => setShowShare(true), 2000);
            setLoading(false);
            return;
          } else {
            setError('Demo greeting not found. It may have been cleared.');
            setLoading(false);
            return;
          }
        }

        // Check if using demo config
        if (isDemoConfig) {
          setIsDemo(true);
          setError(
            'Firebase not configured. This greeting ID cannot be loaded in demo mode. ' +
            'Please set up Firebase to create and view real greetings.'
          );
          setLoading(false);
          return;
        }

        // Fetch from Firebase
        const docRef = doc(db, 'greetings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setGreeting({
            id: docSnap.id,
            ...data,
          } as Greeting);

          // Increment view count
          await updateDoc(docRef, {
            viewCount: increment(1),
          });

          // Show share buttons after a delay
          setTimeout(() => setShowShare(true), 2000);
        } else {
          setError('Greeting not found');
        }
      } catch (err: any) {
        console.error('Error fetching greeting:', err);
        
        if (err?.code === 'permission-denied') {
          setError(
            'Firebase permission denied. Please check your Firestore security rules. ' +
            'See FIREBASE_SETUP.md for instructions.'
          );
        } else {
          setError(err?.message || 'Failed to load greeting');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
  }, [id]);

  // Get share URL
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/greeting/${id}`
    : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-inter">Loading your greeting...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !greeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2 font-inter">
            {error ? 'Error Loading Greeting' : 'Greeting Not Found'}
          </h1>
          <p className="text-gray-400 mb-6 font-inter">
            {error || 'The greeting you\'re looking for might have been removed or doesn\'t exist.'}
          </p>
          
          {isDemo && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Info className="w-5 h-5 mx-auto mb-2" />
              <p>You're running in DEMO mode.</p>
              <p className="mt-1">
                <a href="/FIREBASE_SETUP.md" className="underline text-amber-400">
                  📖 View Firebase Setup Guide
                </a>
              </p>
            </motion.div>
          )}
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors font-inter"
          >
            <Home className="w-5 h-5" />
            Create New Greeting
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Demo mode banner */}
      {isDemo && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white text-center py-2 px-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <p className="text-sm font-inter">
            ⚠️ DEMO MODE: This greeting is stored locally. 
            <a href="/FIREBASE_SETUP.md" className="underline ml-2">Set up Firebase for permanent storage</a>
          </p>
        </motion.div>
      )}

      {/* Greeting Card */}
      <div className={isDemo ? 'pt-10' : ''}>
        <GreetingCard greeting={greeting} />
      </div>

      {/* Share Section */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 p-6 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div
              className="max-w-md mx-auto p-4 rounded-2xl backdrop-blur-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <ShareButtons
                url={shareUrl}
                title={`Imlek Greeting for ${greeting.receiverName}`}
              />
              <div className="text-center mt-3">
                <Link
                  href="/"
                  className="text-gray-400 text-sm hover:text-amber-400 transition-colors font-inter"
                >
                  Create your own greeting →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create your own floating button (mobile friendly) */}
      {!showShare && (
        <motion.div
          className={`fixed bottom-4 right-4 z-50 ${isDemo ? 'top-16' : ''}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/"
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316)',
            }}
            title="Create your own greeting"
          >
            <span className="text-xl">+</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
