import React, { useState } from 'react';
import { DollarSign, Clock, Users, ArrowUpRight, RotateCcw, TrendingUp, CheckCircle } from 'lucide-react';
import { RoiModelParams } from '../types';

export const RoiCalculator: React.FC = () => {
  const defaultParams: RoiModelParams = {
    numAEs: 12,
    proposalsPerAeMonth: 25,
    blendedHourlyRate: 35.0,
    manualHoursPerDeck: 4.0,
    pitchCraftHoursPerDeck: 0.2, // 12 minutes
    llmApiCostPerDeck: 0.15,
  };

  const [params, setParams] = useState<RoiModelParams>(defaultParams);

  // Calculations
  const totalMonthlyProposals = params.numAEs * params.proposalsPerAeMonth;
  const totalAnnualProposals = totalMonthlyProposals * 12;

  const hoursSavedPerDeck = Math.max(0, params.manualHoursPerDeck - params.pitchCraftHoursPerDeck);
  const monthlyTeamHoursLiberated = totalMonthlyProposals * hoursSavedPerDeck;
  const annualTeamHoursLiberated = monthlyTeamHoursLiberated * 12;

  const monthlyHoursPerAe = params.numAEs > 0 ? monthlyTeamHoursLiberated / params.numAEs : 0;
  const annualHoursPerAe = monthlyHoursPerAe * 12;

  const grossMonthlyLaborValue = monthlyTeamHoursLiberated * params.blendedHourlyRate;
  const grossAnnualLaborValue = grossMonthlyLaborValue * 12;

  const monthlyLlmCost = totalMonthlyProposals * params.llmApiCostPerDeck;
  const annualLlmCost = monthlyLlmCost * 12;

  const netMonthlySavings = grossMonthlyLaborValue - monthlyLlmCost;
  const netAnnualSavings = grossAnnualLaborValue - annualLlmCost;

  const netOperationalRoi =
    annualLlmCost > 0 ? Math.round((netAnnualSavings / annualLlmCost) * 100) : 0;

  const handleReset = () => {
    setParams(defaultParams);
  };

  return (
    <div className="space-y-8">
      {/* Header and Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>Completed Financial Impact & Operational Model</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 font-normal">Section 2 Mathematical Synthesis</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Clara Commercial Team ROI & Reallocated Capacity Model
          </h2>
        </div>

        <button
          onClick={handleReset}
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Default Baseline</span>
        </button>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Annual Net Savings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tabular-nums">
              ${Math.round(netAnnualSavings).toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              ${Math.round(netMonthlySavings).toLocaleString()} / month net savings
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>AE Team Hours Reclaimed</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-white font-mono tabular-nums">
              {Math.round(monthlyTeamHoursLiberated).toLocaleString()} hrs/mo
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              {Math.round(annualTeamHoursLiberated).toLocaleString()} hours annualized
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Liberated Hours per AE</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-white font-mono tabular-nums">
              {monthlyHoursPerAe.toFixed(1)} hrs/mo
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {annualHoursPerAe.toFixed(0)} hours/yr returned to sales calls
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Net Operational ROI</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tabular-nums">
              {netOperationalRoi.toLocaleString()}%
            </div>
            <div className="text-xs text-slate-400 mt-1">
              On ${annualLlmCost.toFixed(0)}/yr total Gemini API cost
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Interactive Levers vs Derivation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scenario Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Operational Scenario Levers</h3>
            <p className="text-xs text-slate-400">
              Adjust organizational baselines to project impact on commercial teams
            </p>
          </div>

          {/* Slider 1: Number of AEs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Enterprise Account Executives (N)</span>
              <span className="text-emerald-400 font-mono font-bold">{params.numAEs} AEs</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={params.numAEs}
              onChange={(e) => setParams({ ...params, numAEs: parseInt(e.target.value) || 1 })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 AE</span>
              <span>12 (Baseline)</span>
              <span>50 AEs</span>
            </div>
          </div>

          {/* Slider 2: Proposals per AE/month */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Proposals per AE / Month (P)</span>
              <span className="text-emerald-400 font-mono font-bold">{params.proposalsPerAeMonth} decks</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={params.proposalsPerAeMonth}
              onChange={(e) => setParams({ ...params, proposalsPerAeMonth: parseInt(e.target.value) || 5 })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5 decks</span>
              <span>25 (Baseline)</span>
              <span>60 decks</span>
            </div>
          </div>

          {/* Slider 3: AE Blended Hourly Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">AE Blended Hourly Rate (C_AE)</span>
              <span className="text-emerald-400 font-mono font-bold">${params.blendedHourlyRate.toFixed(2)}/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={params.blendedHourlyRate}
              onChange={(e) => setParams({ ...params, blendedHourlyRate: parseFloat(e.target.value) || 20 })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$20/hr</span>
              <span>$35/hr (Baseline)</span>
              <span>$100/hr</span>
            </div>
          </div>

          {/* Slider 4: Baseline Manual Creation Time */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Manual Deck Creation Time</span>
              <span className="text-emerald-400 font-mono font-bold">{params.manualHoursPerDeck.toFixed(1)} hrs</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.5"
              value={params.manualHoursPerDeck}
              onChange={(e) => setParams({ ...params, manualHoursPerDeck: parseFloat(e.target.value) || 1 })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1.0 hr</span>
              <span>4.0 hrs (Baseline)</span>
              <span>8.0 hrs</span>
            </div>
          </div>

          {/* Fixed Assumptions Info */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-300">Model Constants:</div>
            <div className="flex justify-between text-slate-400">
              <span>PitchCraft AI Creation Time:</span>
              <span className="font-mono text-emerald-400">0.20 hrs (12 min)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Gemini 3.8 Flash Cost per Deck:</span>
              <span className="font-mono text-emerald-400">$0.15 / deck</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Liberated Capacity per Deck:</span>
              <span className="font-mono text-emerald-400">{hoursSavedPerDeck.toFixed(2)} hrs</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Financial Impact Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-semibold text-white">Calculated Financial Impact Matrix</h3>
              <p className="text-xs text-slate-400">
                Direct mathematical formulas and derivations from the Clara business case
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 font-medium">Line Item</th>
                    <th className="py-2.5 font-medium">Formula / Derivation</th>
                    <th className="py-2.5 font-medium text-right">Monthly Value</th>
                    <th className="py-2.5 font-medium text-right text-emerald-400">Annualized (12 Mo.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="py-2.5 font-medium text-white">Total Decks Generated</td>
                    <td className="py-2.5 text-slate-400 font-mono">N × P ({params.numAEs} × {params.proposalsPerAeMonth})</td>
                    <td className="py-2.5 font-mono text-right text-slate-200">{totalMonthlyProposals} proposals</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">{totalAnnualProposals.toLocaleString()} proposals</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 font-medium text-white">Team Hours Liberated</td>
                    <td className="py-2.5 text-slate-400 font-mono">Total Decks × {hoursSavedPerDeck.toFixed(1)} hrs saved</td>
                    <td className="py-2.5 font-mono text-right text-slate-200">{monthlyTeamHoursLiberated.toFixed(1)} hrs</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">{annualTeamHoursLiberated.toLocaleString()} hrs</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 font-medium text-white">Liberated Hours per AE</td>
                    <td className="py-2.5 text-slate-400 font-mono">Team Hours / {params.numAEs} AEs</td>
                    <td className="py-2.5 font-mono text-right text-slate-200">{monthlyHoursPerAe.toFixed(1)} hrs/AE</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">{annualHoursPerAe.toFixed(0)} hrs/AE</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 font-medium text-white">Gross Labor Recovered</td>
                    <td className="py-2.5 text-slate-400 font-mono">Hours × ${params.blendedHourlyRate.toFixed(2)}/hr</td>
                    <td className="py-2.5 font-mono text-right text-slate-200">${Math.round(grossMonthlyLaborValue).toLocaleString()}</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">${Math.round(grossAnnualLaborValue).toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 font-medium text-white">Operational LLM API Cost</td>
                    <td className="py-2.5 text-slate-400 font-mono">Total Decks × ${params.llmApiCostPerDeck}</td>
                    <td className="py-2.5 font-mono text-right text-red-400">(${monthlyLlmCost.toFixed(2)})</td>
                    <td className="py-2.5 font-mono text-right text-red-400">(${annualLlmCost.toFixed(2)})</td>
                  </tr>

                  <tr className="bg-emerald-500/5 font-semibold">
                    <td className="py-3 text-emerald-400 font-bold">Net Financial Savings</td>
                    <td className="py-3 text-slate-300 font-mono">Gross Labor - LLM Cost</td>
                    <td className="py-3 font-mono text-right text-emerald-400 font-bold">${Math.round(netMonthlySavings).toLocaleString()}</td>
                    <td className="py-3 font-mono text-right text-emerald-400 font-black text-sm">${Math.round(netAnnualSavings).toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 font-medium text-white">Net Operational ROI</td>
                    <td className="py-2.5 text-slate-400 font-mono">(Net Savings / LLM Cost) × 100</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">{netOperationalRoi.toLocaleString()}%</td>
                    <td className="py-2.5 font-mono text-right text-emerald-400 font-bold">{netOperationalRoi.toLocaleString()}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Narrative Callout */}
          <div className="mt-4 p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-emerald-400">Strategic Commercial Multiplier: </span>
            Beyond the direct operational savings of <strong className="text-white">${Math.round(netAnnualSavings).toLocaleString()}/year</strong>, freeing up <strong className="text-white">{monthlyHoursPerAe.toFixed(0)} hours/month per AE</strong> reclaims over 50% of their working capacity. This time is directly reinvested into live discovery calls, pipeline acceleration, and high-touch CFO negotiation—driving the documented <strong className="text-white">+25.0% conversion rate lift</strong> and compressing the sales cycle from <strong className="text-white">45 days down to 18 days</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
