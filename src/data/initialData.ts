import {
  CurrencyConfig,
  Property,
  WorkerInfo,
  ProofOfWork,
  ServiceItem,
  LandRecord,
  SubscriptionTier,
  AIInspectionReport,
  PreArrivalChecklist
} from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  AED: { code: 'AED', symbol: 'AED ', rateToINR: 22.8, label: 'UAE Dirham', flag: '🇦🇪' },
  INR: { code: 'INR', symbol: '₹', rateToINR: 1.0, label: 'Indian Rupee', flag: '🇮🇳' },
  USD: { code: 'USD', symbol: '$', rateToINR: 83.5, label: 'US Dollar', flag: '🇺🇸' },
  GBP: { code: 'GBP', symbol: '£', rateToINR: 107.2, label: 'British Pound', flag: '🇬🇧' },
  QAR: { code: 'QAR', symbol: 'QAR ', rateToINR: 22.9, label: 'Qatari Riyal', flag: '🇶🇦' },
  SAR: { code: 'SAR', symbol: 'SAR ', rateToINR: 22.25, label: 'Saudi Riyal', flag: '🇸🇦' },
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-calicut-01',
    name: 'Emerald Palms Villa',
    type: 'villa',
    tagline: 'Modern 4-BHK Coastal Villa with Landscaped Garden',
    location: 'Beach Road, Kozhikode',
    city: 'Kozhikode',
    district: 'Kozhikode',
    address: 'Survey No. 42/B, Near South Beach, Kozhikode, Kerala 673001',
    geoCoordinates: '11.2588° N, 75.7804° E',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    healthScore: 94,
    status: 'healthy',
    lastInspectionDate: '14 September 2026',
    nextInspectionDate: '14 October 2026',
    subscriptionPlan: 'Premium Guardian',
    dedicatedManager: {
      name: 'Vipin Chandran',
      phone: '+91 98470 12345',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      designation: 'Senior Property Guardian (Kozhikode North)'
    },
    keyAccessInfo: 'Master lockbox on porch pillar (Code: 8492) • Duplicate key with Manager Vipin',
    emergencyContact: {
      name: 'Suresh Babu (Cousin)',
      relation: 'Local Relative / Point of Contact',
      phone: '+91 94471 99882'
    },
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      builtAreaSqFt: 3200,
      landCents: 18,
      floors: 2,
      builtYear: 2021,
      coconutTrees: 6,
      waterSource: 'Borewell + KWA Connection (Automatic float valve)',
      powerBackup: 'Microtek 3.5kVA Sine Wave Solar Inverter',
      cctvOnline: true,
      monsoonReadinessScore: 92
    }
  },
  {
    id: 'prop-kannur-02',
    name: 'Kannur Green Haven',
    type: 'house',
    tagline: 'Traditional Kerala Courtyard House with Teakwood Accents',
    location: 'Thottada Beach, Kannur',
    city: 'Kannur',
    district: 'Kannur',
    address: 'Plot 14, Thottada Cliff View, Kannur, Kerala 670007',
    geoCoordinates: '11.8344° N, 75.3986° E',
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    healthScore: 82,
    status: 'attention',
    lastInspectionDate: '02 September 2026',
    nextInspectionDate: '02 October 2026',
    subscriptionPlan: 'Standard',
    dedicatedManager: {
      name: 'Praveen Raj',
      phone: '+91 97455 67890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      designation: 'Operations Field Lead (Kannur Coast)'
    },
    keyAccessInfo: 'Main Gate Keypad (Code: 2024) • Front Door Key with Manager Praveen',
    emergencyContact: {
      name: 'Unnikrishnan Master',
      relation: 'Neighbor & Family Friend',
      phone: '+91 98462 33441'
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      builtAreaSqFt: 2400,
      landCents: 24,
      floors: 1,
      builtYear: 2017,
      coconutTrees: 14,
      waterSource: 'Open Ring Well with 1.5HP CRI Pump',
      powerBackup: 'Luminous 1.5kVA Inverter (Tubular Battery)',
      cctvOnline: true,
      monsoonReadinessScore: 78
    }
  },
  {
    id: 'prop-wayanad-03',
    name: 'Wayanad Coconut & Coffee Plot',
    type: 'land',
    tagline: '45 Cents Agricultural Plot with 38 High-Yield Coconut Trees',
    location: 'Meppadi Road, Wayanad',
    city: 'Wayanad',
    district: 'Wayanad',
    address: 'Survey 108/3, Near Tea Estates, Meppadi, Wayanad, Kerala 673577',
    geoCoordinates: '11.5524° N, 76.1302° E',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
    ],
    healthScore: 90,
    status: 'healthy',
    lastInspectionDate: '28 August 2026',
    nextInspectionDate: '28 September 2026',
    subscriptionPlan: 'Standard',
    dedicatedManager: {
      name: 'Dileep Meppadi',
      phone: '+91 94951 88776',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      designation: 'Agricultural Land Supervisor (Wayanad Valley)'
    },
    keyAccessInfo: 'Perimeter chain-link gate with combination padlock (Code: 7711)',
    emergencyContact: {
      name: 'Balan Nair',
      relation: 'Adjoining Estate Owner',
      phone: '+91 94474 12098'
    },
    specs: {
      landCents: 45,
      coconutTrees: 38,
      waterSource: 'Natural Perennial Stream + Drip lines',
      powerBackup: 'Solar boundary security floodlight (auto-dusk)',
      cctvOnline: false,
      monsoonReadinessScore: 88
    }
  }
];

export const INITIAL_WORKERS: WorkerInfo[] = [
  {
    id: 'wrk-01',
    name: 'Jithesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98471 20987',
    rating: 4.96,
    completedJobsCount: 385,
    specialization: 'Master Plumber & Water Tank Sanitation Lead',
    verifiedBadge: true,
    kycStatus: 'verified',
    baseLocation: 'Kozhikode'
  },
  {
    id: 'wrk-02',
    name: 'Rajesh V. (Raju)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+91 97450 33214',
    rating: 4.92,
    completedJobsCount: 290,
    specialization: 'Licensed Electrical Supervisor & Solar Tech',
    verifiedBadge: true,
    kycStatus: 'verified',
    baseLocation: 'Kannur'
  },
  {
    id: 'wrk-03',
    name: 'Anoop Narayanan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    phone: '+91 94955 44321',
    rating: 4.98,
    completedJobsCount: 440,
    specialization: 'Coconut Climber & Land Care Specialist',
    verifiedBadge: true,
    kycStatus: 'verified',
    baseLocation: 'Wayanad'
  },
  {
    id: 'wrk-04',
    name: 'Shaji Mathew',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98460 77123',
    rating: 4.89,
    completedJobsCount: 215,
    specialization: 'Deep Housekeeping & Pre-Arrival Preparation Lead',
    verifiedBadge: true,
    kycStatus: 'verified',
    baseLocation: 'Thalassery'
  }
];

export const INITIAL_POW_RECORDS: ProofOfWork[] = [
  {
    id: 'pow-101',
    propertyId: 'prop-calicut-01',
    propertyName: 'Emerald Palms Villa',
    propertyCity: 'Kozhikode',
    serviceTitle: 'Overhead 2,000L Sintex Water Tank Deep Sanitation & Sump Pump Audit',
    category: 'Water & Plumbing',
    worker: INITIAL_WORKERS[0],
    completedAt: '14 September 2026, 03:42 PM IST',
    durationMinutes: 110,
    status: 'completed',
    gpsCoordinates: '11.2588° N, 75.7804° E (Kozhikode Beach Road)',
    beforeImages: [
      {
        id: 'b-1',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        caption: 'Interior bottom layer showing heavy red laterite silt & biofilm accumulation',
        timestamp: '14 Sep 2026, 01:50 PM',
        area: 'Overhead Tank #1 (2,000L Sintex)'
      },
      {
        id: 'b-2',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
        caption: 'Float valve stuck in open position with algae deposition around rim',
        timestamp: '14 Sep 2026, 01:55 PM',
        area: 'Tank Inflow Mechanism'
      }
    ],
    duringMedia: [
      {
        id: 'd-1',
        url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        caption: 'High-pressure rotary jet scrubbing & food-grade eco descaling compound applied',
        timestamp: '14 Sep 2026, 02:35 PM',
        area: 'Scrubbing Phase',
        type: 'photo'
      }
    ],
    afterImages: [
      {
        id: 'a-1',
        url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
        caption: 'Sparkling clean interior walls with UV sterilization applied and fresh water test passed',
        timestamp: '14 Sep 2026, 03:30 PM',
        area: 'Overhead Tank #1 - Clean Finish'
      },
      {
        id: 'a-2',
        url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
        caption: 'New heavy-duty brass float valve installed and automatic cut-off calibrated',
        timestamp: '14 Sep 2026, 03:38 PM',
        area: 'Inflow Valve Assembly'
      }
    ],
    comparisonPair: {
      beforeUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
      title: 'Water Tank Interior Cleanliness',
      description: 'Slide to compare the algae-laden sediment before scrubbing versus the mirror-finish sanitized tank.'
    },
    checklist: [
      { title: 'Full tank drainage & sludge extraction performed', passed: true },
      { title: 'High-pressure rotary wash (140 bar)', passed: true },
      { title: 'Food-grade organic anti-bacterial treatment', passed: true },
      { title: 'UV lamp sterilization scan completed', passed: true },
      { title: 'Automatic float switch electrical test', passed: true, notes: 'Brass switch replaced as preventive maintenance' },
      { title: 'Sump pump suction strainer cleared of debris', passed: true }
    ],
    itemizedBill: [
      { description: '2,000L Overhead Tank 6-Stage Deep Sanitization', cost: 1650 },
      { description: 'Preventive Replacement: Heavy-Duty Brass Float Switch', cost: 480 },
      { description: 'Sump Pump & Pressure Line Inspection Labor', cost: 370 }
    ],
    amountTotal: 2500,
    platformMargin: 375, // 15%
    workerPayout: 2125,
    customerApproved: true,
    aiDiagnosticNote: 'Tank hygiene restored to 100%. Next scheduled sanitation recommended before March 2027 summer onset.'
  },
  {
    id: 'pow-102',
    propertyId: 'prop-kannur-02',
    propertyName: 'Kannur Green Haven',
    propertyCity: 'Kannur',
    serviceTitle: 'Monsoon Heavy Rain Emergency Inspection & Roof Gutter Waterproofing',
    category: 'Emergency & Civil',
    worker: INITIAL_WORKERS[1],
    completedAt: '02 September 2026, 05:15 PM IST',
    durationMinutes: 95,
    status: 'completed',
    gpsCoordinates: '11.8344° N, 75.3986° E (Kannur Thottada)',
    beforeImages: [
      {
        id: 'kb-1',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        caption: 'Fallen coconut fronds blocking roof rainwater drainage channel',
        timestamp: '02 Sep 2026, 03:45 PM',
        area: 'East Roof Parapet'
      }
    ],
    duringMedia: [
      {
        id: 'kd-1',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        caption: 'Debris extraction and brush clearance of 40-foot drainage channel',
        timestamp: '02 Sep 2026, 04:20 PM',
        area: 'Roof Drainage Channel',
        type: 'photo'
      }
    ],
    afterImages: [
      {
        id: 'ka-1',
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        caption: 'Clear free-flowing gutter with Dr. Fixit elastomeric seal applied over minor hairline crack',
        timestamp: '02 Sep 2026, 05:05 PM',
        area: 'East Roof Parapet - Finished'
      }
    ],
    comparisonPair: {
      beforeUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
      title: 'Roof Gutter Drainage Restoration',
      description: 'Slide to see the clogged rainwater runoff channel restored to clean, waterproofed state.'
    },
    checklist: [
      { title: 'Emergency on-site arrival within 45 minutes', passed: true },
      { title: 'Check all 4 internal rooms for ceiling water seepage', passed: true, notes: 'Minor damp patch near northern wall, dried with blower' },
      { title: 'Clean and unblock 3 roof downspouts', passed: true },
      { title: 'Test main MCB and Earth Leakage Circuit Breaker (ELCB)', passed: true }
    ],
    itemizedBill: [
      { description: 'Emergency Monsoon Call-Out & Inspection Fee', cost: 299 },
      { description: 'Roof Channel Clearing & Downspout De-clogging', cost: 850 },
      { description: 'Dr. Fixit Elastomeric Waterproofing Sealant (2kg pack + labor)', cost: 650 }
    ],
    amountTotal: 1799,
    platformMargin: 299 + 225,
    workerPayout: 1275,
    customerApproved: true,
    aiDiagnosticNote: 'Risk of ceiling water ingress averted. Wall dampness has dropped to safe 14% humidity reading.'
  },
  {
    id: 'pow-103',
    propertyId: 'prop-wayanad-03',
    propertyName: 'Wayanad Coconut & Coffee Plot',
    propertyCity: 'Wayanad',
    serviceTitle: 'Quarterly 38 Coconut Trees Harvesting & 45 Cents Brush Clearing',
    category: 'Land & Agriculture',
    worker: INITIAL_WORKERS[2],
    completedAt: '28 August 2026, 04:30 PM IST',
    durationMinutes: 240,
    status: 'completed',
    gpsCoordinates: '11.5524° N, 76.1302° E (Meppadi, Wayanad)',
    beforeImages: [
      {
        id: 'wb-1',
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
        caption: 'Overgrown weeds, wild shrubs and unharvested ripe coconut bunches',
        timestamp: '28 Aug 2026, 09:30 AM',
        area: 'Northern Boundary & Tree Clusters'
      }
    ],
    duringMedia: [
      {
        id: 'wd-1',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        caption: 'Mechanical brush cutter in action and climber harvesting mature bunches',
        timestamp: '28 Aug 2026, 12:45 PM',
        area: 'Land Clearing Area',
        type: 'photo'
      }
    ],
    afterImages: [
      {
        id: 'wa-1',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        caption: '45 Cents plot fully cleared, 480 ripe coconuts harvested and stacked safely',
        timestamp: '28 Aug 2026, 04:15 PM',
        area: 'Plot Overview Post-Clearing'
      }
    ],
    comparisonPair: {
      beforeUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
      title: 'Land Weed Clearance & Harvesting',
      description: 'Slide to view overgrown vegetation cleared into neat mulched ground.'
    },
    checklist: [
      { title: '38 Coconut trees climb-inspected and crown cleaned', passed: true },
      { title: '480 Coconuts harvested & counted before supervisor', passed: true },
      { title: 'Rhinoceros beetle & red palm weevil inspection passed', passed: true },
      { title: 'Brush cutting of 45 cents ground with mulching', passed: true },
      { title: 'Boundary fencing inspection around perimeter', passed: true, notes: 'Chainlink fence intact across all 4 boundary markers' }
    ],
    itemizedBill: [
      { description: '38 Coconut Trees Harvesting & Crown De-fronding (@ ₹50/tree)', cost: 1900 },
      { description: '45 Cents Mechanical Brush Cutting & Clearing (@ ₹40/cent)', cost: 1800 },
      { description: 'Local Wholesaler Sale (480 nuts @ ₹18/nut = ₹8,640 credited to NRI Account)', cost: -8640 }
    ],
    amountTotal: 3700,
    platformMargin: 550,
    workerPayout: 3150,
    customerApproved: true,
    aiDiagnosticNote: 'Harvest net yield surplus generated: ₹4,940 profit credited after deducting service charges!'
  }
];

export const SERVICE_CATALOG: ServiceItem[] = [
  {
    id: 'srv-inspect',
    name: 'Comprehensive Property Health Inspection',
    malayalamName: 'വീട് പരിശോധന',
    category: 'maintenance',
    icon: 'SearchCheck',
    tagline: '25-Point physical inspection with high-res photos & AI condition diagnosis',
    description: 'A verified local field guardian visits your property, tests all plumbing lines, electrical panels, roof gutters, doors, windows, dampness meter readings, and sends 18+ high-definition photos.',
    basePriceINR: 1200,
    durationEst: '90 Mins',
    badge: 'Core Service',
    whatIsIncluded: [
      '25-Point structural, plumbing and electrical physical check',
      'High-res 360° photo walkthrough of every room',
      'Electronic moisture & dampness sensor readings',
      'Sump & overhead tank water level audit',
      'Security door lock & CCTV online verification'
    ],
    deliverables: ['Digital Inspection Certificate', 'AI Property Condition Report', '18+ Time-stamped Proof Photos'],
    popular: true
  },
  {
    id: 'srv-tank',
    name: 'Overhead & Sump Water Tank Sanitization',
    malayalamName: 'വാട്ടർ ടാങ്ക് വൃത്തിയാക്കൽ',
    category: 'cleaning',
    icon: 'Droplets',
    tagline: '6-Stage scientific pressurized cleaning with UV sterilization',
    description: 'Complete de-sludging, high-pressure jet wash, eco-friendly anti-bacterial scrubbing, and UV chamber sterilization to ensure safe drinking water before you visit.',
    basePriceINR: 1650,
    durationEst: '2 - 3 Hours',
    badge: 'Popular',
    whatIsIncluded: [
      'Sludge pump extraction',
      '140 Bar rotary pressure wash',
      'Food-grade organic algae descaler',
      'UV sterilization scan',
      'Float valve & pump auto-switch calibration'
    ],
    deliverables: ['Before/After interior photos', 'Water clarity test report'],
    popular: true
  },
  {
    id: 'srv-deepclean',
    name: 'Vacant House Deep Cleaning & Odor Removal',
    malayalamName: 'ഡീപ്പ് ക്ലീനിംഗ്',
    category: 'cleaning',
    icon: 'Sparkles',
    tagline: 'Room-by-room dust extraction, floor scrubbing, kitchen degreasing & airing',
    description: 'Transform your locked, vacant house into a spotless, fresh-smelling home. Includes floor buffing, bathroom descaling, fan/window wiping, and herbal lemongrass fumigation.',
    basePriceINR: 2800,
    durationEst: '4 - 6 Hours',
    whatIsIncluded: [
      'Machine floor scrubbing with pH-neutral solution',
      'Bathroom tile grout and sanitary descaling',
      'Glass window, mesh, and ceiling fan dusting',
      'Cabinet & wardrobe interior wiping',
      'Natural herbal lemongrass aroma sanitization'
    ],
    deliverables: ['Room-by-room completion photos', 'Fragrance & ventilation certificate'],
    popular: true
  },
  {
    id: 'srv-emergency',
    name: 'Monsoon Heavy Rain & Storm Emergency Dispatch',
    malayalamName: 'എമർജൻസി പരിശോധന',
    category: 'emergency',
    icon: 'AlertTriangle',
    tagline: 'Rapid 45-minute dispatch for water leaks, fallen branches, or power trips',
    description: 'When heavy rains lash your hometown, our local rapid-response team visits within 45 minutes, checks for flooding, secures roofing, documents damage, and coordinates instant repairs.',
    basePriceINR: 299,
    durationEst: '45 Min Response',
    badge: 'Emergency 24x7',
    whatIsIncluded: [
      'Immediate priority dispatch of verified inspector',
      'Live photo/video status stream of roof, gate, and yard',
      'Instant repair quotation with 1-tap customer approval',
      'Emergency tarping / water diversion if needed'
    ],
    deliverables: ['Live GPS check-in', 'Instant damage assessment', 'Transparent repair quote'],
    popular: true
  },
  {
    id: 'srv-coconut',
    name: 'Coconut Harvesting & Tree Health Maintenance',
    malayalamName: 'തേങ്ങ ഇടീക്കൽ',
    category: 'land',
    icon: 'Palmtree',
    tagline: 'Professional tree climber, crown cleaning, nut counting & sale coordination',
    description: 'Ensure your coconut trees remain healthy, prevent fallen frond hazards, and earn revenue from harvested coconuts directly deposited to your bank account.',
    basePriceINR: 1500,
    durationEst: 'Half Day',
    whatIsIncluded: [
      'Climber crown de-fronding & dead bunch removal',
      'Pest inspection (Rhinoceros beetle / palm weevil)',
      'Accurate nut harvest counting under supervisor camera',
      'Option to sell to local wholesaler at transparent wholesale rate'
    ],
    deliverables: ['Tree-wise harvest ledger', 'Proof photos of stacked coconuts', 'Sale receipt'],
    popular: true
  },
  {
    id: 'srv-land-weed',
    name: 'Plot Grass Cutting & Boundary Fencing Check',
    malayalamName: 'സ്ഥലം കാട് വെട്ടി വൃത്തിയാക്കൽ',
    category: 'land',
    icon: 'Tractor',
    tagline: 'Mechanical brush cutting, mulching, snake-repellent spray & fence check',
    description: 'Keep vacant plots clean, prevent encroachment disputes, and keep wild growth in check with scheduled per-cent land management.',
    basePriceINR: 1800,
    durationEst: 'Full Day',
    whatIsIncluded: [
      'Heavy-duty brush cutting of wild bushes and shrubs',
      'Boundary pillar clearing and boundary photo log',
      'Chain-link / barbed wire inspection',
      'Organic snake & insect repellent application along perimeter'
    ],
    deliverables: ['Perimeter aerial / corner photos', 'Boundary integrity report']
  },
  {
    id: 'srv-prearrival',
    name: 'NRI Homecoming Pre-Arrival Concierge',
    malayalamName: 'വരവിനു മുൻപുള്ള ഒരുക്കങ്ങൾ',
    category: 'pre_arrival',
    icon: 'Home',
    tagline: 'Fresh bedsheets, AC cooling, fridge stocked with Milma milk, car jump-started',
    description: 'Step into your home like you never left. We turn on water heaters, test ACs, run car engines, stock the refrigerator with essentials, and have your duplicate key ready.',
    basePriceINR: 2200,
    durationEst: '1 Day Before Arrival',
    badge: 'NRI Special',
    whatIsIncluded: [
      'AC gas & cooling efficiency test 24h before arrival',
      'Car battery voltage check, tire inflation & engine warm-up',
      'Pantry & fridge stocking (Milma milk, tea, coffee, bottled water, fruits)',
      'Water purifier filter flush and fresh geyser check',
      'Airport taxi coordination & key delivery'
    ],
    deliverables: ['Pre-arrival checklist signoff', 'Welcome photo set']
  },
  {
    id: 'srv-renovation',
    name: 'Renovation & Painting Supervision',
    malayalamName: 'പെയിന്റിംഗ് മേൽനോട്ടം',
    category: 'specialized',
    icon: 'Paintbrush',
    tagline: 'Site inspection, quotation verification, daily photo logs & milestone payouts',
    description: 'Planning to paint or renovate your 2,000+ sqft house? We act as your on-ground engineer: negotiating material prices, auditing worker attendance, and ensuring high-quality finishing.',
    basePriceINR: 4500,
    durationEst: 'Multi-day Project',
    badge: 'Managed Project',
    whatIsIncluded: [
      'Comparative 3-vendor quotation review',
      'Material quality verification (Asian Paints / Berger genuine barcodes)',
      'Daily time-stamped progress photos and video walkthroughs',
      'Milestone-based stage payments approved only upon inspection'
    ],
    deliverables: ['Daily Project Log', 'Paint thickness audit', 'Final warranty certificate']
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'sub-basic',
    name: 'Basic Guardian',
    subtitle: 'Essential Peace of Mind for Vacant Homes',
    priceINR: 499,
    features: [
      '1x Monthly exterior & boundary physical inspection',
      '12 Time-stamped HD photos per visit',
      'Property Health Score card on app',
      'Overnight monsoon heavy rain alert notifications',
      'Local emergency manager contact access'
    ],
    inspectionFrequency: '1x per Month',
    emergencyCoordination: false,
    dedicatedManager: false,
    digitalReports: true,
    renovationSupervisionMargin: '15%'
  },
  {
    id: 'sub-standard',
    name: 'Standard Care',
    subtitle: 'Comprehensive Care for NRIs with Regular Kerala Visits',
    priceINR: 999,
    badge: 'Most Popular',
    recommended: true,
    features: [
      '2x Monthly full interior & exterior inspections',
      '18+ High-res photos + 360° video walkthroughs',
      'Plumbing, water tank & electrical circuit audits',
      'Free minor maintenance coordination (no booking fee)',
      '1x Free Pre-Arrival basic house freshening per year',
      'AI Property Health & Monsoon Risk Diagnostic Reports'
    ],
    inspectionFrequency: '2x per Month',
    emergencyCoordination: true,
    dedicatedManager: true,
    digitalReports: true,
    renovationSupervisionMargin: '10%'
  },
  {
    id: 'sub-premium',
    name: 'Premium Guardian',
    subtitle: 'White-Glove Dedicated Concierge & Estate Management',
    priceINR: 2499,
    badge: 'VIP White-Glove',
    features: [
      'Weekly physical inspection (4x per Month)',
      'Dedicated Senior Property Manager on WhatsApp & Video Call',
      '24x7 Zero-Fee Priority Emergency Storm & Leak Dispatch',
      'Full Pre-Arrival Homecoming Concierge (car prep, fridge stock, AC tune-up)',
      'Agricultural & Coconut harvesting yield management',
      'Free digital storage of property deeds & tax receipts',
      'Renovation supervision at discounted 5% margin'
    ],
    inspectionFrequency: '4x per Month (Weekly)',
    emergencyCoordination: true,
    dedicatedManager: true,
    digitalReports: true,
    renovationSupervisionMargin: '5%'
  }
];

export const INITIAL_LAND_RECORD: LandRecord = {
  propertyId: 'prop-wayanad-03',
  propertyName: 'Wayanad Coconut & Coffee Plot',
  cents: 45,
  coconutTreesCount: 38,
  mangoTreesCount: 3,
  rubberTreesCount: 0,
  lastGrassCutDate: '28 August 2026',
  nextHarvestDate: '28 October 2026',
  perimeterFenced: true,
  fenceCondition: 'Good',
  harvestHistory: [
    {
      id: 'harv-01',
      date: '28 August 2026',
      coconutsHarvested: 480,
      marketRatePerNut: 18,
      totalEarningsINR: 8640,
      harvesterName: 'Anoop Narayanan'
    },
    {
      id: 'harv-02',
      date: '25 June 2026',
      coconutsHarvested: 455,
      marketRatePerNut: 17.5,
      totalEarningsINR: 7962,
      harvesterName: 'Anoop Narayanan'
    },
    {
      id: 'harv-03',
      date: '20 April 2026',
      coconutsHarvested: 510,
      marketRatePerNut: 19,
      totalEarningsINR: 9690,
      harvesterName: 'Anoop Narayanan'
    }
  ],
  soilAndRainLog: [
    {
      date: '10 September 2026',
      rainfallMm: 48,
      drainageCondition: 'Good - natural slope draining without waterlogging',
      actionTaken: 'Cleared fallen foliage from perimeter drainage trench'
    },
    {
      date: '15 August 2026',
      rainfallMm: 92,
      drainageCondition: 'Moderate runoff near eastern gate',
      actionTaken: 'Reinforced soil bund with coir netting'
    }
  ]
};

export const INITIAL_AI_REPORT: AIInspectionReport = {
  id: 'air-2026-09',
  propertyId: 'prop-calicut-01',
  propertyName: 'Emerald Palms Villa, Kozhikode',
  generatedDate: '14 September 2026',
  overallScore: 94,
  overallGrade: 'A',
  verdictHeadline: 'Property is in Prime Healthy Condition with Excellent Monsoon Resilience',
  summaryParagraph: 'Multi-spectral computer vision scan of 18 field inspection photographs confirms strong structural integrity, zero active roof leaks, and sanitized water storage. A minor dampness gradient was detected on the northern exterior parapet, which has been sealed with elastomeric coating.',
  monsoonRiskIndex: 'Low',
  scannedPhotoCount: 18,
  categoryScores: [
    {
      category: 'Roofing & Rainwater Gutters',
      score: 96,
      status: 'Optimal',
      findings: 'All downspouts clear of leaves. Sloped terracotta tiles intact with zero displacement.'
    },
    {
      category: 'Water Storage & Sump Health',
      score: 100,
      status: 'Optimal',
      findings: 'Overhead 2,000L tank scrubbed & UV sanitized today. Automatic float switch responding flawlessly.'
    },
    {
      category: 'Electrical & Solar Backup',
      score: 91,
      status: 'Optimal',
      findings: 'Solar inverter charging at 27.4V. ELCB trip test completed with 28ms response.'
    },
    {
      category: 'Exterior Walls & Dampness',
      score: 88,
      status: 'Fair',
      findings: 'Northern exterior wall reading 16% surface moisture (safe threshold < 20%). Touch-up sealant applied.'
    },
    {
      category: 'Perimeter Security & CCTV',
      score: 95,
      status: 'Optimal',
      findings: 'All 4 Hikvision IP cameras streaming HD feed with infrared night vision calibrated.'
    }
  ],
  detectedAnomalies: [
    {
      id: 'anom-1',
      area: 'Northern Parapet Wall',
      severity: 'Low',
      title: 'Minor Micro-Crack with Surface Algae',
      detail: 'A 1.2-meter hairline surface crack on the upper exterior moulding prone to monsoon moisture absorption.',
      recommendation: 'Applied 1 coat of Dr. Fixit Raincoat elastomeric primer during inspection.',
      estimatedCostINR: 450,
      imageThumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'anom-2',
      area: 'Garden Perimeter',
      severity: 'Low',
      title: 'Bougainvillea Overgrowth near Power Cable Drop',
      detail: 'Flowering vine has reached within 30cm of the incoming KSEB 230V service line.',
      recommendation: 'Schedule routine garden trimming before the next heavy winds.',
      estimatedCostINR: 600,
      imageThumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'
    }
  ]
};

export const INITIAL_PRE_ARRIVAL: PreArrivalChecklist = {
  id: 'pre-01',
  propertyId: 'prop-calicut-01',
  arrivalDate: '10 October 2026',
  daysRemaining: 21,
  status: 'planning',
  items: [
    { id: 'pa-1', task: 'Deep clean all 4 bedrooms and change fresh laundered cotton linens', completed: false, category: 'deep_clean', assignedTo: 'Shaji Mathew' },
    { id: 'pa-2', task: 'Run Daikin Inverter ACs for 2 hours and sanitize air filters', completed: true, category: 'appliances', assignedTo: 'Rajesh V.' },
    { id: 'pa-3', task: 'Jump-start and wash Maruti Baleno in garage; check tire pressures to 32 PSI', completed: false, category: 'car_maintenance', assignedTo: 'Vipin Chandran' },
    { id: 'pa-4', task: 'Stock pantry: 2L Milma Blue milk, AVT Premium Tea, Eastern spices, 20L Aquafina can', completed: false, category: 'fridge_groceries', assignedTo: 'Vipin Chandran' },
    { id: 'pa-5', task: 'Flush Kent RO water purifier and check UV lamp intensity', completed: true, category: 'appliances', assignedTo: 'Jithesh Kumar' },
    { id: 'pa-6', task: 'Turn on 50L AO Smith Geysers in master & guest bathrooms 6 hours before arrival', completed: false, category: 'appliances', assignedTo: 'Vipin Chandran' },
    { id: 'pa-7', task: 'Coordinate Calicut Airport (CCJ) pickup sedan & key handover on porch', completed: false, category: 'key_handover', assignedTo: 'Vipin Chandran' }
  ]
};
