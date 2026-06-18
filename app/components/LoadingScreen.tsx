'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onLoadComplete(), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0e27',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Animated Logo */}
        <div
          style={{
            fontSize: '4rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #0064ff, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          KV
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#0064ff',
                animation: `bounce 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
