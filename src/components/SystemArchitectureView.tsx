import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Database,
  Cpu,
  FileCode,
  Download,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Terminal,
} from 'lucide-react';

export const SystemArchitectureView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      id: 0,
      title: 'Prospect Input',
      badge: 'Account Executive',
      description: 'Domain, Corporate Tax ID, Legal Entities, ERP Stack, and baseline spend numbers.',
      details: [
        'Domain & Tax ID (RFC / CNPJ / EIN) parsing',
        'ERP detection (SAP S/4HANA, NetSuite, Oracle Cloud)',
        'Monthly AP and corporate credit card spend baselines',
      ],
    },
    {
      id: 1,
      title: 'Customer Intelligence Enrichment',
      badge: 'Brandfetch & OpenCorporates',
      description: 'Automated retrieval of high-res corporate logos, primary hex brand colors, and verified registry headcount.',
      details: [
        'Brandfetch API: Corporate vector logo & secondary palette',
        'OpenCorporates / SEC: Revenue bracket, subsidiary entities, employee count',
        'Clearbit: Industry SIC taxonomy and headquarters geo-routing',
      ],
    },
    {
      id: 2,
      title: 'Gemini 3.8 Flash Reasoning Engine',
      badge: 'Core Synthesis Engine',
      description: 'Contextualizing company friction, structuring ERP integration slides, and drafting verbatim AE speaker notes.',
      details: [
        'Grounding on Clara Knowledge Base (Mastercard interchange, ERP connector specs)',
        'Few-shot guardrails strictly preventing credit line or APR hallucinations',
        'Tailored CFO objection handlers based on prospect sector',
      ],
    },
    {
      id: 3,
      title: 'Document Generation Microservice',
      badge: 'pptxgenjs / Vector Engine',
      description: 'Compiling 16:9 widescreen master template with native PowerPoint vector shapes, formatted tables, and embedded notes.',
      details: [
        'Strict 16:9 widescreen corporate layout',
        'Native editable vector shapes (no rasterized static images)',
        'Dual-layer output: Visual slide canvas + native PPTX speaker notes',
      ],
    },
    {
      id: 4,
      title: 'Ready-to-Pitch Commercial Asset',
      badge: 'Commercial Handover',
      description: 'Instant co-branded .pptx file, interactive full-screen presentation mode, and CRM logged proposal.',
      details: [
        'One-click direct .pptx download (< 12 min creation cycle)',
        'AE presenter view with live stopwatch and script teleprompter',
        'Exportable executive PDF summary for CFO follow-up',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>Section 4 · End-to-End System Architecture & Data Flow</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">Technical Execution Pipeline</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Enterprise Proposal Generation & Guardrails Pipeline
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Stateless ephemeral execution with strict deterministic mathematical boundaries
          </div>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((s, idx) => {
            const isSelected = activeStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`cursor-pointer text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">STAGE 0{idx + 1}</span>
                    <span className="text-[10px] text-slate-500">{s.badge}</span>
                  </div>
                  <div className="font-bold text-xs text-white mb-1">{s.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                  <span>View Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stage Technical Specs (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400">Stage 0{activeStep + 1} Specification</span>
              <h3 className="text-base font-bold text-white mt-0.5">{steps[activeStep].title}</h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {steps[activeStep].badge}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {steps[activeStep].description}
          </p>

          <div className="space-y-2 pt-1">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Technical Pipeline Invariants:
            </div>
            {steps[activeStep].details.map((detail, idx) => (
              <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Guardrails & Mathematical Invariants (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Guardrail 1: Dynamic Working Capital Simulator */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Guardrail 1 · Dynamic Working Capital Simulator</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To eliminate financial hallucination, all working capital float benefits in Slide 6 and the cover are pre-computed deterministically:
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400">
              Working Capital Benefit = (Addressable Monthly AP Spend / 30) × Float Extension Days
            </div>
            <p className="text-[11px] text-slate-400">
              Passes directly into Gemini 3.8 Flash via strict JSON schemas as fixed immutable constants.
            </p>
          </div>

          {/* Guardrail 2: ERP Mapping Engine */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Guardrail 2 · ERP Mapping Engine</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If the prospect uses <strong className="text-white">SAP S/4HANA or ECC</strong>, the engine injects native RFC/IDoc connector architecture. If <strong className="text-white">NetSuite</strong>, it populates SuiteTalk REST/SOAP endpoint mappings—preventing generic IT friction during controller discussions.
            </p>
          </div>

          {/* Guardrail 3: Deterministic Lending Parameters */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Guardrail 3 · Deterministic Lending Boundaries</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hard constraints on cashback claims (capped at audited corporate interchange tiers), float terms (standard 25–40 days), and credit underwriting disclosures—enforcing compliance with central banking regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
