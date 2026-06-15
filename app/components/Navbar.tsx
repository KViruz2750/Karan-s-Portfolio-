'use client';

import Link from 'next/link';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  return (
    <nav
      style={{
        backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
        padding: '1rem 2rem',
        borderBottom: `1px solid ${isDark ? '#444' : '#ddd'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Karan</h1>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
          About
        </Link>
        <Link href="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
          Projects
        </Link>
        <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
          Contact
        </Link>

        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isDark ? '#444' : '#ddd',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: isDark ? '#fff' : '#000',
          }}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
