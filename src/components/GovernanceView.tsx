import React, { useState } from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const [qaAuditSample, setQaAuditSample] = useState(10);
  const [lastAuditScore, setLastAuditScore] = useState('99.4%');

  const complianceBadges = [
    { title: 'SOC 2 Type II', authority: 'AICPA Audited', desc: 'Enterprise security, availability, and confidentiality certified.' },
    { title: 'GDPR & LGPD', authority: 'Data Privacy', desc: 'Strict data processing standards for European and Latin American corporate clients.' },
    { title: 'ISO 27001', authority: 'Information Security', desc: 'End-to-end cryptographic key management and network isolation.' },
    { title: 'PCI-DSS Level 1', authority: 'Cardholder Security', desc: 'Highest global standard for Mastercard payment rail tokenization.' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>Section 6 · Enterprise Governance, Security & Quality Controls</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">Regulatory & Compliance Framework</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Enterprise Data Safeguards & Evaluation Architecture
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Bank-grade isolation guaranteeing confidential spend data is never retained or trained upon
          </div>
        </div>

        {/* 4 Compliance Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {complianceBadges.map((badge, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">{badge.title}</span>
                <span className="text-[10px] text-emerald-400 font-mono">{badge.authority}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Pillars Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zero Retention Model */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold">
            <Lock className="w-4 h-4" />
            <span>Zero-Retention Stateless Model</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Financial spend data, ERP credentials, vendor names, and corporate credit limits processed during deck compilation run strictly in stateless ephemeral memory.
          </p>
          <div className="space-y-2 pt-1 text-xs text-slate-300">
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero prompt or output logging used for foundation model training</span>
            </div>
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>TLS 1.3 in-transit and AES-256 at-rest cryptographic isolation</span>
            </div>
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Automatic ephemeral memory purge within 60 seconds of presentation generation</span>
            </div>
          </div>
        </div>

        {/* Deterministic Verification Harness */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Deterministic Financial Guardrails</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All numerical claims—including working capital float, labor hours reclaimed, and interchange cashback—are computed by dedicated deterministic microservices and passed into Gemini 3.8 Flash via strict JSON structures.
          </p>
          <div className="space-y-2 pt-1 text-xs text-slate-300">
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero hallucination risk for commercial promises or APR terms</span>
            </div>
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Rigid schema validation rejecting outputs with mismatched financial values</span>
            </div>
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Compliant with CNBV, BACEN, and central banking regulatory disclosures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Ops Quality Assurance & Evaluation Harness */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white">Sales Operations Quality Assurance & Audit Harness</h3>
            <p className="text-xs text-slate-400">
              Continuous quarterly auditing against closed-won enterprise proposal benchmarks
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Current Audit Accuracy:</span>
            <span className="font-mono text-emerald-400 font-bold text-sm">{lastAuditScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Random Audit Sample</div>
            <div className="text-xl font-bold text-white font-mono mt-1">{qaAuditSample}% of Decks</div>
            <div className="text-[11px] text-slate-400 mt-0.5">30 proposals audited per monthly cycle</div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Closed-Won Benchmark Correlation</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">94.8% Match</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Aligns with top-performing AE win patterns</div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">ERP Connector Accuracy</div>
            <div className="text-xl font-bold text-white font-mono mt-1">100.0% Verified</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero technical discrepancies flagged by IT</div>
          </div>
        </div>
      </div>
    </div>
  );
};
