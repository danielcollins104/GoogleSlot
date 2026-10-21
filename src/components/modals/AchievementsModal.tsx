import React, { useState } from 'react';
import { Achievement } from '../../types/game';
import { storageService } from '../../services/storageService';
import { Award, CheckCircle, Sparkles, X } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import confetti from 'canvas-confetti';

interface AchievementsModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ onClose, onRefresh }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(storageService.getAchievements());

  const handleClaim = (achId: string) => {
    const target = achievements.find(a => a.id === achId);
    if (!target || target.isClaimed || !target.isUnlocked) return;

    soundEngine.playWin();
    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    // Update wallet
    const wallet = storageService.getWallet();
    const updatedWallet = {
      ...wallet,
      GC: wallet.GC + target.rewardGC,
      SC: Number((wallet.SC + target.rewardSC).toFixed(2)),
      eligibleSC: Number((wallet.eligibleSC + target.rewardSC).toFixed(2))
    };
    storageService.saveWallet(updatedWallet);

    // Record tx
    storageService.addTransaction({
      id: 'tx_ach_' + target.id,
      userId: storageService.getProfile().id,
      type: 'PROMO_GRANT',
      currency: target.rewardSC > 0 ? 'SC' : 'GC',
      amount: target.rewardSC > 0 ? target.rewardSC : target.rewardGC,
      balanceAfter: target.rewardSC > 0 ? updatedWallet.SC : updatedWallet.GC,
      timestamp: Date.now(),
      description: `Achievement Unlocked: ${target.title} (+${target.rewardGC} GC${target.rewardSC > 0 ? `, +${target.rewardSC} SC` : ''})`
    });

    const updatedAchievements = achievements.map(a => {
      if (a.id === achId) {
        return { ...a, isClaimed: true };
      }
      return a;
    });

    setAchievements(updatedAchievements);
    storageService.saveAchievements(updatedAchievements);
    onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
            <Award className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
              EXPEDITION MISSIONS &amp; ACHIEVEMENTS
            </h2>
            <p className="text-xs text-slate-300">
              Complete milestones across spins, wins, and bonuses to unlock prestige badges and rewards!
            </p>
          </div>
        </div>

        {/* Achievements list */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {achievements.map((ach) => {
            const progressPct = Math.min(100, Math.round((ach.currentProgress / ach.targetProgress) * 100));
            const canClaim = ach.isUnlocked && !ach.isClaimed;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  canClaim
                    ? 'border-yellow-400 bg-amber-500/15 shadow-md'
                    : ach.isClaimed
                    ? 'border-emerald-600/40 bg-slate-900/40 opacity-80'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">{ach.title}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                      {ach.rewardBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">{ach.description}</p>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 max-w-xs">
                    <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-yellow-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {ach.currentProgress}/{ach.targetProgress}
                    </span>
                  </div>
                </div>

                {/* Reward & Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-300">+{ach.rewardGC.toLocaleString()} GC</div>
                    {ach.rewardSC > 0 && (
                      <div className="text-[11px] font-bold text-teal-300">+{ach.rewardSC.toFixed(2)} SC</div>
                    )}
                  </div>

                  {ach.isClaimed ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : canClaim ? (
                    <button
                      onClick={() => handleClaim(ach.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow hover:brightness-110 active:scale-95 flex items-center gap-1 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CLAIM</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 italic">In Progress</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
