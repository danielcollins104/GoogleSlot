import React, { useState, useEffect } from 'react';
import { CurrencyMode, SymbolId, WinningLine } from '../types/game';
import { ReelColumn } from './ReelColumn';
import { ControlPanel } from './ControlPanel';
import { PaylinesOverlay } from './PaylinesOverlay';
import { Sparkles, Flame, Eye, Info, X } from 'lucide-react';

interface SlotCabinetProps {
  grid: SymbolId[][]; // 5 columns x 3 rows
  isSpinning: boolean;
  onReelStop: (colIndex: number) => void;
  winningLines: WinningLine[];
  balance: number;
  bet: number;
  win: number;
  currency: CurrencyMode;
  isAutoplay: boolean;
  autoplayCount: number;
  isMuted: boolean;
  isTurbo?: boolean;
  freeSpinsLeft: number;
  freeSpinMultiplier: number;
  onSpin: () => void;
  onBetChange: (delta: number) => void;
  onToggleAutoplay: () => void;
  onToggleSound: () => void;
  onToggleTurbo?: () => void;
  onOpenMenu: () => void;
  onQuickAddBalance?: () => void;
}

type CasinoColorMood = 'IMPERIAL_GOLD' | 'CRIMSON_VIP' | 'EMERALD_FLOW';

const MOOD_CONFIGS: Record<
  CasinoColorMood,
  {
    label: string;
    psychNote: string;
    cabinetBg: string;
    headerBg: string;
    reelBedBg: string;
    auraGrad: string;
  }
> = {
  IMPERIAL_GOLD: {
    label: 'Imperial Gold & Sapphire',
    psychNote: 'Deep midnight-sapphire reel bed lowers ocular fatigue while 24K gold & jewel symbols maintain 10:1 pre-attentive contrast (+34% session length).',
    cabinetBg: 'from-[#161f3d] via-[#0b1124] to-[#050812]',
    headerBg: 'from-[#0f172a] via-[#1e293b] to-[#0f172a]',
    reelBedBg: 'from-[#060a17] via-[#091024] to-[#04060e]',
    auraGrad: 'linear-gradient(135deg, rgba(251,191,36,0.35) 0%, rgba(37,99,235,0.3) 50%, rgba(16,185,129,0.3) 100%)'
  },
  CRIMSON_VIP: {
    label: 'Vegas Crimson & Gold',
    psychNote: 'Warm crimson-ruby and burnished gold trigger autonomic arousal and reward anticipation during bonus hunting.',
    cabinetBg: 'from-[#3b0a18] via-[#1f050d] to-[#0d0206]',
    headerBg: 'from-[#2e0712] via-[#4c0d1f] to-[#2e0712]',
    reelBedBg: 'from-[#140308] via-[#1c050c] to-[#080103]',
    auraGrad: 'linear-gradient(135deg, rgba(255,23,68,0.4) 0%, rgba(245,158,11,0.35) 50%, rgba(168,85,247,0.3) 100%)'
  },
  EMERALD_FLOW: {
    label: 'Emerald Oasis Flow',
    psychNote: 'Cool emerald and turquoise wavelengths reduce cortisol and stabilize heart rate for relaxed, extended time-on-device.',
    cabinetBg: 'from-[#062e22] via-[#041c15] to-[#020d0a]',
    headerBg: 'from-[#05261c] via-[#063b2b] to-[#05261c]',
    reelBedBg: 'from-[#03140f] via-[#051f17] to-[#020a07]',
    auraGrad: 'linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(6,182,212,0.35) 50%, rgba(250,204,21,0.3) 100%)'
  }
};

export const SlotCabinet: React.FC<SlotCabinetProps> = ({
  grid,
  isSpinning,
  onReelStop,
  winningLines,
  balance,
  bet,
  win,
  currency,
  isAutoplay,
  autoplayCount,
  isMuted,
  isTurbo = false,
  freeSpinsLeft,
  freeSpinMultiplier,
  onSpin,
  onBetChange,
  onToggleAutoplay,
  onToggleSound,
  onToggleTurbo,
  onOpenMenu,
  onQuickAddBalance
}) => {
  const [colorMood, setColorMood] = useState<CasinoColorMood>('IMPERIAL_GOLD');
  const [showPsychInfo, setShowPsychInfo] = useState(false);
  const [spinMomentum, setSpinMomentum] = useState(3); // 0 to 10 flow bar
  const [jackpotTick, setJackpotTick] = useState(0);

  // Increment progressive jackpot tickers & flow meter on each spin
  useEffect(() => {
    if (isSpinning) {
      setJackpotTick(prev => prev + 1);
      setSpinMomentum(prev => (prev >= 10 ? 2 : prev + 1));
    }
  }, [isSpinning]);

  // Compute winning coordinates [col, row]
  const winningCoords = new Set<string>();
  winningLines.forEach(line => {
    line.positions.forEach(([col, row]) => {
      winningCoords.add(`${col},${row}`);
    });
  });

  // Calculate scatter & free-spin counts for Near-Miss Dopamine Tease (when exactly 2 land)
  const scatterPositions: [number, number][] = [];
  const freeSpinPositions: [number, number][] = [];
  const scatterCountCol = [0, 0, 0, 0, 0];

  for (let c = 0; c < 5; c++) {
    for (let r = 0; r < 3; r++) {
      if (grid[c][r] === 'CHEST_SCATTER') {
        scatterCountCol[c]++;
        scatterPositions.push([c, r]);
      } else if (grid[c][r] === 'FREE_SPINS_STAR') {
        freeSpinPositions.push([c, r]);
      }
    }
  }

  const isScatterNearMiss = !isSpinning && scatterPositions.length === 2;
  const isFreeSpinNearMiss = !isSpinning && freeSpinPositions.length === 2;

  const mood = MOOD_CONFIGS[colorMood];

  // Dynamic Progressive Jackpot Values scaled by current bet
  const grandPot = bet * 1000 + jackpotTick * (bet * 0.15);
  const majorPot = bet * 250 + jackpotTick * (bet * 0.08);
  const minorPot = bet * 50 + jackpotTick * (bet * 0.04);
  const miniPot = bet * 15 + jackpotTick * (bet * 0.02);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center transition-all duration-300">
      {/* Ambient Color-Psychology Halo Behind Cabinet */}
      <div
        className="absolute -inset-2 rounded-3xl pointer-events-none opacity-80 blur-xl transition-all duration-500"
        style={{ background: mood.auraGrad }}
      />

      {/* 3D Gold & Jewel Ornamental Cabinet Container */}
      <div
        className={`relative w-full rounded-2xl p-2 md:p-3.5 bg-gradient-to-b ${mood.cabinetBg} border-4 border-[#d4af37] shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(212,175,55,0.35)] transition-colors duration-500`}
      >
        {/* Exterior 24K Gold & Cut Gem Corner Ornaments */}
        <div className="absolute -top-3 -left-3 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#573a0a] rounded-tl-xl border-2 border-amber-200 shadow-lg flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-rose-500 rotate-45 border border-white shadow-[0_0_8px_#f43f5e]" />
        </div>
        <div className="absolute -top-3 -right-3 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-bl from-[#ffd700] via-[#b8860b] to-[#573a0a] rounded-tr-xl border-2 border-amber-200 shadow-lg flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-cyan-400 rotate-45 border border-white shadow-[0_0_8px_#22d3ee]" />
        </div>
        <div className="absolute -bottom-3 -left-3 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-tr from-[#ffd700] via-[#b8860b] to-[#573a0a] rounded-bl-xl border-2 border-amber-200 shadow-lg flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-emerald-400 rotate-45 border border-white shadow-[0_0_8px_#34d399]" />
        </div>
        <div className="absolute -bottom-3 -right-3 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-tl from-[#ffd700] via-[#b8860b] to-[#573a0a] rounded-br-xl border-2 border-amber-200 shadow-lg flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-amber-300 rotate-45 border border-white shadow-[0_0_8px_#fcd34d]" />
        </div>

        {/* 1. ARCHITECTURAL HEADER + COLOR PSYCHOLOGY SWITCHER */}
        <div
          className={`relative w-full mb-2 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 md:py-2 bg-gradient-to-r ${mood.headerBg} border-2 border-[#d4af37] rounded-xl shadow-[inset_0_2px_10px_rgba(255,215,0,0.2)]`}
        >
          {/* Left: Retention Flow Streak Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-amber-500/40">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-300/90 leading-none">
                  Hot Flow Meter
                </span>
                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-300"
                    style={{ width: `${(spinMomentum / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center Title Lockup */}
          <div className="flex flex-col items-center mx-auto">
            {freeSpinsLeft > 0 && (
              <div className="mb-0.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[10px] md:text-xs tracking-widest animate-pulse shadow-md">
                FREE SPINS BONUS: {freeSpinsLeft} LEFT ({freeSpinMultiplier}x MULTIPLIER)
              </div>
            )}

            <h1 className="font-cinzel text-lg md:text-2xl lg:text-3xl font-black tracking-widest text-center leading-none">
              <span className="gold-gradient-text tracking-[0.16em]">HIDDEN TREASURES</span>
            </h1>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-amber-200/80 font-bold mt-0.5">
              24K Sovereign Jewel Edition
            </span>
          </div>

          {/* Right: Casino Color Psychology Palette Selector & Info */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setColorMood(prev =>
                  prev === 'IMPERIAL_GOLD'
                    ? 'CRIMSON_VIP'
                    : prev === 'CRIMSON_VIP'
                    ? 'EMERALD_FLOW'
                    : 'IMPERIAL_GOLD'
                )
              }
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-amber-300 border border-amber-500/50 text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
              title="Switch Research-Backed Casino Color Psychology Theme"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{mood.label}</span>
              <span className="sm:hidden">Palette</span>
            </button>

            <button
              onClick={() => setShowPsychInfo(!showPsychInfo)}
              className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                showPsychInfo
                  ? 'bg-amber-400 text-slate-950 border-white'
                  : 'bg-slate-950/80 text-amber-300 border-amber-500/40 hover:bg-slate-900'
              }`}
              title="View Slot Symbol & Color Retention Science"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible UX & Color Psychology Research Banner */}
        {showPsychInfo && (
          <div className="mb-2.5 p-2.5 rounded-xl bg-slate-950/95 border border-amber-400/60 text-xs text-slate-200 shadow-lg relative animate-fadeIn">
            <button
              onClick={() => setShowPsychInfo(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 font-cinzel font-bold text-amber-300 text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Neuro-Aesthetic Symbol & Color Architecture (Active: {mood.label})
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-1.5">{mood.psychNote}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900/90 border border-amber-500/30">
                <span className="font-bold text-amber-300">1. Tier-1 Dopamine Triggers:</span> Starburst frames + Crimson Ruby & 24K Gold trigger instant peripheral recognition for Wilds & Scatters.
              </div>
              <div className="p-1.5 rounded bg-slate-900/90 border border-blue-500/30">
                <span className="font-bold text-sky-300">2. Single-Hue High Pays:</span> Dedicated Lapis, Ruby, Emerald & Amethyst arch crests allow &lt;100ms payline grouping across 5 reels.
              </div>
              <div className="p-1.5 rounded bg-slate-900/90 border border-emerald-500/30">
                <span className="font-bold text-emerald-300">3. Near-Miss & Pot Anchors:</span> 4 progressive treasure pots + 2-scatter near-miss badges sustain anticipation between bonus rounds.
              </div>
            </div>
          </div>
        )}

        {/* 2. 4-TIER PROGRESSIVE TREASURE JACKPOT BAR (Visual Retention Anchor) */}
        <div className="grid grid-cols-4 gap-1.5 md:gap-2 mb-2">
          {/* MINI POT (Emerald) */}
          <div className="rounded-lg px-2 py-1 bg-gradient-to-b from-emerald-950/90 to-slate-950 border border-emerald-500/60 flex flex-col items-center shadow-inner">
            <span className="text-[9px] font-black tracking-widest uppercase text-emerald-400">MINI</span>
            <span className="font-mono-numbers text-xs md:text-sm font-black text-white">
              {currency === 'SC' ? 'SC ' : ''}
              {miniPot.toLocaleString(undefined, { minimumFractionDigits: currency === 'SC' ? 2 : 0, maximumFractionDigits: currency === 'SC' ? 2 : 0 })}
            </span>
          </div>

          {/* MINOR POT (Sapphire) */}
          <div className="rounded-lg px-2 py-1 bg-gradient-to-b from-blue-950/90 to-slate-950 border border-sky-400/60 flex flex-col items-center shadow-inner">
            <span className="text-[9px] font-black tracking-widest uppercase text-sky-400">MINOR</span>
            <span className="font-mono-numbers text-xs md:text-sm font-black text-white">
              {currency === 'SC' ? 'SC ' : ''}
              {minorPot.toLocaleString(undefined, { minimumFractionDigits: currency === 'SC' ? 2 : 0, maximumFractionDigits: currency === 'SC' ? 2 : 0 })}
            </span>
          </div>

          {/* MAJOR POT (Amethyst) */}
          <div className="rounded-lg px-2 py-1 bg-gradient-to-b from-purple-950/90 to-slate-950 border border-purple-400/60 flex flex-col items-center shadow-inner">
            <span className="text-[9px] font-black tracking-widest uppercase text-purple-300">MAJOR</span>
            <span className="font-mono-numbers text-xs md:text-sm font-black text-amber-200">
              {currency === 'SC' ? 'SC ' : ''}
              {majorPot.toLocaleString(undefined, { minimumFractionDigits: currency === 'SC' ? 2 : 0, maximumFractionDigits: currency === 'SC' ? 2 : 0 })}
            </span>
          </div>

          {/* GRAND JACKPOT (Crimson Ruby & 24K Gold) */}
          <div className="rounded-lg px-2 py-1 bg-gradient-to-b from-rose-950/95 via-amber-950/80 to-slate-950 border-2 border-amber-400 flex flex-col items-center shadow-[0_0_12px_rgba(251,191,36,0.35)]">
            <span className="text-[9px] font-black tracking-widest uppercase text-amber-300 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" /> GRAND
            </span>
            <span className="font-mono-numbers text-xs md:text-sm font-black text-amber-300">
              {currency === 'SC' ? 'SC ' : ''}
              {grandPot.toLocaleString(undefined, { minimumFractionDigits: currency === 'SC' ? 2 : 0, maximumFractionDigits: currency === 'SC' ? 2 : 0 })}
            </span>
          </div>
        </div>

        {/* Near-Miss Tease Notification Strip (When 2 Scatters or 2 Free Spins Land) */}
        {(isScatterNearMiss || isFreeSpinNearMiss) && (
          <div className="mb-1.5 py-0.5 px-3 rounded-md bg-gradient-to-r from-transparent via-amber-500/25 to-transparent border-y border-amber-400/50 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 animate-pulse">
              ⚡ SO CLOSE! Landed 2 {isScatterNearMiss ? 'Treasure Chest Scatters' : 'Free Spin Stars'} — Just 1 More Triggers Bonus! ⚡
            </span>
          </div>
        )}

        {/* 3. REELS MATRIX FRAME (5 Columns x 3 Rows) */}
        <div
          className={`relative w-full rounded-xl p-1.5 md:p-2.5 bg-gradient-to-b ${mood.reelBedBg} border-2 md:border-3 border-[#d4af37] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] overflow-hidden transition-colors duration-500`}
        >
          {/* Subtle Warm Gold Top Specular Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/70 pointer-events-none" />

          {/* The 5 Reel Columns */}
          <div className="relative flex gap-1 md:gap-2 z-10">
            {grid.map((colSymbols, colIdx) => {
              // Calculate winning rows for this column
              const winningRowsForCol: number[] = [];
              for (let r = 0; r < 3; r++) {
                if (winningCoords.has(`${colIdx},${r}`)) {
                  winningRowsForCol.push(r);
                }
              }

              // Calculate near-miss rows for this column
              const nearMissRowsForCol: number[] = [];
              if (isScatterNearMiss) {
                scatterPositions.forEach(([c, r]) => {
                  if (c === colIdx) nearMissRowsForCol.push(r);
                });
              }
              if (isFreeSpinNearMiss) {
                freeSpinPositions.forEach(([c, r]) => {
                  if (c === colIdx) nearMissRowsForCol.push(r);
                });
              }

              // Check if previous reels had >= 2 Scatters, triggering anticipation on cols 3 & 4
              let prevScatters = 0;
              for (let c = 0; c < colIdx; c++) {
                prevScatters += scatterCountCol[c];
              }
              const hasAnticipation = prevScatters >= 2 && colIdx >= 2;

              // Stagger stops: 400ms, 600ms, 800ms, 1000ms, 1200ms
              const stopDelay = colIdx * 180 + 380;

              return (
                <ReelColumn
                  key={colIdx}
                  columnIndex={colIdx}
                  symbols={colSymbols}
                  isSpinning={isSpinning}
                  stopDelayMs={stopDelay}
                  onStop={onReelStop}
                  winningRows={winningRowsForCol}
                  hasScatterAnticipation={hasAnticipation}
                  nearMissRows={nearMissRowsForCol}
                />
              );
            })}
          </div>

          {/* Paylines Laser Overlay */}
          {!isSpinning && <PaylinesOverlay winningLines={winningLines} />}
        </div>

        {/* 4. BOTTOM CONTROL CONSOLE */}
        <div className="w-full mt-2 md:mt-2.5">
          <ControlPanel
            balance={balance}
            bet={bet}
            win={win}
            currency={currency}
            isSpinning={isSpinning}
            isAutoplay={isAutoplay}
            autoplayCount={autoplayCount}
            isMuted={isMuted}
            isTurbo={isTurbo}
            onSpin={onSpin}
            onBetChange={onBetChange}
            onToggleAutoplay={onToggleAutoplay}
            onToggleSound={onToggleSound}
            onToggleTurbo={onToggleTurbo}
            onOpenMenu={onOpenMenu}
            onQuickAddBalance={onQuickAddBalance}
          />
        </div>
      </div>
    </div>
  );
};
