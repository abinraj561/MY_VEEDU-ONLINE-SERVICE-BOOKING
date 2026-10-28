import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProofOfWork } from '../../types';
import {
  Wrench,
  CheckCircle2,
  Camera,
  MapPin,
  Clock,
  DollarSign,
  Upload,
  ArrowRight,
  ShieldCheck,
  Video,
  FileCheck,
  Award,
  Wallet,
  Check
} from 'lucide-react';

export const WorkerAppView: React.FC = () => {
  const {
    activeWorker,
    powRecords,
    addPowRecord,
    formatPrice,
    activeProperty,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'submit_pow' | 'wallet'>('jobs');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Field Form State
  const [jobTitle, setJobTitle] = useState('Overhead Sintex Water Tank Deep Pressure Wash & Chlorination');
  const [beforePhotos, setBeforePhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
  ]);
  const [afterPhotos, setAfterPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80'
  ]);
  const [technicianNotes, setTechnicianNotes] = useState(
    'Scrubbed all 4 internal quadrants. Replaced float valve. Zero leaks found.'
  );

  const handleAddSamplePhoto = (type: 'before' | 'after') => {
    if (type === 'before') {
      setBeforePhotos((prev) => [
        ...prev,
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
      ]);
      showToast('📸 Added new Before inspection photo');
    } else {
      setAfterPhotos((prev) => [
        ...prev,
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
      ]);
      showToast('📸 Added new After completion photo');
    }
  };

  const handleSubmitProof = () => {
    const newPow: ProofOfWork = {
      id: `pow-wrk-${Date.now()}`,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      propertyCity: activeProperty.city,
      serviceTitle: jobTitle,
      category: 'Water & Plumbing',
      worker: activeWorker,
      completedAt: 'Just Now, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: 85,
      status: 'completed',
      gpsCoordinates: activeProperty.geoCoordinates,
      beforeImages: beforePhotos.map((url, i) => ({
        id: `b-${i}`,
        url,
        caption: `Field capture Before #${i + 1}`,
        timestamp: 'Today, 10:15 AM',
        area: 'Tank Internal Chamber'
      })),
      duringMedia: [
        {
          id: 'd-1',
          url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          caption: 'Pressure jet cleaning & UV lamp sterilization',
          timestamp: 'Today, 11:00 AM',
          area: 'Scrubbing Phase'
        }
      ],
      afterImages: afterPhotos.map((url, i) => ({
        id: `a-${i}`,
        url,
        caption: `Field capture After Completion #${i + 1}`,
        timestamp: 'Today, 11:45 AM',
        area: 'Finished Inspection'
      })),
      comparisonPair: {
        beforeUrl: beforePhotos[0],
        afterUrl: afterPhotos[0],
        title: 'Water Tank Sanitization',
        description: 'Comparison of initial sediment vs. sanitized water tank.'
      },
      checklist: [
        { title: 'De-sludging and sediment vacuuming completed', passed: true },
        { title: '140 Bar pressurized rotary wash performed', passed: true },
        { title: 'Food grade anti-bacterial organic sanitizer applied', passed: true },
        { title: 'Automatic float switch electrical cutoff tested', passed: true }
      ],
      itemizedBill: [
        { description: 'Tank Deep Sanitization Labor & Material', cost: 1650 },
        { description: 'Heavy-Duty Brass Float Switch Replacement', cost: 450 }
      ],
      amountTotal: 2100,
      platformMargin: 315,
      workerPayout: 1785,
      customerApproved: false,
      aiDiagnosticNote: technicianNotes
    };

    addPowRecord(newPow);
    setCurrentStep(1);
    setActiveTab('jobs');
  };

  return (
    <div className="space-y-6">
      
      {/* Worker Profile & Earnings Hero Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#12231e] to-[#0c1613] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <img
            src={activeWorker.avatar}
            alt={activeWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-lg"
          />

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white font-['Outfit']">
                {activeWorker.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                KYC Verified Partner
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-0.5">{activeWorker.specialization}</p>

            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="text-amber-400 font-bold">★ {activeWorker.rating} Rating</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{activeWorker.completedJobsCount} Jobs Completed</span>
              <span>•</span>
              <span>{activeWorker.baseLocation} Hub</span>
            </div>
          </div>
        </div>

        {/* Worker Wallet Quick Box */}
        <div className="p-3.5 rounded-2xl bg-[#0a1512] border border-emerald-800/40 text-left sm:text-right w-full sm:w-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Today's Payout Balance
          </span>
          <p className="text-2xl font-black text-amber-300 font-mono mt-0.5">
            {formatPrice(2125)}
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● Instant UPI Payout Active
          </span>
        </div>

      </div>

      {/* Worker Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jobs'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          📋 Assigned Jobs Queue (2 Active)
        </button>

        <button
          onClick={() => setActiveTab('submit_pow')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'submit_pow'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          📸 Upload Proof-of-Work
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'wallet'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-[#12211c] text-slate-400 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" />
            <span>Earnings & Payouts</span>
          </span>
        </button>
      </div>

      {/* Tab 1: Assigned Jobs Queue */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Today's Assigned Kerala Work Orders</h3>
            <span className="text-xs text-slate-400">Sector: Kozhikode & Kannur Coast</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Active Job 1 */}
            <div className="p-5 rounded-3xl bg-[#12211c] border-2 border-emerald-500/40 shadow-xl space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Ready to Execute
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  Payout: {formatPrice(1785)}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Overhead 2,000L Sintex Water Tank Deep Sanitation
                </h4>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {activeProperty.name}, {activeProperty.location}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1613] text-xs space-y-1 text-slate-300">
                <p className="font-semibold text-white">Client NRI: Suresh Menon (Dubai)</p>
                <p className="text-[11px] text-slate-400">
                  Keybox on porch pillar (PIN: 8492). Requires 4 before photos, 1 scrub video, and 4 after photos.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('submit_pow');
                  setCurrentStep(1);
                  showToast('Started Proof-of-Work submission for Water Tank job.');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Open Proof-of-Work Camera</span>
              </button>
            </div>

            {/* Active Job 2 */}
            <div className="p-5 rounded-3xl bg-[#12211c] border border-emerald-900/40 shadow-xl space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-950 text-amber-300 border border-amber-700/60">
                  Scheduled 03:00 PM
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  Payout: {formatPrice(2380)}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Vacant 4 BHK Pre-Arrival Deep Floor Polish & AC Tune
                </h4>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Kannur Green Haven, Thottada Beach
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1613] text-xs space-y-1 text-slate-300">
                <p className="font-semibold text-white">Client NRI: Dr. Harish (London, UK)</p>
                <p className="text-[11px] text-slate-400">
                  Includes testing Daikin AC cooling and changing laundered linens in 3 bedrooms.
                </p>
              </div>

              <button
                onClick={() => showToast('Directions loaded in Google Maps!')}
                className="w-full py-2.5 rounded-xl bg-[#182e27] hover:bg-emerald-900 text-emerald-300 font-bold text-xs border border-emerald-700/50 transition-all flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>Navigate to Property</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Interactive Step-by-Step Proof of Work Submission */}
      {activeTab === 'submit_pow' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-500/40 shadow-2xl space-y-6">
          
          {/* Progress Steps Header */}
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                Field Technician Proof Submission
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Step {currentStep} of 4: {currentStep === 1 ? 'Capture Before Photos' : currentStep === 2 ? 'Record During Video / Scrub' : currentStep === 3 ? 'Capture After Photos' : 'Checklist & Submit'}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    s === currentStep
                      ? 'bg-emerald-600 text-white border border-emerald-400'
                      : s < currentStep
                      ? 'bg-emerald-950 text-emerald-400'
                      : 'bg-[#0c1613] text-slate-500'
                  }`}
                >
                  {s < currentStep ? '✓' : s}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Before Photos */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                📸 <strong>Rule:</strong> Take at least 2 clear, well-lit photos showing initial dirty or unserviced state before beginning work.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {beforePhotos.map((url, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-amber-600/50">
                    <img src={url} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-200">
                      BEFORE #{idx + 1}
                    </span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddSamplePhoto('before')}
                  className="rounded-2xl border-2 border-dashed border-emerald-700/60 hover:border-emerald-400 aspect-video flex flex-col items-center justify-center text-slate-400 hover:text-emerald-300 transition-all bg-[#0c1613]"
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">+ Snap Camera Photo</span>
                </button>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Continue to Step 2: During Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: During Video / Action */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                📹 <strong>Rule:</strong> Record a short 10-second video of high-pressure scrubbing or ongoing maintenance.
              </div>

              <div className="p-6 rounded-3xl bg-[#0c1613] border border-teal-900/40 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-teal-950 text-teal-300 border border-teal-700/60 flex items-center justify-center mx-auto">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Rotary Pressure Wash Clip Captured (0:14s)</p>
                  <p className="text-xs text-slate-400 mt-0.5">High definition 1080p • Geo-tagged Kozhikode Beach Road</p>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-[#0c1613]"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Continue to Step 3: After Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: After Photos */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200">
                ✅ <strong>Rule:</strong> Capture clear After photos demonstrating pristine, sanitized, spotless finish.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {afterPhotos.map((url, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-emerald-600/50">
                    <img src={url} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-200">
                      AFTER #{idx + 1}
                    </span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddSamplePhoto('after')}
                  className="rounded-2xl border-2 border-dashed border-emerald-700/60 hover:border-emerald-400 aspect-video flex flex-col items-center justify-center text-slate-400 hover:text-emerald-300 transition-all bg-[#0c1613]"
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">+ Snap After Photo</span>
                </button>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-[#0c1613]"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Continue to Step 4: Sign-off</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Sign-off & Submit to NRI Client */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/40 space-y-3 text-xs">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>5-Point Quality Check Completed</span>
                </h4>

                <div className="space-y-2 text-slate-300">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                    <span>De-sludging and rotary jet pressure wash performed (140 bar)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                    <span>UV chamber sterilization applied for 15 minutes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                    <span>Automatic float cut-off switch tested and calibrated</span>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="text-slate-300 font-bold block mb-1">
                    Technician Summary Notes for NRI Client
                  </label>
                  <textarea
                    value={technicianNotes}
                    onChange={(e) => setTechnicianNotes(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 rounded-xl bg-[#12211c] border border-emerald-900/40 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-[#0c1613]"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmitProof}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-950 transition-all flex items-center gap-2 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUBMIT PROOF-OF-WORK TO NRI CLIENT</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab 3: Earnings & Wallet */}
      {activeTab === 'wallet' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#12211c] border border-emerald-900/40 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/40 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span>Field Partner Earnings Ledger</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                85% of customer invoice paid directly to your registered UPI ID daily.
              </p>
            </div>

            <button
              onClick={() => showToast('₹2,125 transferred to GPay/UPI (9847120987@okaxis)!')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Withdraw to UPI Instantly
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 uppercase font-bold">This Week Earnings</span>
              <p className="text-xl font-bold text-emerald-400 font-mono mt-1">₹14,800</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 uppercase font-bold">September 2026 Total</span>
              <p className="text-xl font-bold text-white font-mono mt-1">₹34,500</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0c1613] border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Service Margin Kept</span>
              <p className="text-xl font-bold text-amber-300 font-mono mt-1">85% Clean Payout</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
