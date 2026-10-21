import React, { useState } from 'react';
import { RedemptionRequest, UserProfile, UserWallet } from '../../types/game';
import { AlertCircle, CheckCircle, Clock, CreditCard, DollarSign, HelpCircle, ShieldAlert, X } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface RedemptionCenterModalProps {
  wallet: UserWallet;
  profile: UserProfile;
  onRefresh: () => void;
  onClose: () => void;
  onOpenRules: () => void;
  onOpenSupport: () => void;
}

export const RedemptionCenterModal: React.FC<RedemptionCenterModalProps> = ({
  wallet,
  profile,
  onRefresh,
  onClose,
  onOpenRules,
  onOpenSupport
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'BANK_TRANSFER' | 'GIFT_CARD' | 'PAYPAL'>('BANK_TRANSFER');
  const [redeemAmount, setRedeemAmount] = useState<number>(100);
  const [bankRouting, setBankRouting] = useState('021000021');
  const [bankAccount, setBankAccount] = useState('1234567890');
  const [recipientEmail, setRecipientEmail] = useState(profile.email);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const config = storageService.getConfig();
  const minThreshold = config.minRedemptionSC;
  const eligibleSC = wallet.eligibleSC;
  const redemptions = storageService.getRedemptions();

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Threshold check
    if (redeemAmount < minThreshold) {
      setErrorMessage(`Minimum redemption threshold is ${minThreshold} SC.`);
      return;
    }

    // 2. Balance check
    if (redeemAmount > eligibleSC) {
      setErrorMessage(`Insufficient eligible SC balance. You have ${eligibleSC.toFixed(2)} eligible SC.`);
      return;
    }

    // 3. KYC check
    if (profile.kycStatus === 'UNVERIFIED') {
      setErrorMessage('Identity verification is required before requesting prize redemptions.');
      return;
    }

    setSubmitting(true);

    try {
      // Atomic hold of eligible SC
      const updatedWallet: UserWallet = {
        ...wallet,
        SC: Number((wallet.SC - redeemAmount).toFixed(2)),
        eligibleSC: Number((wallet.eligibleSC - redeemAmount).toFixed(2))
      };
      storageService.saveWallet(updatedWallet);

      // Record transaction
      const refCode = 'RDM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      storageService.addTransaction({
        id: 'tx_' + refCode,
        userId: profile.id,
        type: 'REDEMPTION_HOLD',
        currency: 'SC',
        amount: -redeemAmount,
        balanceAfter: updatedWallet.SC,
        timestamp: Date.now(),
        description: `Sweepstakes Redemption Hold: $${redeemAmount.toFixed(2)} USD via ${selectedMethod}`
      });

      // Create redemption request in queue
      const newRequest: RedemptionRequest = {
        id: 'rdm_' + Date.now(),
        userId: profile.id,
        username: profile.username,
        amountSC: redeemAmount,
        usdEquivalent: redeemAmount * config.scUsdRate,
        method: selectedMethod,
        details: {
          accountNumberMasked: selectedMethod === 'BANK_TRANSFER' ? `••••${bankAccount.slice(-4)}` : undefined,
          routingNumberMasked: selectedMethod === 'BANK_TRANSFER' ? `••••${bankRouting.slice(-4)}` : undefined,
          emailRecipient: selectedMethod !== 'BANK_TRANSFER' ? recipientEmail : undefined
        },
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        referenceCode: refCode
      };

      const existingRedemptions = storageService.getRedemptions();
      existingRedemptions.unshift(newRequest);
      storageService.saveRedemptions(existingRedemptions);

      // Add audit log
      storageService.addAuditLog({
        actor: profile.username,
        action: 'REDEMPTION_REQUEST_SUBMITTED',
        targetId: newRequest.id,
        details: `Redemption requested for ${redeemAmount} SC ($${redeemAmount} USD) via ${selectedMethod}. Ref: ${refCode}`,
        ipAddress: '127.0.0.1'
      });

      setSuccessMessage(`Redemption request #${refCode} submitted successfully! Our compliance team will review within 24-48 hours.`);
      onRefresh();
    } catch {
      setErrorMessage('Failed to process redemption request. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-teal-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-teal-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow">
            <DollarSign className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-teal-100">
              SWEEPSTAKES REDEMPTION CENTER
            </h2>
            <p className="text-xs text-slate-300">
              Redeem your eligible won Sweeps Coins for cash prizes or digital gift cards. 1 SC = $1.00 USD.
            </p>
          </div>
        </div>

        {/* Balance & Status Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/30">
            <span className="text-[10px] font-bold text-teal-300/80 uppercase">Eligible Sweeps Coins</span>
            <div className="font-mono-numbers text-xl md:text-2xl font-black text-teal-300 mt-0.5">
              🌟 {eligibleSC.toFixed(2)} SC
            </div>
            <span className="text-[10px] text-slate-400">Total SC: {wallet.SC.toFixed(2)} SC</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
            <span className="text-[10px] font-bold text-amber-300/80 uppercase">Estimated Cash Value</span>
            <div className="font-mono-numbers text-xl md:text-2xl font-black text-amber-300 mt-0.5">
              ${(eligibleSC * config.scUsdRate).toFixed(2)} USD
            </div>
            <span className="text-[10px] text-slate-400">Fixed rate: 1 SC = $1.00 USD</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Verification Level</span>
            <div className="text-sm font-bold text-slate-200 flex items-center gap-1.5 mt-1">
              {profile.kycStatus === 'UNVERIFIED' ? (
                <span className="text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> Unverified
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> {profile.kycStatus.replace('_', ' ')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">Min. Threshold: {minThreshold} SC</span>
          </div>
        </div>

        {/* Notices */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-start gap-2 text-xs text-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-2 text-xs text-emerald-200">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Request Form */}
        <form onSubmit={handleCreateRequest} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Select Payout Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('BANK_TRANSFER')}
                className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === 'BANK_TRANSFER'
                    ? 'border-teal-400 bg-teal-950/50 text-teal-200'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Bank Transfer (ACH)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('GIFT_CARD')}
                className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === 'GIFT_CARD'
                    ? 'border-teal-400 bg-teal-950/50 text-teal-200'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Digital Gift Card</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('PAYPAL')}
                className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === 'PAYPAL'
                    ? 'border-teal-400 bg-teal-950/50 text-teal-200'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>PayPal Transfer</span>
              </button>
            </div>
          </div>

          {/* Amount input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Redemption Amount (Min: {minThreshold} SC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={minThreshold}
                  max={Math.floor(eligibleSC)}
                  step="1"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono-numbers text-sm focus:outline-none focus:border-teal-400"
                />
                <button
                  type="button"
                  onClick={() => setRedeemAmount(Math.floor(eligibleSC))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-teal-300 rounded"
                >
                  MAX
                </button>
              </div>
            </div>

            {selectedMethod === 'BANK_TRANSFER' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bank Routing / Transit Number
                </label>
                <input
                  type="text"
                  value={bankRouting}
                  onChange={(e) => setBankRouting(e.target.value)}
                  placeholder="9-digit routing number"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || eligibleSC < minThreshold}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:brightness-110 active:scale-98 disabled:opacity-50 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>SUBMIT REDEMPTION REQUEST (${redeemAmount}.00 USD)</span>
          </button>
        </form>

        {/* Past Requests History */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Recent Redemption Requests</span>
          </h3>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {redemptions.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-4">No previous redemption requests</div>
            ) : (
              redemptions.map((req) => (
                <div
                  key={req.id}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-slate-200">
                      ${req.usdEquivalent.toFixed(2)} USD ({req.amountSC} SC)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Ref: {req.referenceCode} · {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                        : req.status === 'APPROVED'
                        ? 'bg-blue-950 text-blue-400 border border-blue-700/50'
                        : req.status === 'PENDING'
                        ? 'bg-amber-950 text-amber-400 border border-amber-700/50'
                        : 'bg-rose-950 text-rose-400 border border-rose-700/50'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Disclaimers & Links */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <button onClick={onOpenRules} className="hover:text-teal-300 underline">
              Official Sweepstakes Rules
            </button>
            <button onClick={onOpenSupport} className="hover:text-teal-300 underline">
              Redemption Help & FAQ
            </button>
          </div>
          <span>Processing: 24 - 48 business hours</span>
        </div>
      </div>
    </div>
  );
};
