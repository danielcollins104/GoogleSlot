import React, { useState } from 'react';
import { UserProfile, UserWallet } from '../../types/game';
import { storageService } from '../../services/storageService';
import { Award, CheckCircle, History, Shield, ShieldCheck, User, X } from 'lucide-react';

interface ProfileModalProps {
  profile: UserProfile;
  wallet: UserWallet;
  onClose: () => void;
  onRefresh: () => void;
  onOpenWalletHistory: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  wallet,
  onClose,
  onRefresh,
  onOpenWalletHistory
}) => {
  const [username, setUsername] = useState(profile.username);
  const [isEditing, setIsEditing] = useState(false);
  const [kycUpgradeNotice, setKycUpgradeNotice] = useState<string | null>(null);

  const handleSaveUsername = () => {
    if (!username.trim()) return;
    const updated = { ...profile, username: username.trim() };
    storageService.saveProfile(updated);
    setIsEditing(false);
    onRefresh();
  };

  const handleSimulateKycUpgrade = () => {
    // Advance KYC Tier for testing / compliance verification demonstration
    let nextTier: UserProfile['kycStatus'] = 'TIER_1_VERIFIED';
    if (profile.kycStatus === 'TIER_1_VERIFIED') nextTier = 'TIER_2_VERIFIED';
    else if (profile.kycStatus === 'UNVERIFIED') nextTier = 'TIER_1_VERIFIED';

    const updated: UserProfile = {
      ...profile,
      kycStatus: nextTier,
      verifiedAge: true
    };
    storageService.saveProfile(updated);
    storageService.addAuditLog({
      actor: profile.username,
      action: 'KYC_TIER_UPDATED',
      details: `Advanced verification level to ${nextTier}`,
      ipAddress: '127.0.0.1'
    });
    setKycUpgradeNotice(`Identity verification upgraded to ${nextTier.replace('_', ' ')}!`);
    setTimeout(() => setKycUpgradeNotice(null), 3000);
    onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-2xl shadow-lg border-2 border-amber-200">
            {profile.username.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-2 py-1 bg-slate-900 border border-amber-400 rounded text-sm font-bold text-slate-100"
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="px-2 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
                    {profile.username}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                {profile.vipTier} Tier
              </span>
              <span>· Level {profile.level}</span>
              <span>· Member since {new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {kycUpgradeNotice && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-300">
            {kycUpgradeNotice}
          </div>
        )}

        {/* Level XP Progress */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-5">
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
            <span>Expedition Experience (XP)</span>
            <span className="font-mono text-amber-300">
              {profile.xp} / {profile.nextLevelXp} XP ({Math.round((profile.xp / profile.nextLevelXp) * 100)}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300"
              style={{ width: `${Math.min(100, (profile.xp / profile.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Spins</span>
            <div className="font-mono-numbers text-lg font-black text-slate-100 mt-0.5">
              {profile.totalSpins}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Streak</span>
            <div className="font-mono-numbers text-lg font-black text-amber-400 mt-0.5">
              {profile.dailyStreak} Days
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">GC Won</span>
            <div className="font-mono-numbers text-lg font-black text-yellow-300 mt-0.5">
              {profile.totalWonGC.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">SC Won</span>
            <div className="font-mono-numbers text-lg font-black text-teal-300 mt-0.5">
              {profile.totalWonSC.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Identity & Verification Tier Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <ShieldCheck className="w-4 h-4" />
              <span>KYC Identity &amp; Compliance Status</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Status: <span className="text-emerald-400 font-bold">{profile.kycStatus.replace('_', ' ')}</span>
              {profile.verifiedAge && ' · Age 21+ Confirmed'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Eligible for promotional sweepstakes play &amp; prize redemptions.
            </div>
          </div>

          <button
            onClick={handleSimulateKycUpgrade}
            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0"
          >
            Upgrade KYC Tier
          </button>
        </div>

        {/* Action Link to Wallet Ledger */}
        <button
          onClick={() => {
            onClose();
            onOpenWalletHistory();
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
        >
          <History className="w-4 h-4" />
          <span>VIEW FULL WALLET TRANSACTION LEDGER</span>
        </button>
      </div>
    </div>
  );
};
