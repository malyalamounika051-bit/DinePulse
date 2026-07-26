'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { User, Role } from '@/types';
import { Flame, Bell, User as UserIcon, Shield, ChevronDown, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  currentRole: Role;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({ user, currentRole, onOpenAuth, onLogout }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: '1', title: 'Low Stock Alert', message: 'Black Truffle Oil has dropped below 1.5L', type: 'warning', time: '2m ago' },
    { id: '2', title: 'New VIP Order', message: 'Order #104 placed for VIP Lounge 1 ($583.08)', type: 'info', time: '5m ago' },
    { id: '3', title: 'Kitchen Delay Warning', message: 'Table 4 Wagyu entree prep time > 18 mins', type: 'urgent', time: '8m ago' }
  ];

  return (
    <header className="w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-lg sticky top-[41px] z-40 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Flame className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-sans">DinePulse</span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-bold text-xs px-1.5 py-0.5 rounded border border-orange-500/30 bg-orange-950/50">
                AI SaaS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Intelligent Restaurant Operations & Dining Platform</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <a
            href="/customer/menu"
            className="px-3.5 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Digital Menu
          </a>
          <a
            href="/customer/reserve"
            className="px-3.5 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Reservations
          </a>
          <a
            href="/kitchen"
            className="px-3.5 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Kitchen KDS
          </a>
          <a
            href="/dashboard"
            className="px-3.5 py-2 rounded-lg font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 transition"
          >
            Operations Dashboard
          </a>
        </nav>

        {/* Controls & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-semibold text-slate-200">
                  <span>Live Operational Notifications</span>
                  <span className="text-[10px] text-orange-400 bg-orange-950/60 px-1.5 py-0.5 rounded">3 New</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 px-1 hover:bg-slate-800/40 rounded transition">
                      <div className="flex items-center justify-between text-slate-200 font-medium">
                        <span className="flex items-center gap-1.5">
                          {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                          {n.type === 'info' && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                          {n.type === 'urgent' && <Clock className="w-3.5 h-3.5 text-red-400" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Auth Profile Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-xl transition text-xs"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="font-medium text-slate-200 hidden sm:inline">{user.name}</span>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                  {user.role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-slate-200">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition mt-1 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg shadow-orange-500/20 transition"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / OTP</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
