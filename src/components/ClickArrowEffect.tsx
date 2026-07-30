'use client';

import React, { useEffect, useState } from 'react';

interface ClickArrow {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function ClickArrowEffect() {
  const [arrows, setArrows] = useState<ClickArrow[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newArrow: ClickArrow = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        angle: Math.floor(Math.random() * 24) - 12,
      };

      setArrows((prev) => [...prev.slice(-12), newArrow]);

      setTimeout(() => {
        setArrows((prev) => prev.filter((a) => a.id !== newArrow.id));
      }, 850);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {arrows.map((arrow) => (
        <div
          key={arrow.id}
          className="absolute"
          style={{
            left: `${arrow.x}px`,
            top: `${arrow.y}px`,
            transform: `rotate(${arrow.angle}deg)`,
            animation: 'shootArrowClick 0.85s cubic-bezier(0.1, 0.7, 0.3, 1) forwards',
          }}
        >
          {/* Glowing arrow line + arrowhead + sparks */}
          <div className="relative flex items-center">
            {/* Trail */}
            <div
              className="h-[3px] w-28 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(139,26,46,0.5), #E8823A, #F0B429, #FFD45E)',
                boxShadow: '0 0 10px #FFD45E, 0 0 20px #E8823A, 0 0 30px #8B1A2E',
              }}
            />
            {/* SVG Arrowhead & Shaft */}
            <svg viewBox="0 0 32 16" fill="none" className="w-8 h-4 -ml-1 filter drop-shadow-[0_0_8px_#FFD45E]">
              <path d="M0 8 L24 8" stroke="#FFD45E" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M24 8 L15 2 L18 8 L15 14 Z" fill="#FFD45E" stroke="#E8823A" strokeWidth="1" />
              {/* Arrow Fletching */}
              <path d="M2 8 L6 4 M2 8 L6 12" stroke="#F5E6CE" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Fire Spark Ring */}
            <div
              className="absolute -left-2 w-4 h-4 rounded-full animate-ping opacity-80"
              style={{ background: 'radial-gradient(circle, #FFD45E 0%, #FF6B1A 70%, transparent 100%)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
