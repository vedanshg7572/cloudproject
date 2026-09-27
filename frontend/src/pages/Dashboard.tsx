import { DollarSign, TrendingDown, Gauge, Server, AlertTriangle, Activity } from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import StatCard from '../components/StatCard';
import DemoBadge from '../components/DemoBadge';
import {
  demoSummary, demoCostTrend, demoCostByService,
  demoOptimizationScore, demoRecommendations, demoRecentActivity
} from '../data/demoData';
import type { ReactElement } from 'react';

const priorityColor = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#3b82f6' } as const;

const activityIcon: Record<string, ReactElement> = {
  scan:  <Activity size={14} className="text-blue-400" />,
  alert: <AlertTriangle size={14} className="text-yellow-400" />,
  tip:   <TrendingDown size={14} className="text-green-400" />,
  info:  <Gauge size={14} className="text-purple-400" />,
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm shadow-xl">
        <p className="text-[var(--text-secondary)] mb-1">{label}</p>
        <p className="font-bold text-white">${payload[0]?.value?.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const totalSaving = demoRecommendations.reduce((s, r) => s + r.estimatedSaving, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">AWS infrastructure overview — September 2026</p>
        </div>
        <DemoBadge />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly AWS Spend"
          value={`$${demoSummary.monthlySpend.toFixed(2)}`}
          subtitle="September 2026 (est.)"
          trend={9.4}
          icon={<DollarSign size={18} />}
          accent="blue"
        />
        <StatCard
          title="Potential Savings"
          value={`$${totalSaving.toFixed(2)}/mo`}
          subtitle="3 recommendations"
          icon={<TrendingDown size={18} />}
          accent="green"
        />
        <StatCard
          title="Optimization Score"
          value={`${demoSummary.optimizationScore}/100`}
          subtitle="CloudGuard AI score"
          icon={<Gauge size={18} />}
          accent="purple"
        />
        <StatCard
          title="Resources Analyzed"
          value={`${demoSummary.resourcesAnalyzed}`}
          subtitle="Across 2 regions"
          icon={<Server size={18} />}
          accent="cyan"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cost Trend */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white">Monthly Cost Trend</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">6-month rolling view (simulated)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={demoCostTrend}>
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="month" tick={{ fill: '#8b9bb4', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b9bb4', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} fill="url(#costGradient)" dot={{ fill: '#3b82f6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Breakdown */}
        <div className="card">
          <h2 className="font-semibold text-white mb-1">Cost by Service</h2>
          <p className="text-xs text-[var(--text-secondary)] mb-4">This month (simulated)</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={demoCostByService} dataKey="cost" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2}>
                {demoCostByService.map((entry) => (
                  <Cell key={entry.service} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${(value as number).toFixed(2)}`, '']}
                contentStyle={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {demoCostByService.map(s => (
              <div key={s.service} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[var(--text-secondary)]">{s.service}</span>
                </div>
                <span className="font-medium text-white">${s.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Optimization Score */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white">Optimization Score</h2>
              <p className="text-xs text-[var(--text-secondary)]">CloudGuard AI analytical score</p>
            </div>
            <div className="text-3xl font-bold gradient-text">{demoOptimizationScore.overall}</div>
          </div>
          <div className="space-y-3">
            {demoOptimizationScore.breakdown.map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{item.label}</span>
                  <span className="font-medium text-white">{item.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.score}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations preview */}
        <div className="card">
          <h2 className="font-semibold text-white mb-4">Top Recommendations</h2>
          <div className="space-y-3">
            {demoRecommendations.map(rec => (
              <div key={rec.id} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    background: `${priorityColor[rec.priority as keyof typeof priorityColor]}22`,
                    color: priorityColor[rec.priority as keyof typeof priorityColor],
                    border: `1px solid ${priorityColor[rec.priority as keyof typeof priorityColor]}44`
                  }}
                >
                  {rec.priority}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{rec.title}</p>
                  <p className="text-xs text-green-400 mt-0.5">Save ~${rec.estimatedSaving}/mo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {demoRecentActivity.map(item => (
            <div key={item.id} className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
              <div className="w-7 h-7 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center flex-shrink-0">
                {activityIcon[item.icon]}
              </div>
              <p className="flex-1 text-sm text-[var(--text-secondary)]">{item.message}</p>
              <span className="text-xs text-[var(--text-muted)] flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
