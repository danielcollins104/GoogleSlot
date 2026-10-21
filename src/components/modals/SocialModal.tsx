import React, { useState } from 'react';
import { Friend, LeaderboardEntry } from '../../types/game';
import { storageService } from '../../services/storageService';
import { Award, Gift, Send, Trophy, UserPlus, Users, X } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface SocialModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, username: 'SaharaEmperor', avatar: 'royal', score: 1428500, vipTier: 'Diamond', badge: '👑 Grand Sovereign' },
  { rank: 2, username: 'DesertVanguard', avatar: 'commander', score: 980400, vipTier: 'Platinum', badge: '🎖️ High Marshal' },
  { rank: 3, username: 'Capt_Sahara', avatar: 'scout', score: 485200, vipTier: 'Gold', badge: '🧭 Master Explorer' },
  { rank: 4, username: 'OasisHunter', avatar: 'scout', score: 320100, vipTier: 'Gold', badge: '🏹 Trailblazer' },
  { rank: 5, username: 'GoldNomad', avatar: 'warrior', score: 210800, vipTier: 'Silver', badge: '🛡️ Camp Sentinel' }
];

export const SocialModal: React.FC<SocialModalProps> = ({ onClose, onRefresh }) => {
  const [activeTab, setActiveTab] = useState<'FRIENDS' | 'LEADERBOARD'>('FRIENDS');
  const [friends, setFriends] = useState<Friend[]>(storageService.getFriends());
  const [newFriendName, setNewFriendName] = useState('');
  const [giftSentMessage, setGiftSentMessage] = useState<string | null>(null);

  const handleSendGift = (friendId: string, friendName: string) => {
    // Send 100 free nonredeemable GC gift
    soundEngine.playWin();
    const updated = friends.map(f => {
      if (f.id === friendId) {
        return { ...f, giftAvailable: false };
      }
      return f;
    });

    setFriends(updated);
    storageService.saveFriends(updated);

    storageService.addTransaction({
      id: 'tx_gift_' + Date.now(),
      userId: storageService.getProfile().id,
      type: 'GIFT_SENT',
      currency: 'GC',
      amount: 0, // gifting is promotional and complimentary to promote community!
      balanceAfter: storageService.getWallet().GC,
      timestamp: Date.now(),
      description: `Sent complimentary 250 GC Daily Friendship Gift to ${friendName}`
    });

    setGiftSentMessage(`Sent 250 free Gold Coins to ${friendName}!`);
    setTimeout(() => setGiftSentMessage(null), 3000);
    onRefresh();
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;

    const newFriend: Friend = {
      id: 'f_' + Date.now(),
      username: newFriendName.trim(),
      avatar: 'scout',
      level: 1,
      vipTier: 'Bronze',
      giftAvailable: true,
      giftReceived: false,
      lastActive: 'Just now'
    };

    const updated = [...friends, newFriend];
    setFriends(updated);
    storageService.saveFriends(updated);
    setNewFriendName('');
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
            <Users className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
              EXPEDITION SOCIAL &amp; ALLIANCES
            </h2>
            <p className="text-xs text-slate-300">
              Connect with fellow treasure hunters, send free daily Gold Coin gifts, and climb the hall of fame.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-5">
          <button
            onClick={() => setActiveTab('FRIENDS')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'FRIENDS'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>FRIENDS &amp; GIFTS ({friends.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('LEADERBOARD')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'LEADERBOARD'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>WEEKLY CHAMPIONS LEADERBOARD</span>
          </button>
        </div>

        {giftSentMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
            <Gift className="w-4 h-4" />
            <span>{giftSentMessage}</span>
          </div>
        )}

        {/* FRIENDS TAB */}
        {activeTab === 'FRIENDS' && (
          <div className="space-y-4">
            {/* Add friend form */}
            <form onSubmit={handleAddFriend} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter explorer username..."
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" />
                <span>ADD</span>
              </button>
            </form>

            {/* Friends list */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
                      {friend.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{friend.username}</span>
                        <span className="text-[10px] text-amber-400">Lv.{friend.level}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {friend.vipTier} · Active {friend.lastActive}
                      </div>
                    </div>
                  </div>

                  <div>
                    {friend.giftAvailable ? (
                      <button
                        onClick={() => handleSendGift(friend.id, friend.username)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>SEND 250 GC</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">Gift Sent Today</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              * Note: In compliance with sweepstakes regulations, only non-redeemable entertainment Gold Coins (GC) may be gifted between players. Sweeps Coins (SC) can never be transferred.
            </div>
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'LEADERBOARD' && (
          <div className="space-y-3">
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {LEADERBOARD_DATA.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    entry.rank === 1
                      ? 'border-yellow-400 bg-amber-500/10'
                      : entry.rank === 2
                      ? 'border-slate-400 bg-slate-800/40'
                      : entry.rank === 3
                      ? 'border-amber-700 bg-amber-900/20'
                      : 'border-slate-800 bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-cinzel font-black text-sm text-amber-300">
                      #{entry.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/40 flex items-center justify-center font-bold text-slate-200 text-xs">
                      {entry.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                        <span>{entry.username}</span>
                        {entry.rank === 3 && <span className="text-[10px] text-teal-400 font-bold">(You)</span>}
                      </div>
                      <div className="text-[10px] text-amber-300/80">{entry.badge}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono-numbers text-xs font-bold text-amber-200">
                      🪙 {entry.score.toLocaleString()} GC
                    </div>
                    <span className="text-[10px] text-slate-400">{entry.vipTier} Tier</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              Leaderboards refresh every Sunday at midnight UTC. Rankings reflect entertainment play only.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
