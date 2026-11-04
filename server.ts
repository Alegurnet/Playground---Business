import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Preset corporate company profiles for quick enrichment
const COMPANY_PRESETS: Record<string, any> = {
  'Mercado Libre': {
    name: 'Mercado Libre',
    domain: 'mercadolibre.com',
    industry: 'E-Commerce & FinTech',
    headcount: 55000,
    annualRevenue: '$14.5B',
    erp: 'SAP S/4HANA',
    monthlyCardSpend: 850000,
    monthlyApSpend: 4200000,
    brandColor: '#FFE600',
    accentColor: '#2D3277',
    ticker: 'MELI',
    primaryFriction: 'Cross-border merchant payouts, 14-day AP close cycle, 8,000+ monthly travel receipts without automated OCR matching.',
  },
  'FEMSA Logistics': {
    name: 'FEMSA Logistics',
    domain: 'femsa.com',
    industry: 'Supply Chain & Beverage Distribution',
    headcount: 320000,
    annualRevenue: '$38.2B',
    erp: 'Oracle ERP Cloud',
    monthlyCardSpend: 1200000,
    monthlyApSpend: 7500000,
    brandColor: '#E60000',
    accentColor: '#1A1A1A',
    ticker: 'KOF',
    primaryFriction: 'Fleet fuel card sharing risks, lack of real-time category lockouts, manual bill liquidation requiring 30+ wire batches weekly.',
  },
  'Kavak': {
    name: 'Kavak',
    domain: 'kavak.com',
    industry: 'Automotive & Tech Marketplace',
    headcount: 5000,
    annualRevenue: '$1.8B',
    erp: 'NetSuite SuiteSuccess',
    monthlyCardSpend: 450000,
    monthlyApSpend: 2800000,
    brandColor: '#0047FF',
    accentColor: '#0F172A',
    ticker: 'PRIVATE',
    primaryFriction: 'Hub mechanics using personal cards with 45-day reimbursement backlogs; multiple legal entities across Mexico, Brazil, and Colombia.',
  },
  'Rappi Enterprise': {
    name: 'Rappi Enterprise',
    domain: 'rappi.com',
    industry: 'On-Demand Delivery & SuperApp',
    headcount: 4200,
    annualRevenue: '$1.2B',
    erp: 'SAP ECC 6.0',
    monthlyCardSpend: 620000,
    monthlyApSpend: 3100000,
    brandColor: '#FF441F',
    accentColor: '#1E293B',
    ticker: 'PRIVATE',
    primaryFriction: 'SaaS seat sprawl with unmonitored virtual subscriptions, fragmented regional banking portals, missing tax invoices (CFDI/NF-e).',
  },
  'Grupo Bimbo': {
    name: 'Grupo Bimbo',
    domain: 'grupobimbo.com',
    industry: 'Global Food Processing & Manufacturing',
    headcount: 148000,
    annualRevenue: '$22.4B',
    erp: 'SAP S/4HANA',
    monthlyCardSpend: 2100000,
    monthlyApSpend: 11000000,
    brandColor: '#002B7F',
    accentColor: '#E31B23',
    ticker: 'BIMBOA',
    primaryFriction: 'Decentralized procurement across 34 countries, fragmented procurement cards with no direct chart of accounts mapping, month-end discrepancies.',
  },
  'Nubank LatAm': {
    name: 'Nubank LatAm',
    domain: 'nubank.com.br',
    industry: 'Digital Banking & Financial Services',
    headcount: 8500,
    annualRevenue: '$8.0B',
    erp: 'NetSuite OneWorld',
    monthlyCardSpend: 950000,
    monthlyApSpend: 5400000,
    brandColor: '#820AD1',
    accentColor: '#111827',
    ticker: 'NU',
    primaryFriction: 'Rapid multi-country headcount expansion requiring instant virtual card provisioning and fine-grained department sub-limits.',
  },
};

// API: Company enrichment lookup
app.post('/api/enrich-company', (req, res) => {
  const { name, domain } = req.body;
  const searchKey = Object.keys(COMPANY_PRESETS).find(
    (k) =>
      k.toLowerCase() === (name || '').toLowerCase() ||
      COMPANY_PRESETS[k].domain.toLowerCase() === (domain || '').toLowerCase()
  );

  if (searchKey) {
    return res.json({
      success: true,
      enriched: true,
      company: COMPANY_PRESETS[searchKey],
    });
  }

  // Generative or heuristic fallback for custom company
  const fallback = {
    name: name || 'Enterprise Client Inc.',
    domain: domain || `${(name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    industry: 'Enterprise Technology & Services',
    headcount: 2500,
    annualRevenue: '$250M',
    erp: 'SAP S/4HANA',
    monthlyCardSpend: 350000,
    monthlyApSpend: 2200000,
    brandColor: '#0052CC',
    accentColor: '#0F172A',
    ticker: 'ENTERPRISE',
    primaryFriction: 'Manual expense report reconciliation, card sharing risks across regional branches, delayed month-end close.',
  };

  return res.json({
    success: true,
    enriched: false,
    company: fallback,
  });
});

// Helper: Deterministic Financial Model
function calculateDeterministicFinancials(monthlyApSpend: number, monthlyCardSpend: number, extendedTermsDays: number = 25) {
  // Float benefit = (Monthly AP spend via card / 30) * Float days
  const apViaCardEstimated = monthlyApSpend * 0.45; // 45% AP card addressable
  const workingCapitalBenefit = (apViaCardEstimated / 30) * extendedTermsDays;
  
  // Hours saved:
  // Expense admin hours saved: ~85 hours/month
  // AP invoice manual liquidation hours saved: ~110 hours/month
  const monthlyAdminHoursSaved = 195;
  const annualHoursSaved = monthlyAdminHoursSaved * 12;
  const financialLaborValue = annualHoursSaved * 35.00; // $35/hr blended rate

  // Cashback earned (1.25% average corporate interchange tier)
  const monthlyCardTotal = monthlyCardSpend + apViaCardEstimated;
  const annualCashback = monthlyCardTotal * 0.0125 * 12;

  // Total Annual Impact
  const totalAnnualEconomicImpact = workingCapitalBenefit + financialLaborValue + annualCashback;

  return {
    apViaCardEstimated: Math.round(apViaCardEstimated),
    workingCapitalBenefit: Math.round(workingCapitalBenefit),
    monthlyAdminHoursSaved,
    annualHoursSaved,
    financialLaborValue: Math.round(financialLaborValue),
    annualCashback: Math.round(annualCashback),
    totalAnnualEconomicImpact: Math.round(totalAnnualEconomicImpact),
    extendedTermsDays,
  };
}

// API: Generate Tailored Pitch Deck with Gemini 3.8 Flash
app.post('/api/generate-deck', async (req, res) => {
  try {
    const {
      companyName,
      domain,
      industry,
      headcount,
      erp,
      monthlyCardSpend = 400000,
      monthlyApSpend = 2500000,
      primaryFriction,
      accountExecutive = 'Carlos Mendez (Enterprise Lead)',
      customNotes = '',
    } = req.body;

    // 1. Calculate deterministic numbers (Zero-hallucination compliance)
    const deterministic = calculateDeterministicFinancials(
      Number(monthlyApSpend),
      Number(monthlyCardSpend)
    );

    // 2. Format LLM Prompt for Gemini 3.8 Flash
    const prompt = `You are the lead Enterprise Commercial Solutions Architect at Clara (corporate credit cards, automated expense management, bill pay / AP, and native ERP sync).
You are compiling a co-branded, enterprise-level pitch deck for:
Client: ${companyName} (${domain || 'enterprise.com'})
Industry: ${industry || 'Mid-Market to Large Enterprise'}
Headcount: ${headcount || '3,000+'}
ERP System: ${erp || 'SAP S/4HANA'}
Monthly Corporate Card Spend: $${monthlyCardSpend.toLocaleString()}
Monthly Accounts Payable (AP) Spend: $${monthlyApSpend.toLocaleString()}
Key Operational Friction: ${primaryFriction || 'Manual reconciliation, card sharing, delayed month-end close'}
Account Executive: ${accountExecutive}
Additional AE Strategy Notes: ${customNotes || 'Focus on CFO working capital float and elimination of ERP manual entries'}

Deterministic Financial Baseline (You MUST respect these exact numbers in the slides and notes):
- Addressable AP via Clara Bill Pay: $${deterministic.apViaCardEstimated.toLocaleString()}
- Working Capital Float Extension: $${deterministic.workingCapitalBenefit.toLocaleString()} (up to 40 days float)
- Annual Accounting & Admin Hours Reclaimed: ${deterministic.annualHoursSaved.toLocaleString()} hours/year ($${deterministic.financialLaborValue.toLocaleString()} labor value)
- Projected Annual Cashback: $${deterministic.annualCashback.toLocaleString()}
- Total Annual Financial Lift: $${deterministic.totalAnnualEconomicImpact.toLocaleString()}

Please generate the exact content and tailored AE speaker notes for the standard 8-Slide Co-Branded Enterprise Deck Flow.
Return a valid JSON object matching the following structure:
{
  "deckTitle": "Clara Enterprise Spend Modernization Blueprint for [Company]",
  "slides": [
    {
      "slideNumber": 1,
      "title": "Executive Co-Branded Cover",
      "strategicObjective": "Deliver immediate visual personalization and partnership posture.",
      "headline": "Modernizing Enterprise Spend & Working Capital for [Company]",
      "subheadline": "A customized financial operations blueprint powered by Clara",
      "keyBullets": ["Confidential Executive Discussion", "Tailored for [ERP]", "3-Week Zero-Disruption Pilot"],
      "speakerNotes": "Exact guidance for AE opening pitch..."
    },
    {
      "slideNumber": 2,
      "title": "Expense Management Diagnosis",
      "strategicObjective": "Expose operational leakage and validate pain points with the CFO.",
      "headline": "Current Operational Leakage & Friction Analysis",
      "subheadline": "Quantifying the hidden costs in [Company]'s current expense cycle",
      "diagnosticMetrics": [
        {"metric": "10-14 Days", "label": "Average Month-End Close Delay"},
        {"metric": "22% Leakage", "label": "Missing Tax Receipts / Unverified Invoices"},
        {"metric": "195 Hours/mo", "label": "Manual Data Entry & Reconciliation"}
      ],
      "keyBullets": ["Point 1", "Point 2", "Point 3"],
      "speakerNotes": "AE guidance for slide 2..."
    },
    {
      "slideNumber": 3,
      "title": "Transformation Journey",
      "strategicObjective": "Frame the operational leap from legacy friction to Clara's model.",
      "headline": "From Reactive Disconnection to Real-Time Proactive Control",
      "beforeState": ["Manual expense reports", "Shared physical corporate cards", "Delayed bank wire liquidations"],
      "afterState": ["Native Clara mobile OCR capture", "Departmental virtual & physical cards with dynamic sub-limits", "Up to 40-day float on AP vendor disbursements"],
      "speakerNotes": "AE guidance for slide 3..."
    },
    {
      "slideNumber": 4,
      "title": "Solution Architecture",
      "strategicObjective": "Present a department-by-department rollout plan.",
      "headline": "Targeted Card & Control Architecture by Department",
      "departments": [
        {"dept": "Executive & Leadership", "cardType": "Physical Mastercard Black", "control": "Pre-approved travel & discretionary limits"},
        {"dept": "Engineering & IT", "cardType": "Dynamic Virtual Cards", "control": "Vendor-locked SaaS limits (AWS, Google, GitHub)"},
        {"dept": "Field & Operations", "cardType": "Physical Instant Lock", "control": "Fuel and maintenance category rules only"},
        {"dept": "Growth & Marketing", "cardType": "High-Velocity Virtual", "control": "Daily ad-spend caps (Meta, Google Ads)"}
      ],
      "speakerNotes": "AE guidance for slide 4..."
    },
    {
      "slideNumber": 5,
      "title": "ERP Automation & Data Integrity",
      "strategicObjective": "Alleviate IT and Controller concerns regarding data accuracy.",
      "headline": "Direct Two-Way Sync with [ERP]",
      "subheadline": "Zero manual journal entries, automated chart of accounts mapping",
      "syncFeatures": ["Automated RFC/API handshake", "Sub-second transaction reconciliation", "Tax receipt validation (CFDI / XML)"],
      "speakerNotes": "AE guidance for slide 5..."
    },
    {
      "slideNumber": 6,
      "title": "ROI & Financial Impact Simulator",
      "strategicObjective": "Prove definitive financial returns and operational gains.",
      "headline": "$[Total] Projected Annual Financial Lift",
      "financialMetrics": [
        {"label": "Working Capital Float Benefit", "value": "$[Value]"},
        {"label": "Reclaimed Accounting Labor Value", "value": "$[Value]"},
        {"label": "Direct Annual Corporate Cashback", "value": "$[Value]"},
        {"label": "Total Net Economic Advantage", "value": "$[Value]"}
      ],
      "speakerNotes": "AE guidance for slide 6..."
    },
    {
      "slideNumber": 7,
      "title": "Enterprise Validation & Benchmarks",
      "strategicObjective": "Establish peer-group credibility and de-risk the decision.",
      "headline": "Proven Benchmark Performance in [Industry]",
      "peerCaseStudy": "How a tier-1 enterprise reduced close cycle from 12 days to 48 hours while unlocking $3M in working capital float.",
      "benchmarkStats": [
        {"stat": "96.5%", "label": "Employee Policy Adoption Rate"},
        {"stat": "-75%", "label": "Reduction in Out-of-Policy Expenses"},
        {"stat": "2.1 Days", "label": "Accelerated Month-End Close"}
      ],
      "speakerNotes": "AE guidance for slide 7..."
    },
    {
      "slideNumber": 8,
      "title": "Implementation Roadmap & Next Steps",
      "strategicObjective": "Provide a low-friction path to contract signing and deployment.",
      "headline": "3-Week Rapid Onboarding (Zero Banking Disruption)",
      "milestones": [
        {"week": "Week 1", "task": "Policy Definition & Virtual Card Provisioning"},
        {"week": "Week 2", "task": "Native ERP Integration Sync ([ERP] Chart of Accounts)"},
        {"week": "Week 3", "task": "Pilot Department Rollout & Vendor AP Liquidation"}
      ],
      "speakerNotes": "AE guidance for slide 8..."
    }
  ]
}`;

    let generatedDeck: any = null;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          generatedDeck = JSON.parse(textOutput);
        }
      } catch (err) {
        console.warn('Gemini API call warning, falling back to deterministic synthesis:', err);
      }
    }

    // High-fidelity fallback if Gemini was unavailable or returned non-JSON
    if (!generatedDeck || !generatedDeck.slides) {
      generatedDeck = {
        deckTitle: `Clara Enterprise Spend Modernization Blueprint for ${companyName}`,
        slides: [
          {
            slideNumber: 1,
            title: 'Executive Co-Branded Cover',
            strategicObjective: 'Deliver immediate visual personalization and partnership posture.',
            headline: `Modernizing Enterprise Spend & Working Capital for ${companyName}`,
            subheadline: `A customized financial operations blueprint tailored for ${erp}`,
            keyBullets: [
              `Confidential Strategic Proposal for ${companyName}`,
              `Native ${erp} API Integration & Two-Way Sync`,
              '3-Week Turnkey Pilot with Zero Banking Disruption',
            ],
            speakerNotes: `Thank you for your time today. We've structured this discussion as a customized blueprint for modernizing ${companyName}'s spend management and working capital strategy, with native connectivity into your ${erp} stack.`,
          },
          {
            slideNumber: 2,
            title: 'Expense Management Diagnosis',
            strategicObjective: 'Expose operational leakage and validate pain points with the CFO.',
            headline: 'Current Operational Leakage & Friction Analysis',
            subheadline: `Quantifying the hidden administrative friction in ${companyName}'s current spend cycle`,
            diagnosticMetrics: [
              { metric: '10-14 Days', label: 'Average Month-End Close Delay' },
              { metric: '22% Leakage', label: 'Missing Receipts / Unverified Invoices' },
              { metric: `${deterministic.monthlyAdminHoursSaved} Hours/mo`, label: 'Reconciliation & Data Entry Overhead' },
            ],
            keyBullets: [
              primaryFriction || 'Departmental card sharing creates audit vulnerabilities and lack of real-time control.',
              'Finance team spends hours chasing receipts and cross-referencing bank statements manually.',
              'Supplier terms are rigid, locking up critical operational cash flow that could be optimized.',
            ],
            speakerNotes: `CFOs in the ${industry} space consistently tell us their month-end close takes 10+ days due to missing receipts and invoice friction. Does this leakage profile align with what ${companyName}'s finance team experiences?`,
          },
          {
            slideNumber: 3,
            title: 'Transformation Journey',
            strategicObjective: "Frame the operational leap from legacy friction to Clara's model.",
            headline: 'From Reactive Disconnection to Real-Time Proactive Control',
            beforeState: [
              'Manual expense filing and delayed manager approvals',
              'Shared physical credit cards with zero cost-center isolation',
              'Static 15-day supplier wire liquidation draining cash',
              'Manual CSV import / export into accounting systems',
            ],
            afterState: [
              'Native smartphone OCR capture with sub-second receipt matching',
              'Unlimited physical & virtual cards with granular category sub-limits',
              `Up to 40 days interest-free float on $${deterministic.apViaCardEstimated.toLocaleString()} in AP vendor spend`,
              `Automated two-way API ledger sync with ${erp}`,
            ],
            speakerNotes: `Notice the fundamental architectural difference: Clara shifts ${companyName}'s spend governance from a reactive, backward-looking reconciliation task into an automated, proactive system.`,
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
            headline: `Direct Two-Way Sync with ${erp}`,
            subheadline: `Zero manual journal entries, automated chart of accounts mapping`,
            syncFeatures: [
              `Native ${erp} API connector with pre-built field mappings`,
              'Automatic tax invoice (CFDI / XML / NF-e) validation and attachment',
              'Real-time sub-second sync eliminating reconciliation variance',
              'Bank-grade SOC 2 Type II and ISO 27001 data encryption',
            ],
            speakerNotes: `Your accounting team never touches manual expense spreadsheets again. Transactions reconcile into ${companyName}'s chart of accounts automatically within seconds of swipe.`,
          },
          {
            slideNumber: 6,
            title: 'ROI & Financial Impact Simulator',
            strategicObjective: 'Prove definitive financial returns and operational gains.',
            headline: `$${deterministic.totalAnnualEconomicImpact.toLocaleString()} Projected Annual Financial Lift`,
            financialMetrics: [
              { label: 'Working Capital Float Extension', value: `$${deterministic.workingCapitalBenefit.toLocaleString()}` },
              { label: 'Reclaimed Accounting Labor Value', value: `$${deterministic.financialLaborValue.toLocaleString()}` },
              { label: 'Direct Annual Corporate Cashback', value: `$${deterministic.annualCashback.toLocaleString()}` },
              { label: 'Total Net Economic Advantage', value: `$${deterministic.totalAnnualEconomicImpact.toLocaleString()}` },
            ],
            speakerNotes: `Based on your monthly volume, Clara provides $${deterministic.workingCapitalBenefit.toLocaleString()} in immediate working capital float, frees ${deterministic.annualHoursSaved.toLocaleString()} hours of senior finance time, and delivers $${deterministic.annualCashback.toLocaleString()} in cashback.`,
          },
          {
            slideNumber: 7,
            title: 'Enterprise Validation & Benchmarks',
            strategicObjective: 'Establish peer-group credibility and de-risk the decision.',
            headline: `Proven Benchmark Performance in ${industry}`,
            peerCaseStudy: `How a leading enterprise in your sector deployed Clara across 4 countries, compressed month-end close to 2.1 days, and recovered $${deterministic.workingCapitalBenefit.toLocaleString()} in liquid float.`,
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
              { week: 'Week 2', task: `Native ${erp} API Connector Sync & Chart of Accounts Mapping` },
              { week: 'Week 3', task: 'Pilot Department Rollout (Procurement & IT AP Liquidation)' },
            ],
            speakerNotes: `We can launch a targeted 3-week pilot with your procurement or IT team without disrupting your incumbent commercial banking relationships. What date best fits your team for the scoping kickoff?`,
          },
        ],
      };
    }

    // Combine metadata with deterministic payload
    return res.json({
      success: true,
      company: {
        name: companyName,
        domain,
        industry,
        headcount,
        erp,
        monthlyCardSpend,
        monthlyApSpend,
        accountExecutive,
      },
      deterministic,
      deck: generatedDeck,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Deck generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while generating deck',
    });
  }
});

// Start Express server and mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clara PitchCraft AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
