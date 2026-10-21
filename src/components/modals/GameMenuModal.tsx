import React from 'react';
import {
  Award,
  BookOpen,
  DollarSign,
  Gift,
  HelpCircle,
  History,
  Info,
  Play,
  Settings,
  Shield,
  ShieldCheck,
  Trophy,
  User,
  Users,
  X
} from 'lucide-react';

interface GameMenuModalProps {
  onClose: () => void;
  onOpenDaily: () => void;
  onOpenRedeem: () => void;
  onOpenSocial: () => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onOpenWalletHistory: () => void;
  onOpenRules: () => void;
  onOpenResponsiblePlay: () => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  onOpenAdmin: () => void;
  onOpenOnboarding: () => void;
}

export const GameMenuModal: React.FC<GameMenuModalProps> = ({
  onClose,
  onOpenDaily,
  onOpenRedeem,
  onOpenSocial,
  onOpenAchievements,
  onOpenProfile,
  onOpenWalletHistory,
  onOpenRules,
  onOpenResponsiblePlay,
  onOpenSettings,
  onOpenSupport,
  onOpenAdmin,
  onOpenOnboarding
}) => {
  const menuItems = [
    {
      label: '7-Day Daily Rewards',
      desc: 'Claim your guaranteed daily coin allowances',
      icon: Gift,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      action: onOpenDaily
    },
    {
      label: 'Sweepstakes Redemption',
      desc: 'Redeem eligible Sweeps Coins for cash prizes',
      icon: DollarSign,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      action: onOpenRedeem
    },
    {
      label: 'Expedition Achievements',
      desc: 'Missions, milestones and prestige trophies',
      icon: Award,
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      action: onOpenAchievements
    },
    {
      label: 'Social & Camp Alliances',
      desc: 'Friends list, coin gifting & weekly leaderboards',
      icon: Users,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      action: onOpenSocial
    },
    {
      label: 'Player Profile & KYC',
      desc: 'XP level, VIP status & identity verification',
      icon: User,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      action: onOpenProfile
    },
    {
      label: 'Wallet Transaction Ledger',
      desc: 'Immutable history of all spins, wins & redemptions',
      icon: History,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      action: onOpenWalletHistory
    },
    {
      label: 'Official Rules & Paytable',
      desc: '25 paylines, symbol payouts & AMOE free entry',
      icon: BookOpen,
      color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      action: onOpenRules
    },
    {
      label: 'Responsible Social Play',
      desc: 'Session timers, reality checks & self-exclusion',
      icon: Shield,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      action: onOpenResponsiblePlay
    },
    {
      label: 'Customer Support & FAQ',
      desc: '24/7 helpdesk & redemption inquiries',
      icon: HelpCircle,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      action: onOpenSupport
    },
    {
      label: 'Settings & Performance',
      desc: 'Audio volumes, turbo spin & battery saver',
      icon: Settings,
      color: 'text-slate-300 bg-slate-800/40 border-slate-700',
      action: onOpenSettings
    },
    {
      label: 'Compliance & Admin Console',
      desc: 'RTP oversight, AML review & redemption approvals',
      icon: ShieldCheck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      action: onOpenAdmin
    },
    {
      label: 'Tutorial & Game Primer',
      desc: 'Learn game mechanics & two-currency model',
      icon: Info,
      color: 'text-slate-400 bg-slate-800/30 border-slate-700',
      action: onOpenOnboarding
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100 mb-1">
          EXPEDITION NAVIGATION MENU
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          Access all game modes, sweepstakes facilities, and account tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[65vh] overflow-y-auto pr-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onClose();
                  item.action();
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all hover:scale-101 hover:brightness-110 active:scale-98 ${item.color}`}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-950/80 flex items-center justify-center shrink-0 shadow">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-100 truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
