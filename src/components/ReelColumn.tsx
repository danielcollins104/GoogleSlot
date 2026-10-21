import React, { useEffect, useState } from 'react';
import { SymbolId } from '../types/game';
import { SymbolIcon, SYMBOL_VISUAL_THEMES } from './symbols/SymbolIcon';

interface ReelColumnProps {
  columnIndex: number;
  symbols: SymbolId[]; // 3 symbols [row 0, row 1, row 2]
  isSpinning: boolean;
  stopDelayMs: number;
  onStop: (colIndex: number) => void;
  winningRows: number[]; // e.g. [0, 1] if row 0 and row 1 won
  hasScatterAnticipation?: boolean;
  nearMissRows?: number[]; // rows with 2-scatter or 2-freespin near-miss tease
}

const DUMMY_STRIP: SymbolId[] = [
  'ROYAL_KING',
  'WILD_SHIELD',
  'CHEST_SCATTER',
  'CYBER_MECH_SKULL',
  'EXPEDITION_LEADER',
  'NEON_PLASMA_CORE',
  'BERET_COMMANDER',
  'DESERT_WARRIOR',
  'FREE_SPINS_STAR',
  'GOLDEN_KEY',
  'HOLO_CYBER_BLADE',
  'AIRCRAFT_SCOUT',
  'CYBER_DRONE_ORB',
  'BINOCULARS',
  'COMPASS',
  'DOG_TAGS',
  'AMMO_CRATE',
  'GOLD_COINS'
];

export const ReelColumn: React.FC<ReelColumnProps> = ({
  columnIndex,
  symbols,
  isSpinning,
  stopDelayMs,
  onStop,
  winningRows,
  hasScatterAnticipation = false,
  nearMissRows = []
}) => {
  const [internalSpinning, setInternalSpinning] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [displaySymbols, setDisplaySymbols] = useState<SymbolId[]>(symbols);

  useEffect(() => {
    if (isSpinning) {
      setInternalSpinning(true);
      setBouncing(false);

      // Fast cycling symbols during spin
      const interval = setInterval(() => {
        setDisplaySymbols([
          DUMMY_STRIP[Math.floor(Math.random() * DUMMY_STRIP.length)],
          DUMMY_STRIP[Math.floor(Math.random() * DUMMY_STRIP.length)],
          DUMMY_STRIP[Math.floor(Math.random() * DUMMY_STRIP.length)]
        ]);
      }, 70);

      // Scheduled stop with stagger
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplaySymbols(symbols);
        setInternalSpinning(false);
        setBouncing(true);
        onStop(columnIndex);

        // Clear bounce after animation completes
        setTimeout(() => setBouncing(false), 240);
      }, stopDelayMs);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setDisplaySymbols(symbols);
      setInternalSpinning(false);
    }
  }, [isSpinning, stopDelayMs, symbols, columnIndex, onStop]);

  return (
    <div
      className={`relative flex flex-col gap-1.5 md:gap-2 flex-1 transition-all duration-300 ${
        hasScatterAnticipation && internalSpinning
          ? 'shadow-[0_0_28px_rgba(251,191,36,0.9)] ring-2 ring-amber-400 rounded-lg'
          : ''
      }`}
    >
      {displaySymbols.map((symId, rowIdx) => {
        const isWinning = winningRows.includes(rowIdx) && !internalSpinning;
        const isNearMiss = nearMissRows.includes(rowIdx) && !internalSpinning && !isWinning;
        const theme = SYMBOL_VISUAL_THEMES[symId] || SYMBOL_VISUAL_THEMES.GOLD_COINS;

        const isSpecial = theme.tier === 'special';
        const isHigh = theme.tier === 'high';

        return (
          <div
            key={rowIdx}
            className={`relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-b from-[#0c1328] via-[#070b18] to-[#04060e] flex items-center justify-center p-0.5 md:p-1 slot-cell-border transition-transform ${
              isWinning ? 'winning z-10' : ''
            } ${bouncing ? 'animate-bounce-subtle' : ''} ${
              internalSpinning ? 'reel-spinning opacity-90' : 'opacity-100'
            }`}
            style={{
              borderColor: isWinning
                ? '#FFD700'
                : isNearMiss
                ? '#FF1744'
                : isSpecial
                ? `${theme.primaryColor}AA`
                : isHigh
                ? 'rgba(212, 175, 55, 0.65)'
                : 'rgba(148, 163, 184, 0.25)',
              boxShadow: isWinning
                ? `0 0 24px #FFD700, 0 0 14px ${theme.glowHex}, inset 0 0 16px rgba(255, 215, 0, 0.55)`
                : isNearMiss
                ? '0 0 18px rgba(255, 23, 68, 0.85), inset 0 0 14px rgba(255, 215, 0, 0.4)'
                : isSpecial
                ? `inset 0 0 14px ${theme.glowHex}33, 0 4px 10px rgba(0, 0, 0, 0.85)`
                : 'inset 0 2px 8px rgba(0,0,0,0.92), 0 2px 6px rgba(0,0,0,0.65)'
            }}
          >
            {/* Subtle Gold Corner Accents on High & Special Symbols */}
            {(isSpecial || isHigh) && (
              <>
                <div
                  className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 rounded-tl-[2px] pointer-events-none"
                  style={{ borderColor: theme.primaryColor }}
                />
                <div
                  className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 rounded-tr-[2px] pointer-events-none"
                  style={{ borderColor: theme.primaryColor }}
                />
                <div
                  className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 rounded-bl-[2px] pointer-events-none"
                  style={{ borderColor: theme.primaryColor }}
                />
                <div
                  className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 rounded-br-[2px] pointer-events-none"
                  style={{ borderColor: theme.primaryColor }}
                />
              </>
            )}

            {/* Symbol Artwork */}
            <SymbolIcon symbolId={symId} isWinning={isWinning} />

            {/* Win Badge Overlay */}
            {isWinning && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded text-[9px] font-black text-slate-950 shadow-[0_0_10px_#FFD700] border border-white whitespace-nowrap z-30">
                WIN!
              </div>
            )}

            {/* Near-Miss Dopamine Tease Badge (2 Scatters / 2 Free Spins) */}
            {isNearMiss && (
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-gradient-to-r from-rose-600 to-amber-500 rounded text-[8px] font-black text-white shadow-md animate-pulse whitespace-nowrap z-30">
                1 MORE!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
