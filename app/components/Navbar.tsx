'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = ['Home', 'About', 'Projects', 'Contact'];
  const navPaths: { [key: string]: string } = {
    Home: '/',
    About: '/about',
    Projects: '/projects',
    Contact: '/contact',
  };

  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
      `}</style>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          /* Glassmorphism — clearly separates nav from page content */
          backgroundColor: isDark
            ? 'rgba(8, 12, 30, 0.72)'
            : 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding: '1.2rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          /* Strong bottom glow line so the nav reads as a distinct layer */
          borderBottom: isDark
            ? '1px solid rgba(80, 140, 255, 0.25)'
            : '1px solid rgba(0, 80, 220, 0.12)',
          boxShadow: isDark
            ? '0 4px 32px rgba(0, 80, 255, 0.18), 0 1px 0 rgba(80,140,255,0.1)'
            : '0 4px 24px rgba(0, 60, 200, 0.10), 0 1px 0 rgba(0,80,220,0.08)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Logo — no border, just big elegant text */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '4px',
              background: 'linear-gradient(135deg, #4a9eff, #0047cc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              display: 'inline-block',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            KV
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link}
              href={navPaths[link]}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div
                style={{
                  position: 'relative',
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: hoveredLink === link ? 600 : 400,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'color 0.25s ease, font-weight 0.1s',
                  color: hoveredLink === link
                    ? '#4a9eff'
                    : isDark ? 'rgba(220,235,255,0.85)' : 'rgba(20,30,60,0.85)',
                  paddingBottom: '0.3rem',
                }}
              >
                {link}
                {/* animated underline */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: hoveredLink === link ? '100%' : '0%',
                    height: '2px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg, #4a9eff, #0047cc)',
                    transition: 'width 0.28s ease',
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Dark / Light toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '0.6rem 1.1rem',
            backgroundColor: isDark ? 'rgba(74,158,255,0.15)' : 'rgba(0,80,220,0.08)',
            border: `1.5px solid ${isDark ? 'rgba(74,158,255,0.35)' : 'rgba(0,80,220,0.2)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? 'rgba(74,158,255,0.25)'
              : 'rgba(0,80,220,0.14)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? 'rgba(74,158,255,0.15)'
              : 'rgba(0,80,220,0.08)';
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </nav>
    </>
  );
}
