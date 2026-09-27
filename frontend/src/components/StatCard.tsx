import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;   // percentage
  icon: ReactNode;
  accent?: 'blue' | 'green' | 'yellow' | 'purple' | 'cyan';
  loading?: boolean;
}

const accentMap = {
  blue:   'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  green:  'from-green-500/20 to-green-600/5 border-green-500/20',
  yellow: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20',
  purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
  cyan:   'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
};

const iconBg = {
  blue:   'bg-blue-500/10 text-blue-400',
  green:  'bg-green-500/10 text-green-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  purple: 'bg-purple-500/10 text-purple-400',
  cyan:   'bg-cyan-500/10 text-cyan-400',
};

export default function StatCard({ title, value, subtitle, trend, icon, accent = 'blue', loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-[var(--border)] rounded w-24 mb-4" />
        <div className="h-8 bg-[var(--border)] rounded w-32 mb-2" />
        <div className="h-3 bg-[var(--border)] rounded w-20" />
      </div>
    );
  }
  return (
    <div className={clsx('card bg-gradient-to-br border', accentMap[accent])}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-[var(--text-secondary)] font-medium">{title}</p>
        <div className={clsx('p-2 rounded-lg', iconBg[accent])}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <div className="flex items-center gap-2">
        {subtitle && <p className="text-xs text-[var(--text-secondary)]">{subtitle}</p>}
        {trend !== undefined && (
          <span className={clsx('flex items-center gap-0.5 text-xs font-medium', trend >= 0 ? 'text-red-400' : 'text-green-400')}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}
