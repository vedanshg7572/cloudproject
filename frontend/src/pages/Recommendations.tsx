import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Lightbulb, DollarSign } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { demoRecommendations } from '../data/demoData';

const priorityConfig = {
  HIGH:   { label: 'High Priority',   className: 'priority-high',   icon: <AlertTriangle size={14} /> },
  MEDIUM: { label: 'Medium Priority', className: 'priority-medium', icon: <Info size={14} /> },
  LOW:    { label: 'Low Priority',    className: 'priority-low',   icon: <Lightbulb size={14} /> },
} as const;

export default function Recommendations() {
  const [filter, setFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const shown = demoRecommendations.filter(
    r => !dismissed.has(r.id) && (filter === 'ALL' || r.priority === filter)
  );
  const totalSaving = shown.reduce((s, r) => s + r.estimatedSaving, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Recommendations</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">AI-generated optimization suggestions</p>
        </div>
        <DemoBadge />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Potential Monthly Savings</p>
          <p className="text-2xl font-bold text-green-400">${totalSaving.toFixed(2)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Estimated, not guaranteed</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Open Items</p>
          <p className="text-2xl font-bold text-white">{shown.length}</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Annual Potential</p>
          <p className="text-2xl font-bold text-blue-400">${(totalSaving * 12).toFixed(0)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Estimated projection</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-white'
            }`}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {shown.length === 0 && (
          <div className="card text-center py-12">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
            <p className="text-white font-semibold">All clear!</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">No recommendations match this filter.</p>
          </div>
        )}
        {shown.map(rec => {
          const cfg = priorityConfig[rec.priority as keyof typeof priorityConfig];
          return (
            <div key={rec.id} className="card hover:border-[var(--border-light)] transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md ${cfg.className}`}>
                      {cfg.icon}{cfg.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-0.5 rounded-md border border-[var(--border)]">
                      {rec.service} · {rec.region}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{rec.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{rec.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-[var(--bg-primary)] rounded-lg p-3 border border-[var(--border)]">
                      <p className="text-xs text-[var(--text-muted)] mb-1">Recommended Action</p>
                      <p className="text-sm text-white">{rec.action}</p>
                    </div>
                    <div className="bg-[var(--bg-primary)] rounded-lg p-3 border border-[var(--border)]">
                      <p className="text-xs text-[var(--text-muted)] mb-1">Risk Consideration</p>
                      <p className="text-sm text-white">{rec.risk}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-3">
                    <div className="flex items-center gap-1 justify-end mb-0.5">
                      <DollarSign size={14} className="text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Est. Saving</span>
                    </div>
                    <p className="text-xl font-bold text-green-400">${rec.estimatedSaving.toFixed(2)}</p>
                    <p className="text-xs text-[var(--text-muted)]">per month</p>
                  </div>
                  <button
                    onClick={() => setDismissed(d => new Set([...d, rec.id]))}
                    className="btn-secondary text-xs w-full justify-center"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
