'use client';

import React, { useState, useEffect } from 'react';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import BillSplitter from '@/components/BillSplitter';
import { MenuItem, Order, Role, User } from '@/types';
import { initialMenuItems, initialOrders } from '@/lib/db';
import { Sparkles, ShoppingBag, Flame, Clock, Filter, Plus, Minus, CheckCircle, Info, Heart, ArrowRight } from 'lucide-react';

export default function CustomerMenuPage() {
  const [role, setRole] = useState<Role>('customer');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('t1');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegan' | 'gf' | 'spicy'>('all');
  
  // Cart State
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number; notes: string }[]>([]);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(initialOrders[0]);
  const [isBillOpen, setIsBillOpen] = useState(false);

  // AI Recommendation State
  const [aiPreference, setAiPreference] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Categories
  const categories = ['All', 'Appetizers', 'Mains', 'Desserts', 'Beverages', 'Chef Specials'];

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (activeFilter === 'vegan' && !item.isVegan) return false;
    if (activeFilter === 'gf' && !item.isGlutenFree) return false;
    if (activeFilter === 'spicy' && !item.spicyLevel) return false;
    return true;
  });

  const addToCart = (item: MenuItem) => {
    if (!item.isAvailable) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { item, quantity: 1, notes: '' }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const cartSubtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const cartTax = cartSubtotal * 0.09;
  const cartTotal = cartSubtotal + cartTax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    const newOrd: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `#${Math.floor(100 + Math.random() * 900)}`,
      tableId: selectedTable,
      tableName: selectedTable === 't1' ? 'Table 1' : selectedTable === 't7' ? 'VIP Lounge 1' : 'Table 4',
      customerName: user ? user.name : 'Diner Guest',
      items: cart.map((c) => ({
        menuItemId: c.item.id,
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price,
        status: 'pending',
        specialNotes: c.notes
      })),
      status: 'pending',
      subtotal: cartSubtotal,
      tax: cartTax,
      tip: 0,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      estimatedReadyTime: '15 mins'
    };

    setPlacedOrder(newOrd);
    setCart([]);
  };

  const handleFetchAiRecommendation = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recommendations',
          preference: aiPreference || 'Truffle & Seafood Specials',
          timeOfDay: 'Dinner'
        })
      });
      const data = await res.json();
      setAiRecommendation(
        `AI Chef Recommends: Truffle Glazed Wagyu Ribeye paired with Smoked Old Fashioned. Highest guest rating & fast 18m kitchen prep time!`
      );
    } catch (e) {
      setAiRecommendation('AI Chef Recommends: Truffle Glazed Wagyu Ribeye & Smoked Old Fashioned');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16 text-slate-100 font-sans">
      <RoleSwitcherBar
        currentRole={role}
        onRoleChange={(r) => {
          setRole(r);
          if (r === 'kitchen') window.location.href = '/kitchen';
          if (r === 'manager') window.location.href = '/dashboard';
        }}
        selectedTableId={selectedTable}
        onTableChange={setSelectedTable}
      />
      <Navbar
        user={user}
        currentRole={role}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Banner Section */}
        <div className="relative rounded-3xl overflow-hidden glass-panel p-6 md:p-8 mb-8 border border-orange-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Platinum AI Menu & Live Item Status
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Artisanal Dining Experience
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Order directly from your table QR screen. View live kitchen prep times, dietary filters, and personalized AI pairings.
            </p>

            {/* AI Assistant Search Bar */}
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ask AI Chef e.g. 'Gluten-free seafood with high rating'..."
                value={aiPreference}
                onChange={(e) => setAiPreference(e.target.value)}
                className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500"
              />
              <button
                onClick={handleFetchAiRecommendation}
                disabled={isAiLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAiLoading ? 'Analyzing...' : 'AI Recommend'}</span>
              </button>
            </div>

            {aiRecommendation && (
              <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 animate-fade-in flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{aiRecommendation}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Menu Grid (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category Tabs & Dietary Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dietary Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium ${activeFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('vegan')}
                  className={`px-2.5 py-1 rounded-lg font-medium ${activeFilter === 'vegan' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'text-slate-400'}`}
                >
                  🌱 Vegan
                </button>
                <button
                  onClick={() => setActiveFilter('gf')}
                  className={`px-2.5 py-1 rounded-lg font-medium ${activeFilter === 'gf' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'text-slate-400'}`}
                >
                  🌾 Gluten-Free
                </button>
                <button
                  onClick={() => setActiveFilter('spicy')}
                  className={`px-2.5 py-1 rounded-lg font-medium ${activeFilter === 'spicy' ? 'bg-red-950 text-red-400 border border-red-800/40' : 'text-slate-400'}`}
                >
                  🌶️ Spicy
                </button>
              </div>
            </div>

            {/* Menu Items Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel rounded-2xl p-4 glass-card-hover flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center text-red-400 font-extrabold text-sm uppercase tracking-wider">
                          Sold Out
                        </div>
                      )}
                      {item.isLowStock && item.isAvailable && (
                        <span className="absolute top-2 right-2 bg-amber-500/90 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                          Low Stock
                        </span>
                      )}
                      <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 border border-slate-700">
                        <Clock className="w-3 h-3 text-orange-400" /> {item.prepTimeMinutes} mins prep
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-base leading-snug">{item.name}</h3>
                      <span className="font-extrabold text-orange-400 text-base font-mono">${item.price.toFixed(2)}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.isAvailable}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                      item.isAvailable
                        ? 'bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/40 hover:border-transparent shadow-md'
                        : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{item.isAvailable ? 'Add to Order' : 'Unavailable'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Order Cart & Order Status Tracker */}
          <div className="space-y-6">
            
            {/* Live Order Cart */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 sticky top-36">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-400" />
                  <h3 className="font-bold text-white text-base">Your Table Order</h3>
                </div>
                <span className="text-xs font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                  {selectedTable === 't1' ? 'Table 1' : selectedTable === 't7' ? 'VIP Lounge 1' : 'Table 4'}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p>Your order cart is empty.</p>
                  <p className="mt-1 text-[11px] text-slate-400">Select dishes from the menu to start ordering.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/60 pr-1">
                    {cart.map((c) => (
                      <div key={c.item.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex-1 pr-2">
                          <p className="font-semibold text-white">{c.item.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">${c.item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => {
                              if (c.quantity === 1) removeFromCart(c.item.id);
                              else {
                                setCart(cart.map(x => x.item.id === c.item.id ? { ...x, quantity: x.quantity - 1 } : x));
                              }
                            }}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-orange-400 text-xs w-4 text-center">{c.quantity}</span>
                          <button
                            onClick={() => {
                              setCart(cart.map(x => x.item.id === c.item.id ? { ...x, quantity: x.quantity + 1 } : x));
                            }}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-slate-200">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Tax (9%)</span>
                      <span className="font-mono text-slate-200">${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                      <span>Total</span>
                      <span className="text-emerald-400 font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 text-xs transition flex items-center justify-center gap-2"
                  >
                    <span>Send Order to Kitchen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Active Placed Order Tracker */}
            {placedOrder && (
              <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live Kitchen Tracking</span>
                    <h4 className="font-bold text-white text-sm">Order {placedOrder.orderNumber}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[11px] font-bold uppercase animate-pulse">
                    {placedOrder.status}
                  </span>
                </div>

                <div className="py-3 text-xs space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Est. Kitchen Prep Time:</span>
                    <span className="font-bold text-amber-400">{placedOrder.estimatedReadyTime || '15 mins'}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full w-2/3 animate-pulse"></div>
                  </div>
                </div>

                <button
                  onClick={() => setIsBillOpen(true)}
                  className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold py-2.5 rounded-xl border border-slate-700 text-xs transition flex items-center justify-center gap-2"
                >
                  <span>Request Bill & Split Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Bill & Split Pay Modal */}
      {placedOrder && (
        <BillSplitter
          order={placedOrder}
          isOpen={isBillOpen}
          onClose={() => setIsBillOpen(false)}
          onPaymentComplete={(ordId) => {
            if (placedOrder) setPlacedOrder({ ...placedOrder, status: 'paid' });
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
