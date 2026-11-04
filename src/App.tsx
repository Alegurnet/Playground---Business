import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveScorecard } from './components/ExecutiveScorecard';
import { DeckGeneratorStudio } from './components/DeckGeneratorStudio';
import { SlideViewer } from './components/SlideViewer';
import { PresentationModal } from './components/PresentationModal';
import { RoiCalculator } from './components/RoiCalculator';
import { ProductCatalogMatrix } from './components/ProductCatalogMatrix';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { GovernanceView } from './components/GovernanceView';
import { exportDeckToPptx } from './utils/pptxExport';
import { ENTERPRISE_PRESETS } from './data/companyPresets';
import { CompanyProspect, GeneratedDeck, DeterministicFinancials } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [currentCompany, setCurrentCompany] = useState<CompanyProspect>(ENTERPRISE_PRESETS[0]);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);

  // Deterministic baseline initialization
  const initialApCard = Math.round(ENTERPRISE_PRESETS[0].monthlyApSpend * 0.45);
  const initialFloat = Math.round((initialApCard / 30) * 25);
  const initialLabor = 195 * 12 * 35;
  const initialCashback = Math.round((ENTERPRISE_PRESETS[0].monthlyCardSpend + initialApCard) * 0.0125 * 12);

  const [financials, setFinancials] = useState<DeterministicFinancials>({
    apViaCardEstimated: initialApCard,
    workingCapitalBenefit: initialFloat,
    monthlyAdminHoursSaved: 195,
    annualHoursSaved: 195 * 12,
    financialLaborValue: initialLabor,
    annualCashback: initialCashback,
    totalAnnualEconomicImpact: initialFloat + initialLabor + initialCashback,
    extendedTermsDays: 25,
  });

  // Standard 8-slide initial deck
  const [generatedDeck, setGeneratedDeck] = useState<GeneratedDeck>({
    deckTitle: `Clara Enterprise Spend Modernization Blueprint for ${ENTERPRISE_PRESETS[0].name}`,
    slides: [
      {
        slideNumber: 1,
        title: 'Executive Co-Branded Cover',
        strategicObjective: 'Deliver immediate visual personalization and partnership posture.',
        headline: `Modernizing Enterprise Spend & Working Capital for ${ENTERPRISE_PRESETS[0].name}`,
        subheadline: `A customized financial operations blueprint powered by Clara & ${ENTERPRISE_PRESETS[0].erp}`,
        keyBullets: [
          `Confidential Strategic Proposal for ${ENTERPRISE_PRESETS[0].name}`,
          `Native ${ENTERPRISE_PRESETS[0].erp} API Integration & Two-Way Sync`,
          '3-Week Turnkey Pilot with Zero Banking Disruption',
        ],
        speakerNotes: `Thank you for your time today. We've structured this discussion as a customized blueprint for modernizing ${ENTERPRISE_PRESETS[0].name}'s spend management and working capital strategy, with native connectivity into your ${ENTERPRISE_PRESETS[0].erp} stack.`,
      },
      {
        slideNumber: 2,
        title: 'Expense Management Diagnosis',
        strategicObjective: 'Expose operational leakage and validate pain points with the CFO.',
        headline: 'Current Operational Leakage & Friction Analysis',
        subheadline: `Quantifying the hidden administrative friction in ${ENTERPRISE_PRESETS[0].name}'s current spend cycle`,
        diagnosticMetrics: [
          { metric: '10-14 Days', label: 'Average Month-End Close Delay' },
          { metric: '22% Leakage', label: 'Missing Receipts / Unverified Invoices' },
          { metric: '195 Hours/mo', label: 'Manual Data Entry & Reconciliation' },
        ],
        keyBullets: [
          'Cross-border merchant payouts and regional subsidiary accounts cause reconciliation delays.',
          'Senior finance staff manually chasing thousands of receipts and matching bank line items.',
          'Rigid vendor payment terms locking up millions in strategic working capital.',
        ],
        speakerNotes: `CFOs in the ${ENTERPRISE_PRESETS[0].industry} space consistently tell us their month-end close takes 10+ days due to missing receipts and invoice friction. Does this leakage profile align with what your finance team experiences?`,
      },
      {
        slideNumber: 3,
        title: 'Transformation Journey',
        strategicObjective: "Frame the operational leap from legacy friction to Clara's model.",
        headline: 'From Reactive Disconnection to Real-Time Proactive Control',
        beforeState: [
          'Manual expense filing and delayed manager approvals',
          'Shared physical corporate cards with zero cost-center isolation',
          'Static 15-day supplier wire liquidation draining cash',
          'Manual CSV import / export into accounting systems',
        ],
        afterState: [
          'Native smartphone OCR capture with sub-second receipt matching',
          'Unlimited physical & virtual cards with dynamic sub-limits',
          `Up to 40 days interest-free float on $${initialApCard.toLocaleString()} in AP vendor spend`,
          `Automated two-way API ledger sync with ${ENTERPRISE_PRESETS[0].erp}`,
        ],
        speakerNotes: `Notice the fundamental architectural difference: Clara shifts ${ENTERPRISE_PRESETS[0].name}'s spend governance from a reactive, backward-looking reconciliation task into an automated, proactive system.`,
      },
      {
        slideNumber: 4,
        title: 'Solution Architecture',
        strategicObjective: 'Present a department-by-department rollout plan.',
        headline: 'Targeted Card & Spend Control Architecture by Department',
        departments: [
          { dept: 'Executive & Treasury', cardType: 'Physical Mastercard Black', control: 'Pre-approved travel, VIP concierge & strategic discretion' },
          { dept: 'Engineering & IT', cardType: 'Dynamic Virtual Cards', control: 'Vendor-locked recurring SaaS sub-limits (AWS, GitHub, Slack)' },
          { dept: 'Field & Operations', cardType: 'Physical Instant Lock', control: 'Fuel, logistics & maintenance category lockouts only' },
          { dept: 'Growth & Marketing', cardType: 'High-Velocity Virtual', control: 'Strict daily ad spend caps across Meta, Google Ads & TikTok' },
        ],
        speakerNotes: `Every team receives tailored instruments. Spend parameters are enforced BEFORE transactions execute at point-of-sale, entirely preventing out-of-policy surprises.`,
      },
      {
        slideNumber: 5,
        title: 'ERP Automation & Data Integrity',
        strategicObjective: 'Alleviate IT and Controller concerns regarding data accuracy.',
        headline: `Direct Two-Way Sync with ${ENTERPRISE_PRESETS[0].erp}`,
        subheadline: 'Zero manual journal entries, automated chart of accounts mapping',
        syncFeatures: [
          `Native ${ENTERPRISE_PRESETS[0].erp} API connector with pre-built field mappings`,
          'Automatic tax invoice (CFDI / XML / NF-e) validation and attachment',
          'Real-time sub-second sync eliminating reconciliation variance',
          'Bank-grade SOC 2 Type II and ISO 27001 data encryption',
        ],
        speakerNotes: `Your accounting team never touches manual expense spreadsheets again. Transactions reconcile into ${ENTERPRISE_PRESETS[0].name}'s chart of accounts automatically within seconds of swipe.`,
      },
      {
        slideNumber: 6,
        title: 'ROI & Financial Impact Simulator',
        strategicObjective: 'Prove definitive financial returns and operational gains.',
        headline: `$${(initialFloat + initialLabor + initialCashback).toLocaleString()} Projected Annual Financial Lift`,
        financialMetrics: [
          { label: 'Working Capital Float Extension', value: `$${initialFloat.toLocaleString()}` },
          { label: 'Reclaimed Accounting Labor Value', value: `$${initialLabor.toLocaleString()}` },
          { label: 'Direct Annual Corporate Cashback', value: `$${initialCashback.toLocaleString()}` },
          { label: 'Total Net Economic Advantage', value: `$${(initialFloat + initialLabor + initialCashback).toLocaleString()}` },
        ],
        speakerNotes: `Based on your monthly volume, Clara provides $${initialFloat.toLocaleString()} in immediate working capital float, frees 2,340 hours of senior finance time, and delivers $${initialCashback.toLocaleString()} in cashback.`,
      },
      {
        slideNumber: 7,
        title: 'Enterprise Validation & Benchmarks',
        strategicObjective: 'Establish peer-group credibility and de-risk the decision.',
        headline: `Proven Benchmark Performance in ${ENTERPRISE_PRESETS[0].industry}`,
        peerCaseStudy: `How a leading enterprise in your sector deployed Clara across 4 countries, compressed month-end close to 2.1 days, and recovered $${initialFloat.toLocaleString()} in liquid float.`,
        benchmarkStats: [
          { stat: '96.5%', label: 'Employee Policy Adoption Rate' },
          { stat: '-75%', label: 'Reduction in Out-of-Policy Expenses' },
          { stat: '2.1 Days', label: 'Average Month-End Close Achieved' },
        ],
        speakerNotes: `Here is tangible proof from your sector. We maintain an industry-leading 96.5% adoption rate because employees love the simplicity of receipt capture, while controllers get absolute real-time visibility.`,
      },
      {
        slideNumber: 8,
        title: 'Implementation Roadmap & Next Steps',
        strategicObjective: 'Provide a low-friction path to contract signing and deployment.',
        headline: '3-Week Rapid Onboarding (Zero Banking Disruption)',
        milestones: [
          { week: 'Week 1', task: 'Policy Definition, User Roles & Virtual Card Issuance' },
          { week: 'Week 2', task: `Native ${ENTERPRISE_PRESETS[0].erp} API Connector Sync & Chart of Accounts Mapping` },
          { week: 'Week 3', task: 'Pilot Department Rollout (Procurement & IT AP Liquidation)' },
        ],
        speakerNotes: `We can launch a targeted 3-week pilot with your procurement or IT team without disrupting your incumbent commercial banking relationships. What date best fits your team for the scoping kickoff?`,
      },
    ],
  });

  // Handle PPTX export
  const handleExportPptx = async () => {
    setIsExporting(true);
    try {
      await exportDeckToPptx(currentCompany, generatedDeck, financials);
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPresent={() => setIsPresenting(true)}
        onExportPptx={handleExportPptx}
        isExporting={isExporting}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Initiative Scorecard across all tabs */}
        <ExecutiveScorecard />

        {/* Tab Content Rendering */}
        {activeTab === 'studio' && (
          <DeckGeneratorStudio
            currentCompany={currentCompany}
            setCurrentCompany={setCurrentCompany}
            generatedDeck={generatedDeck}
            setGeneratedDeck={setGeneratedDeck}
            financials={financials}
            setFinancials={setFinancials}
            onViewDeck={() => setActiveTab('deck')}
          />
        )}

        {activeTab === 'deck' && (
          <SlideViewer
            company={currentCompany}
            deck={generatedDeck}
            financials={financials}
            onPresent={() => setIsPresenting(true)}
            onExportPptx={handleExportPptx}
            isExporting={isExporting}
          />
        )}

        {activeTab === 'roi' && <RoiCalculator />}

        {activeTab === 'catalog' && <ProductCatalogMatrix />}

        {activeTab === 'architecture' && <SystemArchitectureView />}

        {activeTab === 'governance' && <GovernanceView />}
      </main>

      {/* Full-Screen Presentation Modal */}
      {isPresenting && (
        <PresentationModal
          company={currentCompany}
          deck={generatedDeck}
          financials={financials}
          onClose={() => setIsPresenting(false)}
        />
      )}

      {/* Quiet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Clara PitchCraft AI</span>
            <span>·</span>
            <span>Enterprise Presentation & Pitch Generator</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>SOC 2 Type II Certified</span>
            <span>·</span>
            <span>Zero-Retention Ephemeral Memory</span>
            <span>·</span>
            <span>Mastercard Corporate Rails</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
