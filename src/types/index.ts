export type UserRole = 'customer' | 'worker' | 'admin';
export type DeviceMode = 'desktop' | 'mobile_ios';
export type CurrencyCode = 'INR' | 'AED' | 'USD' | 'GBP' | 'QAR' | 'SAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateToINR: number; // 1 unit in INR (e.g. 1 AED = 22.8 INR)
  label: string;
  flag: string;
}

export type PropertyType = 'villa' | 'house' | 'apartment' | 'land';
export type PropertyStatus = 'healthy' | 'attention' | 'action_needed';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  tagline: string;
  location: string;
  city: 'Kozhikode' | 'Kannur' | 'Thalassery' | 'Vadakara' | 'Wayanad' | 'Malappuram';
  district: string;
  address: string;
  geoCoordinates: string;
  coverImage: string;
  galleryImages: string[];
  healthScore: number; // 0-100
  status: PropertyStatus;
  lastInspectionDate: string;
  nextInspectionDate: string;
  subscriptionPlan: 'Basic' | 'Standard' | 'Premium Guardian';
  dedicatedManager: {
    name: string;
    phone: string;
    avatar: string;
    designation: string;
  };
  keyAccessInfo: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  specs: {
    bedrooms?: number;
    bathrooms?: number;
    builtAreaSqFt?: number;
    landCents?: number;
    floors?: number;
    builtYear?: number;
    coconutTrees?: number;
    waterSource: string; // e.g. 'Well with Automatic Submersible + KWA'
    powerBackup: string; // e.g. 'Solar Inverter 3.5kVA'
    cctvOnline: boolean;
    monsoonReadinessScore: number; // 0-100
  };
}

export interface WorkerInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  completedJobsCount: number;
  specialization: string;
  verifiedBadge: boolean;
  kycStatus: 'verified' | 'pending' | 'rejected';
  baseLocation: string;
}

export interface MediaProof {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  area: string;
  type?: 'photo' | 'video';
  durationSec?: number;
}

export interface ProofOfWork {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyCity: string;
  serviceTitle: string;
  category: string;
  worker: WorkerInfo;
  completedAt: string;
  durationMinutes: number;
  status: 'completed' | 'in_progress' | 'pending_approval';
  gpsCoordinates: string;
  beforeImages: MediaProof[];
  duringMedia: MediaProof[];
  afterImages: MediaProof[];
  comparisonPair?: {
    beforeUrl: string;
    afterUrl: string;
    title: string;
    description: string;
  };
  checklist: {
    title: string;
    passed: boolean;
    notes?: string;
  }[];
  itemizedBill: {
    description: string;
    cost: number;
  }[];
  amountTotal: number;
  platformMargin: number;
  workerPayout: number;
  customerApproved: boolean;
  aiDiagnosticNote: string;
  emergencyJob?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  malayalamName?: string;
  category: 'maintenance' | 'cleaning' | 'land' | 'pre_arrival' | 'specialized' | 'emergency';
  icon: string;
  tagline: string;
  description: string;
  basePriceINR: number;
  durationEst: string;
  badge?: string;
  whatIsIncluded: string[];
  deliverables: string[];
  popular?: boolean;
}

export interface LandRecord {
  propertyId: string;
  propertyName: string;
  cents: number;
  coconutTreesCount: number;
  mangoTreesCount: number;
  rubberTreesCount: number;
  lastGrassCutDate: string;
  nextHarvestDate: string;
  perimeterFenced: boolean;
  fenceCondition: 'Good' | 'Needs Repair' | 'Overgrown Vines';
  harvestHistory: {
    id: string;
    date: string;
    coconutsHarvested: number;
    marketRatePerNut: number;
    totalEarningsINR: number;
    harvesterName: string;
  }[];
  soilAndRainLog: {
    date: string;
    rainfallMm: number;
    drainageCondition: string;
    actionTaken: string;
  }[];
}

export interface EmergencyRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  issueType: 'water_leak' | 'heavy_rain_flood' | 'storm_tree_fall' | 'electrical_short' | 'cctv_offline' | 'break_in_alert';
  issueDescription: string;
  requestedAt: string;
  currentStep: 'dispatched' | 'arrived' | 'inspecting' | 'quote_ready' | 'repair_approved' | 'completed';
  workerAssigned?: WorkerInfo;
  etaMinutes: number;
  livePhotos: string[];
  inspectorNotes?: string;
  repairQuote?: {
    issueFound: string;
    severity: 'critical' | 'moderate' | 'minor';
    repairEstimateINR: number;
    quoteBreakdown: { item: string; cost: number }[];
    approvedByCustomer: boolean;
  };
}

export interface AIInspectionReport {
  id: string;
  propertyId: string;
  propertyName: string;
  generatedDate: string;
  overallScore: number;
  overallGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  verdictHeadline: string;
  summaryParagraph: string;
  monsoonRiskIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  scannedPhotoCount: number;
  categoryScores: {
    category: string;
    score: number;
    status: 'Optimal' | 'Fair' | 'Action Needed';
    findings: string;
  }[];
  detectedAnomalies: {
    id: string;
    area: string;
    severity: 'High' | 'Medium' | 'Low';
    title: string;
    detail: string;
    recommendation: string;
    estimatedCostINR: number;
    imageThumbnail: string;
  }[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  subtitle: string;
  priceINR: number;
  badge?: string;
  recommended?: boolean;
  features: string[];
  inspectionFrequency: string;
  emergencyCoordination: boolean;
  dedicatedManager: boolean;
  digitalReports: boolean;
  renovationSupervisionMargin: string;
}

export interface PreArrivalChecklist {
  id: string;
  propertyId: string;
  arrivalDate: string;
  daysRemaining: number;
  status: 'planning' | 'in_progress' | 'ready';
  items: {
    id: string;
    task: string;
    completed: boolean;
    assignedTo?: string;
    category: 'deep_clean' | 'appliances' | 'fridge_groceries' | 'car_maintenance' | 'key_handover';
  }[];
}
