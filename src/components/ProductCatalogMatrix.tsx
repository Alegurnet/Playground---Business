import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  Building2,
  Cpu,
  Plane,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { CLARA_PRODUCT_CATALOG } from '../data/productCatalog';
import { ProductCatalogItem } from '../types';

export const ProductCatalogMatrix: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('corporate-cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');

  const icons: Record<string, any> = {
    CreditCard,
    Receipt,
    Building2,
    Cpu,
    Plane,
  };

  const filteredCatalog = CLARA_PRODUCT_CATALOG.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.valueProposition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.corePainPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPersona =
      selectedPersona === 'all' ||
      item.targetPersona.toLowerCase().includes(selectedPersona.toLowerCase());

    return matchesSearch && matchesPersona;
  });

  const selectedItem: ProductCatalogItem =
    CLARA_PRODUCT_CATALOG.find((i) => i.id === selectedModuleId) || CLARA_PRODUCT_CATALOG[0];

  const IconComponent = icons[selectedItem.iconName] || CreditCard;

  return (
    <div className="space-y-8">
      {/* Header and Visual Engine Flow */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>Section 3 · Product Catalog & Pitch Value Matrix</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">Commercial Pitch Engine Mapping</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Clara Modular Value Proposition Architecture
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Automated proposal matching based on prospect ERP, invoice volume, and float constraints
          </div>
        </div>

        {/* Pitch Engine Mapping Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Corporate Cards</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• Instant virtual issuance</li>
              <li>• Dynamic category sub-limits</li>
              <li>• 90% reimbursement cut</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <Receipt className="w-3.5 h-3.5" />
              <span>Expense Management</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• Smartphone OCR capture</li>
              <li>• 12 hrs/mo saved per mgr</li>
              <li>• Sub-second transaction sync</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Bill Pay / AP</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• Liquidation via card</li>
              <li>• Up to 40 days interest-free float</li>
              <li>• Working capital expansion</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>ERP Integrations</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• Native SAP / NetSuite connectors</li>
              <li>• Zero manual journal entries</li>
              <li>• 100% elimination of errors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pain points, differentiators, or features..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Filter Persona:</span>
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            {['all', 'CFO', 'Finance', 'Procurement', 'IT'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPersona(p)}
                className={`cursor-pointer px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedPersona === p
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Roles' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Module Selector & Deep Dive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredCatalog.map((item) => {
            const isSelected = item.id === selectedModuleId;
            const ItemIcon = icons[item.iconName] || CreditCard;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedModuleId(item.id)}
                className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-emerald-400'
                      }`}
                    >
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {item.valueProposition}
                </p>

                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span>ROI: {item.quantifiableRoi}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Panel (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedItem.name}</h3>
                <span className="text-xs text-slate-400">
                  Target Persona: <strong className="text-slate-200">{selectedItem.targetPersona}</strong>
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              {selectedItem.badge}
            </span>
          </div>

          {/* Value Proposition & Differentiator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Clara Value Proposition
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedItem.valueProposition}
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Core Differentiator
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedItem.differentiator}
              </p>
            </div>
          </div>

          {/* Quantifiable ROI Metric */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Audited Quantifiable ROI Metric
              </div>
              <div className="text-base font-bold text-white mt-1">
                {selectedItem.quantifiableRoi}
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>

          {/* Pain Points Addressed */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Customer Pain Points Solved
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedItem.corePainPoints.map((pain, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-red-400 shrink-0 font-bold">✕</span>
                  <span>{pain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Capabilities */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Native Product Capabilities
            </div>
            <div className="space-y-1.5">
              {selectedItem.features.map((feat, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
