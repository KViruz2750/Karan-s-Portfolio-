'use client';

import KatanaHandle from './KatanaHandle';
import { useState } from 'react';

interface KatanaWheelProps {
  onSlice: (path: string) => void;
}

export default function KatanaWheel({ onSlice }: KatanaWheelProps) {
  const [isStopped, setIsStopped] = useState(false);

  const pages = [
    { name: 'Home', path: '/', index: 0 },
    { name: 'About', path: '/about', index: 1 },
    { name: 'Projects', path: '/projects', index: 2 },
    { name: 'Contact', path: '/contact', index: 3 },
  ];

  const wheelRadius = 160;

  return (
    <div
      className="relative w-96 h-96 flex items-center justify-center"
      onMouseEnter={() => setIsStopped(true)}
      onMouseLeave={() => setIsStopped(false)}
    >
      {/* Rotating wheel */}
      <div
        className={`absolute w-full h-full transition-all duration-300 ${
          isStopped ? '' : 'animate-spin'
        }`}
        style={{
          animationDuration: '20s',
          animationDirection: 'reverse',
          animationPlayState: isStopped ? 'paused' : 'running',
        }}
      >
        {/* Katana handles */}
        {pages.map((page) => {
          const angle = (page.index * 360) / pages.length;
          return (
            <KatanaHandle
              key={page.path}
              name={page.name}
              path={page.path}
              angle={angle}
              distance={wheelRadius}
              onSlice={onSlice}
            />
          );
        })}
      </div>

      {/* Center glow */}
      <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl" />

      {/* Wheel border glow */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-40 shadow-lg" />
    </div>
  );
}
