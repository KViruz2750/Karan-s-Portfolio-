'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function KatanaWheel() {
    const [isHovered, setIsHovered] = useState(false);

    const pages = [
        { name: 'Home', path: '/', icon: '⚔️' },
        { name: 'About', path: '/about', icon: '⚔️' },
        { name: 'Projects', path: '/projects', icon: '⚔️' },
        { name: 'Contact', path: '/contact', icon: '⚔️' },
    ];

    return (
        <div
            className="relative w-64 h-64 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 4 katan icons in a circle */}
            {pages.map((page, index) =>{
                const angle = (index * 360 / pages.length);
                return (
                    <Link
                    key={page.path}
                    href={page.path}
                    className="absolute w-16 h-16 flex items-center justify-center cursor-pointer"
                    style={{
                        transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-32px',
                        marginTop: '-32px',
                    }}
                    >
                    <div className="text-4xl hover:scale-125 transition-transform">
                        {page.icon}
                    </div>
                    <span className="absolute bottom-full mb-2 text-sm font-bold whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {page.name}
                    </span>
                    </Link>
                );
            })}
        </div>
    )

}