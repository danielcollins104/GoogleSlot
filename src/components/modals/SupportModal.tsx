import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Send, ShieldCheck, X } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('REDEMPTIONS');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    storageService.addAuditLog({
      actor: storageService.getProfile().username,
      action: 'SUPPORT_TICKET_CREATED',
      details: `Category: ${category}, Subject: ${subject || 'General Inquiry'}`,
      ipAddress: '127.0.0.1'
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto p-5 md:p-7 rounded-2xl bg-gradient-to-b from-[#132238] via-[#0c1626] to-[#060b13] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
            <HelpCircle className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
              EXPEDITION SUPPORT &amp; HELPDESK
            </h2>
            <p className="text-xs text-slate-300">
              24/7 dedicated player support, redemption inquiry tracking, and verification assistance.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-slate-900/80 border border-emerald-500/50 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-emerald-300">Support Ticket Dispatched!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Ticket #HT-{(Math.random() * 100000).toFixed(0)} has been queued. Our customer care representatives usually respond within 4 business hours to your registered email address.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="py-2 px-5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-200 mt-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100"
                >
                  <option value="REDEMPTIONS">Sweeps Coin Redemption</option>
                  <option value="VERIFICATION">KYC Identity Verification</option>
                  <option value="GAME_RULES">Game Rules &amp; Paytable</option>
                  <option value="RESPONSIBLE_PLAY">Responsible Play / Cool-off</option>
                  <option value="TECHNICAL">Technical Bug / Audio Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Brief summary..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Details &amp; Message</label>
              <textarea
                rows={4}
                required
                placeholder="Explain your question or provide transaction details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SEND INQUIRY TO SUPPORT TEAM</span>
            </button>
          </form>
        )}

        {/* FAQs */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-amber-300 uppercase">Frequently Asked Questions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
              <strong className="text-slate-200 block mb-0.5">How fast are SC redemptions?</strong>
              ACH and Gift Card redemptions process within 24 to 48 business hours after KYC approval.
            </div>
            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
              <strong className="text-slate-200 block mb-0.5">Can I exchange GC for SC?</strong>
              No. Gold Coins are for amusement only and can never be transferred, traded, or redeemed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
