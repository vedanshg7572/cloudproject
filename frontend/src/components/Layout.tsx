import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Bot, Lightbulb, DollarSign,
  Server, Sliders, Settings, Info, ChevronLeft,
  ChevronRight, Bell, Search, Shield, ExternalLink,
  Menu
} from 'lucide-react';
import DemoBadge from './DemoBadge';

const navItems = [
  { to: '/app',               icon: LayoutDashboard, label: 'Dashboard',   end: true },
  { to: '/app/copilot',       icon: Bot,             label: 'AI Copilot' },
  { to: '/app/recommendations', icon: Lightbulb,     label: 'Recommendations' },
  { to: '/app/cost-explorer', icon: DollarSign,      label: 'Cost Explorer' },
  { to: '/app/resources',     icon: Server,          label: 'Resources' },
  { to: '/app/simulator',     icon: Sliders,         label: 'Optimizer' },
];

const bottomItems = [
  { to: '/app/settings', icon: Settings, label: 'Settings' },
  { to: '/app/about',    icon: Info,     label: 'About' },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
          <Shield size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-sm text-white">CloudGuard</span>
            <span className="font-bold text-sm text-blue-400"> AI</span>
          </div>
        )}
      </div>

      {/* Demo badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <DemoBadge />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
            title={collapsed ? label : undefined}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[var(--border)] space-y-1">
        {bottomItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
            title={collapsed ? label : undefined}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full hidden lg:flex"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-[var(--bg-secondary)] border-r border-[var(--border)] transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-[var(--text-secondary)] hover:text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search resources, recommendations..."
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 w-72"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)] transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white border border-[var(--border)] rounded-lg px-3 py-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              Landing
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                CG
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
