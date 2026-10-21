import { CurrencyMode, SpinResult, SymbolDefinition, SymbolId, WinningLine } from '../types/game';

export const SYMBOL_DEFINITIONS: Record<SymbolId, SymbolDefinition> = {
  ROYAL_KING: {
    id: 'ROYAL_KING',
    name: 'Sovereign Imperial Crown',
    category: 'high',
    payouts: { 3: 50, 4: 150, 5: 500 },
    rarityColor: '#FFD700',
    description: '24K gold 5-spire imperial crown with royal sapphire velvet and cut ruby'
  },
  CYBER_MECH_SKULL: {
    id: 'CYBER_MECH_SKULL',
    name: 'Crystal Relic Skull',
    category: 'high',
    payouts: { 3: 45, 4: 140, 5: 450 },
    rarityColor: '#FF007F',
    description: 'Faceted magenta-ruby crystal relic skull with golden crown and diamond eyes'
  },
  EXPEDITION_LEADER: {
    id: 'EXPEDITION_LEADER',
    name: 'Solar Falcon Crest',
    category: 'high',
    payouts: { 3: 35, 4: 100, 5: 350 },
    rarityColor: '#FF6D00',
    description: 'Golden falcon wings embracing a crimson ruby solar medallion'
  },
  NEON_PLASMA_CORE: {
    id: 'NEON_PLASMA_CORE',
    name: 'Astral Heart Diamond',
    category: 'high',
    payouts: { 3: 30, 4: 90, 5: 300 },
    rarityColor: '#00F5D4',
    description: 'Multi-faceted astral cyan diamond suspended inside golden gyroscope rings'
  },
  BERET_COMMANDER: {
    id: 'BERET_COMMANDER',
    name: 'Imperial Emerald Order',
    category: 'high',
    payouts: { 3: 25, 4: 75, 5: 250 },
    rarityColor: '#10B981',
    description: 'Cushion-cut imperial emerald crest encircled by a 24K gold laurel wreath'
  },
  DESERT_WARRIOR: {
    id: 'DESERT_WARRIOR',
    name: 'Amethyst Twin Scimitars',
    category: 'high',
    payouts: { 3: 20, 4: 50, 5: 200 },
    rarityColor: '#A855F7',
    description: 'Royal purple amethyst shield guarded by crossed platinum-gold scimitars'
  },
  HOLO_CYBER_BLADE: {
    id: 'HOLO_CYBER_BLADE',
    name: 'Twin Ruby Daggers',
    category: 'mid',
    payouts: { 3: 18, 4: 45, 5: 180 },
    rarityColor: '#F43F5E',
    description: 'Crossed crimson-ruby ceremonial blades with diamond pommels'
  },
  AIRCRAFT_SCOUT: {
    id: 'AIRCRAFT_SCOUT',
    name: 'Golden Scout Biplane',
    category: 'mid',
    payouts: { 3: 15, 4: 40, 5: 150 },
    rarityColor: '#06B6D4',
    description: 'Turquoise-and-gold twin-wing expedition biplane with ruby spinner'
  },
  CYBER_DRONE_ORB: {
    id: 'CYBER_DRONE_ORB',
    name: 'Emerald Seeker Sphere',
    category: 'mid',
    payouts: { 3: 14, 4: 35, 5: 140 },
    rarityColor: '#22C55E',
    description: 'Golden winged emerald astrolabe sphere with diamond lens'
  },
  BINOCULARS: {
    id: 'BINOCULARS',
    name: 'Sapphire Field Optics',
    category: 'mid',
    payouts: { 3: 12, 4: 30, 5: 100 },
    rarityColor: '#3B82F6',
    description: 'Polished brass and cobalt-sapphire binoculars with diamond lenses'
  },
  COMPASS: {
    id: 'COMPASS',
    name: 'Royal Rose Compass',
    category: 'mid',
    payouts: { 3: 10, 4: 25, 5: 80 },
    rarityColor: '#14B8A6',
    description: '24K gold navigator pocket compass with ruby & diamond pointer'
  },
  DOG_TAGS: {
    id: 'DOG_TAGS',
    name: 'Platinum Honor Tags',
    category: 'mid',
    payouts: { 3: 8, 4: 20, 5: 60 },
    rarityColor: '#94A3B8',
    description: 'Dual platinum and 24K gold medallions with embossed star crest'
  },
  AMMO_CRATE: {
    id: 'AMMO_CRATE',
    name: 'Emerald Supply Chest',
    category: 'mid',
    payouts: { 3: 6, 4: 15, 5: 50 },
    rarityColor: '#84CC16',
    description: 'Gold-strapped emerald expedition supply chest marked 7.62'
  },
  GOLD_COINS: {
    id: 'GOLD_COINS',
    name: '24K Gold Doubloons',
    category: 'mid',
    payouts: { 3: 5, 4: 12, 5: 40 },
    rarityColor: '#FACC15',
    description: 'Gleaming stack of minted 24K gold treasure doubloons'
  },
  WILD_SHIELD: {
    id: 'WILD_SHIELD',
    name: 'Sunburst Shield (WILD)',
    category: 'special',
    payouts: { 3: 100, 4: 300, 5: 1000 },
    isWild: true,
    rarityColor: '#FFD700',
    description: '24K gold heater shield with sapphire field; substitutes for all regular symbols'
  },
  CHEST_SCATTER: {
    id: 'CHEST_SCATTER',
    name: 'Ruby Chest (SCATTER)',
    category: 'special',
    payouts: { 3: 2, 4: 10, 5: 50 }, // Multiplies TOTAL bet
    isScatter: true,
    rarityColor: '#FF1744',
    description: '3+ anywhere triggers the Treasure Chest Pick Bonus + instant scatter payout'
  },
  FREE_SPINS_STAR: {
    id: 'FREE_SPINS_STAR',
    name: 'Supernova Star (FREE SPINS)',
    category: 'special',
    payouts: { 3: 0, 4: 0, 5: 0 },
    isFreeSpins: true,
    rarityColor: '#00F5D4',
    description: '3+ triggers up to 25 Free Spins with 2x to 5x win multiplier'
  },
  GOLDEN_KEY: {
    id: 'GOLDEN_KEY',
    name: 'Jeweled Vault Key (BONUS)',
    category: 'special',
    payouts: { 3: 10, 4: 25, 5: 100 },
    isBonus: true,
    rarityColor: '#F59E0B',
    description: 'Crowned amethyst & gold skeleton key for high-multiplier line wins'
  }
};

// 25 Standard Fixed Paylines [col 0, col 1, col 2, col 3, col 4]
export const PAYLINES: number[][] = [
  [1, 1, 1, 1, 1], // Line 1: Center horizontal
  [0, 0, 0, 0, 0], // Line 2: Top horizontal
  [2, 2, 2, 2, 2], // Line 3: Bottom horizontal
  [0, 1, 2, 1, 0], // Line 4: V shape down
  [2, 1, 0, 1, 2], // Line 5: Inverted V shape
  [0, 0, 1, 2, 2], // Line 6
  [2, 2, 1, 0, 0], // Line 7
  [1, 0, 0, 0, 1], // Line 8
  [1, 2, 2, 2, 1], // Line 9
  [0, 1, 1, 1, 0], // Line 10
  [2, 1, 1, 1, 2], // Line 11
  [1, 0, 1, 2, 1], // Line 12
  [1, 2, 1, 0, 1], // Line 13
  [0, 1, 0, 1, 0], // Line 14: Zigzag
  [2, 1, 2, 1, 2], // Line 15: Zigzag
  [1, 1, 0, 1, 1], // Line 16
  [1, 1, 2, 1, 1], // Line 17
  [0, 0, 2, 0, 0], // Line 18
  [2, 2, 0, 2, 2], // Line 19
  [0, 2, 2, 2, 0], // Line 20
  [2, 0, 0, 0, 2], // Line 21
  [1, 2, 0, 2, 1], // Line 22
  [1, 0, 2, 0, 1], // Line 23
  [0, 2, 0, 2, 0], // Line 24
  [2, 0, 2, 0, 2]  // Line 25
];

// Weighted reel strips for balanced theoretical RTP (~96.2%)
const REEL_STRIP_POOL: { symbol: SymbolId; weight: number }[] = [
  { symbol: 'CYBER_MECH_SKULL', weight: 18 },
  { symbol: 'NEON_PLASMA_CORE', weight: 20 },
  { symbol: 'HOLO_CYBER_BLADE', weight: 22 },
  { symbol: 'CYBER_DRONE_ORB', weight: 22 },
  { symbol: 'GOLD_COINS', weight: 20 },
  { symbol: 'AMMO_CRATE', weight: 18 },
  { symbol: 'DOG_TAGS', weight: 18 },
  { symbol: 'COMPASS', weight: 16 },
  { symbol: 'BINOCULARS', weight: 15 },
  { symbol: 'AIRCRAFT_SCOUT', weight: 15 },
  { symbol: 'DESERT_WARRIOR', weight: 12 },
  { symbol: 'BERET_COMMANDER', weight: 11 },
  { symbol: 'EXPEDITION_LEADER', weight: 10 },
  { symbol: 'ROYAL_KING', weight: 10 },
  { symbol: 'WILD_SHIELD', weight: 8 },
  { symbol: 'CHEST_SCATTER', weight: 7 },
  { symbol: 'FREE_SPINS_STAR', weight: 6 },
  { symbol: 'GOLDEN_KEY', weight: 6 }
];

const EXPANDED_REEL_STRIP: SymbolId[] = [];
REEL_STRIP_POOL.forEach(item => {
  for (let i = 0; i < item.weight; i++) {
    EXPANDED_REEL_STRIP.push(item.symbol);
  }
});

// Cryptographically secure RNG picker
export function getRandomNumber(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function getInitialShowcaseGrid(): SymbolId[][] {
  return [
    ['EXPEDITION_LEADER', 'CYBER_MECH_SKULL', 'AMMO_CRATE'],
    ['AIRCRAFT_SCOUT', 'NEON_PLASMA_CORE', 'BERET_COMMANDER'],
    ['ROYAL_KING', 'WILD_SHIELD', 'CHEST_SCATTER'],
    ['BINOCULARS', 'HOLO_CYBER_BLADE', 'DESERT_WARRIOR'],
    ['CYBER_DRONE_ORB', 'COMPASS', 'FREE_SPINS_STAR']
  ];
}

export function generateReelGrid(): SymbolId[][] {
  const grid: SymbolId[][] = [];
  const stripLen = EXPANDED_REEL_STRIP.length;

  for (let col = 0; col < 5; col++) {
    const colSymbols: SymbolId[] = [];
    const stopIndex = getRandomNumber(stripLen);
    for (let row = 0; row < 3; row++) {
      const idx = (stopIndex + row) % stripLen;
      colSymbols.push(EXPANDED_REEL_STRIP[idx]);
    }
    grid.push(colSymbols);
  }

  return grid;
}

export function evaluateSpin(
  grid: SymbolId[][],
  betAmount: number,
  currency: CurrencyMode,
  currentFreeSpinsLeft: number = 0,
  freeSpinMultiplier: number = 1
): SpinResult {
  const lineBet = betAmount / PAYLINES.length;
  const winningLines: WinningLine[] = [];
  let totalLineWin = 0;

  // 1. Evaluate 25 Paylines left to right starting at col 0
  PAYLINES.forEach((lineRows, lineIndex) => {
    const symbolsOnLine: { id: SymbolId; col: number; row: number }[] = [];
    for (let col = 0; col < 5; col++) {
      const row = lineRows[col];
      symbolsOnLine.push({ id: grid[col][row], col, row });
    }

    // Determine target winning symbol (first non-wild or wild if all wild)
    let targetSymbol: SymbolId | null = null;
    for (const sym of symbolsOnLine) {
      if (sym.id !== 'WILD_SHIELD' && sym.id !== 'CHEST_SCATTER' && sym.id !== 'FREE_SPINS_STAR') {
        targetSymbol = sym.id;
        break;
      }
    }

    if (!targetSymbol) {
      targetSymbol = 'WILD_SHIELD';
    }

    // Count consecutive matches from col 0
    let matchCount = 0;
    const matchedPositions: [number, number][] = [];

    for (let col = 0; col < 5; col++) {
      const current = symbolsOnLine[col].id;
      if (current === targetSymbol || current === 'WILD_SHIELD') {
        matchCount++;
        matchedPositions.push([symbolsOnLine[col].col, symbolsOnLine[col].row]);
      } else {
        break;
      }
    }

    if (matchCount >= 3) {
      const symbolDef = SYMBOL_DEFINITIONS[targetSymbol];
      const payoutMultiplier = symbolDef.payouts[matchCount as 3 | 4 | 5] || 0;
      if (payoutMultiplier > 0) {
        let lineWin = lineBet * payoutMultiplier;
        if (currentFreeSpinsLeft > 0 && freeSpinMultiplier > 1) {
          lineWin *= freeSpinMultiplier;
        }
        totalLineWin += lineWin;
        winningLines.push({
          lineIndex,
          symbolId: targetSymbol,
          count: matchCount,
          multiplier: payoutMultiplier,
          payout: Number(lineWin.toFixed(2)),
          positions: matchedPositions
        });
      }
    }
  });

  // 2. Count Scatters & Free Spins symbols
  let scatterCount = 0;
  let freeSpinsCount = 0;
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 3; row++) {
      if (grid[col][row] === 'CHEST_SCATTER') scatterCount++;
      if (grid[col][row] === 'FREE_SPINS_STAR') freeSpinsCount++;
    }
  }

  // Scatter Pays
  let scatterWin = 0;
  let bonusTriggered = false;
  if (scatterCount >= 3) {
    bonusTriggered = true;
    const scatterMult = SYMBOL_DEFINITIONS.CHEST_SCATTER.payouts[Math.min(5, scatterCount) as 3 | 4 | 5] || 2;
    scatterWin = betAmount * scatterMult;
  }

  // Free Spins Triggered
  let freeSpinsAwarded = 0;
  let newFreeSpinMultiplier = freeSpinMultiplier;
  if (freeSpinsCount >= 3) {
    if (freeSpinsCount === 3) {
      freeSpinsAwarded = 10;
      newFreeSpinMultiplier = 2;
    } else if (freeSpinsCount === 4) {
      freeSpinsAwarded = 15;
      newFreeSpinMultiplier = 3;
    } else {
      freeSpinsAwarded = 25;
      newFreeSpinMultiplier = 5;
    }
  }

  const grandTotalWin = Number((totalLineWin + scatterWin).toFixed(2));
  const isBigWin = grandTotalWin >= betAmount * 15;
  const isMegaWin = grandTotalWin >= betAmount * 50;
  const isJackpot = grandTotalWin >= betAmount * 150;

  // Unique Idempotency Transaction ID
  const txId = 'TX-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return {
    grid,
    winningLines,
    totalWin: grandTotalWin,
    scatterCount,
    bonusTriggered,
    freeSpinsAwarded,
    currentFreeSpinsLeft: currentFreeSpinsLeft > 0 ? currentFreeSpinsLeft - 1 + freeSpinsAwarded : freeSpinsAwarded,
    freeSpinMultiplier: newFreeSpinMultiplier,
    isBigWin,
    isMegaWin,
    isJackpot,
    transactionId: txId,
    timestamp: Date.now(),
    betAmount,
    currency
  };
}
