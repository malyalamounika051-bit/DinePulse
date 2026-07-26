'use client';

import React from 'react';
import { Role } from '@/types';
import { Utensils, ChefHat, UserCheck, LayoutDashboard, Sparkles } from 'lucide-react';

interface RoleSwitcherBarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  selectedTableId?: string;
  onTableChange?: (tableId: string) => void;
}

export default function RoleSwitcherBar({
  currentRole,
  onRoleChange,
  selectedTableId = 't1',
  onTableChange,
}: RoleSwitcherBarProps) {
  const roles: { role: Role; label: string; icon: any; path: string; color: string }[] = [
    { role: 'customer', label: 'Customer (QR Dining)', icon: Utensils, path: '/customer/menu', color: 'from-amber-500 to-orange-600' },
    { role: 'kitchen', label: 'Kitchen KDS', icon: ChefHat, path: '/kitchen', color: 'from-emerald-500 to-teal-600' },
    { role: 'server', label: 'Waitstaff POS', icon: UserCheck, path: '/customer/menu', color: 'from-blue-500 to-indigo-600' },
    { role: 'manager', label: 'Manager Dashboard', icon: LayoutDashboard, path: '/dashboard', color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-orange-400 font-bold uppercase tracking-wider text-[10px] bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/50">
          <Sparkles className="w-3 h-3 animate-spin" /> Interactive Role Switcher
        </span>
        <span className="text-slate-400 hidden md:inline">Test different platform perspectives:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentRole === r.role;
          return (
            <button
              key={r.role}
              onClick={() => onRoleChange(r.role)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium text-xs whitespace-nowrap ${
                isActive
                  ? `bg-gradient-to-r ${r.color} text-white shadow-md font-semibold scale-105`
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {currentRole === 'customer' && onTableChange && (
        <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          <span className="text-slate-400 text-[11px]">QR Table Simulator:</span>
          <select
            value={selectedTableId}
            onChange={(e) => onTableChange(e.target.value)}
            className="bg-slate-950 text-orange-400 font-semibold text-xs border border-orange-500/30 rounded px-2 py-0.5 outline-none cursor-pointer"
          >
            <option value="t1">Table 1 (Main)</option>
            <option value="t2">Table 2 (Main)</option>
            <option value="t4">Table 4 (Reserved)</option>
            <option value="t5">Table 5 (Patio)</option>
            <option value="t7">VIP Lounge 1</option>
          </select>
        </div>
      )}
    </div>
  );
}
