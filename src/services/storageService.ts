import {
  Achievement,
  AuditLog,
  CurrencyMode,
  Friend,
  GameConfiguration,
  RedemptionRequest,
  UserProfile,
  UserWallet,
  WalletTransaction
} from '../types/game';

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_expedition_9042',
  username: 'Capt_Sahara',
  email: 'explorer@hiddentreasures.game',
  avatar: 'scout',
  level: 5,
  xp: 3250,
  nextLevelXp: 5000,
  vipTier: 'Gold',
  isGuest: false,
  kycStatus: 'TIER_1_VERIFIED',
  verifiedAge: true,
  jurisdiction: 'US-CA',
  dailyStreak: 3,
  lastDailyClaimDate: null,
  totalSpins: 142,
  totalWonGC: 18450,
  totalWonSC: 34.50,
  createdAt: '2026-09-15T12:00:00Z'
};

const INITIAL_WALLET: UserWallet = {
  GC: 1250.00,
  SC: 14.50,
  eligibleSC: 12.00,
  unplayedSC: 2.50
};

const INITIAL_CONFIG: GameConfiguration = {
  targetRTP: 96.2,
  minGCBet: 1.0,
  maxGCBet: 100.0,
  minSCBet: 0.20,
  maxSCBet: 10.0,
  minRedemptionSC: 100.0,
  scUsdRate: 1.0,
  maintenanceMode: false,
  sweepstakesEnabled: true
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first_spin',
    title: 'First Expedition',
    description: 'Take your first spin on Hidden Treasures',
    category: 'spins',
    currentProgress: 142,
    targetProgress: 1,
    rewardGC: 500,
    rewardSC: 0.50,
    rewardBadge: '🧭 First Step',
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: 'ach_spin_100',
    title: 'Seasoned Explorer',
    description: 'Play 100 total spins in any mode',
    category: 'spins',
    currentProgress: 142,
    targetProgress: 100,
    rewardGC: 2500,
    rewardSC: 1.00,
    rewardBadge: '🎖️ 100 Club',
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: 'ach_chest_bonus',
    title: 'Treasure Seeker',
    description: 'Trigger the ancient Treasure Chest Bonus 3 times',
    category: 'bonus',
    currentProgress: 2,
    targetProgress: 3,
    rewardGC: 5000,
    rewardSC: 2.00,
    rewardBadge: '🗝️ Vault Master',
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: 'ach_big_win',
    title: 'Golden Hoard',
    description: 'Hit a Big Win (15x or higher single spin win)',
    category: 'wins',
    currentProgress: 1,
    targetProgress: 1,
    rewardGC: 4000,
    rewardSC: 1.50,
    rewardBadge: '👑 King of Gold',
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: 'ach_social_friend',
    title: 'Camp Camaraderie',
    description: 'Send daily gift coins to a fellow expedition friend',
    category: 'social',
    currentProgress: 4,
    targetProgress: 5,
    rewardGC: 1500,
    rewardSC: 0,
    rewardBadge: '🤝 True Ally',
    isUnlocked: false,
    isClaimed: false
  }
];

const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f_1',
    username: 'DesertVanguard',
    avatar: 'commander',
    level: 12,
    vipTier: 'Platinum',
    giftAvailable: true,
    giftReceived: false,
    lastActive: '5m ago'
  },
  {
    id: 'f_2',
    username: 'OasisHunter',
    avatar: 'scout',
    level: 8,
    vipTier: 'Gold',
    giftAvailable: false,
    giftReceived: true,
    lastActive: '2h ago'
  },
  {
    id: 'f_3',
    username: 'QueenSheba',
    avatar: 'royal',
    level: 15,
    vipTier: 'Diamond',
    giftAvailable: true,
    giftReceived: false,
    lastActive: '1d ago'
  }
];

const INITIAL_REDEMPTIONS: RedemptionRequest[] = [
  {
    id: 'rdm_849201',
    userId: 'usr_expedition_9042',
    username: 'Capt_Sahara',
    amountSC: 100,
    usdEquivalent: 100.00,
    method: 'BANK_TRANSFER',
    details: {
      accountNumberMasked: '••••••••4812',
      routingNumberMasked: '••••0210'
    },
    status: 'COMPLETED',
    createdAt: '2026-10-12T09:14:00Z',
    reviewedAt: '2026-10-13T14:22:00Z',
    reviewedBy: 'Admin_Sarah',
    referenceCode: 'ACH-20261013-0941'
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: '2026-10-20T10:15:22Z',
    actor: 'SYSTEM',
    action: 'RTP_HEALTH_CHECK',
    details: 'Theoretical RTP verified at 96.2%. RNG distribution uniform within 0.05% error margin.',
    ipAddress: '10.0.1.2'
  },
  {
    id: 'log_2',
    timestamp: '2026-10-20T12:00:00Z',
    actor: 'Admin_David',
    action: 'REDEMPTION_APPROVAL',
    targetId: 'rdm_849201',
    details: 'Completed AML KYC inspection for Capt_Sahara. Approved $100.00 bank transfer.',
    ipAddress: '192.168.1.44'
  }
];

class StorageService {
  private profileKey = 'ht_user_profile';
  private walletKey = 'ht_user_wallet';
  private transactionsKey = 'ht_transactions';
  private redemptionsKey = 'ht_redemptions';
  private achievementsKey = 'ht_achievements';
  private configKey = 'ht_game_config';
  private friendsKey = 'ht_friends';
  private auditLogsKey = 'ht_audit_logs';

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(this.profileKey)) {
      localStorage.setItem(this.profileKey, JSON.stringify(INITIAL_PROFILE));
    }
    if (!localStorage.getItem(this.walletKey)) {
      localStorage.setItem(this.walletKey, JSON.stringify(INITIAL_WALLET));
    }
    if (!localStorage.getItem(this.configKey)) {
      localStorage.setItem(this.configKey, JSON.stringify(INITIAL_CONFIG));
    }
    if (!localStorage.getItem(this.achievementsKey)) {
      localStorage.setItem(this.achievementsKey, JSON.stringify(INITIAL_ACHIEVEMENTS));
    }
    if (!localStorage.getItem(this.friendsKey)) {
      localStorage.setItem(this.friendsKey, JSON.stringify(INITIAL_FRIENDS));
    }
    if (!localStorage.getItem(this.redemptionsKey)) {
      localStorage.setItem(this.redemptionsKey, JSON.stringify(INITIAL_REDEMPTIONS));
    }
    if (!localStorage.getItem(this.auditLogsKey)) {
      localStorage.setItem(this.auditLogsKey, JSON.stringify(INITIAL_AUDIT_LOGS));
    }
    if (!localStorage.getItem(this.transactionsKey)) {
      const initialTx: WalletTransaction[] = [
        {
          id: 'tx_init_1',
          userId: INITIAL_PROFILE.id,
          type: 'WELCOME_BONUS',
          currency: 'GC',
          amount: 1000.0,
          balanceAfter: 1000.0,
          timestamp: Date.now() - 86400000 * 2,
          description: 'Welcome Expedition Gold Allowance'
        },
        {
          id: 'tx_init_2',
          userId: INITIAL_PROFILE.id,
          type: 'WELCOME_BONUS',
          currency: 'SC',
          amount: 10.0,
          balanceAfter: 10.0,
          timestamp: Date.now() - 86400000 * 2,
          description: 'Complimentary Promotional Sweeps Coins Entry'
        }
      ];
      localStorage.setItem(this.transactionsKey, JSON.stringify(initialTx));
    }
  }

  public getProfile(): UserProfile {
    try {
      const val = localStorage.getItem(this.profileKey);
      return val ? JSON.parse(val) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  }

  public saveProfile(profile: UserProfile) {
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
  }

  public getWallet(): UserWallet {
    try {
      const val = localStorage.getItem(this.walletKey);
      return val ? JSON.parse(val) : INITIAL_WALLET;
    } catch {
      return INITIAL_WALLET;
    }
  }

  public saveWallet(wallet: UserWallet) {
    localStorage.setItem(this.walletKey, JSON.stringify(wallet));
  }

  public getTransactions(): WalletTransaction[] {
    try {
      const val = localStorage.getItem(this.transactionsKey);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  }

  public addTransaction(tx: WalletTransaction) {
    const list = this.getTransactions();
    list.unshift(tx);
    // Keep last 100
    if (list.length > 100) list.length = 100;
    localStorage.setItem(this.transactionsKey, JSON.stringify(list));
  }

  public getRedemptions(): RedemptionRequest[] {
    try {
      const val = localStorage.getItem(this.redemptionsKey);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  }

  public saveRedemptions(list: RedemptionRequest[]) {
    localStorage.setItem(this.redemptionsKey, JSON.stringify(list));
  }

  public getAchievements(): Achievement[] {
    try {
      const val = localStorage.getItem(this.achievementsKey);
      return val ? JSON.parse(val) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  }

  public saveAchievements(list: Achievement[]) {
    localStorage.setItem(this.achievementsKey, JSON.stringify(list));
  }

  public getFriends(): Friend[] {
    try {
      const val = localStorage.getItem(this.friendsKey);
      return val ? JSON.parse(val) : INITIAL_FRIENDS;
    } catch {
      return INITIAL_FRIENDS;
    }
  }

  public saveFriends(friends: Friend[]) {
    localStorage.setItem(this.friendsKey, JSON.stringify(friends));
  }

  public getConfig(): GameConfiguration {
    try {
      const val = localStorage.getItem(this.configKey);
      return val ? JSON.parse(val) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  }

  public saveConfig(cfg: GameConfiguration) {
    localStorage.setItem(this.configKey, JSON.stringify(cfg));
  }

  public getAuditLogs(): AuditLog[] {
    try {
      const val = localStorage.getItem(this.auditLogsKey);
      return val ? JSON.parse(val) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  }

  public addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...entry,
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    if (logs.length > 150) logs.length = 150;
    localStorage.setItem(this.auditLogsKey, JSON.stringify(logs));
  }

  // Atomic Spin Transaction Processor
  public processSpinTransaction(
    betAmount: number,
    winAmount: number,
    currency: CurrencyMode,
    txId: string
  ): { success: boolean; newWallet: UserWallet; error?: string } {
    const wallet = this.getWallet();
    const currentBal = wallet[currency];

    if (currentBal < betAmount) {
      return { success: false, newWallet: wallet, error: 'Insufficient balance' };
    }

    // Atomic debit and credit
    const balanceAfterBet = Number((currentBal - betAmount).toFixed(2));
    const finalBalance = Number((balanceAfterBet + winAmount).toFixed(2));

    let eligibleSC = wallet.eligibleSC;
    let unplayedSC = wallet.unplayedSC;

    if (currency === 'SC') {
      // Playthrough logic: bet consumes unplayed SC first, turning any winnings into eligible SC
      if (unplayedSC >= betAmount) {
        unplayedSC -= betAmount;
      } else {
        const remainder = betAmount - unplayedSC;
        unplayedSC = 0;
        eligibleSC = Math.max(0, eligibleSC - remainder);
      }
      // Winnings become eligible for redemption
      eligibleSC = Number((eligibleSC + winAmount).toFixed(2));
    }

    const updatedWallet: UserWallet = {
      ...wallet,
      [currency]: finalBalance,
      eligibleSC: currency === 'SC' ? eligibleSC : wallet.eligibleSC,
      unplayedSC: currency === 'SC' ? unplayedSC : wallet.unplayedSC
    };

    this.saveWallet(updatedWallet);

    // Record Debit Tx
    this.addTransaction({
      id: txId + '-BET',
      userId: this.getProfile().id,
      type: 'SPIN',
      currency,
      amount: -betAmount,
      balanceAfter: balanceAfterBet,
      timestamp: Date.now(),
      description: `Spin Bet (${betAmount} ${currency})`
    });

    // Record Credit Tx if win > 0
    if (winAmount > 0) {
      this.addTransaction({
        id: txId + '-WIN',
        userId: this.getProfile().id,
        type: 'WIN',
        currency,
        amount: winAmount,
        balanceAfter: finalBalance,
        timestamp: Date.now() + 1,
        description: `Spin Payout (+${winAmount} ${currency})`
      });
    }

    // Update Profile statistics & XP
    const profile = this.getProfile();
    const xpGained = Math.floor(betAmount * (currency === 'SC' ? 100 : 2)) + 10;
    let newXp = profile.xp + xpGained;
    let newLevel = profile.level;
    let nextLevelXp = profile.nextLevelXp;

    while (newXp >= nextLevelXp) {
      newLevel++;
      newXp -= nextLevelXp;
      nextLevelXp = Math.floor(nextLevelXp * 1.3);
    }

    this.saveProfile({
      ...profile,
      level: newLevel,
      xp: newXp,
      nextLevelXp,
      totalSpins: profile.totalSpins + 1,
      totalWonGC: currency === 'GC' ? profile.totalWonGC + winAmount : profile.totalWonGC,
      totalWonSC: currency === 'SC' ? profile.totalWonSC + winAmount : profile.totalWonSC
    });

    return { success: true, newWallet: updatedWallet };
  }
}

export const storageService = new StorageService();
