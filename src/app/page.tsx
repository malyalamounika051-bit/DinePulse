'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Role, User } from '@/types';
import { Utensils, ChefHat, LayoutDashboard, Calendar, Sparkles, ShieldCheck, CreditCard, Box, TrendingUp, ArrowRight, CheckCircle2, Flame, Layers } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 font-sans pb-20">
      <Navbar
        user={user}
        currentRole="manager"
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-purple-600/20 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-xs font-semibold text-orange-400 mb-6 shadow-xl">
          <Sparkles className="w-3.5 h-3.5" /> Full-Stack SaaS Platform • Bronze to Platinum Ready
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Next-Gen Restaurant Operations & <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">AI Dining Platform</span>
        </h1>

        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Eliminate kitchen bottlenecks, digitize live item availability, automate table waitlists, and forecast inventory demand with Gemini AI integration.
        </p>

        {/* Quick Portal Gateway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 max-w-6xl mx-auto">
          
          <a
            href="/customer/menu"
            className="glass-panel p-6 rounded-3xl border border-amber-500/30 glass-card-hover text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition duration-300">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                User Story 1 & 3
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Customer Digital Menu</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Live availability toggles, dietary tags, table QR ordering & smart split billing.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition">
              <span>Open Diner Portal</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a
            href="/kitchen"
            className="glass-panel p-6 rounded-3xl border border-emerald-500/30 glass-card-hover text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition duration-300">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                User Story 3
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Kitchen Display (KDS)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Real-time ticket progression timers (Pending &rarr; Preparing &rarr; Ready &rarr; Served).
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
              <span>Open KDS Stream</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a
            href="/customer/reserve"
            className="glass-panel p-6 rounded-3xl border border-blue-500/30 glass-card-hover text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                User Story 3
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Smart Reservations</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Table booking engine, party size selector, and live queue waitlist tracking.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
              <span>Book Table / Queue</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a
            href="/dashboard"
            className="glass-panel p-6 rounded-3xl border border-purple-500/30 glass-card-hover text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition duration-300">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                User Story 4 & 5
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Operations Hub</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Interactive floor map, low-stock alerts, staff rosters & Gemini AI Copilot.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
              <span>Launch Operations Hub</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

        </div>
      </section>

      {/* User Stories Feature Matrix */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-t border-slate-800/80">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white">Full Story Tier Accomplishment</h2>
          <p className="text-xs text-slate-400 mt-1">Built to fulfill all requirements from Bronze User Story 1 to Platinum AI Intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-800/40">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">Bronze Level</span>
            <h4 className="font-bold text-white text-base mt-1">Modern UI / UX</h4>
            <ul className="text-xs text-slate-300 mt-3 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Glassmorphic Dark Design</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Responsive Layouts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Smooth Micro-Animations</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-700/60">
            <span className="text-slate-300 font-extrabold text-xs uppercase tracking-wider">Silver Level</span>
            <h4 className="font-bold text-white text-base mt-1">Auth & Workflows</h4>
            <ul className="text-xs text-slate-300 mt-3 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> OTP Email Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Google OAuth Simulation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Menu & KDS Tickets</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-yellow-800/40">
            <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-wider">Gold Level</span>
            <h4 className="font-bold text-white text-base mt-1">Management Hub</h4>
            <ul className="text-xs text-slate-300 mt-3 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Floor Table Status Grid</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Low-Stock Threshold Badges</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Staff Roster & Financials</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-purple-800/40">
            <span className="text-purple-400 font-extrabold text-xs uppercase tracking-wider">Platinum Level</span>
            <h4 className="font-bold text-white text-base mt-1">AI Intelligence</h4>
            <ul className="text-xs text-slate-300 mt-3 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Gemini Resto-Copilot Chat</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Menu Dish Recommendations</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Predictive Stock Forecasting</li>
            </ul>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
