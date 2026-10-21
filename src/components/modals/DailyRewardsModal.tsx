import React from 'react';
import { Calendar, CheckCircle2, Gift, Lock, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../services/soundEngine';

interface DailyRewardsModalProps {
  currentStreak: number;
  isClaimableToday: boolean;
  onClaim: (day: number, rewardGC: number, rewardSC: number) => void;
  onClose: () => void;
}

const REWARDS_SCHEDULE = [
  { day: 1, gc: 1000, sc: 0, title: 'Day 1 Rations' },
  { day: 2, gc: 2000, sc: 0, title: 'Day 2 Camp Fuel' },
  { day: 3, gc: 3000, sc: 0.50, title: 'Day 3 Promo Entry' },
  { day: 4, gc: 4000, sc: 0, title: 'Day 4 Expedition Map' },
  { day: 5, gc: 5000, sc: 0, title: 'Day 5 Gold Nugget' },
  { day: 6, gc: 7500, sc: 0, title: 'Day 6 Royal Scout' },
  { day: 7, gc: 15000, sc: 2.00, title: 'Day 7 Mystery Vault' }
];

export const DailyRewardsModal: React.FC<DailyRewardsModalProps> = ({
  currentStreak,
  isClaimableToday,
  onClaim,
  onClose
}) => {
  const activeDayIndex = Math.min(6, currentStreak);

  const handleClaimDay = () => {
    if (!isClaimableToday) return;
    const targetReward = REWARDS_SCHEDULE[activeDayIndex];
    soundEngine.playWin();
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }
    onClaim(targetReward.day, targetReward.gc, targetReward.sc);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/60 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow">
            <Calendar className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100 flex items-center gap-2">
              7-DAY EXPEDITION CALENDAR
            </h2>
            <p className="text-xs text-slate-300">
              Check in daily to build your expedition streak and claim guaranteed coin allowances!
            </p>
          </div>
        </div>

        {/* Streak Counter Bar */}
        <div className="mb-5 p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm">🔥 Current Streak:</span>
            <span className="font-mono-numbers text-base font-black text-amber-200">
              {currentStreak} Days
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {isClaimableToday ? 'Claim today\'s bonus below!' : 'Next reward unlocks tomorrow!'}
          </span>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
          {REWARDS_SCHEDULE.map((item, idx) => {
            const isClaimed = idx < activeDayIndex || (idx === activeDayIndex && !isClaimableToday);
            const isToday = idx === activeDayIndex && isClaimableToday;
            const isLocked = idx > activeDayIndex;

            return (
              <div
                key={item.day}
                className={`relative p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                  isToday
                    ? 'border-yellow-400 bg-amber-500/20 ring-2 ring-yellow-400/50 shadow-lg scale-102'
                    : isClaimed
                    ? 'border-emerald-600/50 bg-emerald-950/20 opacity-80'
                    : 'border-slate-800 bg-slate-900/40 opacity-60'
                }`}
              >
                {/* Day Header */}
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Day {item.day}
                </span>

                {/* Icon / Status */}
                <div className="my-2">
                  {isClaimed ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow" />
                  ) : isToday ? (
                    <Gift className="w-8 h-8 text-yellow-400 animate-bounce drop-shadow" />
                  ) : (
                    <Lock className="w-7 h-7 text-slate-500" />
                  )}
                </div>

                {/* Reward Values */}
                <div className="text-[11px] font-bold text-amber-200 leading-tight">
                  +{item.gc.toLocaleString()} GC
                  {item.sc > 0 && (
                    <div className="text-[10px] text-teal-300 font-extrabold mt-0.5">
                      +{item.sc.toFixed(2)} SC
                    </div>
                  )}
                </div>

                {/* Status footer */}
                <span className="mt-1 text-[9px] font-semibold text-slate-400">
                  {isClaimed ? 'Claimed' : isToday ? 'Available' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {isClaimableToday ? (
          <button
            onClick={handleClaimDay}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm md:text-base tracking-wider uppercase shadow-[0_4px_15px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>CLAIM DAY {REWARDS_SCHEDULE[activeDayIndex].day} REWARD</span>
          </button>
        ) : (
          <div className="w-full py-3 px-6 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-center text-sm font-semibold">
            ✅ You have claimed today's reward! Return tomorrow for Day {Math.min(7, currentStreak + 1)}.
          </div>
        )}
      </div>
    </div>
  );
};
