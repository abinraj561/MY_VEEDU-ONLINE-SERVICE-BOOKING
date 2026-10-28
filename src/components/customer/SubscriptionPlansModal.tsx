import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Check,
  Crown,
  Sparkles,
  Calendar,
  X
} from 'lucide-react';

interface SubscriptionPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionPlansModal: React.FC<SubscriptionPlansModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    subscriptionTiers,
    activeProperty,
    updatePropertySubscription,
    formatPrice
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0e1b17] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#142621] to-[#0c1613] border-b border-emerald-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-950 text-amber-300 border border-amber-600/50 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                NRI Property Guardian Memberships
              </span>
              <span className="text-xs text-slate-400">Cancel or switch tiers anytime</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit']">
              Choose Your Peace-of-Mind Protection Plan
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Managing: <strong className="text-emerald-300">{activeProperty.name}</strong> • Current Tier: <span className="font-bold text-amber-400">{activeProperty.subscriptionPlan}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-[#182c25] text-slate-400 hover:text-white border border-emerald-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {subscriptionTiers.map((tier) => {
              const isCurrentPlan = activeProperty.subscriptionPlan === tier.name;

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all ${
                    tier.recommended
                      ? 'bg-gradient-to-b from-[#182e25] to-[#10201a] border-2 border-emerald-400/60 shadow-2xl shadow-emerald-950/70 scale-[1.02]'
                      : 'bg-[#12211c] border border-emerald-900/50 hover:border-emerald-700/60'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-white">{tier.name}</h3>
                      <p className="text-xs text-slate-300 mt-0.5 min-h-[32px]">{tier.subtitle}</p>
                    </div>

                    {/* Price Header */}
                    <div className="p-3 rounded-2xl bg-[#0c1613] border border-emerald-900/40">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                          {formatPrice(tier.priceINR)}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">/ month</span>
                      </div>
                      <p className="text-[10px] text-emerald-400 font-medium mt-0.5">
                        Inspection Frequency: {tier.inspectionFrequency}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-1">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    {isCurrentPlan ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-700/60 cursor-default"
                      >
                        ✓ Active Protection Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updatePropertySubscription(activeProperty.id, tier.name as any);
                          onClose();
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
                          tier.recommended
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
                            : 'bg-[#182e27] hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50'
                        }`}
                      >
                        Select {tier.name}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Business Math & Trust Footnote */}
          <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Money-Back Guarantee if physical inspection report is delayed.</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Payments processed securely via UAE Cards, UPI & International Stripe
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
