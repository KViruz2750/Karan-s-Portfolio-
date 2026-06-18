'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import LoadingScreen from '@/app/components/LoadingScreen';
import InteractiveBackground from '@/app/components/InteractiveBackground';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: isDark ? '#0a0e27' : '#e8f0ff',
        color: isDark ? '#ffffff' : '#1a1a1a',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Interactive Background */}
      <InteractiveBackground isDark={isDark} />

      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onLoadComplete={() => setShowLoading(false)} />
      )}

      {/* Page Content */}
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  );
}
