import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  FileText,
  DollarSign,
  Download,
  Share2,
  ThumbsUp,
  Image as ImageIcon,
  Check
} from 'lucide-react';

interface ProofOfWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProofOfWorkModal: React.FC<ProofOfWorkModalProps> = ({ isOpen, onClose }) => {
  const { selectedPow, approvePow, formatPrice, showToast } = useApp();
  const [activeMediaTab, setActiveMediaTab] = useState<'slider' | 'before' | 'during' | 'after'>('slider');
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  if (!isOpen || !selectedPow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0e1b17] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-b border-emerald-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Proof-of-Work Verification Certificate
              </span>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0c1613] text-slate-300 border border-emerald-900/50">
                Job ID #{selectedPow.id}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-white mt-1 font-['Outfit']">
              {selectedPow.serviceTitle}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {selectedPow.propertyName} ({selectedPow.propertyCity})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {selectedPow.completedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-300">
                GPS: {selectedPow.gpsCoordinates}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-[#1a3028] text-slate-400 hover:text-white border border-emerald-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {/* Media Navigation Tabs (Slider, Before, During, After) */}
          <div className="flex items-center justify-between gap-2 border-b border-emerald-900/40 pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveMediaTab('slider')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMediaTab === 'slider'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-[#12211c] text-slate-400 hover:text-slate-200'
                }`}
              >
                ↔ Interactive Slider
              </button>

              <button
                onClick={() => setActiveMediaTab('before')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMediaTab === 'before'
                    ? 'bg-amber-700 text-white shadow'
                    : 'bg-[#12211c] text-slate-400 hover:text-slate-200'
                }`}
              >
                📸 Before ({selectedPow.beforeImages.length})
              </button>

              <button
                onClick={() => setActiveMediaTab('during')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMediaTab === 'during'
                    ? 'bg-teal-700 text-white shadow'
                    : 'bg-[#12211c] text-slate-400 hover:text-slate-200'
                }`}
              >
                📹 During ({selectedPow.duringMedia.length})
              </button>

              <button
                onClick={() => setActiveMediaTab('after')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMediaTab === 'after'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-[#12211c] text-slate-400 hover:text-slate-200'
                }`}
              >
                ✅ After ({selectedPow.afterImages.length})
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Verified Geo-Stamped Media
            </span>
          </div>

          {/* Tab 1: Interactive Before-After Slider View */}
          {activeMediaTab === 'slider' && (
            <div className="space-y-3">
              <BeforeAfterSlider
                beforeImage={
                  selectedPow.comparisonPair?.beforeUrl ||
                  selectedPow.beforeImages[0]?.url ||
                  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
                }
                afterImage={
                  selectedPow.comparisonPair?.afterUrl ||
                  selectedPow.afterImages[0]?.url ||
                  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80'
                }
                beforeLabel="BEFORE SERVICE"
                afterLabel="AFTER VERIFIED SERVICE"
              />
              {selectedPow.comparisonPair?.description && (
                <p className="text-xs text-slate-300 italic bg-[#12211c] p-3 rounded-xl border border-emerald-900/30">
                  ℹ️ {selectedPow.comparisonPair.description}
                </p>
              )}
            </div>
          )}

          {/* Tab 2: Before Photos Grid */}
          {activeMediaTab === 'before' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPow.beforeImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActivePhotoModal(img.url)}
                  className="rounded-2xl overflow-hidden bg-[#12211c] border border-amber-900/40 group cursor-pointer"
                >
                  <div className="relative aspect-video">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-950 text-amber-200 border border-amber-600/60">
                      BEFORE PHOTO
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white">{img.area}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{img.caption}</p>
                    <p className="text-[10px] text-amber-400 font-mono mt-1">🕒 {img.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: During Media */}
          {activeMediaTab === 'during' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPow.duringMedia.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActivePhotoModal(m.url)}
                  className="rounded-2xl overflow-hidden bg-[#12211c] border border-teal-900/40 group cursor-pointer"
                >
                  <div className="relative aspect-video">
                    <img src={m.url} alt={m.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-950 text-teal-200 border border-teal-600/60">
                      DURING WORK
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white">{m.area}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{m.caption}</p>
                    <p className="text-[10px] text-teal-400 font-mono mt-1">🕒 {m.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: After Photos Grid */}
          {activeMediaTab === 'after' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPow.afterImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActivePhotoModal(img.url)}
                  className="rounded-2xl overflow-hidden bg-[#12211c] border border-emerald-900/40 group cursor-pointer"
                >
                  <div className="relative aspect-video">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-200 border border-emerald-600/60">
                      AFTER - VERIFIED
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white">{img.area}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{img.caption}</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-1">🕒 {img.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Verified Specialist Worker Card */}
          <div className="p-4 rounded-2xl bg-[#12211c] border border-emerald-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedPow.worker.avatar}
                alt={selectedPow.worker.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400/40"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{selectedPow.worker.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    Verified Partner
                  </span>
                </div>
                <p className="text-xs text-slate-300">{selectedPow.worker.specialization}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="text-amber-400 font-bold">★ {selectedPow.worker.rating}</span>
                  <span>•</span>
                  <span>{selectedPow.worker.completedJobsCount} Jobs Completed</span>
                  <span>•</span>
                  <span>{selectedPow.worker.baseLocation} Hub</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Execution Duration
              </span>
              <p className="text-sm font-bold text-white flex items-center gap-1 sm:justify-end">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {selectedPow.durationMinutes} Minutes On-Site
              </p>
            </div>
          </div>

          {/* Inspection Checklist */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Inspection & Quality Sign-Off Checklist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPow.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0c1613] border border-emerald-900/30 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                    {item.notes && (
                      <p className="text-[10px] text-amber-300/90 mt-0.5">Note: {item.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itemized Transparent Billing Breakdown */}
          <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Transparent Itemized Billing</span>
            </h3>

            <div className="space-y-2 text-xs">
              {selectedPow.itemizedBill.map((bill, bIdx) => (
                <div key={bIdx} className="flex items-center justify-between text-slate-300">
                  <span>{bill.description}</span>
                  <span className={`font-mono font-bold ${bill.cost < 0 ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {bill.cost < 0 ? `-${formatPrice(Math.abs(bill.cost))}` : formatPrice(bill.cost)}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-sm font-bold text-white">
                <span>Total Amount Charged</span>
                <span className="text-amber-300 font-extrabold text-base font-mono">
                  {formatPrice(selectedPow.amountTotal)}
                </span>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Platform Margin (15% Included)</span>
                <span>{formatPrice(selectedPow.platformMargin)}</span>
              </div>
            </div>
          </div>

          {/* AI Diagnostic Summary Note */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-700/30 text-xs text-emerald-200">
            <p className="font-bold flex items-center gap-1.5 text-emerald-300 mb-1">
              <span>🤖 AI Diagnostic Summary:</span>
            </p>
            <p>{selectedPow.aiDiagnosticNote}</p>
          </div>

        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Proof of Work Certificate downloaded as PDF!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0c1613] text-slate-300 hover:text-white border border-emerald-900/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => showToast('Encrypted share link copied to clipboard!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0c1613] text-slate-300 hover:text-white border border-emerald-900/40 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {selectedPow.customerApproved ? (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-700/60 shadow">
                <Check className="w-4 h-4" />
                <span>Approved by NRI Client</span>
              </span>
            ) : (
              <button
                onClick={() => approvePow(selectedPow.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50 transition-all active:scale-95"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Approve & Release Payment</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Full Photo Zoom Lightbox */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={activePhotoModal} alt="Enlarged Proof" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
