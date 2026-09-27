import { useState } from 'react';
import { Sliders, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { demoSummary, demoSimulatorOptions } from '../data/demoData';

export default function Simulator() {
  const [options, setOptions] = useState(demoSimulatorOptions.map(o => ({ ...o })));

  const toggle = (id: string) =>
    setOptions(prev => prev.map(o => o.id === id ? { ...o, enabled: !o.enabled } : o));

  const totalSaving = options.filter(o => o.enabled).reduce((s, o) => s + o.saving, 0);
  const optimized = demoSummary.monthlySpend - totalSaving;
  const annual = totalSaving * 12;
  const pct = ((totalSaving / demoSummary.monthlySpend) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Optimization Simulator</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Model what-if savings scenarios — estimates only, not guaranteed</p>
        </div>
        <DemoBadge />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="card">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Sliders size={18} className="text-blue-400" />
            Scenario Controls
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-6">Toggle optimizations to model potential impact</p>

          <div className="space-y-4">
            {options.map(opt => (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  opt.enabled
                    ? 'border-blue-500/40 bg-blue-500/5'
                    : 'border-[var(--border)] bg-[var(--bg-primary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      opt.enabled ? 'bg-blue-600 border-blue-600' : 'border-[var(--border-light)] bg-transparent'
                    }`}
                    onClick={() => toggle(opt.id)}
                  >
                    {opt.enabled && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${ opt.enabled ? 'text-white' : 'text-[var(--text-secondary)]' }`}>
                    {opt.label}
                  </span>
                </div>
                <span className={`text-sm font-bold ${ opt.enabled ? 'text-green-400' : 'text-[var(--text-muted)]' }`}>
                  -${opt.saving.toFixed(2)}/mo
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
            <AlertCircle size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-400/90">
              These are estimated savings for illustration purposes only. Actual savings depend on real workload requirements and AWS pricing at time of action.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
            <p className="text-xs text-[var(--text-secondary)] mb-1">Current Monthly Cost</p>
            <p className="text-4xl font-bold text-white">${demoSummary.monthlySpend.toFixed(2)}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">September 2026 estimate (simulated)</p>
          </div>

          <div className="card bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
            <p className="text-xs text-[var(--text-secondary)] mb-1">Potential Optimized Cost</p>
            <p className="text-4xl font-bold text-green-400">${optimized.toFixed(2)}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">After selected optimizations (estimated)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <TrendingDown size={24} className="text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">${totalSaving.toFixed(2)}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Monthly savings est.</p>
              <p className="text-xs text-green-400 font-medium">{pct}% reduction</p>
            </div>
            <div className="card text-center">
              <Calendar size={24} className="text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">${annual.toFixed(0)}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Annual savings est.</p>
              <p className="text-xs text-[var(--text-muted)]">12-month projection</p>
            </div>
          </div>

          {/* Visual diff bar */}
          <div className="card">
            <p className="text-xs text-[var(--text-secondary)] mb-3">Cost Reduction Visualization</p>
            <div className="relative h-8 rounded-lg overflow-hidden bg-[var(--bg-primary)] border border-[var(--border)]">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 flex items-center"
                style={{ width: `${(optimized / demoSummary.monthlySpend) * 100}%` }}
              >
                <span className="pl-3 text-xs font-bold text-white whitespace-nowrap">${optimized.toFixed(2)}</span>
              </div>
              <div
                className="absolute top-0 h-full bg-red-500/20 border-l border-red-500/40 transition-all duration-500 flex items-center"
                style={{
                  left: `${(optimized / demoSummary.monthlySpend) * 100}%`,
                  width: `${(totalSaving / demoSummary.monthlySpend) * 100}%`
                }}
              >
                <span className="pl-2 text-xs text-red-400 whitespace-nowrap">-${totalSaving.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
              <span>$0</span>
              <span>${demoSummary.monthlySpend.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
