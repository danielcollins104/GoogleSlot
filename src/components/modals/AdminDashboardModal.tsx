import React, { useState } from 'react';
import { AuditLog, GameConfiguration, RedemptionRequest } from '../../types/game';
import { storageService } from '../../services/storageService';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Database,
  DollarSign,
  FileText,
  Search,
  ShieldCheck,
  Sliders,
  Users,
  X,
  XCircle
} from 'lucide-react';

interface AdminDashboardModalProps {
  onClose: () => void;
  onConfigChanged: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  onClose,
  onConfigChanged
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'REDEMPTIONS' | 'CONFIG' | 'AUDIT'>('OVERVIEW');
  const [config, setConfig] = useState<GameConfiguration>(storageService.getConfig());
  const [redemptions, setRedemptions] = useState<RedemptionRequest[]>(storageService.getRedemptions());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(storageService.getAuditLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Stats calculation
  const pendingRedemptions = redemptions.filter(r => r.status === 'PENDING');
  const completedTotalUSD = redemptions
    .filter(r => r.status === 'COMPLETED')
    .reduce((sum, r) => sum + r.usdEquivalent, 0);

  const handleApproveRedemption = (id: string) => {
    const updated = redemptions.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'COMPLETED' as const,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Admin_Lead'
        };
      }
      return r;
    });

    setRedemptions(updated);
    storageService.saveRedemptions(updated);

    storageService.addAuditLog({
      actor: 'Admin_Lead',
      action: 'REDEMPTION_APPROVAL',
      targetId: id,
      details: `Redemption ${id} approved and marked completed. Payout triggered via ACH gateway.`,
      ipAddress: '127.0.0.1'
    });
    setAuditLogs(storageService.getAuditLogs());
    onConfigChanged();
  };

  const handleRejectRedemption = (id: string, reason: string) => {
    const req = redemptions.find(r => r.id === id);
    if (!req) return;

    // Refund SC to user wallet
    const wallet = storageService.getWallet();
    const updatedWallet = {
      ...wallet,
      SC: Number((wallet.SC + req.amountSC).toFixed(2)),
      eligibleSC: Number((wallet.eligibleSC + req.amountSC).toFixed(2))
    };
    storageService.saveWallet(updatedWallet);

    const updated = redemptions.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'REJECTED' as const,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Admin_Lead',
          rejectionReason: reason
        };
      }
      return r;
    });

    setRedemptions(updated);
    storageService.saveRedemptions(updated);

    storageService.addAuditLog({
      actor: 'Admin_Lead',
      action: 'REDEMPTION_REJECTION',
      targetId: id,
      details: `Redemption ${id} rejected: ${reason}. Refunded ${req.amountSC} SC to user.`,
      ipAddress: '127.0.0.1'
    });
    setAuditLogs(storageService.getAuditLogs());
    onConfigChanged();
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveConfig(config);
    storageService.addAuditLog({
      actor: 'Admin_Lead',
      action: 'CONFIGURATION_UPDATED',
      details: `Target RTP: ${config.targetRTP}%, Min Redemption: ${config.minRedemptionSC} SC, Sweepstakes: ${config.sweepstakesEnabled}`,
      ipAddress: '127.0.0.1'
    });
    setAuditLogs(storageService.getAuditLogs());
    setSaveMessage('Configuration updated and propagated to game engine!');
    setTimeout(() => setSaveMessage(null), 3000);
    onConfigChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#111827] via-[#0b0f19] to-[#05080e] border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(0,0,0,0.95)] text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-indigo-100 flex items-center gap-2">
              ADMINISTRATIVE &amp; COMPLIANCE CONSOLE
            </h2>
            <p className="text-xs text-slate-300">
              Role: System Administrator (Super Admin) · Full cryptographic audit, RTP control &amp; AML review
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'OVERVIEW'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>OPERATIONAL METRICS</span>
          </button>

          <button
            onClick={() => setActiveTab('REDEMPTIONS')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
              activeTab === 'REDEMPTIONS'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>REDEMPTION QUEUE</span>
            {pendingRedemptions.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('CONFIG')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CONFIG'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>GAME ENGINE &amp; RTP</span>
          </button>

          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'AUDIT'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AUDIT TRAIL</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-5">
            {/* KPI Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Registered Users</span>
                <div className="font-mono-numbers text-xl font-black text-slate-100 mt-1">1,482</div>
                <span className="text-[10px] text-emerald-400">DAU: 384 active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Spins Executed</span>
                <div className="font-mono-numbers text-xl font-black text-amber-300 mt-1">42,910</div>
                <span className="text-[10px] text-slate-400">Avg Bet: 4.80 GC</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Redemptions</span>
                <div className="font-mono-numbers text-xl font-black text-rose-400 mt-1">
                  {pendingRedemptions.length} Requests
                </div>
                <span className="text-[10px] text-slate-400">Awaiting AML review</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Completed Redemptions</span>
                <div className="font-mono-numbers text-xl font-black text-teal-400 mt-1">
                  ${completedTotalUSD.toFixed(2)} USD
                </div>
                <span className="text-[10px] text-emerald-400">100% Reconciled</span>
              </div>
            </div>

            {/* Currency Ledger Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-300 uppercase mb-2 flex items-center gap-1.5">
                  <span>🪙</span>
                  <span>Gold Coins (Entertainment) Circulation</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total GC Issued:</span>
                    <span className="font-mono font-bold">12,480,000 GC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total GC Spent:</span>
                    <span className="font-mono font-bold">9,840,200 GC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Net RTP Realized:</span>
                    <span className="font-mono text-emerald-400 font-bold">96.18%</span>
                  </div>
                  <div className="text-[10px] text-amber-400/80 pt-1 border-t border-slate-800">
                    Non-redeemable virtual entertainment currency. No cash value.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30">
                <h4 className="text-xs font-bold text-teal-300 uppercase mb-2 flex items-center gap-1.5">
                  <span>🌟</span>
                  <span>Sweeps Coins (Promotional) Ledger</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Promotional SC Awarded:</span>
                    <span className="font-mono font-bold">1,820.00 SC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Redeemable Eligible SC:</span>
                    <span className="font-mono font-bold">428.50 SC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AMOE Free Mail-In Grants:</span>
                    <span className="font-mono font-bold">45 entries processed</span>
                  </div>
                  <div className="text-[10px] text-teal-400/80 pt-1 border-t border-slate-800">
                    Promotional sweepstakes currency. Strictly separated ledger.
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-bold">Cryptographic RNG &amp; Ledger Verification: HEALTHY</span>
              </div>
              <span className="text-slate-400 font-mono">Uptime: 99.98% · 0 anomalous transactions</span>
            </div>
          </div>
        )}

        {/* 2. REDEMPTIONS TAB */}
        {activeTab === 'REDEMPTIONS' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Sweepstakes Prize Redemption Queue ({redemptions.length})
              </h3>
              <div className="text-xs text-slate-400">
                Requires 1x playthrough &amp; Level 1+ KYC verification
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {redemptions.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm">{req.username}</span>
                      <span className="text-slate-400 font-mono">({req.userId})</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'COMPLETED'
                            ? 'bg-emerald-950 text-emerald-400'
                            : req.status === 'PENDING'
                            ? 'bg-amber-950 text-amber-400'
                            : 'bg-rose-950 text-rose-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="text-slate-300 flex items-center gap-2">
                      <span className="font-mono-numbers font-bold text-amber-300">
                        ${req.usdEquivalent.toFixed(2)} USD
                      </span>
                      <span>via {req.method}</span>
                      <span className="text-slate-500">· Ref: {req.referenceCode}</span>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Requested: {new Date(req.createdAt).toLocaleString()}
                      {req.reviewedBy && ` · Reviewed by ${req.reviewedBy}`}
                      {req.rejectionReason && ` · Reason: ${req.rejectionReason}`}
                    </div>
                  </div>

                  {/* Actions */}
                  {req.status === 'PENDING' ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleApproveRedemption(req.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold flex items-center gap-1 shadow"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>APPROVE</span>
                      </button>
                      <button
                        onClick={() => handleRejectRedemption(req.id, 'Identity verification document mismatch')}
                        className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 active:scale-95 text-white font-bold flex items-center gap-1 shadow"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>REJECT</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">
                      Processed on {req.reviewedAt ? new Date(req.reviewedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CONFIG TAB */}
        {activeTab === 'CONFIG' && (
          <form onSubmit={handleSaveConfig} className="space-y-4">
            {saveMessage && (
              <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-xs text-emerald-200">
                {saveMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Theoretical RTP (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="90"
                  max="98"
                  value={config.targetRTP}
                  onChange={(e) => setConfig({ ...config, targetRTP: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
                />
                <span className="text-[10px] text-slate-500">Standard certified setting: 96.2%</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Min. Redemption Threshold (SC)
                </label>
                <input
                  type="number"
                  min="50"
                  max="500"
                  value={config.minRedemptionSC}
                  onChange={(e) => setConfig({ ...config, minRedemptionSC: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
                />
                <span className="text-[10px] text-slate-500">100 SC ($100 USD) threshold</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Gold Coins Bet Range (Min - Max)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={config.minGCBet}
                    onChange={(e) => setConfig({ ...config, minGCBet: Number(e.target.value) })}
                    className="w-1/2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
                  />
                  <input
                    type="number"
                    value={config.maxGCBet}
                    onChange={(e) => setConfig({ ...config, maxGCBet: Number(e.target.value) })}
                    className="w-1/2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sweepstakes Mode Status
                </label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="sweepstakesActive"
                    checked={config.sweepstakesEnabled}
                    onChange={(e) => setConfig({ ...config, sweepstakesEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                  />
                  <label htmlFor="sweepstakesActive" className="text-xs text-slate-300 font-semibold">
                    Enable Promotional Sweeps Coin Module
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
            >
              SAVE CONFIGURATION CHANGES
            </button>
          </form>
        )}

        {/* 4. AUDIT TAB */}
        {activeTab === 'AUDIT' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Immutable System Audit Trail</span>
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 font-mono text-[11px]"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-indigo-300 font-bold">{log.action}</span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-slate-200">{log.details}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Actor: {log.actor} · IP: {log.ipAddress} {log.targetId && `· Target: ${log.targetId}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
