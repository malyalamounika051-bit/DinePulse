'use client';

import React, { useState } from 'react';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Reservation, Role } from '@/types';
import { initialReservations } from '@/lib/db';
import { Calendar, Clock, Users, CheckCircle2, Sparkles, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function ReservationsPage() {
  const [role, setRole] = useState<Role>('customer');

  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState('2026-07-26');
  const [time, setTime] = useState('19:30');
  const [requests, setRequests] = useState('');

  const [confirmedRes, setConfirmedRes] = useState<Reservation | null>(null);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: Reservation = {
      id: `res-${Date.now().toString().slice(-4)}`,
      customerName: name || 'Valued Diner',
      customerPhone: phone || '+1 (555) 000-1111',
      customerEmail: email || 'guest@example.com',
      partySize,
      date,
      time,
      status: 'confirmed',
      specialRequests: requests || 'Standard Seating'
    };

    setReservations([newRes, ...reservations]);
    setConfirmedRes(newRes);
  };

  return (
    <div className="min-h-screen pb-16 text-slate-100 font-sans pt-[116px] relative z-10">
      <AuthModal />

      {/* Fixed top header wrapper preventing overlapping */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-2xl">
        <RoleSwitcherBar
          currentRole={role}
          onRoleChange={(r) => {
            setRole(r);
            if (r === 'kitchen') window.location.href = '/kitchen';
            if (r === 'manager') window.location.href = '/dashboard';
          }}
        />
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Banner */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl mb-8 border border-amber-500/20 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" /> Silver Level: Smart Table Reservations & Live Queue
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Reserve Your Table
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              Book your dining experience in advance or join our instant live digital waitlist.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reservation Booking Form */}
          <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-slate-800">
            {confirmedRes ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold text-white">Table Reservation Confirmed!</h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  We look forward to welcoming <strong className="text-amber-400">{confirmedRes.customerName}</strong> for a party of{' '}
                  <strong className="text-amber-400">{confirmedRes.partySize} guests</strong> on {confirmedRes.date} at {confirmedRes.time}.
                </p>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs inline-block text-left text-slate-400 space-y-1">
                  <p>Confirmation ID: <span className="font-mono text-emerald-400 font-bold">{confirmedRes.id}</span></p>
                  <p>SMS Alert: <span className="text-slate-200">Sent to {confirmedRes.customerPhone}</span></p>
                  <p>Special Request: <span className="text-slate-200">{confirmedRes.specialRequests}</span></p>
                </div>
                <div>
                  <button
                    onClick={() => setConfirmedRes(null)}
                    className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-4">
                <h3 className="text-lg font-bold text-white pb-2 border-b border-slate-800">Reservation Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Guest Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Wright"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (For SMS Alerts)</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 901-2345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Party Size</label>
                    <div className="relative">
                      <Users className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(parseInt(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>{n} Guests</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                    >
                      {['17:00', '18:00', '19:00', '19:30', '20:00', '21:00'].map((t) => (
                        <option key={t} value={t}>{t} PM</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Special Occasion or Seating Request</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Birthday dinner, window seating, nut allergy notification..."
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 text-xs transition"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Waitlist Feed */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Tonight's Live Queue & Waitlist</h3>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                15m Avg Wait
              </span>
            </div>

            <div className="space-y-3">
              {reservations.map((res) => (
                <div key={res.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{res.customerName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      res.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                    }`}>
                      {res.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-amber-400" /> {res.partySize} guests</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-orange-400" /> {res.time}</span>
                  </div>
                  {res.specialRequests && (
                    <p className="text-[10px] text-slate-400 mt-2 bg-slate-900 px-2 py-1 rounded border border-slate-800 italic">
                      "{res.specialRequests}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
