import React, { useState } from 'react';
import {
  Sparkles,
  Building,
  CreditCard,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  DollarSign,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CompanyProspect, GeneratedDeck, DeterministicFinancials } from '../types';
import { ENTERPRISE_PRESETS } from '../data/companyPresets';

interface DeckGeneratorStudioProps {
  currentCompany: CompanyProspect;
  setCurrentCompany: (company: CompanyProspect) => void;
  generatedDeck: GeneratedDeck;
  setGeneratedDeck: (deck: GeneratedDeck) => void;
  financials: DeterministicFinancials;
  setFinancials: (fin: DeterministicFinancials) => void;
  onViewDeck: () => void;
}

export const DeckGeneratorStudio: React.FC<DeckGeneratorStudioProps> = ({
  currentCompany,
  setCurrentCompany,
  generatedDeck,
  setGeneratedDeck,
  financials,
  setFinancials,
  onViewDeck,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [accountExecutive, setAccountExecutive] = useState('Carlos Mendez (Enterprise Lead)');
  const [customNotes, setCustomNotes] = useState('');

  // Handle Preset Selection
  const handleSelectPreset = (preset: CompanyProspect) => {
    setCurrentCompany(preset);
    // Recalculate deterministic baseline
    const apCard = Math.round(preset.monthlyApSpend * 0.45);
    const floatBenefit = Math.round((apCard / 30) * 25);
    const labor = 195 * 12 * 35;
    const cashback = Math.round((preset.monthlyCardSpend + apCard) * 0.0125 * 12);

    setFinancials({
      apViaCardEstimated: apCard,
      workingCapitalBenefit: floatBenefit,
      monthlyAdminHoursSaved: 195,
      annualHoursSaved: 195 * 12,
      financialLaborValue: labor,
      annualCashback: cashback,
      totalAnnualEconomicImpact: floatBenefit + labor + cashback,
      extendedTermsDays: 25,
    });
  };

  // Run Deck Generation via Server API (Gemini 3.8 Flash + Guardrails)
  const handleGenerateDeck = async () => {
    setIsGenerating(true);
    setGenerationStep('1/4 Ingesting prospect intelligence & ERP schema...');

    try {
      setTimeout(() => {
        setGenerationStep('2/4 Executing deterministic working capital float math...');
      }, 500);

      setTimeout(() => {
        setGenerationStep('3/4 Synthesizing CFO talking points via Gemini 3.8 Flash...');
      }, 1000);

      const response = await fetch('/api/generate-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: currentCompany.name,
          domain: currentCompany.domain,
          industry: currentCompany.industry,
          headcount: currentCompany.headcount,
          erp: currentCompany.erp,
          monthlyCardSpend: currentCompany.monthlyCardSpend,
          monthlyApSpend: currentCompany.monthlyApSpend,
          primaryFriction: currentCompany.primaryFriction,
          accountExecutive,
          customNotes,
        }),
      });

      const data = await response.json();
      if (data.success && data.deck) {
        setGenerationStep('4/4 Compiling 8-slide co-branded presentation deck...');
        setTimeout(() => {
          setGeneratedDeck(data.deck);
          if (data.deterministic) {
            setFinancials(data.deterministic);
          }
          setIsGenerating(false);
          setGenerationStep('');
          // Trigger celebratory confetti
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        }, 600);
      } else {
        throw new Error(data.error || 'Failed to generate proposal');
      }
    } catch (err) {
      console.error('Generation error, using fallback:', err);
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Preset Selectors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Enterprise Client Archetypes (One-Click Ingestion)
          </span>
          <span className="text-xs text-slate-500">
            Pre-enriched with ERP stacks and realistic LatAm/Global spend tiers
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ENTERPRISE_PRESETS.map((preset) => {
            const isSelected = currentCompany.name === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => handleSelectPreset(preset)}
                className={`cursor-pointer p-3 text-left rounded-lg border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500/50'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="font-semibold text-sm truncate text-white mb-1">
                  {preset.name}
                </div>
                <div className="text-slate-400 truncate mb-2">{preset.industry}</div>
                <div className="flex items-center justify-between font-mono text-[11px] text-emerald-400 pt-1.5 border-t border-slate-800/80">
                  <span>{preset.erp.split(' ')[0]}</span>
                  <span>${(preset.monthlyApSpend / 1000000).toFixed(1)}M AP</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Prospect Parameters vs Live Mathematical Modeling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prospect Intelligence Studio (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-white">Target Account Intelligence</h3>
              <p className="text-xs text-slate-400">
                Data used by Gemini 3.8 Flash to contextualize friction & pitch talking points
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini 3.8 Flash Connected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Enterprise Name</label>
              <input
                type="text"
                value={currentCompany.name}
                onChange={(e) => setCurrentCompany({ ...currentCompany, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Mercado Libre"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Domain</label>
              <input
                type="text"
                value={currentCompany.domain}
                onChange={(e) => setCurrentCompany({ ...currentCompany, domain: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. mercadolibre.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary ERP System</label>
              <select
                value={currentCompany.erp}
                onChange={(e) => setCurrentCompany({ ...currentCompany, erp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="SAP S/4HANA">SAP S/4HANA (Enterprise Cloud)</option>
                <option value="SAP ECC 6.0">SAP ECC 6.0 (RFC / IDoc Connector)</option>
                <option value="NetSuite OneWorld">NetSuite OneWorld (SuiteTalk API)</option>
                <option value="NetSuite SuiteSuccess">NetSuite SuiteSuccess</option>
                <option value="Oracle ERP Cloud">Oracle ERP Cloud (Fusion)</option>
                <option value="Microsoft Dynamics 365">Microsoft Dynamics 365 Finance</option>
                <option value="Totvs Protheus">Totvs Protheus (LatAm Localization)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Industry Sector</label>
              <input
                type="text"
                value={currentCompany.industry}
                onChange={(e) => setCurrentCompany({ ...currentCompany, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. E-Commerce & FinTech"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Monthly AP Spend ($ USD)
              </label>
              <input
                type="number"
                step="50000"
                value={currentCompany.monthlyApSpend}
                onChange={(e) => setCurrentCompany({ ...currentCompany, monthlyApSpend: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Monthly Corporate Card Spend ($ USD)
              </label>
              <input
                type="number"
                step="25000"
                value={currentCompany.monthlyCardSpend}
                onChange={(e) => setCurrentCompany({ ...currentCompany, monthlyCardSpend: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Primary CFO Pain Point / Friction Profile
            </label>
            <textarea
              rows={2}
              value={currentCompany.primaryFriction}
              onChange={(e) => setCurrentCompany({ ...currentCompany, primaryFriction: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Manual expense reconciliation, 14-day close, fleet card sharing risks..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Account Executive</label>
              <input
                type="text"
                value={accountExecutive}
                onChange={(e) => setAccountExecutive(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">AE Strategy Focus</label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Working capital float and NetSuite chart of accounts sync"
              />
            </div>
          </div>

          {/* Action Button & Status */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              {isGenerating ? (
                <span className="text-emerald-400 font-medium animate-pulse">{generationStep}</span>
              ) : (
                <span>Includes 8 co-branded slides, speaker notes, and dynamic float math.</span>
              )}
            </div>

            <button
              onClick={handleGenerateDeck}
              disabled={isGenerating}
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Compiling Deck...' : 'Generate Enterprise Deck'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Deterministic Mathematical Model Live Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Deterministic Guardrails Engine</h4>
                <p className="text-xs text-slate-400">Audited mathematical calculations injected into slides</p>
              </div>
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Financial Calculations Box */}
            <div className="space-y-3">
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                  <span>Working Capital Float Extension</span>
                  <span className="font-mono text-slate-500">Terms Formula</span>
                </div>
                <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                  ${financials.workingCapitalBenefit.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Formula: (Addressable AP ${financials.apViaCardEstimated.toLocaleString()} / 30) × {financials.extendedTermsDays} days float
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                  <span>Reclaimed Labor Value</span>
                  <span className="font-mono text-slate-500">{financials.annualHoursSaved} hrs/yr</span>
                </div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">
                  ${financials.financialLaborValue.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  195 hrs/mo manual receipt & AP audit eliminated at $35/hr blended rate
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                  <span>Projected Annual Corporate Cashback</span>
                  <span className="font-mono text-slate-500">1.25% Interchange Tier</span>
                </div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">
                  ${financials.annualCashback.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Direct revenue share on qualifying corporate card & AP liquidations
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-400">Total Annual Economic Advantage</div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                    ${financials.totalAnnualEconomicImpact.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={onViewDeck}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition-colors"
                >
                  <span>Review Deck</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Deck Summary Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono font-bold">
                8
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Standard Enterprise Deck Ready</div>
                <div className="text-xs text-slate-400">
                  {generatedDeck.slides.length} slides configured with AE speaker notes
                </div>
              </div>
            </div>
            <button
              onClick={onViewDeck}
              className="cursor-pointer text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Open View</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
