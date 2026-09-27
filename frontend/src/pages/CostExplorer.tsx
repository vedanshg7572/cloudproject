import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DemoBadge from '../components/DemoBadge';
import { demoCostTrend, demoCostByService, demoDailyCost } from '../data/demoData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm">
        <p className="text-[var(--text-secondary)] mb-1">{label}</p>
        <p className="font-bold text-white">${payload[0]?.value?.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function CostExplorer() {
  const currentMonth = demoCostTrend[demoCostTrend.length - 1].cost;
  const prevMonth = demoCostTrend[demoCostTrend.length - 2].cost;
  const delta = ((currentMonth - prevMonth) / prevMonth * 100).toFixed(1);
  const isUp = parseFloat(delta) > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cost Explorer</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Spending analysis and trends</p>
        </div>
        <DemoBadge />
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs text-[var(--text-secondary)] mb-1">This Month (est.)</p>
          <p className="text-2xl font-bold text-white">${currentMonth.toFixed(2)}</p>
          <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isUp ? 'text-red-400' : 'text-green-400'}`}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(parseFloat(delta))}% vs last month
          </div>
        </div>
        <div className="card">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Daily Average</p>
          <p className="text-2xl font-bold text-white">${(currentMonth / 30).toFixed(2)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">September 2026</p>
        </div>
        <div className="card">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Projected (full month)</p>
          <p className="text-2xl font-bold text-white">${(currentMonth * 1.04).toFixed(2)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Estimate only</p>
        </div>
        <div className="card">
          <p className="text-xs text-[var(--text-secondary)] mb-1">YTD Spend</p>
          <p className="text-2xl font-bold text-white">${demoCostTrend.reduce((s, m) => s + m.cost, 0).toFixed(2)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Apr – Sep 2026</p>
        </div>
      </div>

      {/* Daily Spend */}
      <div className="card">
        <h2 className="font-semibold text-white mb-1">Daily Spend — September 2026</h2>
        <p className="text-xs text-[var(--text-secondary)] mb-4">Simulated daily cost data</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={demoDailyCost} barSize={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#8b9bb4', fontSize: 10 }} axisLine={false} tickLine={false}
              interval={4} />
            <YAxis tick={{ fill: '#8b9bb4', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="cost" fill="#3b82f6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend + Breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold text-white mb-1">6-Month Trend</h2>
          <p className="text-xs text-[var(--text-secondary)] mb-4">Simulated historical data</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={demoCostTrend}>
              <defs>
                <linearGradient id="trendG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="month" tick={{ fill: '#8b9bb4', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b9bb4', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cost" stroke="#8b5cf6" strokeWidth={2} fill="url(#trendG)" dot={{ fill: '#8b5cf6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-white mb-4">Service Breakdown</h2>
          <div className="space-y-3">
            {demoCostByService.map(s => (
              <div key={s.service}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[var(--text-secondary)]">{s.service}</span>
                  <span className="font-semibold text-white">${s.cost.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(s.cost / 184.72 * 100).toFixed(1)}%`,
                      background: s.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
