'use client';

import Link from 'next/link';

interface NavbarProps {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

export default function Navbar({isDark, setIsDark}: NavbarProps){
    //Function to make sure navbar is responsive and react remembers the state of the navbar
    
    return (
        <nav className="relative z-20 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex justify-between items-center p-6">
        
        {/* Your Name */}
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg">
          Karan
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/about" className="text-white hover:opacity-70 drop-shadow-lg">About</Link>
          <Link href="/projects" className="text-white hover:opacity-70 drop-shadow-lg">Projects</Link>
          <Link href="/contact" className="text-white hover:opacity-70 drop-shadow-lg">Contact</Link>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 drop-shadow-lg"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
    )
}