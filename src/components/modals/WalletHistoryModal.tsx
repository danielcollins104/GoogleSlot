import React, { useState } from 'react';
import { CurrencyMode, WalletTransaction } from '../../types/game';
import { storageService } from '../../services/storageService';
import { ArrowDownLeft, ArrowUpRight, DollarSign, History, X } from 'lucide-react';

interface WalletHistoryModalProps {
  onClose: () => void;
}

export const WalletHistoryModal: React.FC<WalletHistoryModalProps> = ({ onClose }) => {
  const [filterCurrency, setFilterCurrency] = useState<'ALL' | CurrencyMode>('ALL');
  const transactions = storageService.getTransactions();

  const filtered = transactions.filter(tx => {
    if (filterCurrency === 'ALL') return true;
    return tx.currency === filterCurrency;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
            <History className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
              WALLET &amp; TRANSACTION LEDGER
            </h2>
            <p className="text-xs text-slate-300">
              Audit-compliant chronological history of every credit and debit across GC and SC.
            </p>
          </div>
        </div>

        {/* Currency Filter Bar */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-4">
          <button
            onClick={() => setFilterCurrency('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterCurrency === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            All Currencies
          </button>
          <button
            onClick={() => setFilterCurrency('GC')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterCurrency === 'GC' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            🪙 Gold Coins (GC)
          </button>
          <button
            onClick={() => setFilterCurrency('SC')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterCurrency === 'SC' ? 'bg-teal-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            🌟 Sweeps Coins (SC)
          </button>
        </div>

        {/* Transaction Table */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">No transactions recorded yet</div>
          ) : (
            filtered.map((tx) => {
              const isPositive = tx.amount > 0;

              return (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isPositive ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPositive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="font-bold text-slate-200">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(tx.timestamp).toLocaleString()} · ID: {tx.id}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-mono-numbers font-black ${
                        isPositive ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {tx.amount.toFixed(2)} {tx.currency}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Bal: {tx.balanceAfter.toFixed(2)} {tx.currency}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
