import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmergencyRequest } from '../../types';
import {
  AlertTriangle,
  X,
  ShieldAlert,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Sparkles,
  CloudRain
} from 'lucide-react';

interface EmergencyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyRequestModal: React.FC<EmergencyRequestModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    activeEmergency,
    triggerEmergency,
    advanceEmergencyStep,
    approveEmergencyQuote,
    cancelEmergency,
    formatPrice,
    activeProperty
  } = useApp();

  const [selectedIssue, setSelectedIssue] = useState<EmergencyRequest['issueType']>('water_leak');
  const [customReason, setCustomReason] = useState('Heavy monsoon rains in Kerala. Need immediate inspection of roof, sump pump, and internal walls.');

  if (!isOpen) return null;

  const handleStartEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    triggerEmergency(customReason, selectedIssue);
  };

  const steps = [
    { key: 'dispatched', label: 'Dispatched', icon: '🚨' },
    { key: 'arrived', label: 'On-Site', icon: '📍' },
    { key: 'inspecting', label: 'Inspecting', icon: '🔍' },
    { key: 'quote_ready', label: 'Quote Ready', icon: '📝' },
    { key: 'repair_approved', label: 'Repairing', icon: '🔧' },
    { key: 'completed', label: 'Resolved', icon: '✅' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111c19] border border-rose-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-rose-950/80 to-[#12211c] border-b border-rose-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-900/90 text-rose-200 border border-rose-600/50 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                24x7 Kerala Rapid Response Desk
              </span>
              <span className="text-xs text-rose-300 font-mono">Response time &lt; 45 Mins</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit']">
              Monsoon & Storm Emergency Dispatch
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Property: <span className="font-bold text-emerald-300">{activeProperty.name}</span> ({activeProperty.city})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-rose-950/40 text-slate-400 hover:text-white border border-rose-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {!activeEmergency ? (
            /* Emergency Trigger Form */
            <form onSubmit={handleStartEmergency} className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-[#182824] border border-rose-900/40 space-y-3">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Select Incident Type
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { type: 'water_leak', label: 'Water Leak / Roof Drip', icon: '💧' },
                    { type: 'heavy_rain_flood', label: 'Monsoon Flooding Risk', icon: '🌧️' },
                    { type: 'storm_tree_fall', label: 'Fallen Tree / Branch', icon: '🌴' },
                    { type: 'electrical_short', label: 'Power Trip / Inverter', icon: '⚡' },
                    { type: 'cctv_offline', label: 'CCTV Camera Offline', icon: '📹' },
                    { type: 'break_in_alert', label: 'Gate / Security Check', icon: '🚨' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => setSelectedIssue(item.type as EmergencyRequest['issueType'])}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between text-xs font-bold ${
                        selectedIssue === item.type
                          ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-md'
                          : 'bg-[#0f1d19] border-emerald-900/30 text-slate-300 hover:bg-[#152a24]'
                      }`}
                    >
                      <span className="text-xl mb-1">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Provide Incident Notes for Field Responder
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-2xl bg-[#0f1d19] border border-emerald-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
                  placeholder="E.g., Heavy rain reported in Calicut Beach area. Please inspect the second floor terrace gutter and check if the sump pump started..."
                />
              </div>

              {/* Service Fee Note */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Transparent Emergency Pricing: </span>
                  <span>
                    Emergency coordination callout fee is <span className="font-bold text-white">{formatPrice(299)}</span>. Any necessary repair costs are quoted on-site with 100% transparent zero-markup parts receipt.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold text-sm shadow-xl shadow-rose-950/60 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>DISPATCH EMERGENCY INSPECTION NOW</span>
              </button>

            </form>
          ) : (
            /* Active Live Emergency Monitor & Stepper */
            <div className="space-y-5">
              
              {/* Live Incident Status Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/60 to-[#12211c] border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-900/80 border border-rose-500/60 flex items-center justify-center text-white shrink-0">
                    <CloudRain className="w-5 h-5 text-rose-300 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      Live Incident # {activeEmergency.id}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {activeEmergency.issueDescription}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400">Requested at</span>
                  <p className="text-xs font-bold text-amber-300 flex items-center gap-1 sm:justify-end">
                    <Clock className="w-3.5 h-3.5" /> {activeEmergency.requestedAt}
                  </p>
                </div>
              </div>

              {/* Interactive Timeline Stepper */}
              <div className="p-4 rounded-2xl bg-[#0f1d19] border border-emerald-900/40">
                <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pb-1">
                  {steps.map((s, idx) => {
                    const stepOrder = ['dispatched', 'arrived', 'inspecting', 'quote_ready', 'repair_approved', 'completed'];
                    const currentIdx = stepOrder.indexOf(activeEmergency.currentStep);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={s.key} className="flex flex-col items-center min-w-[65px] text-center">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold border transition-all ${
                            isCurrent
                              ? 'bg-rose-600 border-rose-400 text-white shadow-lg animate-pulse'
                              : isDone
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-[#152621] border-emerald-900/40 text-slate-500'
                          }`}
                        >
                          {s.icon}
                        </div>
                        <span className={`text-[10px] font-bold mt-1.5 truncate max-w-[65px] ${isCurrent ? 'text-rose-400' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Simulation Control Step Helper */}
                <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs">
                  <span className="text-slate-400 italic">
                    {activeEmergency.inspectorNotes}
                  </span>
                  <button
                    type="button"
                    onClick={advanceEmergencyStep}
                    className="px-3 py-1 rounded-xl bg-[#182e27] hover:bg-[#203c33] text-emerald-300 text-[11px] font-bold border border-emerald-700/50 flex items-center gap-1 transition-all"
                  >
                    <span>Simulate Next Step</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Assigned Field Inspector Card */}
              {activeEmergency.workerAssigned && (
                <div className="p-4 rounded-2xl bg-[#0f1d19] border border-emerald-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeEmergency.workerAssigned.avatar}
                      alt={activeEmergency.workerAssigned.name}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-400/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {activeEmergency.workerAssigned.name}
                        </span>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-rose-950 text-rose-300 border border-rose-800/60">
                          Rapid Response Lead
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        ETA: ~18 Minutes • {activeProperty.city} Sector
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${activeEmergency.workerAssigned.phone}`}
                    className="p-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-800 hover:text-white transition-all shadow"
                    title="Call inspector directly"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Repair Quotation & 1-Tap NRI Approval Section */}
              {activeEmergency.repairQuote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#162722] border-2 border-amber-500/40 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                        Inspector Findings & Instant Quote
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                        {activeEmergency.repairQuote.issueFound}
                      </h4>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-700/60">
                      High Priority
                    </span>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-1.5 text-xs bg-[#0f1d19] p-3 rounded-xl border border-emerald-900/30">
                    {activeEmergency.repairQuote.quoteBreakdown.map((item, bIdx) => (
                      <div key={bIdx} className="flex items-center justify-between text-slate-300">
                        <span>{item.item}</span>
                        <span className="font-mono font-bold text-slate-100">{formatPrice(item.cost)}</span>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-sm font-bold text-white">
                      <span>Total Estimated Repair</span>
                      <span className="text-amber-300 font-mono font-extrabold text-base">
                        {formatPrice(activeEmergency.repairQuote.repairEstimateINR)}
                      </span>
                    </div>
                  </div>

                  {/* 1-Tap Approval Button */}
                  {activeEmergency.repairQuote.approvedByCustomer ? (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Repair Approved! Technician executing work on-site.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={approveEmergencyQuote}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>APPROVE EMERGENCY REPAIR NOW</span>
                    </button>
                  )}

                </div>
              )}

              {/* Close / Cancel Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={cancelEmergency}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 bg-[#0c1613] border border-emerald-900/40"
                >
                  Close / Dismiss Alert
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
