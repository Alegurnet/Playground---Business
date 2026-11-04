export interface CompanyProspect {
  name: string;
  domain: string;
  industry: string;
  headcount: number | string;
  annualRevenue: string;
  erp: string;
  monthlyCardSpend: number;
  monthlyApSpend: number;
  brandColor: string;
  accentColor: string;
  ticker?: string;
  primaryFriction: string;
}

export interface DeterministicFinancials {
  apViaCardEstimated: number;
  workingCapitalBenefit: number;
  monthlyAdminHoursSaved: number;
  annualHoursSaved: number;
  financialLaborValue: number;
  annualCashback: number;
  totalAnnualEconomicImpact: number;
  extendedTermsDays: number;
}

export interface SlideContent {
  slideNumber: number;
  title: string;
  strategicObjective: string;
  headline: string;
  subheadline?: string;
  keyBullets?: string[];
  diagnosticMetrics?: { metric: string; label: string }[];
  beforeState?: string[];
  afterState?: string[];
  departments?: { dept: string; cardType: string; control: string }[];
  syncFeatures?: string[];
  financialMetrics?: { label: string; value: string }[];
  peerCaseStudy?: string;
  benchmarkStats?: { stat: string; label: string }[];
  milestones?: { week: string; task: string }[];
  speakerNotes: string;
}

export interface GeneratedDeck {
  deckTitle: string;
  slides: SlideContent[];
}

export interface RoiModelParams {
  numAEs: number; // e.g. 12
  proposalsPerAeMonth: number; // e.g. 25
  blendedHourlyRate: number; // e.g. $35/hr
  manualHoursPerDeck: number; // e.g. 4.0 hrs
  pitchCraftHoursPerDeck: number; // e.g. 0.20 hrs (12 min)
  llmApiCostPerDeck: number; // e.g. $0.15
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  targetPersona: string;
  corePainPoints: string[];
  valueProposition: string;
  differentiator: string;
  quantifiableRoi: string;
  badge: string;
  iconName: string;
  features: string[];
}
