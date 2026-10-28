import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  ProofOfWork,
  ServiceItem,
  CurrencyCode,
  UserRole,
  DeviceMode,
  EmergencyRequest,
  AIInspectionReport,
  LandRecord,
  PreArrivalChecklist,
  SubscriptionTier,
  WorkerInfo
} from '../types';
import {
  CURRENCIES,
  INITIAL_PROPERTIES,
  INITIAL_WORKERS,
  INITIAL_POW_RECORDS,
  SERVICE_CATALOG,
  SUBSCRIPTION_TIERS,
  INITIAL_LAND_RECORD,
  INITIAL_AI_REPORT,
  INITIAL_PRE_ARRIVAL
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Role & Viewport
  role: UserRole;
  setRole: (role: UserRole) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatPrice: (priceINR: number) => string;

  // Properties
  properties: Property[];
  activePropertyId: string;
  setActivePropertyId: (id: string) => void;
  activeProperty: Property;
  addProperty: (property: Property) => void;

  // Proof of Work
  powRecords: ProofOfWork[];
  selectedPow: ProofOfWork | null;
  setSelectedPow: (pow: ProofOfWork | null) => void;
  approvePow: (id: string) => void;
  addPowRecord: (pow: ProofOfWork) => void;

  // Workers
  workers: WorkerInfo[];
  activeWorker: WorkerInfo;
  setActiveWorkerId: (id: string) => void;

  // Services & Bookings
  services: ServiceItem[];
  bookService: (serviceId: string, customNotes?: string) => void;

  // Emergency Dispatch
  activeEmergency: EmergencyRequest | null;
  triggerEmergency: (reason: string, issueType: EmergencyRequest['issueType']) => void;
  advanceEmergencyStep: () => void;
  approveEmergencyQuote: () => void;
  cancelEmergency: () => void;

  // AI Diagnostic Reports
  aiReport: AIInspectionReport;
  generateAIReport: (propertyId: string) => void;

  // Land Management
  landRecord: LandRecord;
  addHarvestLog: (coconuts: number, rate: number, harvester: string) => void;

  // Pre-Arrival Concierge
  preArrival: PreArrivalChecklist;
  togglePreArrivalItem: (itemId: string) => void;

  // Subscription
  subscriptionTiers: SubscriptionTier[];
  updatePropertySubscription: (propertyId: string, plan: 'Basic' | 'Standard' | 'Premium Guardian') => void;

  // Toasts / Alerts
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Role & Device
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('myveedu_role') as UserRole) || 'customer';
  });
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(() => {
    return (localStorage.getItem('myveedu_device') as DeviceMode) || 'desktop';
  });

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    return (localStorage.getItem('myveedu_curr') as CurrencyCode) || 'AED'; // Default to UAE Dirham for Gulf NRIs
  });

  // Properties
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('myveedu_props');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });
  const [activePropertyId, setActivePropertyId] = useState<string>(() => {
    return properties[0]?.id || 'prop-calicut-01';
  });

  // Proof of Work
  const [powRecords, setPowRecords] = useState<ProofOfWork[]>(() => {
    const saved = localStorage.getItem('myveedu_pows');
    return saved ? JSON.parse(saved) : INITIAL_POW_RECORDS;
  });
  const [selectedPow, setSelectedPow] = useState<ProofOfWork | null>(null);

  // Workers
  const [workers] = useState<WorkerInfo[]>(INITIAL_WORKERS);
  const [activeWorkerId, setActiveWorkerId] = useState<string>('wrk-01');

  // Emergency
  const [activeEmergency, setActiveEmergency] = useState<EmergencyRequest | null>(null);

  // AI Report
  const [aiReport, setAiReport] = useState<AIInspectionReport>(INITIAL_AI_REPORT);

  // Land Records
  const [landRecord, setLandRecord] = useState<LandRecord>(INITIAL_LAND_RECORD);

  // Pre-Arrival Concierge
  const [preArrival, setPreArrival] = useState<PreArrivalChecklist>(INITIAL_PRE_ARRIVAL);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('myveedu_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('myveedu_device', deviceMode);
  }, [deviceMode]);

  useEffect(() => {
    localStorage.setItem('myveedu_curr', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('myveedu_props', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('myveedu_pows', JSON.stringify(powRecords));
  }, [powRecords]);

  // Derived Active Items
  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0];
  const activeWorker = workers.find((w) => w.id === activeWorkerId) || workers[0];

  // Currency Converter Formatter
  const formatPrice = (priceINR: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = priceINR / config.rateToINR;
    if (currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
  };

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    setActivePropertyId(newProp.id);
    showToast(`Property "${newProp.name}" added successfully!`);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const approvePow = (id: string) => {
    setPowRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, customerApproved: true } : item))
    );
    showToast('Proof of Work approved! Worker payout processed.');
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
  };

  const addPowRecord = (newPow: ProofOfWork) => {
    setPowRecords((prev) => [newPow, ...prev]);
    showToast('New Proof of Work record submitted to NRI client!');
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  const bookService = (serviceId: string, customNotes?: string) => {
    const service = SERVICE_CATALOG.find((s) => s.id === serviceId);
    if (!service) return;

    const newPow: ProofOfWork = {
      id: `pow-${Date.now()}`,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      propertyCity: activeProperty.city,
      serviceTitle: service.name,
      category: service.category,
      worker: INITIAL_WORKERS[Math.floor(Math.random() * INITIAL_WORKERS.length)],
      completedAt: 'In Progress (Scheduled for tomorrow morning)',
      durationMinutes: 90,
      status: 'in_progress',
      gpsCoordinates: activeProperty.geoCoordinates,
      beforeImages: [
        {
          id: `b-${Date.now()}`,
          url: activeProperty.coverImage,
          caption: 'Pre-service initial site inspection photo',
          timestamp: 'Just now',
          area: 'Main Entrance & Facade'
        }
      ],
      duringMedia: [],
      afterImages: [],
      checklist: service.whatIsIncluded.map((item) => ({
        title: item,
        passed: false
      })),
      itemizedBill: [
        { description: service.name, cost: service.basePriceINR },
        { description: 'Kerala Field Supervisor Quality Check', cost: 0 }
      ],
      amountTotal: service.basePriceINR,
      platformMargin: Math.round(service.basePriceINR * 0.15),
      workerPayout: Math.round(service.basePriceINR * 0.85),
      customerApproved: false,
      aiDiagnosticNote: customNotes || 'Service dispatched to certified regional partner. Photos will update live.'
    };

    setPowRecords((prev) => [newPow, ...prev]);
    showToast(`Booked ${service.name}! Local team assigned in ${activeProperty.city}.`);
    confetti({ particleCount: 60, spread: 60 });
  };

  const triggerEmergency = (reason: string, issueType: EmergencyRequest['issueType']) => {
    const assignedWorker = INITIAL_WORKERS.find((w) => w.baseLocation === activeProperty.city) || INITIAL_WORKERS[0];
    const newEmergency: EmergencyRequest = {
      id: `emg-${Date.now()}`,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      issueType,
      issueDescription: reason,
      requestedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      currentStep: 'dispatched',
      workerAssigned: assignedWorker,
      etaMinutes: 28,
      livePhotos: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
      ],
      inspectorNotes: 'Rapid monsoon emergency team dispatched. GPS vehicle tracking active.',
      repairQuote: {
        issueFound: 'Storm foliage blocking secondary roof channel & dampness seepage risk',
        severity: 'critical',
        repairEstimateINR: 1950,
        quoteBreakdown: [
          { item: 'Priority Storm Callout & Safety Tarping', cost: 299 },
          { item: 'Channel Clearance & High-flow Strainer Fitment', cost: 950 },
          { item: 'Waterproof Membrane Sealant Application', cost: 700 }
        ],
        approvedByCustomer: false
      }
    };
    setActiveEmergency(newEmergency);
    showToast('🚨 Emergency team dispatched! Live status active.');
  };

  const advanceEmergencyStep = () => {
    if (!activeEmergency) return;
    const steps: EmergencyRequest['currentStep'][] = [
      'dispatched',
      'arrived',
      'inspecting',
      'quote_ready',
      'repair_approved',
      'completed'
    ];
    const currentIndex = steps.indexOf(activeEmergency.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setActiveEmergency({
        ...activeEmergency,
        currentStep: nextStep,
        inspectorNotes:
          nextStep === 'arrived'
            ? 'Technician on-site at gate. Keybox accessed and perimeter secured.'
            : nextStep === 'inspecting'
            ? 'Multi-point storm damage inspection in progress. Photos uploading...'
            : nextStep === 'quote_ready'
            ? 'Inspection complete. Quotation generated with zero markup. Awaiting NRI approval.'
            : nextStep === 'repair_approved'
            ? 'Customer approved! Emergency waterproofing & clearing under way.'
            : 'Emergency resolved. Final Proof-of-Work certificate submitted.'
      });
      showToast(`Emergency status updated: ${nextStep.toUpperCase()}`);
    }
  };

  const approveEmergencyQuote = () => {
    if (!activeEmergency || !activeEmergency.repairQuote) return;
    setActiveEmergency({
      ...activeEmergency,
      currentStep: 'repair_approved',
      repairQuote: {
        ...activeEmergency.repairQuote,
        approvedByCustomer: true
      }
    });
    showToast('Quotation approved! Emergency repair authorized immediately.');
    confetti({ particleCount: 50, spread: 70 });
  };

  const cancelEmergency = () => {
    setActiveEmergency(null);
    showToast('Emergency incident closed.');
  };

  const generateAIReport = (propId: string) => {
    const prop = properties.find((p) => p.id === propId) || activeProperty;
    const newReport: AIInspectionReport = {
      id: `air-${Date.now()}`,
      propertyId: prop.id,
      propertyName: prop.name,
      generatedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      overallScore: Math.floor(Math.random() * 12) + 86, // 86-98
      overallGrade: 'A',
      verdictHeadline: `AI Vision Analysis: ${prop.name} shows high stability with zero critical monsoon risks`,
      summaryParagraph: `Analyzed 18 high-resolution field photos for ${prop.name}. Foundation, roof gutters, electrical breaker switches, and water storage are in top condition. Minor preventative suggestions highlighted below.`,
      monsoonRiskIndex: 'Low',
      scannedPhotoCount: 18,
      categoryScores: [
        { category: 'Roof & Drainage Slopes', score: 95, status: 'Optimal', findings: 'Rain gutters unblocked. Zero pooled standing water.' },
        { category: 'Water Tank & Sump Hygiene', score: 98, status: 'Optimal', findings: 'Tank chlorinated and sealed. Auto-cut switch functional.' },
        { category: 'Electrical & Inverter Battery', score: 92, status: 'Optimal', findings: 'Battery electrolyte levels optimal. Surge protector active.' },
        { category: 'Wall Moisture & Paint Integrity', score: 87, status: 'Fair', findings: 'Exterior paint hydrophobic. Moisture meter: 15% (Normal).' }
      ],
      detectedAnomalies: [
        {
          id: `anom-${Date.now()}-1`,
          area: 'Southern Exterior Garden Wall',
          severity: 'Low',
          title: 'Minor Moss Growth along base skirting',
          detail: 'Seasonal dampness from heavy rain splashing ground soil onto base skirting.',
          recommendation: 'Recommend applying anti-fungal wash before winter.',
          estimatedCostINR: 550,
          imageThumbnail: prop.coverImage
        }
      ]
    };
    setAiReport(newReport);
    showToast(`AI Inspection generated for ${prop.name}!`);
    confetti({ particleCount: 45, spread: 50 });
  };

  const addHarvestLog = (coconuts: number, rate: number, harvester: string) => {
    const totalEarnings = coconuts * rate;
    const newLog = {
      id: `harv-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      coconutsHarvested: coconuts,
      marketRatePerNut: rate,
      totalEarningsINR: totalEarnings,
      harvesterName: harvester
    };
    setLandRecord((prev) => ({
      ...prev,
      lastGrassCutDate: 'Today',
      harvestHistory: [newLog, ...prev.harvestHistory]
    }));
    showToast(`Harvest recorded: ${coconuts} nuts = ₹${totalEarnings.toLocaleString()} credited!`);
    confetti({ particleCount: 50, spread: 60 });
  };

  const togglePreArrivalItem = (itemId: string) => {
    setPreArrival((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === itemId ? { ...it, completed: !it.completed } : it))
    }));
  };

  const updatePropertySubscription = (propId: string, plan: 'Basic' | 'Standard' | 'Premium Guardian') => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propId ? { ...p, subscriptionPlan: plan } : p))
    );
    showToast(`Updated subscription to ${plan} for ${activeProperty.name}!`);
    confetti({ particleCount: 75, spread: 80 });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        deviceMode,
        setDeviceMode,
        currency,
        setCurrency,
        formatPrice,
        properties,
        activePropertyId,
        setActivePropertyId,
        activeProperty,
        addProperty,
        powRecords,
        selectedPow,
        setSelectedPow,
        approvePow,
        addPowRecord,
        workers,
        activeWorker,
        setActiveWorkerId,
        services: SERVICE_CATALOG,
        bookService,
        activeEmergency,
        triggerEmergency,
        advanceEmergencyStep,
        approveEmergencyQuote,
        cancelEmergency,
        aiReport,
        generateAIReport,
        landRecord,
        addHarvestLog,
        preArrival,
        togglePreArrivalItem,
        subscriptionTiers: SUBSCRIPTION_TIERS,
        updatePropertySubscription,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
