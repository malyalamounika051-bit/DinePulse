'use client';

import React from 'react';

export default function SacredLogoHero() {
  return (
    <div className="relative flex items-center justify-center p-4 md:p-8">
      {/* Outer Divine Aura Glow */}
      <div className="absolute w-[440px] h-[440px] rounded-full animate-pulse-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(240,180,41,0.22) 0%, rgba(232,130,58,0.12) 45%, transparent 75%)' }} />
      <div className="absolute w-[360px] h-[360px] rounded-full animate-pulse-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,26,46,0.3) 0%, transparent 70%)' }} />

      {/* Main Crest Glass Card */}
      <div className="relative w-full max-w-[440px] aspect-square rounded-3xl p-8 glass-panel flex flex-col items-center justify-center text-center war-shimmer border border-amber-500/40 shadow-2xl"
           style={{ background: 'radial-gradient(ellipse at center, rgba(32,5,16,0.95) 0%, rgba(14,2,16,0.98) 100%)', boxShadow: '0 0 60px rgba(240,180,41,0.25), inset 0 0 40px rgba(139,26,46,0.4)' }}>

        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-7 h-7" style={{ borderTop: '2px solid #FFD45E', borderLeft: '2px solid #FFD45E', borderRadius: '4px 0 0 0' }} />
        <div className="absolute top-4 right-4 w-7 h-7" style={{ borderTop: '2px solid #FFD45E', borderRight: '2px solid #FFD45E', borderRadius: '0 4px 0 0' }} />
        <div className="absolute bottom-4 left-4 w-7 h-7" style={{ borderBottom: '2px solid #FFD45E', borderLeft: '2px solid #FFD45E', borderRadius: '0 0 0 4px' }} />
        <div className="absolute bottom-4 right-4 w-7 h-7" style={{ borderBottom: '2px solid #FFD45E', borderRight: '2px solid #FFD45E', borderRadius: '0 0 4px 0' }} />

        {/* Central Divine Logo Emblem SVG */}
        <div className="relative w-48 h-48 mb-4 flex items-center justify-center">

          {/* Rotating Mandala Rays Ring */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite] opacity-60">
            <circle cx="100" cy="100" r="90" stroke="#F0B429" strokeWidth="1" strokeDasharray="4 8" fill="none" />
            <circle cx="100" cy="100" r="76" stroke="#E8823A" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
            <circle cx="100" cy="100" r="62" stroke="#8B1A2E" strokeWidth="1" fill="none" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
              <line key={deg} x1="100" y1="12" x2="100" y2="20" stroke="#FFD45E" strokeWidth="2" transform={`rotate(${deg} 100 100)`} />
            ))}
          </svg>

          {/* Inner Glowing Shield & Bow Arrow Symbol */}
          <div className="w-32 h-32 rounded-full flex items-center justify-center relative shadow-2xl"
               style={{ background: 'linear-gradient(135deg, #4A0E18 0%, #8B1A2E 50%, #1A0410 100%)', border: '2px solid #FFD45E', boxShadow: '0 0 30px #F0B429, inset 0 0 20px #FF6B1A' }}>
            
            <svg viewBox="0 0 80 80" fill="none" className="w-24 h-24 filter drop-shadow-[0_0_12px_#FFD45E]">
              {/* Sacred Bow */}
              <path d="M22 12 C10 28 10 52 22 68" stroke="url(#heroBowGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Bow String */}
              <line x1="22" y1="12" x2="22" y2="68" stroke="#F5E6CE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
              {/* Golden Arrow Shaft */}
              <line x1="14" y1="40" x2="68" y2="40" stroke="url(#heroArrowGrad)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Arrowhead */}
              <path d="M68 40 L50 30 L55 40 L50 50 Z" fill="#FFD45E" stroke="#E8823A" strokeWidth="1.5" />
              {/* Arrow Fletching */}
              <path d="M16 40 L24 32 M16 40 L24 48" stroke="#F5E6CE" strokeWidth="2.5" strokeLinecap="round" />
              
              <defs>
                <linearGradient id="heroBowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD45E" />
                  <stop offset="50%" stopColor="#F0B429" />
                  <stop offset="100%" stopColor="#C46820" />
                </linearGradient>
                <linearGradient id="heroArrowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B1A2E" />
                  <stop offset="40%" stopColor="#E8823A" />
                  <stop offset="100%" stopColor="#FFD45E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Brand Name & Motto */}
        <h2 className="text-2xl font-black tracking-wider uppercase mb-1"
            style={{ fontFamily: 'Cinzel Decorative, serif', background: 'linear-gradient(90deg, #FFD45E 0%, #F0B429 50%, #E8823A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ॥ DINEPULSE ॥
        </h2>

        <p className="text-xs font-bold tracking-widest uppercase mb-3"
           style={{ color: '#FFD45E', fontFamily: 'Cinzel, serif' }}>
          Sacred Operations Logo Emblem
        </p>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-[11px]" style={{ color: '#C8B08A' }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Divine SaaS Ecosystem Active</span>
        </div>

      </div>
    </div>
  );
}
