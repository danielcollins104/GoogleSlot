import React, { useState } from 'react';
import { PAYLINES, SYMBOL_DEFINITIONS } from '../../services/gameEngine';
import { SymbolIcon } from '../symbols/SymbolIcon';
import { BookOpen, Check, FileText, Info, Shield, X } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'PAYTABLE' | 'PAYLINES' | 'SWEEPSTAKES_RULES' | 'AMOE'>('PAYTABLE');

  const symbolsList = Object.values(SYMBOL_DEFINITIONS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
            <BookOpen className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
              GAME RULES &amp; OFFICIAL SWEEPSTAKES TERMS
            </h2>
            <p className="text-xs text-slate-300">
              Comprehensive paytable, payline diagrams, and transparent promotional sweepstakes regulations.
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-5 overflow-x-auto">
          <button
            onClick={() => setActiveSection('PAYTABLE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'PAYTABLE'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SYMBOL PAYTABLE
          </button>

          <button
            onClick={() => setActiveSection('PAYLINES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'PAYLINES'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            25 FIXED PAYLINES
          </button>

          <button
            onClick={() => setActiveSection('SWEEPSTAKES_RULES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'SWEEPSTAKES_RULES'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OFFICIAL SWEEPSTAKES RULES
          </button>

          <button
            onClick={() => setActiveSection('AMOE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'AMOE'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FREE ENTRY METHOD (AMOE)
          </button>
        </div>

        {/* 1. PAYTABLE SECTION */}
        {activeSection === 'PAYTABLE' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {symbolsList.map((sym) => (
                <div
                  key={sym.id}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3"
                >
                  <div className="w-14 h-14 shrink-0 rounded-lg bg-slate-950/80 p-1 border border-amber-500/30">
                    <SymbolIcon symbolId={sym.id} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{sym.name}</div>
                    <div className="text-[10px] text-slate-400 mb-1">{sym.description}</div>
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-amber-300">
                      <span>5x: {sym.payouts[5]}x</span>
                      <span>4x: {sym.payouts[4]}x</span>
                      <span>3x: {sym.payouts[3]}x</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400">
              * Note: Line pays are multiplied by line bet (total bet / 25). Scatters award total bet multipliers and trigger the Treasure Chest bonus when 3 or more appear anywhere on reels.
            </div>
          </div>
        )}

        {/* 2. PAYLINES SECTION */}
        {activeSection === 'PAYLINES' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Hidden Treasures features 25 fixed paylines evaluated from left to right starting from reel 1. Wild Star Shields substitute for all standard symbols.
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-72 overflow-y-auto pr-1">
              {PAYLINES.map((pattern, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex flex-col items-center"
                >
                  <span className="text-[10px] font-bold text-amber-300 mb-1">Line #{idx + 1}</span>
                  <div className="grid grid-cols-5 gap-0.5 w-12 h-8 bg-slate-950 p-0.5 rounded border border-slate-700">
                    {[0, 1, 2, 3, 4].map((col) => {
                      const targetRow = pattern[col];
                      return (
                        <div key={col} className="flex flex-col gap-0.5">
                          {[0, 1, 2].map((r) => (
                            <div
                              key={r}
                              className={`w-full h-1.5 rounded-xs ${
                                r === targetRow ? 'bg-amber-400' : 'bg-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SWEEPSTAKES RULES SECTION */}
        {activeSection === 'SWEEPSTAKES_RULES' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-amber-300">NO PURCHASE NECESSARY TO ENTER OR WIN</h3>
            <p>
              1. <strong>Eligibility:</strong> Hidden Treasures is open only to legal residents of the United States (excluding Washington, Idaho, and Michigan) and Canada (excluding Quebec) who are at least twenty-one (21) years old at the time of entry.
            </p>
            <p>
              2. <strong>Two-Currency Model:</strong> The platform operates two distinct virtual currencies:
              <br />
              • <strong>Gold Coins (GC):</strong> Standard entertainment currency. Used solely for social gameplay. Has no monetary value and can never be redeemed for cash or prizes.
              <br />
              • <strong>Sweeps Coins (SC):</strong> Promotional sweepstakes entries. Cannot be purchased directly. Issued through free daily check-ins, promotional events, or alternative free entry methods. Eligible won SC may be redeemed for cash prizes at 1 SC = $1.00 USD, subject to identity verification and playthrough rules.
            </p>
            <p>
              3. <strong>1x Playthrough Requirement:</strong> All promotional Sweeps Coins received must be played at least once (1x) in game spins before becoming eligible for prize redemption.
            </p>
            <p>
              4. <strong>Redemption Limits:</strong> Minimum redemption threshold is 100 SC ($100.00 USD). Maximum daily redemption limit is $10,000 USD (or $5,000 in Florida and New York per prize cycle).
            </p>
          </div>
        )}

        {/* 4. AMOE FREE ENTRY SECTION */}
        {activeSection === 'AMOE' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-teal-300">ALTERNATIVE METHOD OF ENTRY (FREE MAIL-IN REQUEST)</h3>
            <p>
              Participants may receive complimentary promotional Sweeps Coins (SC) without making any purchase by submitting a handwritten mail-in request:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-mono text-[11px] text-slate-200">
              Hidden Treasures Sweepstakes Department<br />
              Attn: Free Entry Request (AMOE)<br />
              P.O. Box 7421, Suite 400<br />
              Wilmington, DE 19801, USA
            </div>
            <p>
              Each valid mail-in request received in compliance with the Official Rules will be credited with <strong>5.00 promotional Sweeps Coins</strong> directly to the participant's verified account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
