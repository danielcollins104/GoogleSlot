import React from 'react';
import { SymbolId } from '../../types/game';

interface SymbolIconProps {
  symbolId: SymbolId;
  isWinning?: boolean;
  className?: string;
}

/**
 * Research-Backed Chromatic & Tier Metadata
 * - Tier 1 (Special): Imperial Gold + High-Arousal Ruby/Cyan/Magenta + Starburst Frame
 * - Tier 2 (High-Pay): Distinct Single-Hue Saturated Luxury Palette + Ornate 24K Gold Arch
 * - Tier 3 (Mid-Pay): Cool Flow-State Jewel Palette + Clean Beveled Octagon Medallion
 */
export interface SymbolVisualTheme {
  tier: 'special' | 'high' | 'mid';
  primaryColor: string;
  secondaryColor: string;
  glowHex: string;
  bgRadial: string;
  frameType: 'starburst' | 'imperial_arch' | 'jewel_octagon';
  badgeText?: string;
  badgeGradient?: string;
}

export const SYMBOL_VISUAL_THEMES: Record<SymbolId, SymbolVisualTheme> = {
  // === TIER 1: SPECIAL DOPAMINE TRIGGERS ===
  WILD_SHIELD: {
    tier: 'special',
    primaryColor: '#FFD700',
    secondaryColor: '#00F5D4',
    glowHex: '#FFD700',
    bgRadial: 'radial-gradient(circle at 50% 42%, rgba(255, 215, 0, 0.42) 0%, rgba(30, 64, 175, 0.35) 55%, rgba(6, 10, 24, 0.96) 100%)',
    frameType: 'starburst',
    badgeText: 'WILD',
    badgeGradient: 'linear-gradient(180deg, #FFF3B0 0%, #FFD700 45%, #D97706 100%)'
  },
  CHEST_SCATTER: {
    tier: 'special',
    primaryColor: '#FF1744',
    secondaryColor: '#FFD700',
    glowHex: '#FF1744',
    bgRadial: 'radial-gradient(circle at 50% 42%, rgba(255, 23, 68, 0.45) 0%, rgba(180, 83, 9, 0.32) 55%, rgba(6, 10, 24, 0.96) 100%)',
    frameType: 'starburst',
    badgeText: 'SCATTER',
    badgeGradient: 'linear-gradient(180deg, #FF8A80 0%, #FF1744 50%, #990024 100%)'
  },
  FREE_SPINS_STAR: {
    tier: 'special',
    primaryColor: '#00F5D4',
    secondaryColor: '#FFD700',
    glowHex: '#00F5D4',
    bgRadial: 'radial-gradient(circle at 50% 42%, rgba(0, 245, 212, 0.45) 0%, rgba(59, 130, 246, 0.32) 55%, rgba(6, 10, 24, 0.96) 100%)',
    frameType: 'starburst',
    badgeText: 'FREE SPINS',
    badgeGradient: 'linear-gradient(180deg, #A7F3D0 0%, #00F5D4 50%, #0284C7 100%)'
  },
  GOLDEN_KEY: {
    tier: 'special',
    primaryColor: '#F59E0B',
    secondaryColor: '#A855F7',
    glowHex: '#FBBF24',
    bgRadial: 'radial-gradient(circle at 50% 42%, rgba(251, 191, 36, 0.42) 0%, rgba(147, 51, 234, 0.32) 55%, rgba(6, 10, 24, 0.96) 100%)',
    frameType: 'starburst',
    badgeText: 'BONUS KEY',
    badgeGradient: 'linear-gradient(180deg, #FDE68A 0%, #F59E0B 50%, #7E22CE 100%)'
  },

  // === TIER 2: HIGH-VALUE SOVEREIGN & RELIC SYMBOLS (Warm Luxury & Royal Saturation) ===
  ROYAL_KING: {
    tier: 'high',
    primaryColor: '#FFD700',
    secondaryColor: '#2563EB',
    glowHex: '#FBBF24',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(251, 191, 36, 0.36) 0%, rgba(29, 78, 216, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },
  CYBER_MECH_SKULL: {
    tier: 'high',
    primaryColor: '#FF007F',
    secondaryColor: '#00F5D4',
    glowHex: '#FF007F',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(255, 0, 127, 0.36) 0%, rgba(114, 9, 183, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },
  EXPEDITION_LEADER: {
    tier: 'high',
    primaryColor: '#FF5400',
    secondaryColor: '#FFD700',
    glowHex: '#FF6D00',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(255, 109, 0, 0.36) 0%, rgba(180, 83, 9, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },
  NEON_PLASMA_CORE: {
    tier: 'high',
    primaryColor: '#00F5D4',
    secondaryColor: '#3B82F6',
    glowHex: '#00F5D4',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(0, 245, 212, 0.36) 0%, rgba(37, 99, 235, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },
  BERET_COMMANDER: {
    tier: 'high',
    primaryColor: '#10B981',
    secondaryColor: '#FFD700',
    glowHex: '#10B981',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(16, 185, 129, 0.36) 0%, rgba(6, 95, 70, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },
  DESERT_WARRIOR: {
    tier: 'high',
    primaryColor: '#A855F7',
    secondaryColor: '#FFD700',
    glowHex: '#A855F7',
    bgRadial: 'radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.36) 0%, rgba(88, 28, 135, 0.28) 55%, rgba(7, 11, 25, 0.95) 100%)',
    frameType: 'imperial_arch'
  },

  // === TIER 3: MID-VALUE FLOW-STATE ARTIFACTS & GEMS (Crisp Silhouette, Calm Jewel Backings) ===
  HOLO_CYBER_BLADE: {
    tier: 'mid',
    primaryColor: '#F43F5E',
    secondaryColor: '#38BDF8',
    glowHex: '#F43F5E',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.24) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  AIRCRAFT_SCOUT: {
    tier: 'mid',
    primaryColor: '#06B6D4',
    secondaryColor: '#FBBF24',
    glowHex: '#06B6D4',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.24) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  CYBER_DRONE_ORB: {
    tier: 'mid',
    primaryColor: '#22C55E',
    secondaryColor: '#00F5D4',
    glowHex: '#22C55E',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.24) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  BINOCULARS: {
    tier: 'mid',
    primaryColor: '#3B82F6',
    secondaryColor: '#FBBF24',
    glowHex: '#3B82F6',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.24) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  COMPASS: {
    tier: 'mid',
    primaryColor: '#14B8A6',
    secondaryColor: '#F59E0B',
    glowHex: '#14B8A6',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.24) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  DOG_TAGS: {
    tier: 'mid',
    primaryColor: '#94A3B8',
    secondaryColor: '#FBBF24',
    glowHex: '#60A5FA',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.22) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  AMMO_CRATE: {
    tier: 'mid',
    primaryColor: '#84CC16',
    secondaryColor: '#F59E0B',
    glowHex: '#84CC16',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.22) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  },
  GOLD_COINS: {
    tier: 'mid',
    primaryColor: '#FACC15',
    secondaryColor: '#EA580C',
    glowHex: '#FACC15',
    bgRadial: 'radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.26) 0%, rgba(9, 13, 28, 0.95) 85%)',
    frameType: 'jewel_octagon'
  }
};

export const SymbolIcon: React.FC<SymbolIconProps> = ({
  symbolId,
  isWinning = false,
  className = ''
}) => {
  const theme = SYMBOL_VISUAL_THEMES[symbolId] || SYMBOL_VISUAL_THEMES.GOLD_COINS;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center p-0.5 select-none transition-transform duration-300 ${
        isWinning ? 'scale-108 z-20' : 'hover:scale-103'
      } ${className}`}
    >
      {/* 1. Ambient Color-Psychology Radial Stage Backlight */}
      <div
        className="absolute inset-0.5 rounded-md pointer-events-none transition-opacity duration-300"
        style={{
          background: theme.bgRadial,
          boxShadow: isWinning
            ? `inset 0 0 18px ${theme.glowHex}88`
            : `inset 0 0 10px ${theme.glowHex}22`
        }}
      />

      {/* 2. Bespoke Multi-Layered 3D Shaded Casino Artwork */}
      <svg
        viewBox="0 0 200 200"
        className="relative z-10 w-full h-full overflow-visible drop-shadow-[0_6px_8px_rgba(0,0,0,0.85)]"
      >
        <defs>
          {/* 24K Imperial Gold Metallic Gradient */}
          <linearGradient id="metalGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="22%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="78%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Deep Burnished Bronze-Gold Shadow Gradient */}
          <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Platinum Chrome Gradient */}
          <linearGradient id="platinumMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="65%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>

          {/* Crimson Ruby Gem Gradient */}
          <linearGradient id="rubyGem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCDD2" />
            <stop offset="25%" stopColor="#FF1744" />
            <stop offset="65%" stopColor="#B71C1C" />
            <stop offset="100%" stopColor="#4A0404" />
          </linearGradient>

          {/* Royal Sapphire Gem Gradient */}
          <linearGradient id="sapphireGem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="25%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Imperial Emerald Gem Gradient */}
          <linearGradient id="emeraldGem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="25%" stopColor="#10B981" />
            <stop offset="65%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          {/* Sovereign Amethyst Gem Gradient */}
          <linearGradient id="amethystGem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="25%" stopColor="#C084FC" />
            <stop offset="65%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>

          {/* Cyber Magenta-Rose Gem Gradient */}
          <linearGradient id="magentaGem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="25%" stopColor="#FF007F" />
            <stop offset="65%" stopColor="#9D174D" />
            <stop offset="100%" stopColor="#4C0519" />
          </linearGradient>

          {/* Astral Cyan-Diamond Gradient */}
          <linearGradient id="cyanDiamond" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="28%" stopColor="#67E8F9" />
            <stop offset="65%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#083344" />
          </linearGradient>

          {/* Solar Flame Orange Gradient */}
          <linearGradient id="solarOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="30%" stopColor="#FF6D00" />
            <stop offset="70%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>
        </defs>

        {/* === TIER-CODED BACKGROUND MEDALLION / ARCH PEDESTAL === */}
        {theme.frameType === 'starburst' && (
          <g>
            {/* Outer 8-Point Golden Starburst Halo for Special Triggers */}
            <polygon
              points="100,8 122,42 162,28 148,68 188,92 148,116 162,156 122,142 100,176 78,142 38,156 52,116 12,92 52,68 38,28 78,42"
              fill="url(#metalGold)"
              stroke="#FFFBEB"
              strokeWidth="2"
              opacity="0.92"
            />
            <circle cx="100" cy="92" r="64" fill="#090D1C" stroke="url(#metalGold)" strokeWidth="6" />
            <circle cx="100" cy="92" r="56" fill="none" stroke={theme.primaryColor} strokeWidth="2.5" strokeDasharray="6 4" />
          </g>
        )}

        {theme.frameType === 'imperial_arch' && (
          <g>
            {/* Ornate 24K Gold Rounded Arch Pedestal for High-Value Characters/Relics */}
            <rect
              x="22"
              y="18"
              width="156"
              height="156"
              rx="36"
              fill="url(#darkGold)"
              stroke="url(#metalGold)"
              strokeWidth="6"
            />
            <rect
              x="30"
              y="26"
              width="140"
              height="140"
              rx="28"
              fill="#0A0F24"
              stroke={theme.primaryColor}
              strokeWidth="2.5"
            />
            {/* 4 Corner Faceted Gold Rivets */}
            <circle cx="38" cy="34" r="4.5" fill="url(#metalGold)" />
            <circle cx="162" cy="34" r="4.5" fill="url(#metalGold)" />
            <circle cx="38" cy="158" r="4.5" fill="url(#metalGold)" />
            <circle cx="162" cy="158" r="4.5" fill="url(#metalGold)" />
          </g>
        )}

        {theme.frameType === 'jewel_octagon' && (
          <g>
            {/* Clean Beveled Octagon Medallion for Mid-Value Symbols */}
            <polygon
              points="64,22 136,22 178,64 178,136 136,178 64,178 22,136 22,64"
              fill="#0B1124"
              stroke="url(#metalGold)"
              strokeWidth="4.5"
            />
            <polygon
              points="68,29 132,29 171,68 171,132 132,171 68,171 29,132 29,68"
              fill="none"
              stroke={theme.primaryColor}
              strokeWidth="2"
              opacity="0.75"
            />
          </g>
        )}

        {/* === BESPOKE MULTI-LAYERED 3D SYMBOL ILLUSTRATIONS === */}
        {renderSymbolArtwork(symbolId)}

        {/* === HIGH-CONTRAST TIER 1 RIBBON BANNER (WILD / SCATTER / FREE SPINS / BONUS) === */}
        {theme.badgeText && (
          <g transform="translate(0, 4)">
            {/* Deep Drop Shadow */}
            <rect x="24" y="150" width="152" height="34" rx="10" fill="#020617" opacity="0.95" />
            {/* Gold Beveled Plaque */}
            <rect
              x="24"
              y="146"
              width="152"
              height="32"
              rx="10"
              fill="#0F172A"
              stroke="url(#metalGold)"
              strokeWidth="3.5"
            />
            <rect
              x="28"
              y="150"
              width="144"
              height="24"
              rx="7"
              fill={theme.primaryColor}
              opacity="0.25"
            />
            <text
              x="100"
              y="168"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={theme.badgeText.length > 7 ? '16' : '19'}
              fontWeight="900"
              fontFamily="Cinzel, serif"
              letterSpacing="1.5"
              style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.95))' }}
            >
              {theme.badgeText}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

function renderSymbolArtwork(symbolId: SymbolId): React.ReactNode {
  switch (symbolId) {
    // 1. WILD SHIELD: 24K Gold Imperial Heater Shield + Royal Sapphire Core + Diamond Star
    case 'WILD_SHIELD':
      return (
        <g>
          {/* Outer Gold Shield Body */}
          <path
            d="M100,24 L154,44 V90 C154,126 128,150 100,164 C72,150 46,126 46,90 V44 Z"
            fill="url(#metalGold)"
            stroke="#FFFDE7"
            strokeWidth="3"
          />
          {/* Inner Sapphire Enamel Field */}
          <path
            d="M100,34 L144,50 V88 C144,118 122,139 100,151 C78,139 56,118 56,88 V50 Z"
            fill="url(#sapphireGem)"
            stroke="url(#metalGold)"
            strokeWidth="2.5"
          />
          {/* Faceted Central 5-Point Golden Star */}
          <polygon
            points="100,46 112,73 141,76 119,95 125,124 100,109 75,124 81,95 59,76 88,73"
            fill="url(#metalGold)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Center Cut Cyan Diamond */}
          <polygon points="100,74 111,88 100,102 89,88" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Specular Shine */}
          <path d="M62,54 L96,40 L96,65 L62,78 Z" fill="#FFFFFF" opacity="0.22" />
        </g>
      );

    // 2. CHEST SCATTER: Overflowing Ruby & Gold Treasure Chest with Radiant Jewels
    case 'CHEST_SCATTER':
      return (
        <g>
          {/* Radiant Golden Light Burst From Open Lid */}
          <ellipse cx="100" cy="78" rx="52" ry="30" fill="#FEF08A" opacity="0.45" />
          {/* Domed Open Treasure Lid (Crimson Ruby & Gold Bands) */}
          <path
            d="M46,74 C46,42 154,42 154,74 Z"
            fill="url(#rubyGem)"
            stroke="url(#metalGold)"
            strokeWidth="4"
          />
          <path d="M78,49 V74 M122,49 V74" stroke="url(#metalGold)" strokeWidth="5" />
          {/* Overflowing Gold Coins & Cut Gems Pile */}
          <circle cx="72" cy="78" r="11" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="90" cy="72" r="12" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="112" cy="73" r="12" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="128" cy="79" r="10" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          {/* Sparkling Cyan Diamond & Emerald in Treasure Pile */}
          <polygon points="100,56 112,70 100,84 88,70" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="78,66 87,76 78,86 69,76" fill="url(#emeraldGem)" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="122,66 131,76 122,86 113,76" fill="url(#magentaGem)" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Lower Chest Box */}
          <polygon
            points="44,82 156,82 146,138 54,138"
            fill="url(#rubyGem)"
            stroke="url(#metalGold)"
            strokeWidth="4"
          />
          {/* Ornate Gold Lock Plate */}
          <polygon points="88,82 112,82 108,116 92,116" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="100" cy="96" r="4.5" fill="#090D1C" />
        </g>
      );

    // 3. FREE SPINS STAR: 8-Point Celestial Diamond & Gold Supernova Star
    case 'FREE_SPINS_STAR':
      return (
        <g>
          {/* Outer Glowing Cyan Energy Ring */}
          <circle cx="100" cy="90" r="50" fill="none" stroke="#00F5D4" strokeWidth="3.5" opacity="0.85" />
          {/* 4 Secondary Gold Compass Points */}
          <polygon
            points="100,26 114,76 164,90 114,104 100,154 86,104 36,90 86,76"
            fill="url(#metalGold)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* 4 Diagonal Cyan Diamond Points */}
          <polygon
            points="54,44 92,76 146,44 114,90 146,136 92,104 54,136 86,90"
            fill="url(#cyanDiamond)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Central Faceted Sunburst Jewel */}
          <circle cx="100" cy="90" r="20" fill="url(#metalGold)" stroke="#FFFFFF" strokeWidth="2.5" />
          <polygon points="100,74 114,90 100,106 86,90" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      );

    // 4. GOLDEN KEY: Royal Jeweled Master Vault Key
    case 'GOLDEN_KEY':
      return (
        <g transform="rotate(-35 100 92)">
          {/* Key Shaft */}
          <rect x="93" y="72" width="14" height="76" rx="5" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2" />
          {/* Key Teeth */}
          <path
            d="M107,114 H128 V124 H116 V132 H130 V144 H107 Z"
            fill="url(#metalGold)"
            stroke="#FFFDE7"
            strokeWidth="2"
          />
          {/* Ornate Crowned Key Bow (Top Handle) */}
          <circle cx="100" cy="56" r="26" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="3" />
          <circle cx="100" cy="56" r="16" fill="url(#amethystGem)" stroke="#FFFFFF" strokeWidth="2" />
          {/* Faceted Center Diamond */}
          <polygon points="100,44 110,56 100,68 90,56" fill="#F3E8FF" opacity="0.85" />
          {/* Collar Rings */}
          <rect x="88" y="82" width="24" height="7" rx="3" fill="url(#rubyGem)" stroke="#FFF" strokeWidth="1.5" />
        </g>
      );

    // 5. ROYAL KING: Sovereign Golden Crown with Sapphire Stripes & Cut Ruby Center
    case 'ROYAL_KING':
      return (
        <g>
          {/* Radiant Sun Halo Behind Crown */}
          <circle cx="100" cy="100" r="52" fill="url(#sapphireGem)" opacity="0.45" />
          {/* Velvet Royal Blue Cushion Inside Crown */}
          <path d="M46,118 C46,68 154,68 154,118 Z" fill="url(#sapphireGem)" stroke="url(#metalGold)" strokeWidth="3" />
          {/* 5-Spire Sculpted 24K Gold Imperial Crown */}
          <polygon
            points="42,126 36,68 68,94 100,44 132,94 164,68 158,126"
            fill="url(#metalGold)"
            stroke="#FFFDE7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Crown Spire Pearls */}
          <circle cx="36" cy="62" r="6" fill="url(#cyanDiamond)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="100" cy="38" r="8" fill="url(#rubyGem)" stroke="#FFF" strokeWidth="2" />
          <circle cx="164" cy="62" r="6" fill="url(#cyanDiamond)" stroke="#FFF" strokeWidth="1.5" />
          {/* Jeweled Crown Base Band */}
          <rect x="40" y="122" width="120" height="24" rx="8" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2.5" />
          <rect x="46" y="127" width="108" height="14" rx="4" fill="#451A03" opacity="0.45" />
          {/* Center Cut Ruby & Side Emeralds */}
          <polygon points="100,76 113,96 100,116 87,96" fill="url(#rubyGem)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="64" cy="134" r="5.5" fill="url(#emeraldGem)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="100" cy="134" r="6.5" fill="url(#rubyGem)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="136" cy="134" r="5.5" fill="url(#emeraldGem)" stroke="#FFF" strokeWidth="1.5" />
        </g>
      );

    // 6. CYBER MECH SKULL: Faceted Crystal-Magenta & Gold Relic Skull
    case 'CYBER_MECH_SKULL':
      return (
        <g>
          {/* Glowing Cyan Cyber Halo */}
          <circle cx="100" cy="96" r="50" fill="none" stroke="#00F5D4" strokeWidth="2.5" strokeDasharray="8 5" />
          {/* Cranium Dome (Faceted Magenta & Gold Armor) */}
          <path
            d="M56,92 C56,50 144,50 144,92 C144,108 136,118 128,124 L124,148 H76 L72,124 C64,118 56,108 56,92 Z"
            fill="url(#magentaGem)"
            stroke="url(#metalGold)"
            strokeWidth="4"
          />
          {/* Golden Forehead Crown Plate */}
          <polygon points="74,58 126,58 116,82 84,82" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <polygon points="100,62 108,72 100,80 92,72" fill="url(#cyanDiamond)" />
          {/* Glowing Electric Cyan Ocular Sockets */}
          <polygon points="68,94 92,90 90,110 70,108" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="132,94 108,90 110,110 130,108" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="2" />
          {/* Nasal Cavity */}
          <polygon points="100,104 107,120 93,120" fill="#090D1C" stroke="url(#metalGold)" strokeWidth="1.5" />
          {/* Golden Cyber Jaw Grill */}
          <line x1="84" y1="128" x2="84" y2="146" stroke="url(#metalGold)" strokeWidth="4" />
          <line x1="95" y1="128" x2="95" y2="146" stroke="url(#metalGold)" strokeWidth="4" />
          <line x1="105" y1="128" x2="105" y2="146" stroke="url(#metalGold)" strokeWidth="4" />
          <line x1="116" y1="128" x2="116" y2="146" stroke="url(#metalGold)" strokeWidth="4" />
        </g>
      );

    // 7. EXPEDITION LEADER: Solar Flame Golden Falcon & Explorer Medallion
    case 'EXPEDITION_LEADER':
      return (
        <g>
          {/* Outstretched Golden Falcon Wings */}
          <path
            d="M36,72 C56,70 72,82 100,88 C128,82 144,70 164,72 C156,104 134,126 100,136 C66,126 44,104 36,72 Z"
            fill="url(#solarOrange)"
            stroke="url(#metalGold)"
            strokeWidth="3.5"
          />
          <path
            d="M46,88 C64,88 78,96 100,102 C122,96 136,88 154,88 C144,114 124,132 100,142 C76,132 56,114 46,88 Z"
            fill="url(#metalGold)"
            stroke="#FFFDE7"
            strokeWidth="2"
          />
          {/* Central Solar Scarab / Explorer Shield */}
          <circle cx="100" cy="96" r="28" fill="url(#rubyGem)" stroke="url(#metalGold)" strokeWidth="4" />
          {/* 8-Point Golden Star Crest */}
          <polygon
            points="100,70 107,88 126,96 107,104 100,122 93,104 74,96 93,88"
            fill="url(#metalGold)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle cx="100" cy="96" r="7" fill="url(#cyanDiamond)" stroke="#FFF" strokeWidth="1.5" />
        </g>
      );

    // 8. NEON PLASMA CORE: Astral Cut Diamond Inside Golden Gyroscope Rings
    case 'NEON_PLASMA_CORE':
      return (
        <g>
          {/* Outer Golden Gyroscopic Ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="58"
            ry="26"
            transform="rotate(-30 100 100)"
            fill="none"
            stroke="url(#metalGold)"
            strokeWidth="5"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="58"
            ry="26"
            transform="rotate(30 100 100)"
            fill="none"
            stroke="#00F5D4"
            strokeWidth="3.5"
          />
          {/* Multi-Faceted Giant Astral Cyan Diamond */}
          <polygon
            points="72,68 128,68 148,94 100,148 52,94"
            fill="url(#cyanDiamond)"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Inner Diamond Facet Lines */}
          <polyline
            points="52,94 148,94 M72,68 86,94 100,148 114,94 128,68 M86,94 100,68 114,94"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            opacity="0.85"
          />
          {/* Top Table Highlight */}
          <polygon points="76,71 124,71 112,91 88,91" fill="#FFFFFF" opacity="0.45" />
        </g>
      );

    // 9. BERET COMMANDER: Imperial Emerald & Gold Sovereign Order Crest
    case 'BERET_COMMANDER':
      return (
        <g>
          {/* Golden Laurel Wreath Base */}
          <circle cx="100" cy="100" r="52" fill="none" stroke="url(#metalGold)" strokeWidth="7" strokeDasharray="14 6" />
          {/* Emerald Cushion Octagon */}
          <polygon
            points="74,46 126,46 154,74 154,126 126,154 74,154 46,126 46,74"
            fill="url(#emeraldGem)"
            stroke="url(#metalGold)"
            strokeWidth="4"
          />
          {/* Inner Facet Frame */}
          <polygon
            points="80,56 120,56 144,80 144,120 120,144 80,144 56,120 56,80"
            fill="none"
            stroke="#A7F3D0"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* Central Sculpted Gold Command Star */}
          <polygon
            points="100,60 111,85 138,88 118,106 123,133 100,119 77,133 82,106 62,88 89,85"
            fill="url(#metalGold)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="9" fill="url(#emeraldGem)" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      );

    // 10. DESERT WARRIOR: Royal Amethyst Shield & Crossed Golden Scimitars
    case 'DESERT_WARRIOR':
      return (
        <g>
          {/* Crossed Curved Golden Scimitar Blades */}
          <path
            d="M42,144 C50,96 96,54 154,42 C136,74 102,108 56,152 Z"
            fill="url(#platinumMetal)"
            stroke="url(#metalGold)"
            strokeWidth="3"
          />
          <path
            d="M158,144 C150,96 104,54 46,42 C64,74 98,108 144,152 Z"
            fill="url(#platinumMetal)"
            stroke="url(#metalGold)"
            strokeWidth="3"
          />
          {/* Central Royal Amethyst Gem Shield */}
          <polygon
            points="100,52 138,76 126,132 100,152 74,132 62,76"
            fill="url(#amethystGem)"
            stroke="url(#metalGold)"
            strokeWidth="4"
          />
          {/* Inner Amethyst Cut Facets */}
          <polygon
            points="100,66 122,82 114,122 100,136 86,122 78,82"
            fill="#D8B4FE"
            opacity="0.3"
          />
          <polygon points="100,78 112,100 100,122 88,100" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
        </g>
      );

    // 11. HOLO CYBER BLADE: Twin Ruby-Plasma Energy Daggers
    case 'HOLO_CYBER_BLADE':
      return (
        <g>
          {/* Left-to-Right Blade */}
          <g transform="rotate(42 100 100)">
            <polygon points="100,32 113,108 87,108" fill="url(#rubyGem)" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="100" y1="36" x2="100" y2="106" stroke="#FFE4E6" strokeWidth="2.5" />
            <rect x="78" y="108" width="44" height="10" rx="4" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
            <rect x="94" y="118" width="12" height="26" rx="3" fill="url(#darkGold)" stroke="url(#metalGold)" strokeWidth="2" />
            <circle cx="100" cy="148" r="8" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="2" />
          </g>
          {/* Right-to-Left Blade */}
          <g transform="rotate(-42 100 100)">
            <polygon points="100,32 113,108 87,108" fill="url(#rubyGem)" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="100" y1="36" x2="100" y2="106" stroke="#FFE4E6" strokeWidth="2.5" />
            <rect x="78" y="108" width="44" height="10" rx="4" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
            <rect x="94" y="118" width="12" height="26" rx="3" fill="url(#darkGold)" stroke="url(#metalGold)" strokeWidth="2" />
            <circle cx="100" cy="148" r="8" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="2" />
          </g>
          {/* Center Clash Spark */}
          <circle cx="100" cy="96" r="10" fill="url(#metalGold)" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      );

    // 12. AIRCRAFT SCOUT: Turquoise & Gold Expedition Twin-Wing Biplane
    case 'AIRCRAFT_SCOUT':
      return (
        <g>
          {/* Upper Wing */}
          <rect x="36" y="64" width="128" height="20" rx="10" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="3" />
          {/* Lower Wing */}
          <rect x="46" y="108" width="108" height="16" rx="8" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="2.5" />
          {/* Wing Struts */}
          <line x1="64" y1="84" x2="64" y2="108" stroke="url(#metalGold)" strokeWidth="4" />
          <line x1="136" y1="84" x2="136" y2="108" stroke="url(#metalGold)" strokeWidth="4" />
          {/* Fuselage Body */}
          <path d="M84,52 C84,42 116,42 116,52 L112,142 C112,150 88,150 88,142 Z" fill="url(#metalGold)" stroke="#FFF" strokeWidth="2" />
          {/* Cockpit Glass */}
          <ellipse cx="100" cy="88" rx="10" ry="14" fill="url(#sapphireGem)" stroke="#FFFFFF" strokeWidth="2" />
          {/* Spinning Golden Propeller Blur + Hub */}
          <ellipse cx="100" cy="96" rx="38" ry="6" fill="#FFFFFF" opacity="0.45" />
          <circle cx="100" cy="96" r="8" fill="url(#rubyGem)" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      );

    // 13. CYBER DRONE ORB: Emerald & Gold Autonomous Seeker Sphere
    case 'CYBER_DRONE_ORB':
      return (
        <g>
          {/* Outer Tech Wings */}
          <path d="M34,86 L58,72 V128 L34,114 Z" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <path d="M166,86 L142,72 V128 L166,114 Z" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          {/* Main Spherical Core */}
          <circle cx="100" cy="100" r="42" fill="url(#emeraldGem)" stroke="url(#metalGold)" strokeWidth="4.5" />
          {/* Equator Gold Band */}
          <path d="M58,100 Q100,114 142,100" fill="none" stroke="url(#metalGold)" strokeWidth="4" />
          {/* Glowing Central Laser Eye */}
          <circle cx="100" cy="96" r="18" fill="#022C22" stroke="url(#metalGold)" strokeWidth="3" />
          <circle cx="100" cy="96" r="11" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="96" cy="92" r="3.5" fill="#FFFFFF" />
        </g>
      );

    // 14. BINOCULARS: Polished Brass & Sapphire Field Optics
    case 'BINOCULARS':
      return (
        <g>
          {/* Center Hinge Bridge */}
          <rect x="82" y="72" width="36" height="14" rx="4" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <rect x="86" y="102" width="28" height="10" rx="3" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="100" cy="79" r="6" fill="url(#rubyGem)" stroke="#FFF" strokeWidth="1.5" />
          {/* Left Barrel */}
          <polygon points="56,52 84,52 88,128 48,128" fill="url(#sapphireGem)" stroke="url(#metalGold)" strokeWidth="3.5" />
          {/* Right Barrel */}
          <polygon points="116,52 144,52 152,128 112,128" fill="url(#sapphireGem)" stroke="url(#metalGold)" strokeWidth="3.5" />
          {/* Glowing Cyan-Blue Objective Lenses */}
          <ellipse cx="68" cy="130" rx="20" ry="12" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="3.5" />
          <ellipse cx="132" cy="130" rx="20" ry="12" fill="url(#cyanDiamond)" stroke="url(#metalGold)" strokeWidth="3.5" />
          {/* Lens Glint */}
          <ellipse cx="62" cy="127" rx="7" ry="4" fill="#FFFFFF" opacity="0.75" />
          <ellipse cx="126" cy="127" rx="7" ry="4" fill="#FFFFFF" opacity="0.75" />
        </g>
      );

    // 15. COMPASS: Antique Gold & Turquoise Navigator's Compass
    case 'COMPASS':
      return (
        <g>
          {/* Top Ring Bow */}
          <circle cx="100" cy="36" r="10" fill="none" stroke="url(#metalGold)" strokeWidth="4.5" />
          {/* Outer Gold Casing */}
          <circle cx="100" cy="104" r="52" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="3" />
          {/* Inner Midnight Dial */}
          <circle cx="100" cy="104" r="42" fill="#06142E" stroke="#00F5D4" strokeWidth="2.5" />
          {/* 4-Point Compass Rose */}
          <polygon points="100,64 110,94 140,104 110,114 100,144 90,114 60,104 90,94" fill="url(#metalGold)" />
          {/* North Crimson Pointer & South Cyan Pointer */}
          <polygon points="100,62 109,104 91,104" fill="url(#rubyGem)" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="100,146 109,104 91,104" fill="url(#cyanDiamond)" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="100" cy="104" r="6" fill="url(#metalGold)" stroke="#FFF" strokeWidth="1.5" />
        </g>
      );

    // 16. DOG TAGS: Twin Platinum & Gold Embossed Honor Medallions
    case 'DOG_TAGS':
      return (
        <g>
          {/* Back Gold Tag */}
          <g transform="rotate(14 112 102)">
            <rect x="78" y="56" width="64" height="92" rx="18" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2.5" />
          </g>
          {/* Front Platinum & Sapphire Tag */}
          <g transform="rotate(-10 88 102)">
            <rect x="56" y="54" width="68" height="96" rx="18" fill="url(#platinumMetal)" stroke="url(#metalGold)" strokeWidth="3.5" />
            <rect x="64" y="64" width="52" height="76" rx="12" fill="url(#sapphireGem)" />
            {/* Embossed Gold Star */}
            <polygon
              points="90,80 96,94 112,96 100,107 103,122 90,114 77,122 80,107 68,96 84,94"
              fill="url(#metalGold)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <circle cx="90" cy="64" r="4" fill="#090D1C" stroke="url(#metalGold)" strokeWidth="2" />
          </g>
        </g>
      );

    // 17. AMMO CRATE: Emerald & Gold Reinforced Expedition Supply Chest (7.62)
    case 'AMMO_CRATE':
      return (
        <g>
          {/* Crate Lid */}
          <rect x="40" y="56" width="120" height="22" rx="6" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2" />
          {/* Main Armored Emerald Box */}
          <rect x="44" y="78" width="112" height="68" rx="8" fill="url(#emeraldGem)" stroke="url(#metalGold)" strokeWidth="4" />
          {/* Diagonal Gold Reinforcement Straps */}
          <line x1="56" y1="78" x2="56" y2="146" stroke="url(#metalGold)" strokeWidth="5" />
          <line x1="144" y1="78" x2="144" y2="146" stroke="url(#metalGold)" strokeWidth="5" />
          {/* Center Stencil Plaque */}
          <rect x="66" y="94" width="68" height="36" rx="6" fill="#022C22" stroke="url(#metalGold)" strokeWidth="2.5" />
          <text
            x="100"
            y="119"
            textAnchor="middle"
            fill="#FEF08A"
            fontSize="24"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
          >
            7.62
          </text>
        </g>
      );

    // 18. GOLD COINS: Gleaming Stack of 24K Gold Bullion Doubloons
    case 'GOLD_COINS':
    default:
      return (
        <g>
          {/* Bottom Coin */}
          <ellipse cx="86" cy="134" rx="38" ry="18" fill="url(#darkGold)" stroke="url(#metalGold)" strokeWidth="3" />
          <ellipse cx="86" cy="126" rx="38" ry="18" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2.5" />
          {/* Middle Coin */}
          <ellipse cx="114" cy="110" rx="38" ry="18" fill="url(#darkGold)" stroke="url(#metalGold)" strokeWidth="3" />
          <ellipse cx="114" cy="102" rx="38" ry="18" fill="url(#metalGold)" stroke="#FFFDE7" strokeWidth="2.5" />
          {/* Top Standing Hero Doubloon */}
          <circle cx="94" cy="78" r="36" fill="url(#metalGold)" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="94" cy="78" r="27" fill="none" stroke="#B45309" strokeWidth="2.5" strokeDasharray="5 3" />
          {/* Crown Emblem Inside Coin */}
          <polygon
            points="94,56 101,71 117,73 105,84 108,100 94,92 80,100 83,84 71,73 87,71"
            fill="#FFFBEB"
            stroke="#B45309"
            strokeWidth="1.5"
          />
        </g>
      );
  }
}
