import pptxgen from 'pptxgenjs';
import { CompanyProspect, GeneratedDeck, DeterministicFinancials } from '../types';

export async function exportDeckToPptx(
  company: CompanyProspect,
  deck: GeneratedDeck,
  financials: DeterministicFinancials
) {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Clara PitchCraft AI';
  pptx.company = 'Clara';
  pptx.title = `${company.name} - Clara Enterprise Spend Modernization Blueprint`;

  // Color theme
  const CLARA_NAVY = '0A0E1A';
  const CLARA_CARD = '131B2E';
  const CLARA_EMERALD = '10B981';
  const CLARA_WHITE = 'FFFFFF';
  const CLARA_MUTED = '94A3B8';
  const CLARA_BORDER = '2D3748';

  // Slide 1: Cover
  const slide1 = pptx.addSlide();
  slide1.background = { color: CLARA_NAVY };

  // Clara Brand Tag
  slide1.addText('CLARA ENTERPRISE SOLUTIONS', {
    x: 1.0,
    y: 0.8,
    w: 8.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide1.addText(deck.slides[0]?.headline || `Modernizing Enterprise Spend & Working Capital for ${company.name}`, {
    x: 1.0,
    y: 1.4,
    w: 11.0,
    h: 1.5,
    fontSize: 28,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  slide1.addText(deck.slides[0]?.subheadline || `A customized financial operations blueprint powered by Clara & ${company.erp}`, {
    x: 1.0,
    y: 3.1,
    w: 10.0,
    h: 0.8,
    fontSize: 16,
    fontFace: 'Arial',
    color: CLARA_MUTED,
  });

  // Client Metadata Box
  slide1.addShape(pptx.ShapeType.rect, {
    x: 1.0,
    y: 4.4,
    w: 11.3,
    h: 1.8,
    fill: { color: CLARA_CARD },
    line: { color: CLARA_BORDER, width: 1 },
  });

  slide1.addText([
    { text: `TARGET CLIENT: ${company.name.toUpperCase()}   |   INDUSTRY: ${company.industry}   |   ERP: ${company.erp}\n`, options: { bold: true, color: CLARA_WHITE, fontSize: 13 } },
    { text: `CONFIDENTIAL COMMERCIAL PROPOSAL  ·  ESTIMATED FLOAT: $${financials.workingCapitalBenefit.toLocaleString()}  ·  PILOT TIMELINE: 3 WEEKS\n`, options: { color: CLARA_EMERALD, fontSize: 11 } },
    { text: `Date: ${new Date().toLocaleDateString()}  ·  Prepared by Clara Enterprise Solutions Team`, options: { color: CLARA_MUTED, fontSize: 10 } },
  ], {
    x: 1.3,
    y: 4.6,
    w: 10.7,
    h: 1.4,
    fontFace: 'Arial',
  });

  if (deck.slides[0]?.speakerNotes) {
    slide1.addNotes(deck.slides[0].speakerNotes);
  }

  // Slide 2: Diagnosis
  const slide2 = pptx.addSlide();
  slide2.background = { color: CLARA_NAVY };

  slide2.addText('02 // EXPENSE MANAGEMENT DIAGNOSIS', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide2.addText(deck.slides[1]?.headline || 'Current Operational Leakage & Friction Analysis', {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  // 3 Metric Cards
  const diagMetrics = deck.slides[1]?.diagnosticMetrics || [
    { metric: '10-14 Days', label: 'Average Month-End Close Delay' },
    { metric: '22% Leakage', label: 'Missing Tax Receipts / Friction' },
    { metric: `${financials.monthlyAdminHoursSaved} Hours/mo`, label: 'Manual Admin Overhead' },
  ];

  diagMetrics.forEach((m, idx) => {
    const cardX = 0.8 + idx * 3.9;
    slide2.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.9,
      w: 3.6,
      h: 1.6,
      fill: { color: CLARA_CARD },
      line: { color: CLARA_BORDER, width: 1 },
    });
    slide2.addText(m.metric, {
      x: cardX + 0.2,
      y: 2.1,
      w: 3.2,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Arial',
      color: CLARA_EMERALD,
      bold: true,
    });
    slide2.addText(m.label, {
      x: cardX + 0.2,
      y: 2.7,
      w: 3.2,
      h: 0.6,
      fontSize: 12,
      fontFace: 'Arial',
      color: CLARA_MUTED,
    });
  });

  // Bullets Box
  slide2.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 3.8,
    w: 11.5,
    h: 2.6,
    fill: { color: CLARA_CARD },
    line: { color: CLARA_BORDER, width: 1 },
  });

  const bulletsText = (deck.slides[1]?.keyBullets || [
    'Departmental card sharing creates audit vulnerabilities and lack of real-time control.',
    'Senior finance team members spend hours each week manually chasing receipts and invoice matching.',
    'Rigid supplier terms freeze operational liquidity that could be optimized via corporate float.',
  ]).map(b => ({ text: `• ${b}\n\n`, options: { color: CLARA_WHITE, fontSize: 13 } }));

  slide2.addText(bulletsText, {
    x: 1.1,
    y: 4.1,
    w: 11.0,
    h: 2.2,
    fontFace: 'Arial',
  });

  if (deck.slides[1]?.speakerNotes) {
    slide2.addNotes(deck.slides[1].speakerNotes);
  }

  // Slide 3: Transformation Journey (Before vs After)
  const slide3 = pptx.addSlide();
  slide3.background = { color: CLARA_NAVY };

  slide3.addText('03 // TRANSFORMATION JOURNEY', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide3.addText(deck.slides[2]?.headline || 'From Reactive Disconnection to Real-Time Proactive Control', {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  // Before Column
  slide3.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.9,
    w: 5.6,
    h: 4.5,
    fill: { color: '1A1520' },
    line: { color: '4A2030', width: 1 },
  });
  slide3.addText('CURRENT LEGACY ENVIRONMENT', {
    x: 1.1,
    y: 2.1,
    w: 5.0,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: 'EF4444',
    bold: true,
  });

  const beforeItems = (deck.slides[2]?.beforeState || [
    'Manual paper/email expense filing with 14-day approval delays',
    'Shared physical corporate cards with high fraud and leakage risk',
    'Static bank wire liquidations locking up working capital',
    'Manual CSV reconciliations prone to human entry errors',
  ]).map(item => ({ text: `✕ ${item}\n\n`, options: { color: 'E2E8F0', fontSize: 12 } }));

  slide3.addText(beforeItems, {
    x: 1.1,
    y: 2.7,
    w: 5.0,
    h: 3.4,
    fontFace: 'Arial',
  });

  // After Column
  slide3.addShape(pptx.ShapeType.rect, {
    x: 6.7,
    y: 1.9,
    w: 5.6,
    h: 4.5,
    fill: { color: '0D241E' },
    line: { color: '10B981', width: 1 },
  });
  slide3.addText('TRANSFORMED CLARA PLATFORM', {
    x: 7.0,
    y: 2.1,
    w: 5.0,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  const afterItems = (deck.slides[2]?.afterState || [
    'Native smartphone OCR receipt capture with instant verification',
    'Unlimited physical & virtual cards with dynamic sub-limits',
    `Up to 40 days interest-free float on supplier AP invoices`,
    `Real-time automated two-way API ledger sync with ${company.erp}`,
  ]).map(item => ({ text: `✓ ${item}\n\n`, options: { color: 'E2E8F0', fontSize: 12 } }));

  slide3.addText(afterItems, {
    x: 7.0,
    y: 2.7,
    w: 5.0,
    h: 3.4,
    fontFace: 'Arial',
  });

  if (deck.slides[2]?.speakerNotes) {
    slide3.addNotes(deck.slides[2].speakerNotes);
  }

  // Slide 4: Solution Architecture
  const slide4 = pptx.addSlide();
  slide4.background = { color: CLARA_NAVY };

  slide4.addText('04 // SOLUTION ARCHITECTURE', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide4.addText(deck.slides[3]?.headline || 'Targeted Card & Control Architecture by Department', {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  const depts = deck.slides[3]?.departments || [
    { dept: 'Executive & Treasury', cardType: 'Physical Mastercard Black', control: 'Pre-approved travel limits & strategic discretion' },
    { dept: 'Engineering & IT', cardType: 'Dynamic Virtual Cards', control: 'Vendor-locked recurring SaaS sub-limits (AWS, GitHub, Slack)' },
    { dept: 'Field & Operations', cardType: 'Physical Instant Lock', control: 'Fuel, logistics & maintenance category lockouts only' },
    { dept: 'Growth & Marketing', cardType: 'High-Velocity Virtual', control: 'Strict daily ad spend caps across Meta & Google Ads' },
  ];

  depts.forEach((d, idx) => {
    const cardY = 1.9 + idx * 1.15;
    slide4.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: cardY,
      w: 11.5,
      h: 0.95,
      fill: { color: CLARA_CARD },
      line: { color: CLARA_BORDER, width: 1 },
    });
    slide4.addText(d.dept, {
      x: 1.1,
      y: cardY + 0.15,
      w: 3.2,
      h: 0.6,
      fontSize: 14,
      fontFace: 'Arial',
      color: CLARA_WHITE,
      bold: true,
    });
    slide4.addText(d.cardType, {
      x: 4.5,
      y: cardY + 0.15,
      w: 3.0,
      h: 0.6,
      fontSize: 12,
      fontFace: 'Arial',
      color: CLARA_EMERALD,
      bold: true,
    });
    slide4.addText(d.control, {
      x: 7.7,
      y: cardY + 0.15,
      w: 4.3,
      h: 0.6,
      fontSize: 11,
      fontFace: 'Arial',
      color: CLARA_MUTED,
    });
  });

  if (deck.slides[3]?.speakerNotes) {
    slide4.addNotes(deck.slides[3].speakerNotes);
  }

  // Slide 5: ERP Automation
  const slide5 = pptx.addSlide();
  slide5.background = { color: CLARA_NAVY };

  slide5.addText('05 // ERP AUTOMATION & DATA INTEGRITY', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide5.addText(deck.slides[4]?.headline || `Direct Two-Way Sync with ${company.erp}`, {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  slide5.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.9,
    w: 11.5,
    h: 4.5,
    fill: { color: CLARA_CARD },
    line: { color: CLARA_BORDER, width: 1 },
  });

  const syncFeatures = (deck.slides[4]?.syncFeatures || [
    `Native ${company.erp} pre-configured API connector with zero IT scripting required`,
    'Automated tax receipt attachment (CFDI, XML, NF-e) directly to journal entries',
    'Real-time sub-second transaction reconciliation matching bank ledgers',
    'Enterprise-grade SOC 2 Type II, ISO 27001, and GDPR/LGPD data security certification',
  ]).map(feat => ({ text: `⚙  ${feat}\n\n`, options: { color: CLARA_WHITE, fontSize: 14 } }));

  slide5.addText(syncFeatures, {
    x: 1.2,
    y: 2.3,
    w: 10.7,
    h: 3.8,
    fontFace: 'Arial',
  });

  if (deck.slides[4]?.speakerNotes) {
    slide5.addNotes(deck.slides[4].speakerNotes);
  }

  // Slide 6: ROI & Financial Impact Simulator
  const slide6 = pptx.addSlide();
  slide6.background = { color: CLARA_NAVY };

  slide6.addText('06 // ROI & FINANCIAL IMPACT SIMULATOR', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide6.addText(`$${financials.totalAnnualEconomicImpact.toLocaleString()} Projected Annual Financial Advantage`, {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  const finMetrics = [
    { label: 'Working Capital Float (up to 40 days)', value: `$${financials.workingCapitalBenefit.toLocaleString()}` },
    { label: `Reclaimed Labor (${financials.annualHoursSaved} hrs/yr)`, value: `$${financials.financialLaborValue.toLocaleString()}` },
    { label: 'Projected Corporate Cashback', value: `$${financials.annualCashback.toLocaleString()}` },
    { label: 'Net Annual Economic Impact', value: `$${financials.totalAnnualEconomicImpact.toLocaleString()}` },
  ];

  finMetrics.forEach((m, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const cardX = 0.8 + col * 5.9;
    const cardY = 1.9 + row * 2.3;

    slide6.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 5.6,
      h: 2.0,
      fill: { color: CLARA_CARD },
      line: { color: idx === 3 ? CLARA_EMERALD : CLARA_BORDER, width: idx === 3 ? 2 : 1 },
    });

    slide6.addText(m.value, {
      x: cardX + 0.3,
      y: cardY + 0.3,
      w: 5.0,
      h: 0.7,
      fontSize: 26,
      fontFace: 'Arial',
      color: idx === 3 ? CLARA_EMERALD : CLARA_WHITE,
      bold: true,
    });

    slide6.addText(m.label, {
      x: cardX + 0.3,
      y: cardY + 1.1,
      w: 5.0,
      h: 0.6,
      fontSize: 13,
      fontFace: 'Arial',
      color: CLARA_MUTED,
    });
  });

  if (deck.slides[5]?.speakerNotes) {
    slide6.addNotes(deck.slides[5].speakerNotes);
  }

  // Slide 7: Validation
  const slide7 = pptx.addSlide();
  slide7.background = { color: CLARA_NAVY };

  slide7.addText('07 // ENTERPRISE VALIDATION & BENCHMARKS', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide7.addText(deck.slides[6]?.headline || `Proven Benchmark Performance in ${company.industry}`, {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  // 3 Stats
  const benchStats = deck.slides[6]?.benchmarkStats || [
    { stat: '96.5%', label: 'Employee Policy Adoption Rate' },
    { stat: '-75%', label: 'Reduction in Out-of-Policy Expenses' },
    { stat: '2.1 Days', label: 'Average Month-End Close Duration' },
  ];

  benchStats.forEach((s, idx) => {
    const cardX = 0.8 + idx * 3.9;
    slide7.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.9,
      w: 3.6,
      h: 1.6,
      fill: { color: CLARA_CARD },
      line: { color: CLARA_BORDER, width: 1 },
    });
    slide7.addText(s.stat, {
      x: cardX + 0.2,
      y: 2.1,
      w: 3.2,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Arial',
      color: CLARA_EMERALD,
      bold: true,
    });
    slide7.addText(s.label, {
      x: cardX + 0.2,
      y: 2.7,
      w: 3.2,
      h: 0.6,
      fontSize: 12,
      fontFace: 'Arial',
      color: CLARA_MUTED,
    });
  });

  // Case Study Quote Box
  slide7.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 3.8,
    w: 11.5,
    h: 2.6,
    fill: { color: CLARA_CARD },
    line: { color: CLARA_BORDER, width: 1 },
  });

  slide7.addText([
    { text: 'ENTERPRISE PEER CASE STUDY\n', options: { color: CLARA_EMERALD, bold: true, fontSize: 12 } },
    { text: `"${deck.slides[6]?.peerCaseStudy || `How a leading enterprise deployed Clara across 4 countries, compressed month-end close to 2 days, and unlocked $${financials.workingCapitalBenefit.toLocaleString()} in liquid float.`}"\n\n`, options: { color: CLARA_WHITE, fontSize: 14 } },
    { text: '— CFO, Tier-1 Regional Enterprise Client', options: { color: CLARA_MUTED, fontSize: 11 } },
  ], {
    x: 1.1,
    y: 4.1,
    w: 10.9,
    h: 2.0,
    fontFace: 'Arial',
  });

  if (deck.slides[6]?.speakerNotes) {
    slide7.addNotes(deck.slides[6].speakerNotes);
  }

  // Slide 8: Roadmap & Next Steps
  const slide8 = pptx.addSlide();
  slide8.background = { color: CLARA_NAVY };

  slide8.addText('08 // IMPLEMENTATION ROADMAP & NEXT STEPS', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: CLARA_EMERALD,
    bold: true,
  });

  slide8.addText('3-Week Rapid Onboarding (Zero Banking Disruption)', {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.8,
    fontSize: 22,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  const milestones = deck.slides[7]?.milestones || [
    { week: 'Week 1', task: 'Policy Definition, User Roles & Virtual Card Issuance' },
    { week: 'Week 2', task: `Native ${company.erp} API Connector Sync & Chart of Accounts Mapping` },
    { week: 'Week 3', task: 'Pilot Department Rollout (Procurement & IT AP Liquidation)' },
  ];

  milestones.forEach((m, idx) => {
    const cardX = 0.8 + idx * 3.9;
    slide8.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.9,
      w: 3.6,
      h: 3.2,
      fill: { color: CLARA_CARD },
      line: { color: CLARA_BORDER, width: 1 },
    });
    slide8.addText(m.week, {
      x: cardX + 0.3,
      y: 2.2,
      w: 3.0,
      h: 0.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: CLARA_EMERALD,
      bold: true,
    });
    slide8.addText(m.task, {
      x: cardX + 0.3,
      y: 2.8,
      w: 3.0,
      h: 1.8,
      fontSize: 13,
      fontFace: 'Arial',
      color: CLARA_WHITE,
    });
  });

  // Call to Action Box
  slide8.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 5.4,
    w: 11.5,
    h: 1.1,
    fill: { color: '0D241E' },
    line: { color: CLARA_EMERALD, width: 1 },
  });

  slide8.addText('READY TO COMMENCE SCOPING: Dedicated Implementation Lead assigned upon agreement. Zero changes required to existing bank accounts or credit facilities.', {
    x: 1.1,
    y: 5.65,
    w: 10.9,
    h: 0.6,
    fontSize: 12,
    fontFace: 'Arial',
    color: CLARA_WHITE,
    bold: true,
  });

  if (deck.slides[7]?.speakerNotes) {
    slide8.addNotes(deck.slides[7].speakerNotes);
  }

  // Trigger export
  const cleanName = (company.name || 'Enterprise_Client').replace(/[^a-zA-Z0-9_-]/g, '_');
  await pptx.writeFile({ fileName: `Clara_Pitch_${cleanName}_Deck.pptx` });
}
