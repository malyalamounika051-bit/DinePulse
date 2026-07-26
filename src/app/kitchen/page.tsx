'use client';

import React, { useState, useEffect } from 'react';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Order, MenuItem, Role, User } from '@/types';
import { initialOrders, initialMenuItems } from '@/lib/db';
import { ChefHat, Clock, CheckCircle2, AlertCircle, UtensilsCrossed, ArrowRight, RefreshCw, Flame, Volume2 } from 'lucide-react';

export default function KitchenKDSPage() {
  const [role, setRole] = useState<Role>('kitchen');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');

  const handleUpdateOrderStatus = (orderId: string, nextStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleToggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const activeOrders = orders.filter((o) => {
    if (activeFilter === 'all') return o.status !== 'paid';
    return o.status === activeFilter;
  });

  return (
    <div className="min-h-screen pb-16 text-slate-100 font-sans">
      <RoleSwitcherBar
        currentRole={role}
        onRoleChange={(r) => {
          setRole(r);
          if (r === 'customer') window.location.href = '/customer/menu';
          if (r === 'manager') window.location.href = '/dashboard';
        }}
      />
      <Navbar
        user={user}
        currentRole={role}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl mb-8 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white">Live Kitchen Display System (KDS)</h1>
                <span className="bg-emerald-950 text-emerald-400 font-bold text-xs px-2 py-0.5 rounded border border-emerald-800/40">
                  REAL-TIME TICKET STREAM
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage ticket lifecycle, monitor preparation timers, and toggle dish availability in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {(['all', 'pending', 'preparing', 'ready'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition ${
                  activeFilter === filter
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Kitchen KDS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeOrders.map((ord) => {
            const isPending = ord.status === 'pending';
            const isPreparing = ord.status === 'preparing';
            const isReady = ord.status === 'ready';
            const isServed = ord.status === 'served';

            return (
              <div
                key={ord.id}
                className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  isPending
                    ? 'border-amber-500/40 bg-amber-950/10 glow-orange'
                    : isPreparing
                    ? 'border-blue-500/40 bg-blue-950/10'
                    : isReady
                    ? 'border-emerald-500/40 bg-emerald-950/10 glow-emerald'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  {/* Ticket Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div>
                      <span className="font-extrabold text-white text-lg">{ord.orderNumber}</span>
                      <span className="text-xs text-slate-400 ml-2 font-medium">({ord.tableName})</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isPending
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/40 animate-pulse'
                          : isPreparing
                          ? 'bg-blue-950 text-blue-400 border border-blue-800/40'
                          : isReady
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Customer info & Timer */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>Guest: <strong className="text-slate-200">{ord.customerName}</strong></span>
                    <span className="flex items-center gap-1 font-mono text-amber-400">
                      <Clock className="w-3.5 h-3.5" /> 14m ago
                    </span>
                  </div>

                  {/* Ticket Line Items */}
                  <div className="space-y-2.5 mb-4">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">
                            <span className="text-orange-400 font-extrabold mr-1.5">{item.quantity}x</span>
                            {item.name}
                          </span>
                        </div>
                        {item.specialNotes && (
                          <p className="text-[11px] text-amber-300 mt-1 italic bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
                            Note: {item.specialNotes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Actions */}
                <div className="pt-3 border-t border-slate-800">
                  {isPending && (
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, 'preparing')}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
                    >
                      <span>Start Cooking</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {isPreparing && (
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, 'ready')}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
                    >
                      <span>Mark Ready for Server</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {isReady && (
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, 'served')}
                      className="w-full bg-emerald-950 hover:bg-emerald-900 text-emerald-400 font-bold py-2.5 rounded-xl border border-emerald-800/50 text-xs transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Served to Table</span>
                    </button>
                  )}
                  {isServed && (
                    <div className="text-center text-xs font-semibold text-slate-500 py-1">
                      Served • Waiting for Billing
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Menu Availability Quick Control */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Quick Stock & Menu Availability Controls</h3>
              <p className="text-xs text-slate-400">Toggle dish availability immediately when ingredients run out.</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40">
              Kitchen Master Override
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleToggleItemAvailability(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                    item.isAvailable
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                      : 'bg-red-950 text-red-400 border border-red-800/40'
                  }`}
                >
                  {item.isAvailable ? 'In Stock' : 'Sold Out'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
