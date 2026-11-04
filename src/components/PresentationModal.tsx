import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { CompanyProspect, GeneratedDeck, DeterministicFinancials, SlideContent } from '../types';

interface PresentationModalProps {
  company: CompanyProspect;
  deck: GeneratedDeck;
  financials: DeterministicFinancials;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  company,
  deck,
  financials,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const slides = deck.slides || [];
  const currentSlide: SlideContent = slides[currentIndex] || slides[0];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentIndex < slides.length - 1) setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length, onClose]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="h-12 border-b border-slate-900 bg-slate-950/80 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            C
          </div>
          <span className="text-xs font-bold text-white tracking-wide">CLARA ENTERPRISE PITCH</span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-xs text-emerald-400 font-semibold">{company.name}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`cursor-pointer px-2.5 py-1 rounded text-xs transition-colors ${
              showNotes ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            AE Notes {showNotes ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900 transition-colors"
            title="Exit Full-Screen (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-hidden">
        <div className="w-full max-w-5xl aspect-[16/9] bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative">
          {/* Slide Top Strip */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {currentSlide.title}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Slide {currentIndex + 1} of {slides.length}
            </span>
          </div>

          {/* Slide Content */}
          <div className="my-auto py-6">
            {/* Slide 1 */}
            {currentIndex === 0 && (
              <div className="space-y-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  Strategic Commercial Proposal
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  {currentSlide.headline}
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  {currentSlide.subheadline}
                </p>
                <div className="pt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase">Enterprise Client</div>
                    <div className="text-lg font-bold text-white mt-1">{company.name}</div>
                  </div>
                  <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase">Primary ERP</div>
                    <div className="text-lg font-bold text-white mt-1">{company.erp}</div>
                  </div>
                  <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase">Float Opportunity</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                      ${financials.workingCapitalBenefit.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2 */}
            {currentIndex === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white">{currentSlide.headline}</h2>
                  <p className="text-sm text-slate-400 mt-1">{currentSlide.subheadline}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {(currentSlide.diagnosticMetrics || []).map((m, idx) => (
                    <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                      <div className="text-3xl font-black text-emerald-400 font-mono">{m.metric}</div>
                      <div className="text-xs text-slate-300 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                  {(currentSlide.keyBullets || []).map((b, idx) => (
                    <div key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 3 */}
            {currentIndex === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">{currentSlide.headline}</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-xl space-y-3">
                    <div className="text-sm font-bold text-red-400">Current Legacy Environment</div>
                    {(currentSlide.beforeState || []).map((item, idx) => (
                      <div key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-red-400">✕</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-3">
                    <div className="text-sm font-bold text-emerald-400">Transformed Clara Architecture</div>
                    {(currentSlide.afterState || []).map((item, idx) => (
                      <div key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4 */}
            {currentIndex === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">{currentSlide.headline}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(currentSlide.departments || []).map((dept, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{dept.dept}</span>
                        <span className="text-xs text-emerald-400 font-semibold">{dept.cardType}</span>
                      </div>
                      <div className="text-xs text-slate-300">{dept.control}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 5 */}
            {currentIndex === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white">{currentSlide.headline}</h2>
                  <p className="text-sm text-slate-400 mt-1">{currentSlide.subheadline}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(currentSlide.syncFeatures || []).map((feat, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0 text-sm">
                        {idx + 1}
                      </div>
                      <div className="text-xs md:text-sm text-slate-200">{feat}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 6 */}
            {currentIndex === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  ${financials.totalAnnualEconomicImpact.toLocaleString()} Projected Annual Advantage
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400">Working Capital Float Extension</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                      ${financials.workingCapitalBenefit.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400">Reclaimed Accounting Labor</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">
                      ${financials.financialLaborValue.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <div className="text-xs text-slate-400">Corporate Card Cashback</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">
                      ${financials.annualCashback.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <div className="text-xs text-emerald-400 font-semibold">Total Economic Impact</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">
                      ${financials.totalAnnualEconomicImpact.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 7 */}
            {currentIndex === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">{currentSlide.headline}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {(currentSlide.benchmarkStats || []).map((s, idx) => (
                    <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                      <div className="text-3xl font-black text-emerald-400 font-mono">{s.stat}</div>
                      <div className="text-xs text-slate-300 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div className="text-xs text-emerald-400 font-bold uppercase mb-1">Peer Case Study</div>
                  <div className="text-sm text-slate-200 italic leading-relaxed">
                    "{currentSlide.peerCaseStudy || `How a tier-1 regional enterprise deployed Clara across 4 countries, compressed month-end close to 2 days, and unlocked substantial liquid float.`}"
                  </div>
                </div>
              </div>
            )}

            {/* Slide 8 */}
            {currentIndex === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">3-Week Rapid Onboarding</h2>
                <div className="grid grid-cols-3 gap-4">
                  {(currentSlide.milestones || []).map((m, idx) => (
                    <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                      <span className="text-sm font-bold text-emerald-400 font-mono">{m.week}</span>
                      <div className="text-sm text-slate-200 mt-2 font-medium">{m.task}</div>
                      <div className="text-[11px] text-slate-500 mt-3">Milestone 0{idx + 1}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                  <span className="text-sm text-white font-bold">Zero disruption to existing banking relationships</span>
                  <span className="text-xs text-emerald-400 font-mono">Ready to Scope</span>
                </div>
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Clara Enterprise Proposal · {company.name}</span>
            <span className="text-emerald-400">Mastercard Corporate Rails</span>
          </div>
        </div>
      </div>

      {/* Floating Speaker Notes Drawer (if enabled) */}
      {showNotes && (
        <div className="bg-slate-900 border-t border-slate-800 p-4 px-8 max-h-40 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex items-start gap-4">
            <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                AE Speaker Script — {currentSlide.title}
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                {currentSlide.speakerNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="h-14 border-t border-slate-900 bg-slate-950/90 px-8 flex items-center justify-between">
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="cursor-pointer inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === idx ? 'bg-emerald-400 w-6' : 'bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => currentIndex < slides.length - 1 && setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          className="cursor-pointer inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30"
        >
          <span>Next (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
