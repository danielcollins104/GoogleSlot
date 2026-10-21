import React from 'react';
import { CurrencyMode, UserProfile } from '../types/game';
import { Gift, ShieldCheck, Sparkles, Users, Award, Settings, DollarSign } from 'lucide-react';

interface TopHeaderProps {
  currency: CurrencyMode;
  onCurrencyChange: (mode: CurrencyMode) => void;
  profile: UserProfile;
  dailyRewardAvailable: boolean;
  onOpenDaily: () => void;
  onOpenRedeem: () => void;
  onOpenSocial: () => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currency,
  onCurrencyChange,
  profile,
  dailyRewardAvailable,
  onOpenDaily,
  onOpenRedeem,
  onOpenSocial,
  onOpenAchievements,
  onOpenProfile,
  onOpenSettings,
  onOpenAdmin
}) => {
  return (
    <header className="relative w-full z-40 bg-gradient-to-b from-[#070d17]/95 via-[#0b1322]/90 to-transparent border-b border-amber-500/30 px-3 py-2 md:px-6 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Player Profile Pill & VIP */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-amber-500/40 hover:border-amber-400 active:scale-95 transition-all"
            title="View Player Profile & Expedition Stats"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
              {profile.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-100 leading-tight flex items-center gap-1">
                {profile.username}
                <span className="text-[10px] text-amber-400 font-semibold">Lv.{profile.level}</span>
              </span>
              <span className="text-[10px] text-amber-300/80 leading-tight">
                {profile.vipTier} Explorer
              </span>
            </div>
          </button>

          {/* Quick Level XP Bar (Desktop) */}
          <div className="hidden md:flex flex-col w-20">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-amber-400"
                style={{ width: `${Math.min(100, (profile.xp / profile.nextLevelXp) * 100)}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-400 text-right mt-0.5">
              {profile.xp}/{profile.nextLevelXp} XP
            </span>
          </div>
        </div>

        {/* Center: Currency Mode Switcher (GC vs SC) */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-full border border-amber-500/50 shadow-inner">
          <button
            onClick={() => onCurrencyChange('GC')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              currency === 'GC'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md scale-102'
                : 'text-amber-200/70 hover:text-amber-200'
            }`}
            title="Gold Coins: Pure Entertainment Social Play (Non-Redeemable)"
          >
            <span>🪙</span>
            <span>GOLD COINS</span>
          </button>

          <button
            onClick={() => onCurrencyChange('SC')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              currency === 'SC'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 shadow-md scale-102'
                : 'text-teal-200/70 hover:text-teal-200'
            }`}
            title="Sweeps Coins: Promotional Sweepstakes Mode"
          >
            <span>🌟</span>
            <span>SWEEPS COINS</span>
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Daily Reward Button with pulse if available */}
          <button
            onClick={onOpenDaily}
            className={`relative p-2 rounded-lg border transition-all ${
              dailyRewardAvailable
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-yellow-200 animate-pulse shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                : 'bg-slate-900/80 border-slate-700 text-amber-300 hover:border-amber-400'
            }`}
            title="Claim Daily Login Rewards"
          >
            <Gift className="w-4 h-4 md:w-5 md:h-5" />
            {dailyRewardAvailable && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-950" />
            )}
          </button>

          {/* Social Friends */}
          <button
            onClick={onOpenSocial}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-amber-300 transition-colors"
            title="Expedition Friends & Clubs"
          >
            <Users className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Achievements */}
          <button
            onClick={onOpenAchievements}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-amber-300 transition-colors"
            title="Expedition Missions & Achievements"
          >
            <Award className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Sweepstakes Redeem Center */}
          <button
            onClick={onOpenRedeem}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 border border-teal-300 hover:brightness-110 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all"
            title="Redeem Eligible Sweeps Coins for Real Prizes"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REDEEM</span>
          </button>

          {/* Admin Portal */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-indigo-400 text-indigo-300 transition-colors"
            title="Administrator & Compliance Console"
          >
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
            title="Game Settings"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
