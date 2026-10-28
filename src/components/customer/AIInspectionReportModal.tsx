import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  ShieldCheck,
  Download,
  Share2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Layers,
  Wrench,
  RotateCcw
} from 'lucide-react';

interface AIInspectionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIInspectionReportModal: React.FC<AIInspectionReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const { aiReport, generateAIReport, activeProperty, formatPrice, showToast } = useApp();
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      generateAIReport(activeProperty.id);
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e1b17] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#142621] to-[#0c1613] border-b border-emerald-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600/50 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI Property Condition & Health Diagnostic
              </span>
              <span className="text-xs text-slate-400 font-mono">v3.4 Multi-Spectral Vision</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit']">
              {activeProperty.name} — Inspection Report
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Generated on: {aiReport.generatedDate}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {aiReport.scannedPhotoCount} Field Photos Synthesized
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-[#182c25] text-slate-400 hover:text-white border border-emerald-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {/* Scanning Animation State */}
          {isScanning ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-20 h-20 rounded-3xl bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-emerald-400 animate-spin" />
                <div className="absolute inset-0 rounded-3xl border-2 border-amber-400/50 animate-ping" />
              </div>
              <div>
                <p className="text-base font-bold text-white">AI Vision Model Scanning 18 Field Photos...</p>
                <p className="text-xs text-slate-400 mt-1">
                  Analyzing wall dampness gradients, terracotta roof tile alignment, water tank clarity & inverter battery charge.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Executive Condition Rating Hero */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#132620] to-[#0c1613] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border-2 border-emerald-400 flex flex-col items-center justify-center text-emerald-300 shrink-0 shadow-lg">
                    <span className="text-2xl font-black font-['Outfit']">{aiReport.overallGrade}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">Grade</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Overall Health Score
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-white font-['Outfit']">
                        {aiReport.overallScore}
                      </span>
                      <span className="text-slate-400 text-sm font-semibold">/ 100</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                        Healthy & Secure
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Monsoon Ingress Risk Level: <span className="font-bold text-emerald-400">{aiReport.monsoonRiskIndex}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRescan}
                  className="px-3.5 py-2 rounded-xl bg-[#182e27] hover:bg-[#203c33] text-emerald-300 border border-emerald-700/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-scan Photos</span>
                </button>

              </div>

              {/* AI Verdict Summary Paragraph */}
              <div className="p-4 rounded-2xl bg-[#12211c] border border-emerald-900/40 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <span>🤖 AI Executive Verdict</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {aiReport.summaryParagraph}
                </p>
              </div>

              {/* Category Scores Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Component-by-Component Diagnostic</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiReport.categoryScores.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#12211c] border border-emerald-900/40 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{cat.category}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-emerald-400">{cat.score}%</span>
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                            {cat.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{cat.findings}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Anomalies & Recommended Preventative Action */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Detected Observations & Preventative Remedies</span>
                </h3>

                {aiReport.detectedAnomalies.map((anom) => (
                  <div
                    key={anom.id}
                    className="p-4 rounded-2xl bg-[#14231f] border border-amber-500/30 flex flex-col sm:flex-row items-start gap-4"
                  >
                    <img
                      src={anom.imageThumbnail}
                      alt={anom.title}
                      className="w-full sm:w-28 h-24 rounded-xl object-cover border border-emerald-900/50 shrink-0"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{anom.title}</span>
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-700/60">
                            {anom.severity} Priority
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          Est: {formatPrice(anom.estimatedCostINR)}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300">{anom.detail}</p>
                      <p className="text-[11px] text-emerald-300 font-medium">
                        💡 <span className="font-bold">Recommended:</span> {anom.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('AI Condition Diagnostic PDF exported!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0c1613] text-slate-300 hover:text-white border border-emerald-900/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Report</span>
            </button>

            <button
              onClick={() => showToast('Share link copied!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0c1613] text-slate-300 hover:text-white border border-emerald-900/40 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={() => {
              showToast('Authorized preventative maintenance tasks with local manager!');
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            <span>Authorize Suggested Actions</span>
          </button>
        </div>

      </div>
    </div>
  );
};
