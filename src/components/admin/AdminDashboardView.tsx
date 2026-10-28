import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  TrendingUp,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  DollarSign,
  FileCheck,
  UserCheck,
  ChevronRight,
  Activity,
  Award
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { workers, properties, powRecords, formatPrice, showToast } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'kyc' | 'quotes' | 'economics'>('overview');

  // Business Math Simulator State
  const [propertyCount, setPropertyCount] = useState<number>(1000);
  const [avgSubscriptionFee, setAvgSubscriptionFee] = useState<number>(999);
  const [monthlyRepairVolume, setMonthlyRepairVolume] = useState<number>(2000000);
  const [platformMarginPercent, setPlatformMarginPercent] = useState<number>(15);

  const subscriptionRevenue = (propertyCount * avgSubscriptionFee);
  const serviceMarginRevenue = (monthlyRepairVolume * (platformMarginPercent / 100));
  const totalMonthlyMRR = subscriptionRevenue + serviceMarginRevenue;

  return (
    <div className="space-y-6">
      
      {/* Admin Command Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1b1c12] to-[#121c17] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-600/50 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              Kerala Operations Command Center
            </span>
            <span className="text-xs text-slate-400">Regional Desk: Kozhikode & Kannur</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            MyVeedu Platform Control Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time telemetry, worker dispatch verification, quotation margin desk, and recurring NRI revenue streams.
          </p>
        </div>

        {/* Live Network Pulse */}
        <div className="p-3.5 rounded-2xl bg-[#0c1613] border border-emerald-800/40 flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <div className="text-xs text-left">
            <p className="font-bold text-white">48 Field Partners Active</p>
            <p className="text-[10px] text-emerald-400 font-medium">Kerala Monsoon Ready</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        <div className="p-4 rounded-3xl bg-[#12211c] border border-emerald-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Managed Properties</span>
            <Building className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
            1,048
          </p>
          <p className="text-[11px] text-emerald-400 mt-0.5 font-medium">
            +42 this month across 6 districts
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-[#12211c] border border-emerald-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Monthly Recurring MRR</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1">
            {formatPrice(1348000)}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Subscriptions + Service Margins
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-[#12211c] border border-emerald-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Verified Partners</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
            {workers.length + 44}
          </p>
          <p className="text-[11px] text-teal-300 mt-0.5">
            100% Police & Skill Verified
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-[#12211c] border border-emerald-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Emergency Response</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-400 font-['Outfit'] mt-1">
            34 Mins
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Kozhikode & Kannur Coastal zone
          </p>
        </div>

      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'overview'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          📍 Regional Kerala Operations Map
        </button>

        <button
          onClick={() => setActiveAdminTab('kyc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'kyc'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          🛡️ Worker KYC Verification Desk
        </button>

        <button
          onClick={() => setActiveAdminTab('economics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'economics'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          💰 Startup Unit Economics Simulator
        </button>
      </div>

      {/* Tab 1: Regional Kerala Operations Map & Hubs */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-4">
          <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-900/40 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-900/40 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Kerala Launch Cluster (Malabar Phase 1)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Initial density built across Kozhikode → Kannur → Thalassery → Vadakara → Wayanad.
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                Phase 1 Active
              </span>
            </div>

            {/* Regional Clusters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { city: 'Kozhikode Hub', properties: 420, workers: 22, avgHealth: '94%', lead: 'Vipin Chandran' },
                { city: 'Kannur Hub', properties: 310, workers: 14, avgHealth: '91%', lead: 'Praveen Raj' },
                { city: 'Thalassery & Mahe', properties: 180, workers: 8, avgHealth: '89%', lead: 'Shaji Mathew' },
                { city: 'Vadakara Coastal', properties: 95, workers: 6, avgHealth: '93%', lead: 'Haridas K.' },
                { city: 'Wayanad Estate Sector', properties: 125, workers: 9, avgHealth: '90%', lead: 'Dileep Meppadi' },
                { city: 'Malappuram & Manjeri', properties: 85, workers: 5, avgHealth: '92%', lead: 'Rafeeq P.' },
              ].map((hub, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{hub.city}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300">
                      Health: {hub.avgHealth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Managed Properties: <strong className="text-white">{hub.properties}</strong></span>
                    <span>Field Workers: <strong className="text-white">{hub.workers}</strong></span>
                  </div>
                  <p className="text-[11px] text-emerald-400/90 pt-1 border-t border-emerald-900/30">
                    Lead Guardian: {hub.lead}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Worker KYC Desk */}
      {activeAdminTab === 'kyc' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <span>Field Partner KYC & Background Verification</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every technician requires Aadhaar UIDAI verification, local police clearance certificate, and trade test audit.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {workers.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={w.avatar} alt={w.name} className="w-11 h-11 rounded-2xl object-cover border border-emerald-400/40" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-sm">{w.name}</p>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                        Aadhaar Verified ✓
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{w.specialization} • {w.baseLocation} Sector</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">Police Clearance OK</span>
                  <button
                    onClick={() => showToast(`KYC audit certificate for ${w.name} validated!`)}
                    className="px-3 py-1.5 rounded-xl bg-[#152a23] hover:bg-emerald-900 text-emerald-300 font-bold text-xs border border-emerald-700/50 transition-all"
                  >
                    View Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Startup Unit Economics & Recurring Math */}
      {activeAdminTab === 'economics' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-500/40 shadow-2xl space-y-6">
          <div className="border-b border-emerald-900/40 pb-4">
            <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
              Monetization Model
            </span>
            <h3 className="text-xl font-black text-white mt-0.5 font-['Outfit']">
              Interactive Recurring Revenue & Margin Simulator
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              High-value recurring NRI model: Subscriptions + 15% service commissions + Emergency coordination + Renovation margins.
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            
            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3">
              <div className="flex justify-between">
                <span className="font-bold text-slate-200">Active Managed Properties:</span>
                <span className="font-mono font-bold text-emerald-400">{propertyCount} Homes</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={propertyCount}
                onChange={(e) => setPropertyCount(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3">
              <div className="flex justify-between">
                <span className="font-bold text-slate-200">Average Monthly Subscription:</span>
                <span className="font-mono font-bold text-amber-300">{formatPrice(avgSubscriptionFee)} / mo</span>
              </div>
              <input
                type="range"
                min="499"
                max="2499"
                step="100"
                value={avgSubscriptionFee}
                onChange={(e) => setAvgSubscriptionFee(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3">
              <div className="flex justify-between">
                <span className="font-bold text-slate-200">Monthly Maintenance/Repair GMV:</span>
                <span className="font-mono font-bold text-white">{formatPrice(monthlyRepairVolume)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={monthlyRepairVolume}
                onChange={(e) => setMonthlyRepairVolume(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3">
              <div className="flex justify-between">
                <span className="font-bold text-slate-200">Platform Take Margin:</span>
                <span className="font-mono font-bold text-emerald-400">{platformMarginPercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                step="1"
                value={platformMarginPercent}
                onChange={(e) => setPlatformMarginPercent(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

          </div>

          {/* Revenue Breakdown Result Cards */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1b2b24] to-[#101c18] border-2 border-emerald-400/50 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Projected Monthly Financial Output
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#0c1613] text-xs">
                <span className="text-slate-400">Subscription MRR</span>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  {formatPrice(subscriptionRevenue)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0c1613] text-xs">
                <span className="text-slate-400">Service Margin Take</span>
                <p className="text-xl font-bold text-teal-300 font-mono mt-1">
                  {formatPrice(serviceMarginRevenue)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0c1613] text-xs border border-amber-500/40">
                <span className="text-amber-400 font-bold">Total Monthly Net Gross MRR</span>
                <p className="text-2xl font-black text-amber-300 font-mono mt-1">
                  {formatPrice(totalMonthlyMRR)}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic pt-1">
              💡 <strong>Key Insight:</strong> You do NOT need millions of low-ticket users. With only 1,000 high-value recurring NRI properties in Kerala, the platform generates <strong>~₹13 Lakhs / Month (~$15,500 / 57,000 AED)</strong> with strong defensibility.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
