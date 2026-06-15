'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface KatanaHandleProps {
  name: string;
  path: string;
  angle: number;
  distance: number;
  onSlice: (path: string) => void;
}

export default function KatanaHandle({ name, path, angle, distance, onSlice }: KatanaHandleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSlice(path);
  };

  const angleRad = (angle) * Math.PI / 180;
  const x = Math.sin(angleRad) * distance;
  const y = -Math.cos(angleRad) * distance;

  // Different blade colors for each katana
  const bladeColors: { [key: string]: string } = {
    '/': '#6366f1',        // Home - Indigo
    '/about': '#a855f7',   // About - Purple
    '/projects': '#ec4899', // Projects - Pink
    '/contact': '#06b6d4', // Contact - Cyan
  };

  const bladeColor = bladeColors[path] || '#6366f1';
  const bladeExtension = isHovered ? '-30' : '5';

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* SVG Anime Katana */}
      <svg
        width="120"
        height="200"
        viewBox="0 0 120 200"
        className={`transition-transform duration-300 ${isHovered ? 'drop-shadow-lg' : ''}`}
      >
        {/* BLADE - Colorful with gradient */}
        <defs>
          <linearGradient id={`bladeGradient-${path}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={bladeColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={bladeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={bladeColor} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Main blade body */}
        <path
          d={`M 55 5 Q 52 ${isHovered ? bladeExtension : '20'} 50 ${isHovered ? bladeExtension : '20'} Q 48 ${isHovered ? bladeExtension : '20'} 50 ${isHovered ? bladeExtension + 5 : '25'} L 55 ${isHovered ? bladeExtension : '5'} Z`}
          fill={`url(#bladeGradient-${path})`}
          stroke={bladeColor}
          strokeWidth="1.5"
          className="transition-all duration-500"
        />

        {/* Blade shine/highlight */}
        {isHovered && (
          <line
            x1="52"
            y1={bladeExtension}
            x2="52"
            y2={parseInt(bladeExtension) - 20}
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
            className="animate-pulse"
          />
        )}

        {/* Blade tip */}
        <polygon
          points={`60,${bladeExtension} 55,${parseInt(bladeExtension) - 8} 65,${parseInt(bladeExtension) - 8}`}
          fill={bladeColor}
          className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* SHEATH (Scabbard) - Long and prominent */}
        <path
          d="M 52 8 Q 50 40 50 80 Q 50 120 52 145 L 68 145 Q 70 120 70 80 Q 70 40 68 8 Z"
          fill="#1a0f08"
          stroke="#3d2817"
          strokeWidth="2"
        />

        {/* Sheath decorative pattern - Flowers/designs */}
        <circle cx="60" cy="25" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="30" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="30" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="60" cy="45" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="50" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="50" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="60" cy="65" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="70" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="70" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="60" cy="85" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="90" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="90" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="60" cy="105" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="110" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="110" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="60" cy="125" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="56" cy="130" r="3" fill="#d4af37" opacity="0.8" />
        <circle cx="64" cy="130" r="3" fill="#d4af37" opacity="0.8" />

        {/* Sheath bands/wrapping */}
        <rect x="52" y="35" width="16" height="3" fill="#8b5a3c" stroke="#5a3a1c" strokeWidth="1" />
        <rect x="52" y="55" width="16" height="3" fill="#8b5a3c" stroke="#5a3a1c" strokeWidth="1" />
        <rect x="52" y="75" width="16" height="3" fill="#8b5a3c" stroke="#5a3a1c" strokeWidth="1" />
        <rect x="52" y="95" width="16" height="3" fill="#8b5a3c" stroke="#5a3a1c" strokeWidth="1" />
        <rect x="52" y="115" width="16" height="3" fill="#8b5a3c" stroke="#5a3a1c" strokeWidth="1" />

        {/* TSUBA (Hand Guard) - Large and ornate */}
        <circle cx="60" cy="150" r="22" fill="#d4af37" stroke="#8b7500" strokeWidth="2" />
        <circle cx="60" cy="150" r="18" fill="#c9a961" stroke="#8b7500" strokeWidth="1" opacity="0.8" />
        <circle cx="60" cy="150" r="12" fill="none" stroke="#8b7500" strokeWidth="1.5" opacity="0.6" />

        {/* Tsuba decorative pattern */}
        <circle cx="48" cy="150" r="2.5" fill="#8b7500" />
        <circle cx="72" cy="150" r="2.5" fill="#8b7500" />
        <circle cx="60" cy="138" r="2.5" fill="#8b7500" />
        <circle cx="60" cy="162" r="2.5" fill="#8b7500" />

        {/* HANDLE - Shorter */}
        <rect x="50" y="160" width="20" height="35" fill="#6b4423" stroke="#4a2c15" strokeWidth="2" rx="2" />

        {/* Handle wrapping - colorful bands */}
        <rect x="50" y="168" width="20" height="3" fill={bladeColor} opacity="0.7" />
        <rect x="50" y="177" width="20" height="3" fill="#8b4513" opacity="0.8" />
        <rect x="50" y="186" width="20" height="3" fill={bladeColor} opacity="0.7" />

        {/* Handle cord/accent lines */}
        <line x1="54" y1="160" x2="54" y2="195" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
        <line x1="66" y1="160" x2="66" y2="195" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />

        {/* POMMEL - Ornate circular end */}
        <circle cx="60" cy="198" r="8" fill="#d4af37" stroke="#8b7500" strokeWidth="2" />
      </svg>

      {/* Page Name (appears on hover) */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-bold text-white drop-shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 -translate-y-32' : 'opacity-0 -translate-y-24'
        }`}
      >
        {name}
      </div>
    </div>
  );
}
