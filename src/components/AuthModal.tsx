'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Role } from '@/types';
import { Mail, Lock, ShieldCheck, Phone, Chrome, ArrowRight, CheckCircle2, X } from 'lucide-react';

const ROLE_REDIRECTS: Record<Role, string> = {
  manager: '/dashboard',
  kitchen: '/kitchen',
  server: '/dashboard',
  customer: '/customer/menu',
};

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login } = useAuth();
  const router = useRouter();

  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [step, setStep] = useState<'credentials' | 'otp' | 'success'>('credentials');

  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthOpen) return null;

  const buildUser = (): User => ({
    id: `usr-${Date.now()}`,
    name: name.trim() || (authMethod === 'mobile' ? `User ${mobileNumber.slice(-4)}` : email.split('@')[0]),
    email: authMethod === 'email' ? email : `${mobileNumber}@dinepulse.app`,
    role: selectedRole,
    phone: authMethod === 'mobile' ? `${countryCode} ${mobileNumber}` : undefined,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || mobileNumber || email)}&backgroundColor=8B1A2E&textColor=FFD45E`,
  });

  const doLogin = (user: User) => {
    login(user);
    setStep('success');
    setTimeout(() => {
      setStep('credentials');
      setMobileNumber(''); setEmail(''); setName(''); setOtp(['', '', '', '', '', '']);
      router.push(ROLE_REDIRECTS[user.role]);
    }, 1200);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'mobile' && mobileNumber.length < 6) return;
    if (authMethod === 'email' && !email.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setStep('otp'); }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); doLogin(buildUser()); }, 900);
  };

  const handleGoogleOAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      doLogin({
        id: 'usr-google-101',
        name: name.trim() || 'Google User',
        email: 'user@gmail.com',
        role: selectedRole,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=G&backgroundColor=8B1A2E&textColor=FFD45E`,
      });
    }, 700);
  };

  const handleOtpInput = (val: string, idx: number) => {
    const cleaned = val.replace(/\D/, '').slice(-1);
    const next = [...otp];
    next[idx] = cleaned;
    setOtp(next);
    // Auto-focus next box
    if (cleaned && idx < 5) {
      const nextEl = document.getElementById(`otp-box-${idx + 1}`);
      nextEl?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-box-${idx - 1}`)?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl text-slate-100"
           style={{ background: 'linear-gradient(160deg, #130318 0%, #0e0210 100%)', border: '1px solid rgba(240,180,41,0.25)' }}>

        {/* Close */}
        <button onClick={closeAuth} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white rounded-full hover:bg-slate-800 transition">
          <X className="w-5 h-5" />
        </button>

        {/* ── STEP: credentials ── */}
        {step === 'credentials' && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-amber-400"
                   style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.3)' }}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>Secure Sign In</h3>
                <p className="text-[11px]" style={{ color: '#8A7060' }}>Mobile OTP preferred • Email • Google OAuth</p>
              </div>
            </div>

            {/* Role selector — visible at top so user knows what they're accessing */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold mb-1" style={{ color: '#C8B08A' }}>I am signing in as…</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { role: 'customer', label: '🍽️ Customer / Diner' },
                  { role: 'manager', label: '🏯 Manager / Admin' },
                  { role: 'kitchen', label: '👨‍🍳 Kitchen Chef' },
                  { role: 'server', label: '🛎️ Waitstaff' },
                ] as { role: Role; label: string }[]).map(({ role, label }) => (
                  <button key={role} type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-3 rounded-xl text-[11px] font-semibold text-left transition border ${selectedRole === role ? 'border-amber-500 text-amber-300' : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}
                    style={{ background: selectedRole === role ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.03)' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Method Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl mb-4 text-[11px] font-semibold"
                 style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <button type="button" onClick={() => setAuthMethod('mobile')}
                className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${authMethod === 'mobile' ? 'text-white shadow' : 'text-slate-400 hover:text-white'}`}
                style={authMethod === 'mobile' ? { background: 'linear-gradient(135deg, #8B1A2E, #E8823A)' } : {}}>
                <Phone className="w-3.5 h-3.5" /> Mobile OTP ⭐
              </button>
              <button type="button" onClick={() => setAuthMethod('email')}
                className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${authMethod === 'email' ? 'text-white shadow' : 'text-slate-400 hover:text-white'}`}
                style={authMethod === 'email' ? { background: 'linear-gradient(135deg, #8B1A2E, #E8823A)' } : {}}>
                <Mail className="w-3.5 h-3.5" /> Email OTP
              </button>
            </div>

            {/* Google OAuth */}
            <button type="button" onClick={handleGoogleOAuth} disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 mb-4 py-2.5 rounded-xl text-[11px] font-medium text-slate-200 transition"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Chrome className="w-4 h-4 text-blue-400" />
              {isSubmitting ? 'Connecting…' : 'Continue with Google'}
            </button>

            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1" style={{ color: '#C8B08A' }}>Full Name <span className="text-slate-500 font-normal">(optional)</span></label>
                <input type="text" placeholder="e.g. Arjuna Sharma" value={name} onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-[12px] text-white outline-none"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>

              {authMethod === 'mobile' ? (
                <div>
                  <label className="block text-[11px] font-semibold mb-1" style={{ color: '#C8B08A' }}>Mobile Number</label>
                  <div className="flex gap-2">
                    <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
                      className="rounded-xl px-2 py-2.5 text-[11px] font-bold text-amber-400 outline-none cursor-pointer"
                      style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500 pointer-events-none" />
                      <input type="tel" required placeholder="98765 43210" value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value.replace(/\D/, '').slice(0, 10))}
                        className="w-full rounded-xl pl-9 pr-3 py-2.5 text-[12px] text-white outline-none"
                        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold mb-1" style={{ color: '#C8B08A' }}>Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500 pointer-events-none" />
                    <input type="email" required placeholder="you@restaurant.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl pl-9 pr-3 py-2.5 text-[12px] text-white outline-none"
                      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl text-[12px] font-bold text-amber-300 flex items-center justify-center gap-2 transition"
                style={{ background: 'linear-gradient(135deg, #8B1A2E, #E8823A)', boxShadow: '0 0 20px rgba(232,130,58,0.25)' }}>
                {isSubmitting ? 'Sending OTP…' : `Send OTP →`}
              </button>
            </form>
          </>
        )}

        {/* ── STEP: otp ── */}
        {step === 'otp' && (
          <>
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-3"
                   style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.3)' }}>
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>Enter OTP</h3>
              <p className="text-[11px] mt-1" style={{ color: '#8A7060' }}>
                Sent to <span className="font-semibold" style={{ color: '#FFD45E' }}>
                  {authMethod === 'mobile' ? `${countryCode} ${mobileNumber}` : email}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-box-${i}`} type="text" inputMode="numeric"
                    maxLength={1} value={digit}
                    onChange={e => handleOtpInput(e.target.value, i)}
                    onKeyDown={e => handleOtpKeyDown(e, i)}
                    className="w-11 h-12 text-center text-xl font-bold rounded-lg outline-none transition"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: digit ? '1px solid #F0B429' : '1px solid rgba(255,255,255,0.1)',
                      color: '#FFD45E'
                    }} />
                ))}
              </div>

              <p className="text-center text-[10px] py-1.5 rounded mb-4 font-mono" style={{ color: '#6B9E78', background: 'rgba(107,158,120,0.08)', border: '1px solid rgba(107,158,120,0.2)' }}>
                Demo: any 6 digits work as OTP
              </p>

              <div className="flex gap-2">
                <button type="button" onClick={() => setStep('credentials')}
                  className="flex-1 py-2.5 rounded-xl text-[11px] font-medium text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition">
                  ← Back
                </button>
                <button type="submit" disabled={isSubmitting || otp.some(d => !d)}
                  className="flex-1 py-2.5 rounded-xl text-[12px] font-bold transition disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #1a6e3a, #2ba35a)', color: '#A7F3D0' }}>
                  {isSubmitting ? 'Verifying…' : 'Verify & Sign In →'}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── STEP: success ── */}
        {step === 'success' && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>Welcome!</h3>
            <p className="text-[11px] mt-2" style={{ color: '#8A7060' }}>Redirecting to your dashboard…</p>
          </div>
        )}
      </div>
    </div>
  );
}
