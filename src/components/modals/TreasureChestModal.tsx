import React, { useState } from 'react';
import { CurrencyMode } from '../../types/game';
import { soundEngine } from '../../services/soundEngine';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

interface TreasureChestModalProps {
  betAmount: number;
  currency: CurrencyMode;
  onClaim: (bonusWin: number) => void;
  onClose: () => void;
}

export const TreasureChestModal: React.FC<TreasureChestModalProps> = ({
  betAmount,
  currency,
  onClaim,
  onClose
}) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [revealedReward, setRevealedReward] = useState<number | null>(null);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);

  const chestMultipliers = [15, 25, 50];

  const handleOpenChest = (index: number) => {
    if (chestOpened) return;
    setSelectedChest(index);
    soundEngine.playChestBurst();

    // Reward calculation based on bet
    const mult = chestMultipliers[index % chestMultipliers.length];
    const totalPrize = Number((betAmount * mult).toFixed(2));
    setRevealedReward(totalPrize);
    setChestOpened(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#14b8a6', '#38bdf8', '#fbbf24']
      });
    } catch {
      // safe fallback
    }
  };

  const handleFinish = () => {
    if (revealedReward !== null) {
      onClaim(revealedReward);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.4)] text-center">
        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs md:text-sm tracking-wider uppercase shadow-md mb-3">
          <Sparkles className="w-4 h-4" />
          <span>ANCIENT TREASURE VAULT BONUS</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-amber-100 mb-2">
          {chestOpened ? 'TREASURE UNLOCKED!' : 'SELECT AN EXPEDITION CHEST'}
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
          {chestOpened
            ? 'The ancient vault has yielded its wealth. Add this bonus directly to your wallet!'
            : 'Choose one of the 3 sacred expedition chests to crack its gold lock and claim your mystery multiplier!'}
        </p>

        {/* 3 Chests to choose from */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
          {[0, 1, 2].map((idx) => {
            const isSelected = selectedChest === idx;
            const mult = chestMultipliers[idx];

            return (
              <button
                key={idx}
                onClick={() => handleOpenChest(idx)}
                disabled={chestOpened}
                className={`relative group p-3 md:p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                  chestOpened && isSelected
                    ? 'border-yellow-400 bg-amber-500/20 scale-105 shadow-[0_0_25px_rgba(250,204,21,0.6)]'
                    : chestOpened
                    ? 'border-slate-800 bg-slate-900/40 opacity-50'
                    : 'border-amber-500/50 bg-gradient-to-b from-slate-900 to-slate-950 hover:border-yellow-400 hover:scale-105 active:scale-95 cursor-pointer shadow-lg'
                }`}
              >
                {/* Visual Chest Artwork */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-2 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <rect x="15" y="45" width="70" height="42" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="3" />
                    <path
                      d={chestOpened && isSelected ? "M10 40 L30 15 L70 15 L90 40 Z" : "M12 45 L22 25 L78 25 L88 45 Z"}
                      fill="#92400e"
                      stroke="#fbbf24"
                      strokeWidth="3"
                    />
                    <circle cx="50" cy="55" r="7" fill="#fbbf24" stroke="#451a03" strokeWidth="2" />
                    {chestOpened && isSelected && (
                      <circle cx="50" cy="30" r="14" fill="#38bdf8" opacity="0.8" filter="blur(4px)" />
                    )}
                  </svg>
                </div>

                <span className="text-xs font-bold text-amber-200">
                  {chestOpened
                    ? isSelected
                      ? `${mult}x BONUS`
                      : `${mult}x`
                    : `Chest #${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Revealed Reward Banner */}
        {chestOpened && revealedReward !== null && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-amber-950/80 border border-yellow-400/80 shadow-inner">
            <div className="text-xs font-bold text-amber-300 tracking-wider uppercase mb-1">
              TOTAL BONUS PRIZE AWARDED
            </div>
            <div className="font-mono-numbers text-3xl md:text-4xl font-black text-yellow-300 drop-shadow">
              +{currency === 'GC' ? '🪙 ' : '🌟 '}
              {revealedReward.toFixed(2)} {currency}
            </div>
          </div>
        )}

        {/* Action Button */}
        {chestOpened ? (
          <button
            onClick={handleFinish}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm md:text-base tracking-wider uppercase shadow-[0_4px_15px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-98 transition-all"
          >
            COLLECT BONUS REWARD
          </button>
        ) : (
          <div className="text-xs text-slate-400 italic">
            Tap any of the 3 chests to reveal your multiplier
          </div>
        )}
      </div>
    </div>
  );
};
