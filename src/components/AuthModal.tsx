'use client';

import React, { useState } from 'react';
import { User, Role } from '@/types';
import { Mail, Lock, ShieldCheck, UserCheck, Sparkles, X, Chrome, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'credentials' | 'otp' | 'success'>('credentials');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('manager');
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user: User = {
        id: `usr-${Date.now()}`,
        name: name || email.split('@')[0] || 'Restaurant Staff',
        email: email,
        role: selectedRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      setStep('success');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
        setStep('credentials');
      }, 1000);
    }, 800);
  };

  const handleGoogleOAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const user: User = {
        id: 'usr-google-101',
        name: 'Alex Vance (Google)',
        email: 'alex.vance@gmail.com',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      };
      setIsSubmitting(false);
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'credentials' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sign In / Register</h3>
                <p className="text-xs text-slate-400">User Story 2: Secure Email OTP & OAuth</p>
              </div>
            </div>

            {/* Quick Google OAuth Button */}
            <button
              onClick={handleGoogleOAuth}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700/90 text-white font-medium py-2.5 px-4 rounded-xl border border-slate-700 transition shadow-sm text-sm"
            >
              <Chrome className="w-4 h-4 text-emerald-400" />
              <span>Continue with Google OAuth</span>
            </button>

            <div className="relative my-5 text-center text-xs text-slate-500 uppercase tracking-widest">
              <span className="bg-slate-900 px-3 relative z-10">Or Email with OTP</span>
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="manager@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role-Based Access Level</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                >
                  <option value="manager">Manager / Admin (Full Access)</option>
                  <option value="kitchen">Kitchen Chef (KDS)</option>
                  <option value="server">Waitstaff / Server (POS & Tables)</option>
                  <option value="customer">Customer (Diner)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition"
              >
                {isSubmitting ? 'Sending Verification Code...' : 'Send OTP Verification Code'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Enter 6-Digit OTP</h3>
              <p className="text-xs text-slate-400 mt-1">Verification code sent to <span className="text-orange-400 font-medium">{email}</span></p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center gap-2 my-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-11 h-12 text-center text-lg font-bold bg-slate-950 border border-slate-700 rounded-lg text-amber-400 outline-none focus:border-amber-500"
                  />
                ))}
              </div>

              <p className="text-[11px] text-center text-emerald-400 bg-emerald-950/40 py-1 rounded border border-emerald-800/40">
                Demo Hint: Code <span className="font-bold underline">482910</span> pre-filled for testing
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-sm transition"
              >
                {isSubmitting ? 'Verifying Code...' : 'Verify OTP & Log In'}
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Authenticated!</h3>
            <p className="text-xs text-slate-400 mt-1">Redirecting to active workspace...</p>
          </div>
        )}
      </div>
    </div>
  );
}
