import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palmtree,
  Tractor,
  ShieldCheck,
  PlusCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  CloudRain,
  MapPin,
  CheckCircle2,
  X
} from 'lucide-react';

interface LandManagementViewProps {
  onOpenBooking: () => void;
}

export const LandManagementView: React.FC<LandManagementViewProps> = ({ onOpenBooking }) => {
  const { landRecord, addHarvestLog, formatPrice, activeProperty } = useApp();
  const [showLogHarvestModal, setShowLogHarvestModal] = useState(false);
  const [coconutsCount, setCoconutsCount] = useState(480);
  const [marketRate, setMarketRate] = useState(18);
  const [harvesterName, setHarvesterName] = useState('Anoop Narayanan (Certified Climber)');

  const totalHarvestRevenueINR = landRecord.harvestHistory.reduce(
    (acc, curr) => acc + curr.totalEarningsINR,
    0
  );

  const handleHarvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHarvestLog(coconutsCount, marketRate, harvesterName);
    setShowLogHarvestModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Land & Plantation Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-elevated p-5 sm:p-7 border border-emerald-500/20">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1.5">
                <Palmtree className="w-4 h-4 text-emerald-400" />
                Kerala Agricultural & Land Guardian
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#12211c] text-slate-300 border border-emerald-900/50">
                {landRecord.cents} Cents Plot
              </span>
            </div>

            <button
              onClick={() => setShowLogHarvestModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log New Harvest Yield</span>
            </button>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              {landRecord.propertyName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Location: Meppadi Valley, Wayanad • Monitored Boundary & Regular Coconut Cycles
            </p>
          </div>

          {/* Land Asset Matrix Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            <div className="p-4 rounded-2xl bg-[#0e1b17] border border-emerald-900/40">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Coconut Trees
              </span>
              <p className="text-2xl font-black text-emerald-400 font-['Outfit'] mt-0.5">
                🌴 {landRecord.coconutTreesCount}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">High-yield West Coast Tall</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1b17] border border-emerald-900/40">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Last Grass & Weed Cut
              </span>
              <p className="text-sm font-bold text-white mt-1 flex items-center gap-1">
                <Tractor className="w-3.5 h-3.5 text-emerald-400" />
                {landRecord.lastGrassCutDate}
              </p>
              <p className="text-[10px] text-emerald-400 mt-1">Brush-cut & mulched</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1b17] border border-emerald-900/40">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Next Harvest Due
              </span>
              <p className="text-sm font-bold text-amber-300 mt-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {landRecord.nextHarvestDate}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Estimated 450+ nuts</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1b17] border border-emerald-900/40">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Boundary Fence
              </span>
              <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {landRecord.fenceCondition}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Perimeter 100% Intact</p>
            </div>

          </div>

        </div>
      </div>

      {/* Harvest Revenue & Sale History */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-900/40 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/40 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Coconut Harvest Revenue & Direct NRI Payouts</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              We harvest, count, and sell mature coconuts to wholesale merchants at transparent rates on your behalf.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#0c1613] border border-emerald-800/40 text-left sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Total Harvest Income (2026)
            </span>
            <p className="text-lg font-black text-amber-300 font-mono">
              +{formatPrice(totalHarvestRevenueINR)}
            </p>
          </div>
        </div>

        {/* Harvest Records List */}
        <div className="space-y-2.5">
          {landRecord.harvestHistory.map((harv) => (
            <div
              key={harv.id}
              className="p-3.5 rounded-2xl bg-[#0c1613] border border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/50 flex items-center justify-center font-bold">
                  🌴
                </div>
                <div>
                  <p className="font-bold text-white text-sm">
                    {harv.coconutsHarvested} Coconuts Harvested
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Harvester: <span className="text-slate-200">{harv.harvesterName}</span> • Date: {harv.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-400">Wholesale Rate</span>
                  <p className="text-slate-200 font-medium">₹{harv.marketRatePerNut} / nut</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Net Credited</span>
                  <p className="text-emerald-400 font-mono font-black text-sm">
                    +{formatPrice(harv.totalEarningsINR)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-xl bg-[#172c25] hover:bg-emerald-900 text-emerald-300 font-bold text-xs border border-emerald-700/50 transition-all flex items-center gap-1.5"
          >
            <Tractor className="w-3.5 h-3.5" />
            <span>Order Land Clearing or Tree Care</span>
          </button>
        </div>

      </div>

      {/* Soil, Rain & Drainage Log */}
      <div className="p-5 rounded-3xl bg-[#12211c] border border-emerald-900/40 space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-emerald-400" />
          <span>Monsoon Rainfall & Soil Drainage Condition</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {landRecord.soilAndRainLog.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#0c1613] border border-emerald-900/30 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{log.date}</span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-700/50">
                  {log.rainfallMm} mm Rainfall
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">{log.drainageCondition}</p>
              <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Action: {log.actionTaken}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Log Harvest Modal */}
      {showLogHarvestModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#11201b] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400">
                  Harvest Yield Ledger
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Log Coconut Harvest & Sale
                </h3>
              </div>
              <button
                onClick={() => setShowLogHarvestModal(false)}
                className="p-1.5 rounded-xl bg-[#0c1613] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleHarvestSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Number of Coconuts Harvested
                </label>
                <input
                  type="number"
                  value={coconutsCount}
                  onChange={(e) => setCoconutsCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white font-mono font-bold"
                  min="1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Local Kerala Wholesale Rate (₹ per nut)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={marketRate}
                  onChange={(e) => setMarketRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white font-mono font-bold"
                  min="5"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Certified Harvester / Climber Name
                </label>
                <input
                  type="text"
                  value={harvesterName}
                  onChange={(e) => setHarvesterName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1613] border border-emerald-800/40 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Gross Sale Value:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatPrice(coconutsCount * marketRate)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400">
                  <span>Net Credited to NRI Bank Account:</span>
                  <span className="font-mono font-bold">
                    {formatPrice(coconutsCount * marketRate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogHarvestModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0c1613] text-slate-300 hover:text-white font-bold border border-emerald-900/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-lg"
                >
                  Save & Credit Yield
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
