'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bell, User as UserIcon, ChevronDown, CheckCircle, AlertTriangle, Clock, LogOut, Settings } from 'lucide-react';

/* ── Bow & Arrow SVG logo ── */
function BowArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || 'w-7 h-7'}>
      <circle cx="20" cy="20" r="18" stroke="#F0B429" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      <path d="M11 6 C5 14 5 26 11 34" stroke="url(#bowGold)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <line x1="11" y1="6" x2="11" y2="34" stroke="#F5E6CE" strokeWidth="1" opacity="0.8" />
      <line x1="7" y1="20" x2="33" y2="20" stroke="url(#arrowSaffron)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M33 20 L24 15 L26.5 20 L24 25 Z" fill="#FFD45E" stroke="#E8823A" strokeWidth="0.8" />
      <path d="M8 20 L13 16 M8 20 L13 24" stroke="#F5E6CE" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="bowGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD45E" />
          <stop offset="50%" stopColor="#F0B429" />
          <stop offset="100%" stopColor="#C46820" />
        </linearGradient>
        <linearGradient id="arrowSaffron" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B1A2E" />
          <stop offset="40%" stopColor="#E8823A" />
          <stop offset="100%" stopColor="#FFD45E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ROLE_LABELS: Record<string, string> = {
  manager: '🏯 Manager',
  kitchen: '👨‍🍳 Chef',
  server: '🛎️ Server',
  customer: '🍽️ Diner',
};

export default function Navbar() {
  const { user, openAuth, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: '1', title: 'Low Stock Alert', message: 'Sacred Truffle Oil has dropped below 1.5L', type: 'warning', time: '2m ago' },
    { id: '2', title: 'New VIP Order', message: 'Order #104 placed for VIP Lounge 1 ($583.08)', type: 'info', time: '5m ago' },
    { id: '3', title: 'Kitchen Delay Warning', message: 'Table 4 prep time > 18 mins', type: 'urgent', time: '8m ago' },
  ];

  return (
    <header
      style={{ borderBottom: '1px solid rgba(139,26,46,0.45)', background: 'rgba(14,2,16,0.92)' }}
      className="w-full backdrop-blur-xl relative px-4 md:px-8 py-3"
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(240,180,41,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center divine-glow transition group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #4A0E18, #8B1A2E)' }}>
            <BowArrowIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wide"
                style={{ fontFamily: 'Cinzel, serif', background: 'linear-gradient(90deg, #FFD45E, #F0B429, #E8823A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                DinePulse
              </span>
              <span className="font-bold text-xs px-1.5 py-0.5 rounded"
                style={{ border: '1px solid rgba(240,180,41,0.4)', background: 'rgba(240,180,41,0.08)', color: '#FFD45E', fontFamily: 'Cinzel, serif' }}>
                AI
              </span>
            </div>
            <p className="text-[10px] hidden sm:block" style={{ color: '#8A7060', fontFamily: 'Lato, sans-serif' }}>
              Royal Vegetarian Gastronomy &amp; Dining Platform
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl text-xs"
          style={{ background: 'rgba(19,3,24,0.90)', border: '1px solid rgba(139,26,46,0.4)' }}>
          {[
            { href: '/', label: 'Home' },
            { href: '/customer/menu', label: 'Divine Menu' },
            { href: '/customer/reserve', label: 'Reservations' },
            { href: '/kitchen', label: 'Kitchen KDS' },
            { href: '/dashboard', label: 'Operations Hub', highlight: true },
          ].map(link => (
            <a key={link.href} href={link.href}
              className="px-3.5 py-2 rounded-lg font-medium transition"
              style={link.highlight
                ? { color: '#FFD45E', fontFamily: 'Cinzel, serif', fontSize: '11px' }
                : { color: '#C8B08A', fontFamily: 'Lato, sans-serif' }
              }
              onMouseEnter={e => { if (!link.highlight) (e.currentTarget as HTMLElement).style.color = '#F5E6CE'; }}
              onMouseLeave={e => { if (!link.highlight) (e.currentTarget as HTMLElement).style.color = '#C8B08A'; }}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
              className="relative p-2 rounded-xl transition"
              style={{ background: 'rgba(19,3,24,0.9)', border: '1px solid rgba(139,26,46,0.5)', color: '#C8B08A' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse"
                style={{ background: '#8B1A2E', color: '#FFD45E' }}>3</span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl p-3 z-50 text-xs animate-fade-in glass-panel"
                style={{ border: '1px solid rgba(139,26,46,0.5)' }}>
                <div className="flex items-center justify-between pb-2 font-semibold" style={{ borderBottom: '1px solid rgba(139,26,46,0.4)', color: '#F5E6CE' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '11px' }}>Live Alerts</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: '#FFD45E', background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.3)' }}>3 New</span>
                </div>
                <div className="divide-y max-h-64 overflow-y-auto" style={{ borderColor: 'rgba(139,26,46,0.3)' }}>
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 px-1" style={{ color: '#C8B08A' }}>
                      <div className="flex items-center justify-between font-medium" style={{ color: '#F5E6CE' }}>
                        <span className="flex items-center gap-1.5">
                          {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#F0B429' }} />}
                          {n.type === 'info' && <CheckCircle className="w-3.5 h-3.5" style={{ color: '#2B5797' }} />}
                          {n.type === 'urgent' && <Clock className="w-3.5 h-3.5" style={{ color: '#E8823A' }} />}
                          {n.title}
                        </span>
                        <span className="text-[10px]" style={{ color: '#8A7060' }}>{n.time}</span>
                      </div>
                      <p className="text-[11px] mt-1 pl-5" style={{ color: '#8A7060' }}>{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Auth */}
          {user ? (
            <div className="relative">
              <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition text-xs"
                style={{ background: 'rgba(19,3,24,0.9)', border: '1px solid rgba(240,180,41,0.3)' }}>
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full overflow-hidden ring-1 flex items-center justify-center text-[11px] font-black"
                  style={{ outline: '1.5px solid #F0B429', outlineOffset: '1px', background: 'linear-gradient(135deg, #8B1A2E, #4A0E18)', color: '#FFD45E' }}>
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    : user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="font-semibold text-[12px]" style={{ color: '#F5E6CE' }}>{user.name}</span>
                  <span className="text-[10px]" style={{ color: '#8A7060' }}>{ROLE_LABELS[user.role] ?? user.role}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: '#8A7060' }} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-50 overflow-hidden"
                  style={{ background: 'rgba(10,2,14,0.98)', border: '1px solid rgba(240,180,41,0.25)' }}>
                  {/* Profile header */}
                  <div className="px-4 py-3" style={{ background: 'rgba(139,26,46,0.15)', borderBottom: '1px solid rgba(139,26,46,0.3)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center text-sm font-black flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #8B1A2E, #4A0E18)', color: '#FFD45E' }}>
                        {user.avatar
                          ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          : user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-[12px] truncate" style={{ color: '#F5E6CE', fontFamily: 'Cinzel, serif' }}>{user.name}</p>
                        <p className="text-[10px] truncate" style={{ color: '#8A7060' }}>{user.phone ?? user.email}</p>
                        <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5" style={{ background: 'rgba(240,180,41,0.15)', color: '#FFD45E', border: '1px solid rgba(240,180,41,0.3)' }}>
                          {ROLE_LABELS[user.role] ?? user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-1.5 text-[11px]">
                    {user.role === 'manager' && (
                      <a href="/dashboard" onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition"
                        style={{ color: '#C8B08A' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5E6CE'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#C8B08A'}>
                        <Settings className="w-3.5 h-3.5 text-amber-500" /> My Dashboard
                      </a>
                    )}
                    {user.role === 'customer' && (
                      <a href="/customer/menu" onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition"
                        style={{ color: '#C8B08A' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5E6CE'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#C8B08A'}>
                        <Settings className="w-3.5 h-3.5 text-amber-500" /> My Orders
                      </a>
                    )}
                    <button onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition mt-0.5"
                      style={{ color: '#E8823A' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(232,130,58,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openAuth}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition divine-glow war-shimmer"
              style={{ background: 'linear-gradient(135deg, #8B1A2E, #E8823A)', color: '#FFD45E', fontFamily: 'Cinzel, serif', fontSize: '11px' }}>
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / OTP</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
