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
    'Home': '/',
    'About': '/about',
    'Projects': '/projects',
    'Contact': '/contact',
  };

  const getLinkHref = (name: string) => navPaths[name] || '/';

  return (
    <nav
      style={{
        backgroundColor: isDark ? '#0a0e27' : '#ffffff',
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isDark
          ? '0 2px 20px rgba(0, 100, 255, 0.1)'
          : '0 2px 20px rgba(0, 0, 0, 0.05)',
        borderBottom: isDark
          ? '1px solid rgba(0, 100, 255, 0.2)'
          : '1px solid rgba(0, 100, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo/Brand */}
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #0064ff, #0047cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer',
            letterSpacing: '-0.5px',
          }}
        >
          Karan
        </div>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <Link
            key={link}
            href={getLinkHref(link)}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div
              style={{
                position: 'relative',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: hoveredLink === link ? '#0064ff' : 'inherit',
                paddingBottom: '0.25rem',
              }}
            >
              {link}
              {/* Underline animation */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: hoveredLink === link ? '100%' : '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #0064ff, #0047cc)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          padding: '0.7rem 1.2rem',
          backgroundColor: isDark ? 'rgba(0, 100, 255, 0.2)' : 'rgba(0, 100, 255, 0.1)',
          border: `1.5px solid ${isDark ? 'rgba(0, 100, 255, 0.4)' : 'rgba(0, 100, 255, 0.3)'}`,
          borderRadius: '8px',
          cursor: 'pointer',
          color: isDark ? '#0064ff' : '#0064ff',
          fontWeight: '500',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(0, 100, 255, 0.3)' : 'rgba(0, 100, 255, 0.15)';
          e.currentTarget.style.borderColor = isDark ? 'rgba(0, 100, 255, 0.6)' : 'rgba(0, 100, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(0, 100, 255, 0.2)' : 'rgba(0, 100, 255, 0.1)';
          e.currentTarget.style.borderColor = isDark ? 'rgba(0, 100, 255, 0.4)' : 'rgba(0, 100, 255, 0.3)';
        }}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
