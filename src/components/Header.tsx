import React from 'react';
import { Presentation, Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPresent: () => void;
  onExportPptx: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onPresent,
  onExportPptx,
  isExporting,
}) => {
  const navItems = [
    { id: 'studio', label: 'Proposal Studio' },
    { id: 'deck', label: '8-Slide Master Deck' },
    { id: 'roi', label: 'Financial ROI Model' },
    { id: 'catalog', label: 'Product Catalog' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'governance', label: 'Governance & Security' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
          C
        </div>
        <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
          Clara PitchCraft AI
        </span>
      </div>

      {/* Zone 2: 4–6 concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === item.id
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Zone 3: 1 primary action (or action cluster with presentation) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onPresent}
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap shrink-0"
          title="Launch full-screen presentation mode"
        >
          <Presentation className="w-3.5 h-3.5 text-emerald-400" />
          <span>Present Deck</span>
        </button>

        <button
          onClick={onExportPptx}
          disabled={isExporting}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Generating PPTX...' : 'Export .pptx'}</span>
        </button>
      </div>
    </header>
  );
};
