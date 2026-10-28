import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Calendar,
  Key,
  MapPin,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  Eye,
  PlusCircle,
  Camera,
  Activity,
  Award
} from 'lucide-react';

interface PropertyOverviewProps {
  onOpenPowModal: (powId: string) => void;
  onOpenServicesModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenAIReportModal: () => void;
  onOpenSubscriptionModal: () => void;
  onOpenPreArrivalModal: () => void;
  onOpenAddPropertyModal: () => void;
  onOpenLandManagement: () => void;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  onOpenPowModal,
  onOpenServicesModal,
  onOpenEmergencyModal,
  onOpenAIReportModal,
  onOpenSubscriptionModal,
  onOpenPreArrivalModal,
  onOpenAddPropertyModal,
  onOpenLandManagement
}) => {
  const {
    properties,
    activePropertyId,
    setActivePropertyId,
    activeProperty,
    powRecords,
    formatPrice,
    setSelectedPow
  } = useApp();

  const propertyPows = powRecords.filter((p) => p.propertyId === activeProperty.id);

  return (
    <div className="space-y-6">
      
      {/* Property Selector Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-2">
          {properties.map((prop) => (
            <button
              key={prop.id}
              onClick={() => setActivePropertyId(prop.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activePropertyId === prop.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/40 scale-[1.02]'
                  : 'bg-[#12211c] text-slate-300 hover:bg-[#182c25] border border-emerald-900/40'
              }`}
            >
              <span>{prop.type === 'land' ? '🌴' : '🏡'}</span>
              <span>{prop.name}</span>
              <span className="text-[10px] opacity-75 font-normal">({prop.city})</span>
            </button>
          ))}
        </div>

        <button
          onClick={onOpenAddPropertyModal}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold bg-[#142621] text-emerald-300 hover:bg-emerald-900/50 border border-emerald-700/40 hover:border-emerald-500 whitespace-nowrap transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Hero Property Health Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-elevated p-5 sm:p-7 border border-emerald-500/20">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Property Header & Details */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-400 border border-emerald-600/40 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Status: Healthy & Monitored ✅
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-600/40">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {activeProperty.subscriptionPlan} Plan
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#14231f] text-slate-300 border border-emerald-900/50">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {activeProperty.location}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
                {activeProperty.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {activeProperty.tagline}
              </p>
            </div>

            {/* Quick Property Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#0e1b17]/80 border border-emerald-900/40">
                <p className="text-[11px] text-slate-400 font-medium">Last Inspection</p>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {activeProperty.lastInspectionDate}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0e1b17]/80 border border-emerald-900/40">
                <p className="text-[11px] text-slate-400 font-medium">Next Scheduled</p>
                <p className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {activeProperty.nextInspectionDate}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#0e1b17]/80 border border-emerald-900/40">
                <p className="text-[11px] text-slate-400 font-medium">Monsoon Readiness</p>
                <p className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                  {activeProperty.specs.monsoonReadinessScore}% (Excellent)
                </p>
              </div>
            </div>

            {/* Access & Key Security Summary */}
            <div className="p-3 rounded-2xl bg-[#0a1512]/90 border border-emerald-900/40 flex items-start gap-3">
              <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-200">Key & Access: </span>
                <span className="text-slate-400">{activeProperty.keyAccessInfo}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Health Score Gauge & Dedicated Guardian Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Property Health Score Gauge */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#12231e] to-[#0f1d19] border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Overall Health Score
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-white font-['Outfit']">
                    {activeProperty.healthScore}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold">/100</span>
                </div>
                <p className="text-[11px] text-emerald-300/90 mt-0.5">
                  Structure, Roof, Water Tank & Electrical OK
                </p>
              </div>

              <button
                onClick={onOpenAIReportModal}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Report</span>
              </button>
            </div>

            {/* Dedicated Property Manager Contact Card */}
            <div className="p-4 rounded-2xl bg-[#0e1b17] border border-emerald-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeProperty.dedicatedManager.avatar}
                  alt={activeProperty.dedicatedManager.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400/40 shadow"
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                    Your Kerala Property Guardian
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeProperty.dedicatedManager.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {activeProperty.dedicatedManager.designation}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activeProperty.dedicatedManager.phone}`}
                className="p-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-800 hover:text-white transition-all shadow"
                title="Call manager directly"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Quick Action Matrix Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span>
            <span>Remote Property Actions</span>
          </h2>
          <span className="text-xs text-slate-400">Managed locally in {activeProperty.city}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          
          <button
            onClick={onOpenServicesModal}
            className="p-4 rounded-2xl bg-[#12211c] hover:bg-[#162a23] border border-emerald-900/40 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform mb-2">
              <span className="text-lg">🔍</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">Request Service</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Tank, Deep Clean, AC, Paint</p>
            </div>
          </button>

          <button
            onClick={onOpenEmergencyModal}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#241315] to-[#1a0f11] hover:from-[#2e181b] border border-rose-800/50 hover:border-rose-500 text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-950/90 border border-rose-700/60 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform mb-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-rose-200">Monsoon Emergency</p>
              <p className="text-[11px] text-rose-300/70 mt-0.5">Rapid 45-min storm check</p>
            </div>
          </button>

          <button
            onClick={onOpenPreArrivalModal}
            className="p-4 rounded-2xl bg-[#12211c] hover:bg-[#162a23] border border-emerald-900/40 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform mb-2">
              <span className="text-lg">📦</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">Pre-Arrival Prep</p>
              <p className="text-[11px] text-slate-400 mt-0.5">ACs, Fridge, Car Start, Linen</p>
            </div>
          </button>

          <button
            onClick={activeProperty.type === 'land' ? onOpenLandManagement : onOpenSubscriptionModal}
            className="p-4 rounded-2xl bg-[#12211c] hover:bg-[#162a23] border border-emerald-900/40 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform mb-2">
              <span className="text-lg">{activeProperty.type === 'land' ? '🌴' : '👑'}</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                {activeProperty.type === 'land' ? 'Land & Coconuts' : 'Subscription Tier'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeProperty.type === 'land' ? 'Harvesting logs & weeds' : 'Monthly Guardian Plans'}
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* Signature "Proof of Work" (USP) Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                ⭐ Verified Proof of Work Timeline
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Core USP
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-resolution time-stamped Before & After photo/video evidence with verified geo-tags
            </p>
          </div>

          <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
            {propertyPows.length} Verified Records
          </span>
        </div>

        {propertyPows.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#12211c] border border-emerald-900/30 text-center">
            <Camera className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-300">No work records for this property yet</p>
            <p className="text-xs text-slate-400 mt-1">Book an inspection or maintenance service above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {propertyPows.map((pow) => (
              <div
                key={pow.id}
                onClick={() => {
                  setSelectedPow(pow);
                  onOpenPowModal(pow.id);
                }}
                className="group p-4 rounded-3xl bg-[#12211c]/90 hover:bg-[#162923] border border-emerald-900/40 hover:border-emerald-500/60 shadow-lg cursor-pointer transition-all space-y-3"
              >
                {/* Header: Service Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {pow.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {pow.serviceTitle}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      pow.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                    }`}
                  >
                    {pow.status === 'completed' ? 'Verified ✅' : 'In Progress'}
                  </span>
                </div>

                {/* Before / After Thumbnail Preview */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950">
                    <img
                      src={pow.beforeImages[0]?.url || pow.comparisonPair?.beforeUrl || activeProperty.coverImage}
                      alt="Before"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-950/80 text-amber-200 border border-amber-600/50 backdrop-blur-sm">
                      BEFORE
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950">
                    <img
                      src={pow.afterImages[0]?.url || pow.comparisonPair?.afterUrl || activeProperty.coverImage}
                      alt="After"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950/80 text-emerald-200 border border-emerald-600/50 backdrop-blur-sm">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Worker & Meta Info */}
                <div className="flex items-center justify-between pt-1 border-t border-emerald-900/30 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={pow.worker.avatar}
                      alt={pow.worker.name}
                      className="w-6 h-6 rounded-full object-cover border border-emerald-400/40"
                    />
                    <span className="font-semibold text-slate-300 truncate max-w-[120px]">
                      {pow.worker.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-300">
                      {formatPrice(pow.amountTotal)}
                    </p>
                    <p className="text-[10px] text-slate-400">{pow.completedAt.split(',')[0]}</p>
                  </div>
                </div>

                {/* Inspection Checklist Summary pill */}
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#0c1613] text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{pow.beforeImages.length + pow.afterImages.length} Proof Photos Uploaded</span>
                  </span>
                  <span className="text-emerald-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
