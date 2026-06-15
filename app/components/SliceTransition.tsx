'use client';

import { useEffect } from 'react';

interface SliceTransitionProps {
  isActive: boolean;
  onAnimationComplete: () => void;
}

export default function SliceTransition({ isActive, onAnimationComplete }: SliceTransitionProps) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isActive, onAnimationComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Left slash */}
      <div
        className="absolute h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
        style={{
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%) skewY(20deg)',
          boxShadow: '0 0 30px rgba(96, 165, 250, 1)',
          animation: 'slash 0.6s ease-out forwards',
        }}
      />

      {/* Screen flash */}
      <div
        className="absolute inset-0 bg-orange-400"
        style={{
          animation: 'flash 0.6s ease-out forwards',
        }}
      />

      <style>{`
        @keyframes slash {
          0% {
            width: 0;
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
