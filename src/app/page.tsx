'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import SacredLogoHero from '@/components/SacredLogoHero';
import { Utensils, LayoutDashboard, ChefHat, Calendar, ArrowRight, Sparkles } from 'lucide-react';

/* ── Bow & Arrow decorative divider ── */
function SacredDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(240,180,41,0.5))' }} />
      <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-black/40">
        <svg viewBox="0 0 60 20" fill="none" className="w-14 h-4">
          <path d="M4 2 Q1 10 4 18" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <line x1="4" y1="2" x2="4" y2="18" stroke="#F5E6CE" strokeWidth="0.8" opacity="0.6"/>
          <line x1="4" y1="10" x2="56" y2="10" stroke="#E8823A" strokeWidth="1.5" strokeLinecap="round"/>
          <polygon points="56,10 48,7 50,10 48,13" fill="#FFD45E"/>
        </svg>
      </div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(240,180,41,0.5), transparent)' }} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-slate-100 font-sans pb-20 pt-[60px] relative z-10">
      <AuthModal />

      {/* Fixed top navbar wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-2xl">
        <Navbar />
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16">

        {/* Background radial burst */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
             style={{ background: 'radial-gradient(ellipse, rgba(139,26,46,0.18) 0%, rgba(240,180,41,0.06) 50%, transparent 75%)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text content */}
          <div className="relative z-10">

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight mb-6"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}>
              <span style={{ color: '#F5E6CE' }}>Royal</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #FFD45E 0%, #F0B429 40%, #E8823A 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Gastronomy &amp;
              </span>
              <br />
              <span style={{ color: '#F5E6CE' }}>Hospitality</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#C8B08A', fontFamily: 'Lato, sans-serif' }}>
              Dedicated to serving pure, wholesome, and artisanal vegetarian culinary creations.
              We honor every guest with royal warmth, instantaneous QR ordering, and an unforgettable dining experience
              crafted to nourish <span style={{ color: '#FFD45E' }}>body, mind, and soul</span>.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="/customer/menu"
                 className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition war-shimmer"
                 style={{ background: 'linear-gradient(135deg, #8B1A2E, #E8823A)', color: '#FFD45E', fontFamily: 'Cinzel, serif', fontSize: '12px', boxShadow: '0 0 20px rgba(232,130,58,0.3)' }}>
                <Utensils className="w-4 h-4" /> Enter Divine Menu
              </a>
              <a href="/dashboard"
                 className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition"
                 style={{ background: 'rgba(19,3,24,0.90)', border: '1px solid rgba(240,180,41,0.45)', color: '#FFD45E', fontFamily: 'Cinzel, serif', fontSize: '12px' }}>
                <LayoutDashboard className="w-4 h-4" /> Operations Hub
              </a>
            </div>
          </div>

          {/* Right — Theme-Matching Sacred Logo Hero Emblem */}
          <div className="relative hidden lg:block">
            <SacredLogoHero />
          </div>
        </div>
      </section>

      <SacredDivider />

      {/* ═══ PORTAL GATEWAY CARDS ═══ */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Cinzel, serif', color: '#F5E6CE' }}>
            Enter Your Sacred Portal
          </h2>
          <p className="text-sm mt-2" style={{ color: '#8A7060', fontFamily: 'Lato, sans-serif' }}>
            Choose your role in the divine operations realm
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <a href="/customer/menu"
             className="glass-panel p-6 rounded-3xl glass-card-hover text-left group flex flex-col justify-between war-shimmer"
             style={{ border: '1px solid rgba(232,130,58,0.3)' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition duration-300 group-hover:scale-110"
                   style={{ background: 'rgba(232,130,58,0.15)', border: '1px solid rgba(232,130,58,0.4)' }}>
                <Utensils className="w-6 h-6" style={{ color: '#E8823A' }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ color: '#E8823A', background: 'rgba(232,130,58,0.1)', border: '1px solid rgba(232,130,58,0.35)', fontFamily: 'Cinzel, serif' }}>
                User Story 1 &amp; 3
              </span>
              <h3 className="text-xl font-bold mt-2" style={{ color: '#F5E6CE', fontFamily: 'Cinzel, serif' }}>Divine Menu</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: '#8A7060' }}>
                Live availability, sacred vegetarian dishes, table QR ordering &amp; smart split billing.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold group-hover:translate-x-1 transition" style={{ color: '#E8823A', fontFamily: 'Cinzel, serif' }}>
              <span>Open Diner Portal</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a href="/kitchen"
             className="glass-panel p-6 rounded-3xl glass-card-hover text-left group flex flex-col justify-between war-shimmer"
             style={{ border: '1px solid rgba(26,122,72,0.35)' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition duration-300 group-hover:scale-110"
                   style={{ background: 'rgba(26,122,72,0.15)', border: '1px solid rgba(26,122,72,0.45)' }}>
                <ChefHat className="w-6 h-6" style={{ color: '#22c55e' }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ color: '#22c55e', background: 'rgba(26,122,72,0.12)', border: '1px solid rgba(26,122,72,0.4)', fontFamily: 'Cinzel, serif' }}>
                User Story 3
              </span>
              <h3 className="text-xl font-bold mt-2" style={{ color: '#F5E6CE', fontFamily: 'Cinzel, serif' }}>Kitchen KDS</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: '#8A7060' }}>
                Real-time ticket progression timers — Pending → Preparing → Ready → Served.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold group-hover:translate-x-1 transition" style={{ color: '#22c55e', fontFamily: 'Cinzel, serif' }}>
              <span>Open KDS Stream</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a href="/customer/reserve"
             className="glass-panel p-6 rounded-3xl glass-card-hover text-left group flex flex-col justify-between war-shimmer"
             style={{ border: '1px solid rgba(43,87,151,0.35)' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition duration-300 group-hover:scale-110"
                   style={{ background: 'rgba(43,87,151,0.15)', border: '1px solid rgba(43,87,151,0.45)' }}>
                <Calendar className="w-6 h-6" style={{ color: '#60a5fa' }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ color: '#60a5fa', background: 'rgba(43,87,151,0.12)', border: '1px solid rgba(43,87,151,0.4)', fontFamily: 'Cinzel, serif' }}>
                User Story 3
              </span>
              <h3 className="text-xl font-bold mt-2" style={{ color: '#F5E6CE', fontFamily: 'Cinzel, serif' }}>Reservations</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: '#8A7060' }}>
                Table booking engine, party size selector, and live queue waitlist tracking.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold group-hover:translate-x-1 transition" style={{ color: '#60a5fa', fontFamily: 'Cinzel, serif' }}>
              <span>Book Table / Queue</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a href="/dashboard"
             className="glass-panel p-6 rounded-3xl glass-card-hover text-left group flex flex-col justify-between war-shimmer"
             style={{ border: '1px solid rgba(139,26,46,0.45)' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition duration-300 group-hover:scale-110"
                   style={{ background: 'rgba(139,26,46,0.18)', border: '1px solid rgba(139,26,46,0.5)' }}>
                <LayoutDashboard className="w-6 h-6" style={{ color: '#f87171' }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ color: '#FFD45E', background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.35)', fontFamily: 'Cinzel, serif' }}>
                User Story 4 &amp; 5
              </span>
              <h3 className="text-xl font-bold mt-2" style={{ color: '#F5E6CE', fontFamily: 'Cinzel, serif' }}>Operations Hub</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: '#8A7060' }}>
                Interactive floor map, low-stock alerts, staff rosters &amp; Gemini AI Copilot.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold group-hover:translate-x-1 transition" style={{ color: '#FFD45E', fontFamily: 'Cinzel, serif' }}>
              <span>Launch Operations Hub</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>
        </div>
      </section>

    </div>
  );
}

