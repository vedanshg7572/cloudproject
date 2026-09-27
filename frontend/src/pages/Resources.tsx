import { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { demoResources } from '../data/demoData';

const STATUS_COLOR: Record<string, string> = {
  Running:    'text-green-400 bg-green-400/10',
  Active:     'text-blue-400 bg-blue-400/10',
  Available:  'text-green-400 bg-green-400/10',
  Unattached: 'text-red-400 bg-red-400/10',
  Attached:   'text-cyan-400 bg-cyan-400/10',
};

const OPT_COLOR: Record<string, string> = {
  'Good':          'text-green-400',
  'Review':        'text-yellow-400',
  'Action Needed': 'text-red-400',
};

export default function Resources() {
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('ALL');

  const services = ['ALL', ...Array.from(new Set(demoResources.map(r => r.service)))];

  const filtered = demoResources.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchSvc = serviceFilter === 'ALL' || r.service === serviceFilter;
    return matchSearch && matchSvc;
  });

  const utilColor = (u: number) =>
    u === 0 ? 'text-red-400' : u < 30 ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Resource Inventory</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{demoResources.length} resources across 2 regions</p>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge />
          <button className="btn-secondary text-xs">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 w-64"
          />
        </div>
        <div className="flex gap-2">
          {services.map(s => (
            <button
              key={s}
              onClick={() => setServiceFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                serviceFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
                {['Resource', 'Service', 'Region', 'Status', 'Utilization', 'Monthly Cost', 'Optimization'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors ${
                    i % 2 === 0 ? '' : 'bg-[var(--bg-primary)]/30'
                  }`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{r.name}</p>
                      <p className="text-xs text-[var(--text-muted)] font-mono">{r.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-[var(--bg-primary)] border border-[var(--border)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                      {r.service}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] text-xs font-mono">{r.region}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[r.status] ?? 'text-gray-400 bg-gray-400/10'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[var(--border)]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${r.utilization}%`, background: r.utilization === 0 ? '#ef4444' : r.utilization < 30 ? '#f59e0b' : '#10b981' }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${utilColor(r.utilization)}`}>{r.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">${r.monthlyCost.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${OPT_COLOR[r.optimizationStatus] ?? 'text-gray-400'}`}>
                      {r.optimizationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[var(--text-muted)]">
                    No resources match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">Showing {filtered.length} of {demoResources.length} resources — simulated demo data</p>
        </div>
      </div>
    </div>
  );
}
