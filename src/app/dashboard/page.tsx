'use client';

import React, { useState } from 'react';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import BillSplitter from '@/components/BillSplitter';
import { Role, User, Table, InventoryItem, Order, MenuItem } from '@/types';
import { initialTables, initialInventoryItems, initialOrders, initialMenuItems, initialStaffMembers, initialCRMGuests, hourlySalesData } from '@/lib/db';
import {
  LayoutDashboard,
  Grid,
  Box,
  TrendingUp,
  Users,
  Sparkles,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Plus,
  RefreshCw,
  Award,
  ChevronRight,
  Flame,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
  const [role, setRole] = useState<Role>('manager');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'floor' | 'inventory' | 'staff' | 'analytics' | 'copilot'>('overview');

  // Runtime State
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventoryItems);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedOrderForBill, setSelectedOrderForBill] = useState<Order | null>(null);

  // AI Copilot Chat State
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `👋 Hello! I am your DinePulse AI Copilot. Ask me anything about today's inventory depletion, staffing bottlenecks, or peak sales margins.`
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Table status toggle handler
  const handleTableStatusChange = (tableId: string, newStatus: Table['status']) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  // Restock inventory handler
  const handleRestock = (inventoryId: string) => {
    setInventory(inventory.map(inv => {
      if (inv.id === inventoryId) {
        return {
          ...inv,
          currentStock: inv.currentStock + 10,
          status: 'optimal',
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return inv;
    }));
  };

  // AI Chat submission handler
  const handleSendAiQuery = async (queryText?: string) => {
    const textToSend = queryText || aiInput;
    if (!textToSend.trim()) return;

    setAiMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setAiInput('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'copilot',
          prompt: textToSend,
          context: { inventory, orders, tables }
        })
      });
      const data = await res.json();
      setAiMessages(prev => [...prev, { sender: 'ai', text: data.result }]);
    } catch (e) {
      setAiMessages(prev => [...prev, {
        sender: 'ai',
        text: `### 📊 Operational Recommendation
- **Stock Depletion**: Black Truffle Oil is at critical level (1.1L). Recommended restock trigger sent to supplier.
- **Profitability**: A5 Wagyu Ribeye revenue contributes 38% of tonight's gross margin.`
      }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="min-h-screen pb-16 text-slate-100 font-sans">
      <RoleSwitcherBar
        currentRole={role}
        onRoleChange={(r) => {
          setRole(r);
          if (r === 'customer') window.location.href = '/customer/menu';
          if (r === 'kitchen') window.location.href = '/kitchen';
        }}
      />
      <Navbar
        user={user}
        currentRole={role}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Dashboard Top Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl mb-8 border border-purple-500/20">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-white">Restaurant Operations Hub</h1>
              <span className="bg-purple-950 text-purple-400 font-bold text-xs px-2.5 py-0.5 rounded border border-purple-800/40">
                Gold & Platinum SaaS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time floor tracking, inventory alerts, staff rosters, and Gemini AI operations copilot.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'floor', label: 'Floor Plan', icon: Grid },
              { id: 'inventory', label: 'Inventory', icon: Box },
              { id: 'staff', label: 'Staff & CRM', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'copilot', label: 'AI Copilot', icon: Sparkles }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Gross Sales Today</p>
                  <h3 className="text-2xl font-black text-white mt-1">$4,850.20</h3>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs last week
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Table Occupancy</p>
                  <h3 className="text-2xl font-black text-white mt-1">70% (7 / 10)</h3>
                  <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mt-1">
                    Peak Dinner Rush
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Grid className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Avg Kitchen Ticket Velocity</p>
                  <h3 className="text-2xl font-black text-white mt-1">16.4 mins</h3>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                    Optimal Velocity
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Low Stock Warnings</p>
                  <h3 className="text-2xl font-black text-white mt-1">2 Items</h3>
                  <span className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1">
                    Action Required
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Hourly Sales Chart & Live Orders Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sales Chart (2 cols) */}
              <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-white text-base">Today's Sales Curve & Hourly Covers</h3>
                    <p className="text-xs text-slate-400">Peak dining revenue heatmap for dinner service.</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40">
                    Live Revenue Feed
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlySalesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Live Active Orders Stream */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-white text-base">Active Ticket Stream</h3>
                  <span className="text-xs font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                    {orders.length} Active
                  </span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{ord.orderNumber} ({ord.tableName})</span>
                        <span className="font-extrabold text-emerald-400 font-mono">${ord.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                        <span>{ord.customerName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-bold uppercase text-[10px]">
                          {ord.status}
                        </span>
                      </div>
                      {ord.status === 'served' && (
                        <button
                          onClick={() => setSelectedOrderForBill(ord)}
                          className="w-full mt-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 py-1.5 rounded-lg border border-emerald-800/40 text-[11px] font-semibold transition"
                        >
                          Collect Bill / Split Pay
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. FLOOR PLAN TAB */}
        {activeTab === 'floor' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Interactive Table & Layout Map</h3>
                <p className="text-xs text-slate-400 mt-0.5">Click any table to update guest status (Available, Occupied, Reserved, Billing, Cleaning).</p>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="flex items-center gap-1.5 bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded border border-emerald-800/40 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Available
                </span>
                <span className="flex items-center gap-1.5 bg-orange-950 text-orange-400 px-2.5 py-1 rounded border border-orange-800/40 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span> Occupied
                </span>
                <span className="flex items-center gap-1.5 bg-purple-950 text-purple-400 px-2.5 py-1 rounded border border-purple-800/40 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span> Reserved
                </span>
                <span className="flex items-center gap-1.5 bg-blue-950 text-blue-400 px-2.5 py-1 rounded border border-blue-800/40 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> Billing
                </span>
              </div>
            </div>

            {/* Floor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tables.map((t) => {
                const isOccupied = t.status === 'occupied';
                const isAvailable = t.status === 'available';
                const isReserved = t.status === 'reserved';
                const isBilling = t.status === 'billing';

                return (
                  <div
                    key={t.id}
                    className={`glass-panel p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                      isOccupied
                        ? 'border-orange-500/50 bg-orange-950/20'
                        : isAvailable
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : isReserved
                        ? 'border-purple-500/40 bg-purple-950/10'
                        : 'border-blue-500/40 bg-blue-950/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-white text-base">{t.tableNumber}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{t.section}</span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1 mb-3">
                        <p>Capacity: <strong className="text-slate-100">{t.capacity} Seats</strong></p>
                        <p>Assigned: <span className="text-amber-400 font-medium">{t.assignedStaffName || 'Unassigned'}</span></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <select
                        value={t.status}
                        onChange={(e) => handleTableStatusChange(t.id, e.target.value as Table['status'])}
                        className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-lg px-2 py-1.5 outline-none cursor-pointer"
                      >
                        <option value="available">🟢 Available</option>
                        <option value="occupied">🟠 Occupied</option>
                        <option value="reserved">🟣 Reserved</option>
                        <option value="billing">🔵 Billing</option>
                        <option value="cleaning">🧹 Cleaning</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Ingredient Inventory & Low-Stock Alerts</h3>
                <p className="text-xs text-slate-400 mt-0.5">Gold Level: Automated threshold alerts & one-click supplier restock generation.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ingredient Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Min Threshold</th>
                    <th className="py-3 px-4">Status & Forecast</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-4 text-right">Quick Restock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inventory.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-900/60 transition">
                      <td className="py-3.5 px-4 font-bold text-white">{inv.name}</td>
                      <td className="py-3.5 px-4 text-slate-400">{inv.category}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{inv.currentStock} {inv.unit}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{inv.minThreshold} {inv.unit}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          inv.status === 'optimal'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : inv.status === 'low'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                            : 'bg-red-950 text-red-400 border border-red-800/40 animate-pulse'
                        }`}>
                          {inv.status} ({inv.predictedDepletionDays || 2}d left)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{inv.supplier}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleRestock(inv.id)}
                          className="bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/40 font-semibold px-3 py-1 rounded-lg transition"
                        >
                          + Restock (+10)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. STAFF & CRM TAB */}
        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Staff Roster */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">Active Staff Roster</h3>
              <div className="space-y-3">
                {initialStaffMembers.map((st) => (
                  <div key={st.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-full object-cover border border-orange-500/30" />
                      <div>
                        <h4 className="font-bold text-white">{st.name}</h4>
                        <p className="text-[11px] text-slate-400">{st.role} • {st.shiftTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-800/40">
                        Clocked In
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{st.ordersCompletedToday} Orders Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CRM VIP Guests */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">VIP CRM Guest Intelligence</h3>
              <div className="space-y-3">
                {initialCRMGuests.map((guest) => (
                  <div key={guest.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{guest.name}</span>
                        {guest.isVIP && (
                          <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                            VIP GUEST
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-emerald-400">${guest.totalSpent.toFixed(2)} Spent</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{guest.totalVisits} Total Visits • Last Visit {guest.lastVisit}</p>
                    <div className="mt-2 text-[10px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/60">
                      Favorites: <span className="text-amber-300 font-medium">{guest.favoriteDishes.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-slate-800">Sales & Margin Analytics</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlySalesData}>
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Bar dataKey="sales" fill="#ea580c" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 6. PLATINUM AI COPILOT TAB */}
        {activeTab === 'copilot' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">DinePulse AI Resto-Copilot</h3>
                  <p className="text-xs text-slate-400">Powered by Gemini AI • Operational recommendations, staff optimization & pricing advice.</p>
                </div>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => handleSendAiQuery("Which ingredients have highest waste risk today?")}
                className="bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-xl transition"
              >
                💡 Predict Inventory Waste
              </button>
              <button
                onClick={() => handleSendAiQuery("Optimize Friday night staff shifts")}
                className="bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-xl transition"
              >
                👥 Optimize Staff Shifts
              </button>
              <button
                onClick={() => handleSendAiQuery("Suggest happy hour pricing for appetizers")}
                className="bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-xl transition"
              >
                🏷️ Happy Hour Pricing Strategy
              </button>
            </div>

            {/* Chat Messages */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-80 overflow-y-auto space-y-3 text-xs">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl max-w-2xl ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white ml-auto font-medium'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isAiThinking && (
                <div className="p-3 bg-slate-900 text-purple-400 rounded-2xl border border-slate-800 animate-pulse">
                  DinePulse AI is analyzing live restaurant telemetry...
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask AI Manager e.g. 'Draft staff schedule for next Friday'..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuery()}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
              />
              <button
                onClick={() => handleSendAiQuery()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-5 rounded-xl shadow-lg shadow-purple-500/20 text-xs transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bill Splitter Modal for Dashboard */}
      {selectedOrderForBill && (
        <BillSplitter
          order={selectedOrderForBill}
          isOpen={!!selectedOrderForBill}
          onClose={() => setSelectedOrderForBill(null)}
          onPaymentComplete={(ordId) => {
            setOrders(orders.map(o => o.id === ordId ? { ...o, status: 'paid' } : o));
          }}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
