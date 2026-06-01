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
    <div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </div>
  );
}