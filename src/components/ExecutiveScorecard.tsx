import React from 'react';
import { Clock, Users, DollarSign, TrendingDown, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const ExecutiveScorecard: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-5 mb-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-5">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>Executive Initiative Scorecard</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-normal">Clara Mid-Market & Large Enterprise ($10M–$500M+ ARR)</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Commercial Efficiency & Proposal Velocity Impact
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Gemini 3.8 Flash Synthesizer
          </span>
          <span className="text-slate-600">·</span>
          <span>12 Enterprise AEs</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-mono">300 Decks / Mo</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Metric 1 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Deck Creation Time</span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">&lt; 12 min</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">95.0% Time Reduction</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>AE Liberated Hours</span>
            <Users className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">1,140 hrs</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">95 hrs/mo per AE</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Annual Net Savings</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">$478,260</div>
            <div className="text-xs text-slate-400 font-medium mt-1">88,566% Net ROI</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Sales Cycle Length</span>
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">18 days</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Down from 45 days</div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Diag → Prop Win Lift</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">+25.0%</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Conversion Lift</div>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Internal Adoption</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">96.5%</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Commercial AE Usage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
