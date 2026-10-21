import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CurrencyMode } from '../../types/game';
import { soundEngine } from '../../services/soundEngine';
import { Sparkles, Trophy } from 'lucide-react';

interface BigWinCelebrationProps {
  amount: number;
  currency: CurrencyMode;
  isMegaWin: boolean;
  isJackpot: boolean;
  onDismiss: () => void;
}

export const BigWinCelebration: React.FC<BigWinCelebrationProps> = ({
  amount,
  currency,
  isMegaWin,
  isJackpot,
  onDismiss
}) => {
  useEffect(() => {
    soundEngine.playBigWin();

    // Trigger confetti cannon
    try {
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#f59e0b', '#38bdf8', '#14b8a6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffd700', '#f59e0b', '#38bdf8', '#14b8a6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // safe fallback
    }
  }, [isMegaWin, isJackpot]);

  const title = isJackpot ? 'EPIC TREASURE JACKPOT!' : isMegaWin ? 'MEGA EXPEDITION WIN!' : 'BIG WIN!';

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md cursor-pointer animate-fade-in"
    >
      <div className="relative flex flex-col items-center text-center max-w-lg p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#1c2c44] via-[#0f1b2c] to-[#070d17] border-4 border-yellow-400 shadow-[0_0_60px_rgba(255,215,0,0.6)]">
        {/* Glowing Trophy */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.8)] mb-4 animate-bounce">
          <Trophy className="w-12 h-12 text-slate-950" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-yellow-300 font-bold text-xs uppercase tracking-widest border border-yellow-400/40 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONGRATULATIONS EXPLORER</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-600 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] mb-3">
          {title}
        </h2>

        <div className="font-mono-numbers text-4xl md:text-6xl font-black text-yellow-300 drop-shadow-[0_4px_15px_rgba(255,215,0,0.8)] mb-6">
          +{currency === 'GC' ? '🪙 ' : '🌟 '}
          {amount.toFixed(2)} {currency}
        </div>

        <button
          onClick={onDismiss}
          className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          COLLECT TREASURE &amp; CONTINUE
        </button>
      </div>
    </div>
  );
};
