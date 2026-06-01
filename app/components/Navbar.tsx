'use client';

import Link from 'next/link';

interface NavbarProps {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

export default function Navbar({isDark, setIsDark}: NavbarProps){
    //Function to make sure navbar is responsive and react remembers the state of the navbar
    
    return (
        <nav className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
            <div className= "flex justify-between items-center p-6">

                {/* Name */}
                <Link href="/" className="text-2xl font-bold">
                    Karan
                </Link>

                {/* Links */}
                <div className="flex gap-6">
                    <Link href="/about" className="hover:opacity-70">
                        About
                    </Link>
                    <Link href="/projects" className="hover:opacity-70">
                        Projects
                    </Link>
                    <Link href="/contact" className="hover:opacity-70">
                        Contact
                    </Link>
                </div>

                {/* Dark Mode Toggle */}
                <button 
                    onClick={() => setIsDark(!isDark)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    )
}