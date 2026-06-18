'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagons: {
      x: number;
      y: number;
      size: number;
      hue: number;
      pulsePhase: number;
    }[] = [];
    const hexSize = 40;
    const spacing = hexSize * 1.8;

    // Create honeycomb grid
    for (let y = -hexSize; y < canvas.height + hexSize; y += spacing) {
      for (let x = -hexSize; x < canvas.width + hexSize; x += spacing * 0.866) {
        hexagons.push({
          x: x + (y / spacing) % 2 ? spacing * 0.433 : 0,
          y,
          size: hexSize,
          hue: Math.random() * 360,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    let animationFrame = 0;

    const drawHexagon = (
      cx: number,
      cy: number,
      size: number,
      fillColor: string,
      strokeColor: string
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = isDark ? '#0a0e27' : '#e8f0ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame++;

      hexagons.forEach((hex) => {
        const dx = mousePos.x - hex.x;
        const dy = mousePos.y - hex.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Pulse effect
        const pulse = Math.sin(animationFrame * 0.05 + hex.pulsePhase) * 0.5 + 0.5;

        // Distance effect - hexagons glow when cursor is near
        let intensity = Math.max(0, 1 - distance / 300);

        // Base color with vibrant saturation
        const baseHue = (hex.hue + animationFrame * 0.2) % 360;
        const saturation = 70 + intensity * 30;
        const lightness = 50 + pulse * 15 + intensity * 15;

        const fillColor = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
        const strokeColor = `hsl(${baseHue}, ${saturation}%, ${lightness - 20}%)`;

        drawHexagon(hex.x, hex.y, hex.size, fillColor, strokeColor);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDark, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
