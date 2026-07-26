'use client';

import React, { useState } from 'react';
import { Order } from '@/types';
import { CreditCard, DollarSign, Users, Download, Printer, CheckCircle, Sparkles, X } from 'lucide-react';

interface BillSplitterProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (orderId: string) => void;
}

export default function BillSplitter({ order, isOpen, onClose, onPaymentComplete }: BillSplitterProps) {
  const [splitMode, setSplitMode] = useState<'full' | 'headcount' | 'items'>('full');
  const [splitCount, setSplitCount] = useState(2);
  const [selectedTipPercent, setSelectedTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const tipAmount = customTip ? parseFloat(customTip) || 0 : (order.subtotal * selectedTipPercent) / 100;
  const grandTotal = order.subtotal + order.tax + tipAmount;
  const perPersonTotal = grandTotal / splitCount;

  const handlePay = () => {
    setIsPaid(true);
    setTimeout(() => {
      onPaymentComplete(order.id);
      setIsPaid(false);
      onClose();
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Smart Billing & Split Pay</h3>
            <p className="text-xs text-slate-400">Order {order.orderNumber} • {order.tableName} ({order.customerName})</p>
          </div>
        </div>

        {/* Split Mode Selector */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5 text-xs">
          <button
            onClick={() => setSplitMode('full')}
            className={`py-2 rounded-lg font-semibold transition ${splitMode === 'full' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Pay Full Bill
          </button>
          <button
            onClick={() => setSplitMode('headcount')}
            className={`py-2 rounded-lg font-semibold transition ${splitMode === 'headcount' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Split Equally
          </button>
          <button
            onClick={() => setSplitMode('items')}
            className={`py-2 rounded-lg font-semibold transition ${splitMode === 'items' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Itemized Split
          </button>
        </div>

        {/* Headcount Split Slider */}
        {splitMode === 'headcount' && (
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" /> Split between guests:
              </span>
              <span className="font-bold text-amber-400 text-sm">{splitCount} People</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={splitCount}
              onChange={(e) => setSplitCount(parseInt(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="mt-2 text-center text-xs text-slate-400">
              Per person share: <span className="text-emerald-400 font-bold text-base">${perPersonTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Order Itemized Summary */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 mb-5 space-y-2 text-xs">
          <div className="font-semibold text-slate-300 pb-2 border-b border-slate-800 flex justify-between">
            <span>Item Description</span>
            <span>Qty x Price</span>
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-slate-300 py-1">
              <span>{item.name} {item.specialNotes ? `(${item.specialNotes})` : ''}</span>
              <span className="font-mono">${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}

          <div className="pt-3 border-t border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono text-slate-200">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>State & Local Tax (9%)</span>
              <span className="font-mono text-slate-200">${order.tax.toFixed(2)}</span>
            </div>

            {/* Tip Selection */}
            <div className="pt-2">
              <span className="text-slate-400 font-medium">Add Hospitality Tip:</span>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {[15, 18, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => { setSelectedTipPercent(pct); setCustomTip(''); }}
                    className={`py-1.5 rounded-lg border text-xs font-bold transition ${selectedTipPercent === pct && !customTip ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {pct}% (${((order.subtotal * pct) / 100).toFixed(2)})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
              <span>Grand Total</span>
              <span className="text-emerald-400 font-mono">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isPaid ? (
          <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-4 text-center animate-fade-in">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Payment Processed Successfully!</h4>
            <p className="text-xs text-emerald-300 mt-1">Digital receipt sent to customer & recorded in ledger.</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handlePrintReceipt}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handlePay}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-xs transition"
            >
              <CreditCard className="w-4 h-4" />
              <span>Complete Payment (${splitMode === 'headcount' ? perPersonTotal.toFixed(2) : grandTotal.toFixed(2)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
