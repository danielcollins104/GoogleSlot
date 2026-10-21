import React, { useState } from 'react';
import { AlertTriangle, Clock, HeartHandshake, PhoneCall, ShieldCheck, X } from 'lucide-react';

interface ResponsiblePlayModalProps {
  onClose: () => void;
}

export const ResponsiblePlayModal: React.FC<ResponsiblePlayModalProps> = ({ onClose }) => {
  const [sessionTimer, setSessionTimer] = useState<number>(60);
  const [dailyLimitGC, setDailyLimitGC] = useState<number>(50000);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow">
            <ShieldCheck className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-emerald-100">
              RESPONSIBLE SOCIAL PLAY
            </h2>
            <p className="text-xs text-slate-300">
              Player protection controls, self-exclusion tools, and healthy entertainment management.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-300">
            Player protection limits successfully updated.
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-4 mb-6">
          {/* Reality Check Session Timer */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Reality Check Reminders</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Receive an on-screen prompt summarizing your play time, spins, and coin balance changes.
            </p>
            <select
              value={sessionTimer}
              onChange={(e) => setSessionTimer(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100"
            >
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every 60 minutes (Recommended)</option>
              <option value={120}>Every 2 hours</option>
              <option value={0}>Disabled</option>
            </select>
          </div>

          {/* Daily Coin Spend Limit */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Voluntary Daily Play Limits</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Set a daily maximum limit on your entertainment coin usage.
            </p>
            <input
              type="number"
              value={dailyLimitGC}
              onChange={(e) => setDailyLimitGC(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            UPDATE SAFETY CONTROLS
          </button>
        </form>

        {/* Self-exclusion & Helplines */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
            <HeartHandshake className="w-4 h-4" />
            <span>Need a Break or Confidential Assistance?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If social gaming ceases to be enjoyable, you may self-exclude your account at any time for 24 hours, 7 days, 30 days, or permanently by contacting player support.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300">
            <PhoneCall className="w-4 h-4" />
            <span>National Problem Gambling Helpline: 1-800-522-4700 (1-800-GAMBLER)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
