/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CurrencyMode, SpinResult, SymbolId, WinningLine } from './types/game';
import { evaluateSpin, generateReelGrid, getInitialShowcaseGrid } from './services/gameEngine';
import { storageService } from './services/storageService';
import { soundEngine } from './services/soundEngine';
import { TopHeader } from './components/TopHeader';
import { SlotCabinet } from './components/SlotCabinet';
import { TreasureChestModal } from './components/modals/TreasureChestModal';
import { DailyRewardsModal } from './components/modals/DailyRewardsModal';
import { RedemptionCenterModal } from './components/modals/RedemptionCenterModal';
import { AdminDashboardModal } from './components/modals/AdminDashboardModal';
import { SocialModal } from './components/modals/SocialModal';
import { AchievementsModal } from './components/modals/AchievementsModal';
import { RulesModal } from './components/modals/RulesModal';
import { ResponsiblePlayModal } from './components/modals/ResponsiblePlayModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { WalletHistoryModal } from './components/modals/WalletHistoryModal';
import { SupportModal } from './components/modals/SupportModal';
import { GameMenuModal } from './components/modals/GameMenuModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { BigWinCelebration } from './components/modals/BigWinCelebration';

const GC_BET_TIERS = [1.0, 2.5, 5.0, 10.0, 25.0, 50.0, 100.0];
const SC_BET_TIERS = [0.20, 0.50, 1.00, 2.00, 5.00, 10.00];

export default function App() {
  // Wallet & User State
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [wallet, setWallet] = useState(() => storageService.getWallet());
  const [currency, setCurrency] = useState<CurrencyMode>('GC');

  // Bet settings
  const [betIndex, setBetIndex] = useState(2); // default $5.00 GC or $1.00 SC
  const currentBet = currency === 'GC' ? GC_BET_TIERS[betIndex] : SC_BET_TIERS[betIndex];

  // Game Engine State
  const [grid, setGrid] = useState<SymbolId[][]>(() => getInitialShowcaseGrid());
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentWin, setCurrentWin] = useState(0);
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(0);
  const [freeSpinMultiplier, setFreeSpinMultiplier] = useState(1);

  // Autoplay State
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayCount, setAutoplayCount] = useState(0);

  // Settings
  const [isMuted, setIsMuted] = useState(false);
  const [isTurbo, setIsTurbo] = useState(false);

  // Modals
  const [activeModal, setActiveModal] = useState<
    | 'NONE'
    | 'TREASURE_CHEST'
    | 'DAILY'
    | 'REDEEM'
    | 'ADMIN'
    | 'SOCIAL'
    | 'ACHIEVEMENTS'
    | 'RULES'
    | 'RESPONSIBLE_PLAY'
    | 'SETTINGS'
    | 'PROFILE'
    | 'WALLET_HISTORY'
    | 'SUPPORT'
    | 'MENU'
    | 'ONBOARDING'
    | 'BIG_WIN'
  >('NONE');

  const [celebrationData, setCelebrationData] = useState<{
    amount: number;
    isMegaWin: boolean;
    isJackpot: boolean;
  } | null>(null);

  // Daily reward availability check
  const isDailyClaimable = profile.lastDailyClaimDate !== new Date().toISOString().split('T')[0];

  // Spin audio interval ref
  const spinSoundIntervalRef = useRef<number | null>(null);

  const refreshState = useCallback(() => {
    setProfile(storageService.getProfile());
    setWallet(storageService.getWallet());
  }, []);

  // Handle Bet Tier Increment / Decrement
  const handleBetChange = (delta: number) => {
    soundEngine.playClick();
    const tiers = currency === 'GC' ? GC_BET_TIERS : SC_BET_TIERS;
    const nextIndex = Math.max(0, Math.min(tiers.length - 1, betIndex + delta));
    setBetIndex(nextIndex);
  };

  // Main Spin Execution (Server-Authoritative Evaluation & Cryptographic RNG)
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    const availableBal = wallet[currency];
    const isFreeSpinActive = freeSpinsLeft > 0;
    const cost = isFreeSpinActive ? 0 : currentBet;

    // Balance check
    if (availableBal < cost) {
      soundEngine.playClick();
      alert(`Insufficient ${currency} balance! Please claim your daily allowance or lower your bet.`);
      setIsAutoplay(false);
      return;
    }

    setIsSpinning(true);
    setCurrentWin(0);
    setWinningLines([]);

    // Sound: start rhythmic spin ticking
    if (spinSoundIntervalRef.current) clearInterval(spinSoundIntervalRef.current);
    spinSoundIntervalRef.current = window.setInterval(() => {
      soundEngine.playSpinTick();
    }, 120);

    // 1. Generate outcome cryptographically on server / engine
    const nextGrid = generateReelGrid();
    const result: SpinResult = evaluateSpin(
      nextGrid,
      currentBet,
      currency,
      freeSpinsLeft,
      freeSpinMultiplier
    );

    // 2. Schedule reels presentation
    const totalSpinTime = isTurbo ? 600 : 1200;

    setTimeout(() => {
      if (spinSoundIntervalRef.current) {
        clearInterval(spinSoundIntervalRef.current);
        spinSoundIntervalRef.current = null;
      }

      setGrid(nextGrid);
      setIsSpinning(false);

      // 3. Process atomic transaction
      const txResult = storageService.processSpinTransaction(
        cost,
        result.totalWin,
        currency,
        result.transactionId
      );

      if (txResult.success) {
        setWallet(txResult.newWallet);
        setProfile(storageService.getProfile());
      }

      setCurrentWin(result.totalWin);
      setWinningLines(result.winningLines);

      // 4. Sound & Celebrations
      if (result.totalWin > 0) {
        soundEngine.playWin();

        if (result.isBigWin || result.isMegaWin || result.isJackpot) {
          setCelebrationData({
            amount: result.totalWin,
            isMegaWin: result.isMegaWin,
            isJackpot: result.isJackpot
          });
          setActiveModal('BIG_WIN');
          setIsAutoplay(false); // pause autoplay for celebration
        }
      }

      // 5. Handle Free Spins award
      if (result.freeSpinsAwarded > 0) {
        setFreeSpinsLeft(prev => prev + result.freeSpinsAwarded);
        setFreeSpinMultiplier(result.freeSpinMultiplier);
        soundEngine.playBigWin();
      } else if (freeSpinsLeft > 0) {
        setFreeSpinsLeft(prev => Math.max(0, prev - 1));
      }

      // 6. Handle Treasure Chest Bonus trigger
      if (result.bonusTriggered) {
        setIsAutoplay(false);
        setTimeout(() => {
          setActiveModal('TREASURE_CHEST');
        }, 600);
      }

      // 7. Autoplay loop step
      if (isAutoplay && !result.bonusTriggered && !result.isBigWin) {
        setAutoplayCount(prev => {
          if (prev <= 1) {
            setIsAutoplay(false);
            return 0;
          }
          setTimeout(() => {
            handleSpin();
          }, 800);
          return prev - 1;
        });
      }
    }, totalSpinTime);
  }, [
    isSpinning,
    wallet,
    currency,
    freeSpinsLeft,
    currentBet,
    isTurbo,
    freeSpinMultiplier,
    isAutoplay
  ]);

  // Handle single reel stop callback for realistic audio
  const handleReelStop = useCallback((colIndex: number) => {
    soundEngine.playReelStop(colIndex);
  }, []);

  // Autoplay toggle
  const handleToggleAutoplay = () => {
    soundEngine.playClick();
    if (isAutoplay) {
      setIsAutoplay(false);
      setAutoplayCount(0);
    } else {
      setIsAutoplay(true);
      setAutoplayCount(20); // 20 auto-spins
      if (!isSpinning) {
        setTimeout(handleSpin, 200);
      }
    }
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  // Keyboard shortcut: Spacebar or Enter to spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea or if modal is open
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        activeModal !== 'NONE'
      ) {
        return;
      }

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleSpin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpin, activeModal]);

  // Daily Claim handler
  const handleClaimDaily = (day: number, gc: number, sc: number) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedWallet = {
      ...wallet,
      GC: wallet.GC + gc,
      SC: Number((wallet.SC + sc).toFixed(2)),
      unplayedSC: Number((wallet.unplayedSC + sc).toFixed(2))
    };
    storageService.saveWallet(updatedWallet);

    const updatedProfile = {
      ...profile,
      dailyStreak: profile.dailyStreak + 1,
      lastDailyClaimDate: today
    };
    storageService.saveProfile(updatedProfile);

    storageService.addTransaction({
      id: 'tx_daily_' + Date.now(),
      userId: profile.id,
      type: 'DAILY_REWARD',
      currency: 'GC',
      amount: gc,
      balanceAfter: updatedWallet.GC,
      timestamp: Date.now(),
      description: `Claimed Day ${day} Expedition Rations (+${gc.toLocaleString()} GC${sc > 0 ? `, +${sc.toFixed(2)} SC` : ''})`
    });

    if (sc > 0) {
      storageService.addTransaction({
        id: 'tx_daily_sc_' + Date.now(),
        userId: profile.id,
        type: 'DAILY_REWARD',
        currency: 'SC',
        amount: sc,
        balanceAfter: updatedWallet.SC,
        timestamp: Date.now() + 1,
        description: `Promotional Sweeps Coin Check-in Grant (+${sc.toFixed(2)} SC)`
      });
    }

    refreshState();
    setActiveModal('NONE');
  };

  // Treasure chest claim handler
  const handleClaimChestBonus = (bonusWin: number) => {
    const updatedWallet = {
      ...wallet,
      [currency]: Number((wallet[currency] + bonusWin).toFixed(2)),
      eligibleSC: currency === 'SC' ? Number((wallet.eligibleSC + bonusWin).toFixed(2)) : wallet.eligibleSC
    };
    storageService.saveWallet(updatedWallet);

    storageService.addTransaction({
      id: 'tx_chest_' + Date.now(),
      userId: profile.id,
      type: 'CHEST_BONUS',
      currency,
      amount: bonusWin,
      balanceAfter: updatedWallet[currency],
      timestamp: Date.now(),
      description: `Ancient Treasure Vault Mystery Multiplier (+${bonusWin.toFixed(2)} ${currency})`
    });

    refreshState();
    setCurrentWin(prev => prev + bonusWin);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#070d17] text-slate-100 overflow-x-hidden font-sans select-none">
      {/* 1. IMMERSIVE EXPEDITION CAMP BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/public/assets/aistudio/Screenshot_20261020_064929_Files_by_Google_466f8996.jpg')`,
          filter: 'blur(3px) brightness(0.4) saturate(1.2)',
          transform: 'scale(1.05)'
        }}
      />

      {/* Dark Vignette Overlay for focus on the 3D Cabinet */}
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#070d17]/60 to-[#03060a]/90 pointer-events-none" />

      {/* 2. TOP NAV HEADER */}
      <TopHeader
        currency={currency}
        onCurrencyChange={(mode) => {
          soundEngine.playClick();
          setCurrency(mode);
          setBetIndex(2);
        }}
        profile={profile}
        dailyRewardAvailable={isDailyClaimable}
        onOpenDaily={() => setActiveModal('DAILY')}
        onOpenRedeem={() => setActiveModal('REDEEM')}
        onOpenSocial={() => setActiveModal('SOCIAL')}
        onOpenAchievements={() => setActiveModal('ACHIEVEMENTS')}
        onOpenProfile={() => setActiveModal('PROFILE')}
        onOpenSettings={() => setActiveModal('SETTINGS')}
        onOpenAdmin={() => setActiveModal('ADMIN')}
      />

      {/* 3. CENTER SLOT CABINET VIEWPORT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-4 my-auto">
        <SlotCabinet
          grid={grid}
          isSpinning={isSpinning}
          onReelStop={handleReelStop}
          winningLines={winningLines}
          balance={wallet[currency]}
          bet={currentBet}
          win={currentWin}
          currency={currency}
          isAutoplay={isAutoplay}
          autoplayCount={autoplayCount}
          isMuted={isMuted}
          isTurbo={isTurbo}
          freeSpinsLeft={freeSpinsLeft}
          freeSpinMultiplier={freeSpinMultiplier}
          onSpin={handleSpin}
          onBetChange={handleBetChange}
          onToggleAutoplay={handleToggleAutoplay}
          onToggleSound={handleToggleSound}
          onToggleTurbo={() => setIsTurbo(prev => !prev)}
          onOpenMenu={() => setActiveModal('MENU')}
          onQuickAddBalance={() => setActiveModal('DAILY')}
        />
      </main>

      {/* 4. FOOTER COMPLIANCE & LEGAL NOTICE */}
      <footer className="relative z-10 w-full py-2 px-4 bg-slate-950/90 border-t border-slate-800/80 text-center text-[10px] text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>© 2026 Hidden Treasures Social Casino</span>
          <span>·</span>
          <span>NO PURCHASE NECESSARY</span>
          <span>·</span>
          <span>VOID WHERE PROHIBITED BY LAW</span>
          <span>·</span>
          <span>21+ ONLY</span>
          <span>·</span>
          <button onClick={() => setActiveModal('RULES')} className="hover:text-amber-300 underline">
            Official Rules
          </button>
          <span>·</span>
          <button onClick={() => setActiveModal('RESPONSIBLE_PLAY')} className="hover:text-emerald-300 underline">
            Responsible Play
          </button>
          <span>·</span>
          <button onClick={() => setActiveModal('SUPPORT')} className="hover:text-teal-300 underline">
            Customer Support
          </button>
        </div>
      </footer>

      {/* 5. MODALS & OVERLAYS */}
      {activeModal === 'TREASURE_CHEST' && (
        <TreasureChestModal
          betAmount={currentBet}
          currency={currency}
          onClaim={handleClaimChestBonus}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {activeModal === 'DAILY' && (
        <DailyRewardsModal
          currentStreak={profile.dailyStreak}
          isClaimableToday={isDailyClaimable}
          onClaim={handleClaimDaily}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {activeModal === 'REDEEM' && (
        <RedemptionCenterModal
          wallet={wallet}
          profile={profile}
          onRefresh={refreshState}
          onClose={() => setActiveModal('NONE')}
          onOpenRules={() => setActiveModal('RULES')}
          onOpenSupport={() => setActiveModal('SUPPORT')}
        />
      )}

      {activeModal === 'ADMIN' && (
        <AdminDashboardModal
          onClose={() => setActiveModal('NONE')}
          onConfigChanged={refreshState}
        />
      )}

      {activeModal === 'SOCIAL' && (
        <SocialModal
          onClose={() => setActiveModal('NONE')}
          onRefresh={refreshState}
        />
      )}

      {activeModal === 'ACHIEVEMENTS' && (
        <AchievementsModal
          onClose={() => setActiveModal('NONE')}
          onRefresh={refreshState}
        />
      )}

      {activeModal === 'RULES' && (
        <RulesModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'RESPONSIBLE_PLAY' && (
        <ResponsiblePlayModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'SETTINGS' && (
        <SettingsModal
          isMuted={isMuted}
          onToggleMute={handleToggleSound}
          isTurbo={isTurbo}
          onToggleTurbo={() => setIsTurbo(!isTurbo)}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {activeModal === 'PROFILE' && (
        <ProfileModal
          profile={profile}
          wallet={wallet}
          onClose={() => setActiveModal('NONE')}
          onRefresh={refreshState}
          onOpenWalletHistory={() => setActiveModal('WALLET_HISTORY')}
        />
      )}

      {activeModal === 'WALLET_HISTORY' && (
        <WalletHistoryModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'SUPPORT' && (
        <SupportModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'MENU' && (
        <GameMenuModal
          onClose={() => setActiveModal('NONE')}
          onOpenDaily={() => setActiveModal('DAILY')}
          onOpenRedeem={() => setActiveModal('REDEEM')}
          onOpenSocial={() => setActiveModal('SOCIAL')}
          onOpenAchievements={() => setActiveModal('ACHIEVEMENTS')}
          onOpenProfile={() => setActiveModal('PROFILE')}
          onOpenWalletHistory={() => setActiveModal('WALLET_HISTORY')}
          onOpenRules={() => setActiveModal('RULES')}
          onOpenResponsiblePlay={() => setActiveModal('RESPONSIBLE_PLAY')}
          onOpenSettings={() => setActiveModal('SETTINGS')}
          onOpenSupport={() => setActiveModal('SUPPORT')}
          onOpenAdmin={() => setActiveModal('ADMIN')}
          onOpenOnboarding={() => setActiveModal('ONBOARDING')}
        />
      )}

      {activeModal === 'ONBOARDING' && (
        <OnboardingModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'BIG_WIN' && celebrationData && (
        <BigWinCelebration
          amount={celebrationData.amount}
          currency={currency}
          isMegaWin={celebrationData.isMegaWin}
          isJackpot={celebrationData.isJackpot}
          onDismiss={() => {
            setActiveModal('NONE');
            setCelebrationData(null);
          }}
        />
      )}
    </div>
  );
}
