'use client';

export default function Home() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        padding: '4rem 3rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Left Side - Photo */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: '#d0e0ff',
            border: '3px solid #0064ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#0064ff',
            fontWeight: '700',
            boxShadow: '0 10px 40px rgba(0, 100, 255, 0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 60px rgba(0, 100, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 100, 255, 0.15)';
          }}
        >
          {/* Placeholder for photo */}
          Photo
        </div>
      </div>

      {/* Right Side - Name & Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Name */}
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #0064ff, #0047cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          Karan Verma
        </h1>

        {/* Summary */}
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#666',
            maxWidth: '500px',
            margin: 0,
            fontWeight: '400',
          }}
        >
          Full-stack developer passionate about creating modern web experiences. Specializing in React,
          Next.js, and building scalable applications.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            style={{
              padding: '0.9rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #0064ff, #0047cc)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 20px rgba(0, 100, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 100, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 100, 255, 0.3)';
            }}
          >
            View My Work
          </button>
          <button
            style={{
              padding: '0.9rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'transparent',
              color: '#0064ff',
              border: '2px solid #0064ff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 100, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}
