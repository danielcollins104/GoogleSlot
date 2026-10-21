import React from 'react';
import { Sparkles, Trophy, Wallet, X } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.5)] text-slate-100 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-yellow-300 font-bold text-xs uppercase tracking-widest border border-yellow-400/40 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WELCOME TO HIDDEN TREASURES</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-cinzel text-2xl md:text-3xl font-black text-amber-100 mb-2">
          THE EXPEDITION COMMENCES!
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto mb-6">
          Unearth ancient royal treasures, deploy tactical reconnaissance, and spin across 25 paylines with authentic casino mechanics.
        </p>

        {/* 3 Core Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
              🪙
            </div>
            <h3 className="text-xs font-bold text-amber-300 mb-1">Two-Currency Engine</h3>
            <p className="text-[11px] text-slate-400 leading-tight">
              Play for pure amusement with Gold Coins (GC), or enter promotional sweepstakes with Sweeps Coins (SC).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/30">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
              🗝️
            </div>
            <h3 className="text-xs font-bold text-teal-300 mb-1">Treasure Vault Bonus</h3>
            <p className="text-[11px] text-slate-400 leading-tight">
              Hit 3+ Ancient Chest Scatters to breach the vault and reveal instant mystery multipliers up to 50x!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-yellow-500/30">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-2">
              🌟
            </div>
            <h3 className="text-xs font-bold text-yellow-300 mb-1">Free Spins Multipliers</h3>
            <p className="text-[11px] text-slate-400 leading-tight">
              Catch 3 or more Free Spins Stars to activate 10, 15, or 25 free spins boosted with up to 5x win multipliers.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_4px_15px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-98 transition-all"
        >
          START EXPEDITION NOW
        </button>
      </div>
    </div>
  );
};
