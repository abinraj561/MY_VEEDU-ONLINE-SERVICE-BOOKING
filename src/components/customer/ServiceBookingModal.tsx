import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { services, bookService, formatPrice, activeProperty } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'maintenance', label: 'Property Health & Plumbing' },
    { id: 'cleaning', label: 'Deep Cleaning & Water Tank' },
    { id: 'land', label: 'Land & Coconut Care' },
    { id: 'pre_arrival', label: 'Pre-Arrival Homecoming' },
    { id: 'specialized', label: 'Painting & Renovation' }
  ];

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.malayalamName && s.malayalamName.includes(searchQuery));
    return matchesCat && matchesSearch;
  });

  const handleConfirmBooking = (service: ServiceItem) => {
    bookService(service.id, customNotes);
    setActiveService(null);
    setCustomNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1b17] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-b border-emerald-900/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Kerala Local Services
              </span>
              <span className="text-xs text-slate-300">
                Service location: <strong className="text-white">{activeProperty.city}</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit']">
              Book On-Demand Care & Maintenance
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Every job comes with guaranteed <strong className="text-amber-300">"Proof of Work"</strong> Before/After photos and time-stamped checklist.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#0c1613] hover:bg-[#1a3028] text-slate-400 hover:text-white border border-emerald-900/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-[#11201b] border-b border-emerald-900/30 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plumbing, water tank, painting, coconut tree..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-[#0c1613] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          
          {filteredServices.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No services match your search query. Try another keyword.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="p-4 sm:p-5 rounded-3xl bg-[#12211c] border border-emerald-900/40 hover:border-emerald-500/60 shadow-lg transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {service.name}
                          </h3>
                          {service.malayalamName && (
                            <span className="text-[11px] text-emerald-400/80 font-medium">
                              ({service.malayalamName})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-0.5">
                          {service.tagline}
                        </p>
                      </div>

                      {service.badge && (
                        <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-600/50">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {service.description}
                    </p>

                    {/* What is Included Bullets */}
                    <div className="space-y-1 pt-1">
                      {service.whatIsIncluded.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Standard Rate</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                          {formatPrice(service.basePriceINR)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          • {service.durationEst}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveService(service)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 active:scale-95"
                    >
                      <span>Book Service</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Confirm Booking Drawer Modal */}
        {activeService && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#11201b] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400">
                    Confirm Service Booking
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeService.name}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Property: <strong className="text-white">{activeProperty.name}</strong> ({activeProperty.city})
                  </p>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-1.5 rounded-xl bg-[#0c1613] text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-mono font-bold text-white">{formatPrice(activeService.basePriceINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Duration:</span>
                  <span className="text-emerald-400 font-semibold">{activeService.durationEst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality Guarantee:</span>
                  <span className="text-amber-300 font-semibold">Verified Proof-of-Work</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Specific Instructions for Field Partner (Optional)
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  rows={2}
                  placeholder="E.g., Please pay special attention to the guest bathroom shower drain..."
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0c1613] text-slate-300 hover:text-white text-xs font-bold border border-emerald-900/40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmBooking(activeService)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition-all"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
