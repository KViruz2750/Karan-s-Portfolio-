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
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      {/* Left Side - Photo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          animation: 'fadeInLeft 0.8s ease-out',
        }}
      >
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          animation: 'fadeInRight 0.8s ease-out',
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: '4.5rem',
            fontWeight: '800',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #0064ff, #0047cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            fontFamily: '"Playfair Display", serif',
            letterSpacing: '-1px',
          }}
        >
          Karan Verma
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#0064ff',
            margin: 0,
            fontFamily: '"Poppins", sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Full Stack Developer
        </p>

        {/* Summary */}
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: '#666',
            maxWidth: '500px',
            margin: 0,
            fontWeight: '400',
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Crafting modern web experiences with cutting-edge technologies. Passionate about clean code,
          responsive design, and building scalable applications that make a difference.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #0064ff, #0047cc)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 100, 255, 0.3)',
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 100, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 100, 255, 0.3)';
            }}
          >
            View My Work
          </button>
          <button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'transparent',
              color: '#0064ff',
              border: '2.5px solid #0064ff',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 100, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 100, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
