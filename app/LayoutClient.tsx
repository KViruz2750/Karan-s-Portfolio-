'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

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
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main>{children}</main>
    </div>
  );
}
