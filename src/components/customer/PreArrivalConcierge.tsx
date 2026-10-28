import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  CheckCircle2,
  Clock,
  Car,
  ShoppingBag,
  Flame,
  Wind,
  PlusCircle,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';

interface PreArrivalConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreArrivalConcierge: React.FC<PreArrivalConciergeProps> = ({ isOpen, onClose }) => {
  const { preArrival, togglePreArrivalItem, activeProperty, showToast } = useApp();
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newRequestText, setNewRequestText] = useState('');

  if (!isOpen) return null;

  const completedCount = preArrival.items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / preArrival.items.length) * 100);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appliances':
        return <Wind className="w-4 h-4 text-emerald-400" />;
      case 'car_maintenance':
        return <Car className="w-4 h-4 text-amber-400" />;
      case 'fridge_groceries':
        return <ShoppingBag className="w-4 h-4 text-teal-400" />;
      case 'deep_clean':
        return <Flame className="w-4 h-4 text-rose-400" />;
      default:
        return <Home className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e1b17] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#142621] to-[#0c1613] border-b border-emerald-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600/50 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                NRI Homecoming Concierge
              </span>
              <span className="text-xs text-amber-300 font-semibold">
                Arrival: {preArrival.arrivalDate} ({preArrival.daysRemaining} Days Left)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit']">
              Pre-Arrival House & Vehicle Readiness
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Step into your Kerala home with fresh air, stocked pantry, cool AC, and your garage vehicle battery running.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-[#182c25] text-slate-400 hover:text-white border border-emerald-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {/* Progress Banner */}
          <div className="p-4 rounded-2xl bg-[#12211c] border border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Homecoming Readiness Progress</span>
              <span className="font-mono font-bold text-emerald-400">{completedCount} of {preArrival.items.length} Tasks Ready ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#0a1512] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Interactive Concierge Checklist</h3>
              <button
                onClick={() => setShowAddCustom(true)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Custom Request</span>
              </button>
            </div>

            {preArrival.items.map((item) => (
              <div
                key={item.id}
                onClick={() => togglePreArrivalItem(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-xs ${
                  item.completed
                    ? 'bg-emerald-950/40 border-emerald-600/40 text-slate-200'
                    : 'bg-[#12211c] border-emerald-900/40 text-slate-300 hover:bg-[#172b24]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold text-xs sm:text-sm ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.task}
                    </p>
                    {item.assignedTo && (
                      <p className="text-[10px] text-emerald-400/90 mt-0.5">
                        Assigned Guardian: {item.assignedTo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 p-2 rounded-xl bg-[#0c1613]">
                  {getCategoryIcon(item.category)}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Request Input Modal */}
          {showAddCustom && (
            <div className="p-4 rounded-2xl bg-[#142621] border border-emerald-600/40 space-y-3">
              <span className="text-xs font-bold text-white block">
                Add Custom Request for Local Guardian {activeProperty.dedicatedManager.name}
              </span>
              <input
                type="text"
                value={newRequestText}
                onChange={(e) => setNewRequestText(e.target.value)}
                placeholder="E.g. Buy 1kg Kozhikode Halwa, tune TV Airtel DTH connection..."
                className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddCustom(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0c1613] text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newRequestText.trim()) {
                      showToast('Custom request added to concierge checklist!');
                      setShowAddCustom(false);
                      setNewRequestText('');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Request
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-t border-emerald-900/40 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Manager will send live welcome photos 6 hours before arrival.
          </span>
          <button
            onClick={() => {
              showToast('Pre-Arrival plan confirmed with Kozhikode team!');
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            Confirm Pre-Arrival Plan
          </button>
        </div>

      </div>
    </div>
  );
};
