export type CurrencyMode = 'GC' | 'SC';

export type SymbolId =
  | 'ROYAL_KING'
  | 'EXPEDITION_LEADER'
  | 'BERET_COMMANDER'
  | 'DESERT_WARRIOR'
  | 'CYBER_MECH_SKULL'
  | 'NEON_PLASMA_CORE'
  | 'HOLO_CYBER_BLADE'
  | 'CYBER_DRONE_ORB'
  | 'AIRCRAFT_SCOUT'
  | 'BINOCULARS'
  | 'COMPASS'
  | 'DOG_TAGS'
  | 'AMMO_CRATE'
  | 'GOLD_COINS'
  | 'WILD_SHIELD'
  | 'CHEST_SCATTER'
  | 'FREE_SPINS_STAR'
  | 'GOLDEN_KEY';

export interface SymbolDefinition {
  id: SymbolId;
  name: string;
  category: 'high' | 'mid' | 'special';
  payouts: {
    3: number;
    4: number;
    5: number;
  };
  isWild?: boolean;
  isScatter?: boolean;
  isBonus?: boolean;
  isFreeSpins?: boolean;
  rarityColor: string;
  description: string;
}

export interface WinningLine {
  lineIndex: number;
  symbolId: SymbolId;
  count: number;
  multiplier: number;
  payout: number;
  positions: [number, number][]; // [columnIndex, rowIndex]
}

export interface SpinResult {
  grid: SymbolId[][]; // 5 columns x 3 rows
  winningLines: WinningLine[];
  totalWin: number;
  scatterCount: number;
  bonusTriggered: boolean;
  freeSpinsAwarded: number;
  currentFreeSpinsLeft: number;
  freeSpinMultiplier: number;
  isBigWin: boolean;
  isMegaWin: boolean;
  isJackpot: boolean;
  transactionId: string;
  timestamp: number;
  betAmount: number;
  currency: CurrencyMode;
}

export interface UserWallet {
  GC: number;
  SC: number;
  eligibleSC: number; // SC meeting 1x playthrough for redemption
  unplayedSC: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  vipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  isGuest: boolean;
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'TIER_1_VERIFIED' | 'TIER_2_VERIFIED';
  verifiedAge: boolean;
  jurisdiction: string;
  dailyStreak: number;
  lastDailyClaimDate: string | null;
  totalSpins: number;
  totalWonGC: number;
  totalWonSC: number;
  createdAt: string;
}

export type TransactionType =
  | 'SPIN'
  | 'WIN'
  | 'DAILY_REWARD'
  | 'CHEST_BONUS'
  | 'FREE_SPINS'
  | 'REDEMPTION_HOLD'
  | 'REDEMPTION_REFUND'
  | 'REDEMPTION_PAID'
  | 'GIFT_SENT'
  | 'GIFT_RECEIVED'
  | 'PROMO_GRANT'
  | 'WELCOME_BONUS';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  currency: CurrencyMode;
  amount: number;
  balanceAfter: number;
  timestamp: number;
  description: string;
  referenceId?: string;
}

export type RedemptionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface RedemptionRequest {
  id: string;
  userId: string;
  username: string;
  amountSC: number;
  usdEquivalent: number;
  method: 'BANK_TRANSFER' | 'GIFT_CARD' | 'PAYPAL';
  details: {
    accountNumberMasked?: string;
    routingNumberMasked?: string;
    emailRecipient?: string;
    provider?: string;
  };
  status: RedemptionStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  referenceCode: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'spins' | 'wins' | 'bonus' | 'social';
  currentProgress: number;
  targetProgress: number;
  rewardGC: number;
  rewardSC: number;
  rewardBadge: string;
  isClaimed: boolean;
  isUnlocked: boolean;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  level: number;
  vipTier: string;
  giftAvailable: boolean;
  giftReceived: boolean;
  lastActive: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  vipTier: string;
  badge: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetId?: string;
  details: string;
  ipAddress: string;
}

export interface GameConfiguration {
  targetRTP: number; // e.g. 96.2
  minGCBet: number;
  maxGCBet: number;
  minSCBet: number;
  maxSCBet: number;
  minRedemptionSC: number;
  scUsdRate: number; // 1 SC = 1 USD
  maintenanceMode: boolean;
  sweepstakesEnabled: boolean;
}
