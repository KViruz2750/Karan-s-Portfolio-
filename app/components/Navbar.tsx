'use client';

import Link from 'next/link';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  return (
    <nav className="relative z-20 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex justify-between items-center p-6">
        
        {/* Your Name (Left) */}
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg">
          Karan
        </Link>

        {/* Dark Mode Toggle (Right) */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 drop-shadow-lg"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}