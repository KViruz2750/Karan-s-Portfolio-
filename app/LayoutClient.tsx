'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={isDark ? '/images/night.jpg' : '/images/day.jpg'}
        alt={isDark ? 'Night City' : 'Day City'}
        fill
        priority
        className="object-cover"
      />
      
        {/* Main Content */}
      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        {children}
      </div>
    </div>
  );
}