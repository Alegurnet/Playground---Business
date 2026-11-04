import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Copy,
  Check,
  Building,
  CheckCircle2,
  XCircle,
  FileText,
  Volume2,
  Calendar,
  Layers,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';
import { CompanyProspect, GeneratedDeck, DeterministicFinancials, SlideContent } from '../types';

interface SlideViewerProps {
  company: CompanyProspect;
  deck: GeneratedDeck;
  financials: DeterministicFinancials;
  onPresent: () => void;
  onExportPptx: () => void;
  isExporting: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  company,
  deck,
  financials,
  onPresent,
  onExportPptx,
  isExporting,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [copiedNotes, setCopiedNotes] = useState(false);

  const slides = deck.slides || [];
  const currentSlide: SlideContent = slides[currentSlideIndex] || slides[0];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleCopyNotes = () => {
    if (currentSlide?.speakerNotes) {
      navigator.clipboard.writeText(currentSlide.speakerNotes);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Deck Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
            Slide {currentSlideIndex + 1} of {slides.length}: {currentSlide?.title}
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            {deck.deckTitle || `Clara Enterprise Spend Modernization Blueprint for ${company.name}`}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showNotes
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>AE Speaker Notes</span>
          </button>

          <button
            onClick={onPresent}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Present Full-Screen</span>
          </button>

          <button
            onClick={onExportPptx}
            disabled={isExporting}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors shadow-sm shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export .pptx'}</span>
          </button>
        </div>
      </div>

      {/* Main Presentation Viewport & Speaker Notes Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 16:9 Presentation Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative aspect-[16/9] w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 md:p-8 select-none">
            {/* Slide Header: Co-Branded Header Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    C
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">CLARA</span>
                </div>
                <span className="text-slate-600 text-xs">×</span>
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                  {company.name}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                <span>ERP: {company.erp}</span>
                <span>·</span>
                <span>Slide 0{currentSlideIndex + 1} / 0{slides.length}</span>
              </div>
            </div>

            {/* Slide Body: Dynamic Renderer Based on Slide Type */}
            <div className="flex-1 my-auto py-4 flex flex-col justify-center">
              {/* SLIDE 1: COVER */}
              {currentSlideIndex === 0 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Confidential Executive Strategy Proposal</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {currentSlide.headline}
                  </h1>
                  <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
                    {currentSlide.subheadline}
                  </p>

                  <div className="pt-4 grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase">Target Client</div>
                      <div className="text-sm font-bold text-white mt-0.5 truncate">{company.name}</div>
                      <div className="text-[11px] text-emerald-400 truncate mt-0.5">{company.industry}</div>
                    </div>

                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase">Core Stack</div>
                      <div className="text-sm font-bold text-white mt-0.5 truncate">{company.erp}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Native Connector</div>
                    </div>

                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase">Float Opportunity</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5 tabular-nums">
                        ${financials.workingCapitalBenefit.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Up to 40 Days Float</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: DIAGNOSIS */}
              {currentSlideIndex === 1 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentSlide.headline}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-400 mt-1">
                      {currentSlide.subheadline}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {(currentSlide.diagnosticMetrics || []).map((m, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                          {m.metric}
                        </div>
                        <div className="text-xs text-slate-300 mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded-lg space-y-2">
                    <div className="text-xs font-semibold text-slate-300">Identified Operational Friction Points:</div>
                    {(currentSlide.keyBullets || []).map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 shrink-0 font-bold">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: TRANSFORMATION JOURNEY */}
              {currentSlideIndex === 2 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentSlide.headline}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Architectural shift from reactive manual administration to real-time automated control
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="p-3.5 bg-red-950/20 border border-red-500/20 rounded-lg space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                        <XCircle className="w-4 h-4 shrink-0" />
                        <span>Current Legacy Environment</span>
                      </div>
                      {(currentSlide.beforeState || []).map((item, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-red-400/80 shrink-0">✕</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* After */}
                    <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Transformed Clara Architecture</span>
                      </div>
                      {(currentSlide.afterState || []).map((item, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: SOLUTION ARCHITECTURE */}
              {currentSlideIndex === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentSlide.headline}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Granular sub-limits and dedicated instruments assigned by operational function
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {(currentSlide.departments || []).map((dept, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{dept.dept}</span>
                          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {dept.cardType}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300">{dept.control}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: ERP AUTOMATION */}
              {currentSlideIndex === 4 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentSlide.headline}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentSlide.subheadline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(currentSlide.syncFeatures || []).map((feat, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg flex items-start gap-3">
                        <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0 text-xs">
                          {idx + 1}
                        </div>
                        <div className="text-xs text-slate-200 leading-relaxed font-medium">
                          {feat}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900/40 border border-slate-800/60 rounded-lg flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">Two-Way Live API & RFC Connectors</span>
                    <span>No CSV exports · Zero manual reconciliation · Automatic XML tax validation</span>
                  </div>
                </div>
              )}

              {/* SLIDE 6: ROI & FINANCIAL IMPACT */}
              {currentSlideIndex === 5 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      ${financials.totalAnnualEconomicImpact.toLocaleString()} Projected Annual Financial Advantage
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Deterministic calculation based on {company.name}'s monthly AP and card spend volumes
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-xs text-slate-400">Working Capital Float Extension</div>
                      <div className="text-xl md:text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">
                        ${financials.workingCapitalBenefit.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Up to 40 days interest-free float on supplier invoices</div>
                    </div>

                    <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-xs text-slate-400">Reclaimed Senior Labor Value</div>
                      <div className="text-xl md:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
                        ${financials.financialLaborValue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{financials.annualHoursSaved} hours/yr eliminated at $35/hr</div>
                    </div>

                    <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                      <div className="text-xs text-slate-400">Projected Annual Corporate Cashback</div>
                      <div className="text-xl md:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
                        ${financials.annualCashback.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">1.25% average corporate interchange tier</div>
                    </div>

                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <div className="text-xs font-semibold text-emerald-400">Total Net Economic Advantage</div>
                      <div className="text-xl md:text-2xl font-bold text-white font-mono mt-1 tabular-nums">
                        ${financials.totalAnnualEconomicImpact.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">Annualized enterprise bottom-line improvement</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 7: VALIDATION & BENCHMARKS */}
              {currentSlideIndex === 6 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentSlide.headline}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Demonstrated operational performance across comparable Mid-Market & Large Enterprises
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {(currentSlide.benchmarkStats || []).map((s, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                          {s.stat}
                        </div>
                        <div className="text-xs text-slate-300 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      Peer Enterprise Case Study
                    </div>
                    <blockquote className="text-xs text-slate-200 italic leading-relaxed">
                      "{currentSlide.peerCaseStudy || `How a leading enterprise in your sector deployed Clara across multiple legal entities, reduced month-end close to 2 days, and unlocked substantial working capital float.`}"
                    </blockquote>
                    <div className="text-[11px] text-slate-400 mt-2 font-medium">
                      — VP of Finance & Corporate Treasury, Tier-1 Regional Enterprise
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 8: ROADMAP & NEXT STEPS */}
              {currentSlideIndex === 7 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      3-Week Rapid Onboarding (Zero Banking Disruption)
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Low-friction parallel deployment with dedicated Clara implementation engineering
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {(currentSlide.milestones || []).map((m, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-emerald-400 font-mono">{m.week}</span>
                          <div className="text-xs text-slate-200 mt-2 leading-relaxed font-medium">
                            {m.task}
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                          Milestone {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Target Scoping Kickoff</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Zero changes required to incumbent commercial bank lines or credit accounts.
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 font-mono">3-Week Pilot</span>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate max-w-sm">
                Strategic Commercial Discussion · Confidential & Proprietary to {company.name}
              </span>
              <span className="text-emerald-400 font-medium">Clara Enterprise Solutions</span>
            </div>
          </div>

          {/* Slide Navigation Pagination Strip */}
          <div className="flex items-center justify-between px-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Slide</span>
            </button>

            {/* Slide Dots / Thumbnails */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`cursor-pointer w-7 h-7 rounded text-xs font-mono font-medium transition-all ${
                    currentSlideIndex === idx
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Contextual AE Speaker Notes & Objection Handlers (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">AE Speaker Notes & Pitch Script</h4>
              </div>
              <button
                onClick={handleCopyNotes}
                className="cursor-pointer text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                title="Copy speaker notes to clipboard"
              >
                {copiedNotes ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  Strategic Slide Objective
                </div>
                <div className="text-xs text-slate-300 bg-slate-950/80 border border-slate-800 rounded-lg p-3 leading-relaxed">
                  {currentSlide?.strategicObjective || 'Present Clara enterprise capabilities and de-risk deployment.'}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Verbatim Talking Points for AE
                </div>
                <div className="text-xs text-slate-200 bg-slate-950/80 border border-slate-800 rounded-lg p-3 leading-relaxed font-sans border-l-2 border-emerald-500">
                  {currentSlide?.speakerNotes || 'Guidance for commercial presentation...'}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  CFO / Controller Anticipated Inquiry
                </div>
                <div className="text-xs text-slate-300 bg-slate-950/80 border border-slate-800 rounded-lg p-3 leading-relaxed">
                  {currentSlideIndex === 1 && (
                    <span>"How does Clara ensure receipt matching if an employee fails to photograph a ticket immediately?" (Answer: Automated SMS/WhatsApp push + auto-reconciliation via invoice email ingestion).</span>
                  )}
                  {currentSlideIndex === 4 && (
                    <span>"Will our ERP sync require IT custom development or API licensing?" (Answer: Zero custom code. Turnkey pre-configured API/RFC connectors with pre-mapped Chart of Accounts).</span>
                  )}
                  {currentSlideIndex === 5 && (
                    <span>"What interest rate or fee applies to the 40-day float?" (Answer: Up to 40 days is 0.0% interest float, funded through our corporate interchange model).</span>
                  )}
                  {currentSlideIndex !== 1 && currentSlideIndex !== 4 && currentSlideIndex !== 5 && (
                    <span>"How does Clara compare to incumbent corporate bank card lines?" (Answer: Clara provides real-time digital sub-limits, sub-second receipt matching, and native ERP sync that legacy banks cannot match).</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Deck ID: CLARA-{company.name.toUpperCase().replace(/\s+/g, '')}-2026</span>
              <span className="text-emerald-400 font-mono">Slide 0{currentSlideIndex + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
