'use client';

import React from 'react';
import { Role } from '@/types';
import { Utensils, ChefHat, UserCheck, LayoutDashboard } from 'lucide-react';

interface RoleSwitcherBarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  selectedTableId?: string;
  onTableChange?: (tableId: string) => void;
}

/* ── Mini bow icon ── */
function BowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 inline-block mr-1">
      <path d="M5 2 C2 7 2 13 5 18" stroke="#F0B429" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <line x1="5" y1="2" x2="5" y2="18" stroke="#F5E6CE" strokeWidth="0.8" opacity="0.7"/>
      <line x1="5" y1="10" x2="18" y2="10" stroke="#E8823A" strokeWidth="1.5" strokeLinecap="round"/>
      <polygon points="18,10 14,8 15.5,10 14,12" fill="#FFD45E"/>
    </svg>
  );
}

export default function RoleSwitcherBar({
  currentRole,
  onRoleChange,
  selectedTableId = 't1',
  onTableChange,
}: RoleSwitcherBarProps) {
  const roles: { role: Role; label: string; icon: any; gradient: string }[] = [
    { role: 'customer', label: 'Diner (QR)',         icon: Utensils,       gradient: 'linear-gradient(135deg,#C46820,#E8823A)' },
    { role: 'kitchen',  label: 'Kitchen KDS',        icon: ChefHat,        gradient: 'linear-gradient(135deg,#145230,#1A7A48)' },
    { role: 'server',   label: 'Waitstaff POS',      icon: UserCheck,      gradient: 'linear-gradient(135deg,#1A3A6E,#2B5797)' },
    { role: 'manager',  label: 'Manager Hub',        icon: LayoutDashboard,gradient: 'linear-gradient(135deg,#8B1A2E,#C94060)' },
  ];

  return (
    <div
      className="w-full px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 relative"
      style={{
        background: 'rgba(10,2,12,0.96)',
        borderBottom: '1px solid rgba(240,180,41,0.25)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Gold top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #F0B429 30%, #E8823A 70%, transparent)' }} />

      {/* Label */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded transition hover:scale-105"
          style={{ color: '#FFD45E', background: 'rgba(240,180,41,0.10)', border: '1px solid rgba(240,180,41,0.35)', fontFamily: 'Cinzel, serif' }}
        >
          <BowIcon /> Sacred Role Portal
        </a>
        <span className="hidden md:inline" style={{ color: '#8A7060' }}>
          View the realm from different perspectives:
        </span>
      </div>

      {/* Role Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentRole === r.role;
          return (
            <button
              key={r.role}
              onClick={() => onRoleChange(r.role)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium text-xs whitespace-nowrap"
              style={
                isActive
                  ? { background: r.gradient, color: '#FFD45E', boxShadow: '0 0 14px rgba(240,180,41,0.25)', transform: 'scale(1.05)', fontFamily: 'Cinzel, serif', fontSize: '10px' }
                  : { background: 'rgba(19,3,24,0.80)', color: '#C8B08A', border: '1px solid rgba(139,26,46,0.4)' }
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Table Simulator */}
      {currentRole === 'customer' && onTableChange && (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded"
             style={{ background: 'rgba(19,3,24,0.9)', border: '1px solid rgba(139,26,46,0.45)' }}>
          <span style={{ color: '#8A7060', fontSize: '11px' }}>QR Table Simulator:</span>
          <select
            value={selectedTableId}
            onChange={(e) => onTableChange(e.target.value)}
            className="text-xs outline-none cursor-pointer"
            style={{ background: 'rgba(10,2,12,0.95)', color: '#FFD45E', border: '1px solid rgba(240,180,41,0.3)', borderRadius: '6px', padding: '2px 6px', fontFamily: 'Cinzel, serif', fontSize: '10px' }}
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

