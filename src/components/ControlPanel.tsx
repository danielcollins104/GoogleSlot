import React from 'react';
import { CurrencyMode } from '../types/game';
import { Menu, Minus, Plus, RefreshCw, Trophy, Volume2, VolumeX, Wallet, Zap } from 'lucide-react';

interface ControlPanelProps {
  balance: number;
  bet: number;
  win: number;
  currency: CurrencyMode;
  isSpinning: boolean;
  isAutoplay: boolean;
  autoplayCount: number;
  isMuted: boolean;
  isTurbo?: boolean;
  onSpin: () => void;
  onBetChange: (delta: number) => void;
  onToggleAutoplay: () => void;
  onToggleSound: () => void;
  onToggleTurbo?: () => void;
  onOpenMenu: () => void;
  onQuickAddBalance?: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  balance,
  bet,
  win,
  currency,
  isSpinning,
  isAutoplay,
  autoplayCount,
  isMuted,
  isTurbo = false,
  onSpin,
  onBetChange,
  onToggleAutoplay,
  onToggleSound,
  onToggleTurbo,
  onOpenMenu,
  onQuickAddBalance
}) => {
  const formattedBalance =
    currency === 'GC'
      ? `${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `${balance.toFixed(2)}`;

  const formattedBet = bet.toFixed(2);
  const formattedWin = win.toFixed(2);

  return (
    <div className="relative w-full max-w-5xl mx-auto pt-6 pb-2.5 px-2 md:px-4 bg-gradient-to-t from-[#040810] via-[#091120] to-[#111e33] border-t-2 border-amber-500/70 rounded-b-2xl shadow-[0_15px_35px_rgba(0,0,0,0.95)] z-30">
      {/* Upper Glowing Gold & Amber Filigree Line */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#fbbf24]" />

      <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3">
        {/* ================= LEFT GROUP: MENU, BALANCE, BET ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 justify-start">
          {/* 1. MENU BUTTON */}
          <button
            onClick={onOpenMenu}
            className="flex flex-col items-center justify-center h-12 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl bg-gradient-to-b from-[#1e293b] via-[#141e30] to-[#0f172a] border border-amber-500/50 hover:border-amber-400 active:scale-95 shadow-md transition-all text-amber-300 cursor-pointer shrink-0"
            title="Open Menu & Game Navigation"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-wider text-amber-200 mt-0.5">
              MENU
            </span>
          </button>

          {/* 2. BALANCE POD */}
          <div
            onClick={onQuickAddBalance}
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 rounded-xl bg-gradient-to-b from-[#101c30] via-[#0a1220] to-[#050912] border border-amber-500/40 shadow-inner cursor-pointer hover:border-amber-400 transition-colors shrink min-w-0"
            title="Click to claim daily rewards / view wallet"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow shrink-0">
              <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-amber-300/80 uppercase">
                BALANCE
              </span>
              <div className="flex items-center gap-1 truncate">
                <span className="font-mono-numbers text-[11px] sm:text-xs md:text-sm font-black text-amber-100 truncate">
                  {currency === 'GC' ? '🪙 ' : '🌟 '}
                  {formattedBalance}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-cyan-400 shrink-0">
                  {currency}
                </span>
              </div>
            </div>
          </div>

          {/* 3. BET POD with - and + */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-xl bg-gradient-to-b from-[#101c30] via-[#0a1220] to-[#050912] border border-amber-500/40 shadow-inner shrink-0">
            <button
              onClick={() => onBetChange(-1)}
              disabled={isSpinning}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#1e293b] border border-amber-500/60 hover:bg-amber-600/30 active:scale-90 flex items-center justify-center text-amber-300 disabled:opacity-40 transition-transform cursor-pointer shadow"
              title="Decrease Bet"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex flex-col items-center min-w-[44px] sm:min-w-[55px] md:min-w-[65px]">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-amber-300/80 uppercase">
                BET
              </span>
              <span className="font-mono-numbers text-xs sm:text-sm md:text-base font-black text-amber-100">
                {formattedBet}
              </span>
            </div>

            <button
              onClick={() => onBetChange(1)}
              disabled={isSpinning}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#1e293b] border border-amber-500/60 hover:bg-amber-600/30 active:scale-90 flex items-center justify-center text-amber-300 disabled:opacity-40 transition-transform cursor-pointer shadow"
              title="Increase Bet"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* ================= CENTER HERO: MASSIVE TACTILE 3D SPIN BUTTON ================= */}
        <div className="relative -mt-9 sm:-mt-11 md:-mt-13 mx-1 sm:mx-2 md:mx-4 shrink-0 z-40">
          {/* 1. Generous Touch/Click Target Buffer */}
          <div className="relative p-1.5 sm:p-2 rounded-full">
            {/* 2. Ambient Pulsing Energy Aura Wave */}
            <div
              className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-700 ${
                isSpinning
                  ? 'bg-rose-500/40 blur-xl scale-110 animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-xl opacity-70 animate-pulse scale-105'
              }`}
            />

            {/* 3. Outer Stepped 3D Metallic Pedestal Ring */}
            <div
              className={`relative rounded-full p-1.5 sm:p-2 md:p-2.5 transition-all duration-200 ${
                isSpinning
                  ? 'bg-gradient-to-b from-rose-900 via-rose-950 to-slate-950 shadow-[0_10px_30px_rgba(244,63,94,0.6)]'
                  : 'bg-gradient-to-b from-[#ffe066] via-[#b45309] to-[#451a03] shadow-[0_12px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(251,191,36,0.65)]'
              }`}
            >
              {/* Radial Knurled Gold Border with Rivets */}
              <div className="rounded-full p-1 sm:p-1.5 bg-gradient-to-b from-[#241203] to-[#0a0501] border border-amber-400/50 shadow-inner">
                {/* 4. THE MAIN CLICKABLE SPIN BUTTON DOME */}
                <button
                  onClick={onSpin}
                  disabled={isSpinning && !isAutoplay}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex flex-col items-center justify-center select-none transition-all duration-150 cursor-pointer active:translate-y-1.5 active:scale-95 group ${
                    isSpinning
                      ? 'bg-gradient-to-b from-[#ef4444] via-[#b91c1c] to-[#7f1d1d] border-4 border-rose-300'
                      : 'bg-gradient-to-b from-[#fffde7] via-[#ffd700] to-[#b45309] border-4 border-[#fffbeb] hover:brightness-110'
                  }`}
                  style={{
                    boxShadow: isSpinning
                      ? 'inset 0 4px 10px rgba(0,0,0,0.8), 0 0 25px rgba(239,68,68,0.9)'
                      : 'inset 0 4px 6px #ffffff, inset 0 -5px 12px rgba(120,53,15,0.9), 0 10px 24px rgba(0,0,0,0.9), 0 0 18px rgba(255,215,0,0.7)'
                  }}
                  title="Spin Reels (or press Spacebar)"
                >
                  {/* Rotating Circular Speed Ring during spin */}
                  {isSpinning && (
                    <div className="absolute inset-1 rounded-full border-4 border-dashed border-white/60 animate-spin pointer-events-none" />
                  )}

                  {/* 3D Convex Metallic Inner Dial */}
                  <div
                    className={`w-[84%] h-[84%] rounded-full flex flex-col items-center justify-center transition-all ${
                      isSpinning
                        ? 'bg-gradient-to-b from-[#991b1b] to-[#450a0a] shadow-inner'
                        : 'bg-gradient-to-b from-[#ffea79] via-[#f59e0b] to-[#92400e] border border-amber-200/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* Top Specular Arc Glint */}
                    <div className="absolute top-2 w-[60%] h-[30%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />

                    {/* Central Play Icon / Animated Arrows */}
                    {!isSpinning ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mb-0.5 text-slate-950 flex items-center justify-center drop-shadow-sm group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <polygon points="6,3 20,12 6,21" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-0.5 rounded-sm bg-white shadow-sm animate-pulse" />
                    )}

                    {/* Bold Embossed Action Text */}
                    <span
                      className={`font-cinzel text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-widest uppercase leading-none drop-shadow-sm ${
                        isSpinning ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {isSpinning ? 'STOP' : 'SPIN'}
                    </span>

                    {/* Sub-label Keyboard Hint */}
                    <span
                      className={`text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-wider mt-0.5 leading-none ${
                        isSpinning ? 'text-rose-200' : 'text-amber-950/80'
                      }`}
                    >
                      {isSpinning ? 'SLOW' : 'SPACEBAR'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT GROUP: WIN, AUTOPLAY, TURBO, SOUND ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 justify-end">
          {/* 5. WIN POD */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 rounded-xl bg-gradient-to-b from-[#101c30] via-[#0a1220] to-[#050912] border border-amber-500/40 shadow-inner shrink min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 flex items-center justify-center shadow shrink-0">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-amber-300/80 uppercase">
                WIN
              </span>
              <span
                className={`font-mono-numbers text-xs sm:text-sm md:text-base font-black truncate ${
                  win > 0 ? 'text-yellow-300 animate-pulse drop-shadow-[0_0_8px_#fde047]' : 'text-slate-300'
                }`}
              >
                {formattedWin}
              </span>
            </div>
          </div>

          {/* 6. AUTOPLAY BUTTON */}
          <button
            onClick={onToggleAutoplay}
            className={`flex flex-col items-center justify-center h-12 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl border active:scale-95 shadow-md transition-all cursor-pointer shrink-0 ${
              isAutoplay
                ? 'bg-gradient-to-b from-teal-600 to-teal-950 border-teal-300 text-teal-100 shadow-[0_0_12px_rgba(20,184,166,0.6)]'
                : 'bg-gradient-to-b from-[#1e293b] via-[#141e30] to-[#0f172a] border-amber-500/50 hover:border-amber-400 text-amber-300'
            }`}
            title="Toggle Autoplay Spins"
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isAutoplay ? 'animate-spin' : ''}`} />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-wider mt-0.5 whitespace-nowrap">
              {isAutoplay ? `AUTO ${autoplayCount}` : 'AUTO'}
            </span>
          </button>

          {/* 7. TURBO SPEED TOGGLE (Optional Fast Spins) */}
          {onToggleTurbo && (
            <button
              onClick={onToggleTurbo}
              className={`hidden sm:flex flex-col items-center justify-center h-12 w-10 sm:h-14 sm:w-12 md:h-16 md:w-12 rounded-xl border active:scale-95 shadow-md transition-all cursor-pointer shrink-0 ${
                isTurbo
                  ? 'bg-gradient-to-b from-amber-600 to-amber-950 border-amber-300 text-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                  : 'bg-gradient-to-b from-[#1e293b] via-[#141e30] to-[#0f172a] border-amber-500/50 hover:border-amber-400 text-amber-300'
              }`}
              title={isTurbo ? 'Turbo Spin Active (Fast)' : 'Normal Spin Speed'}
            >
              <Zap className={`w-4 h-4 ${isTurbo ? 'text-yellow-300 fill-yellow-300 animate-pulse' : 'text-slate-400'}`} />
              <span className="text-[8px] sm:text-[9px] font-black tracking-wider mt-0.5">
                {isTurbo ? 'TURBO' : 'SPEED'}
              </span>
            </button>
          )}

          {/* 8. SOUND TOGGLE BUTTON */}
          <button
            onClick={onToggleSound}
            className="flex items-center justify-center h-12 w-10 sm:h-14 sm:w-11 md:h-16 md:w-12 rounded-xl bg-gradient-to-b from-[#1e293b] via-[#141e30] to-[#0f172a] border border-amber-500/50 hover:border-amber-400 active:scale-95 shadow-md transition-all text-amber-300 cursor-pointer shrink-0"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-amber-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};
