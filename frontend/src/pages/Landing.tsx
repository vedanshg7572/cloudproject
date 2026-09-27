import { useNavigate } from 'react-router-dom';
import {
  Shield, Zap, BarChart2, Bot, ArrowRight, CheckCircle,
  DollarSign, TrendingDown, Server, Lock, ExternalLink
} from 'lucide-react';

const features = [
  {
    icon: <DollarSign size={22} className="text-green-400" />,
    title: 'Cost Intelligence',
    desc: 'Understand exactly where every dollar of your AWS bill goes. Surface the biggest spend drivers across services and regions.',
  },
  {
    icon: <Bot size={22} className="text-blue-400" />,
    title: 'AI Copilot',
    desc: 'Ask plain-English questions about your infrastructure. Powered by Amazon Bedrock for contextual, accurate answers.',
  },
  {
    icon: <Zap size={22} className="text-yellow-400" />,
    title: 'What-If Simulator',
    desc: 'Model optimization scenarios before committing. See projected savings for specific actions — no surprises.',
  },
  {
    icon: <Server size={22} className="text-cyan-400" />,
    title: 'Resource Inventory',
    desc: 'Full visibility into EC2, S3, EBS, RDS, Lambda, and CloudWatch with real-time utilization signals.',
  },
  {
    icon: <BarChart2 size={22} className="text-purple-400" />,
    title: 'Optimization Score',
    desc: 'A holistic 0–100 score breaking down cost efficiency, utilization, unused resources, and operational hygiene.',
  },
  {
    icon: <Lock size={22} className="text-red-400" />,
    title: 'Read-Only & Secure',
    desc: 'CloudGuard AI never auto-modifies resources. Read-only IAM access only. Credentials stay server-side.',
  },
];

const steps = [
  { num: '01', title: 'Connect your AWS account', desc: 'Provide read-only IAM credentials or a role. CloudGuard AI never writes to your infrastructure.' },
  { num: '02', title: 'Scan your infrastructure', desc: 'CloudGuard AI discovers resources across EC2, S3, EBS, RDS, Lambda, and pulls cost data from Cost Explorer.' },
  { num: '03', title: 'Get AI-powered insights', desc: 'Amazon Bedrock analyzes your infrastructure context and generates prioritized, actionable recommendations.' },
  { num: '04', title: 'Simulate and optimize', desc: 'Use the What-If Simulator to model savings before taking action. Stay in complete control.' },
];

const savings = [
  { resource: 'Unused EBS Volume', saving: '$12.40/mo', tag: 'HIGH' },
  { resource: 'Oversized EC2 Instance', saving: '$18.70/mo', tag: 'MEDIUM' },
  { resource: 'S3 Lifecycle Optimization', saving: '$16.20/mo', tag: 'LOW' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm">CloudGuard <span className="text-blue-400">AI</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#savings" className="hover:text-white transition-colors">Savings</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
          <button onClick={() => navigate('/app')} className="btn-primary text-sm py-2">
            Open Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs text-blue-400 font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AWS Zero to Shipped Hackathon 2026 · #workplace-efficiency
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">CloudGuard AI</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-light mb-4 leading-relaxed">
            Understand your cloud. Optimize your infrastructure. Ship smarter.
          </p>

          <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI-powered AWS cloud optimization copilot that transforms infrastructure data into actionable cost-saving insights — so your team can focus on shipping, not billing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/app')} className="btn-primary text-base px-8 py-3.5 glow-blue">
              Open Dashboard <ArrowRight size={18} />
            </button>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-3.5">
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm">
            {[
              { label: 'Resources Analyzed', value: '27' },
              { label: 'Potential Monthly Savings', value: '$47.30' },
              { label: 'Optimization Score', value: '81/100' },
              { label: 'AWS Services Integrated', value: '8' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-[var(--text-muted)]">cloudguard.ai/app — Dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Monthly Spend', val: '$184.72', color: 'border-blue-500/20 bg-blue-500/5' },
                { label: 'Potential Savings', val: '$47.30/mo', color: 'border-green-500/20 bg-green-500/5' },
                { label: 'Opt. Score', val: '81/100', color: 'border-purple-500/20 bg-purple-500/5' },
                { label: 'Resources', val: '27', color: 'border-cyan-500/20 bg-cyan-500/5' },
              ].map(c => (
                <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{c.label}</p>
                  <p className="text-xl font-bold text-white">{c.val}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="h-24 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-end px-4 pb-3 gap-2 overflow-hidden">
                {[60, 72, 65, 82, 78, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-blue-400 opacity-80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-3">
            Dashboard preview — all values are simulated demo data
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">The Problem</h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            Developers move fast on AWS. Infrastructure gets deployed quickly — but monitoring and optimizing cloud spend rarely keeps up.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { title: 'Opaque Billing', desc: "AWS bills can run hundreds of line items. Most teams don't know their biggest cost drivers." },
              { title: 'Idle Resources', desc: 'Unused EBS volumes, oversized EC2 instances, and forgotten services accumulate silently.' },
              { title: 'No Easy Answers', desc: 'AWS Cost Explorer is powerful but requires expertise. Small teams lack dedicated FinOps.' },
            ].map(p => (
              <div key={p.title} className="card">
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How CloudGuard AI Works</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map(s => (
              <div key={s.num} className="card flex gap-4">
                <div className="text-3xl font-black text-[var(--border-light)] flex-shrink-0">{s.num}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Features</h2>
          <p className="text-center text-[var(--text-secondary)] mb-12">Everything you need to understand and optimize your AWS spend</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(f => (
              <div key={f.title} className="card hover:border-[var(--border-light)] transition-all">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Savings */}
      <section id="savings" className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Example Optimization Opportunities</h2>
          <p className="text-[var(--text-secondary)] mb-2">Based on simulated demo data — actual opportunities vary by account</p>
          <p className="text-xs text-[var(--text-muted)] mb-10">All savings are estimates, not guaranteed outcomes</p>
          <div className="space-y-3">
            {savings.map(s => (
              <div key={s.resource} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    s.tag === 'HIGH' ? 'priority-high' : s.tag === 'MEDIUM' ? 'priority-medium' : 'priority-low'
                  }`}>{s.tag}</span>
                  <span className="text-sm font-medium text-white">{s.resource}</span>
                </div>
                <span className="text-sm font-bold text-green-400">{s.saving}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
            <p className="text-sm text-green-400 font-semibold">Combined potential: ~$47.30/month · ~$567/year</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Estimated demo values only — not a guarantee of actual savings</p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
            <Shield size={28} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Secure by Design</h2>
          <p className="text-[var(--text-secondary)] mb-8">CloudGuard AI is built on a read-only, security-first philosophy.</p>
          <div className="text-left space-y-3">
            {[
              'AWS credentials are stored server-side only — never exposed to the browser',
              'Read-only IAM access — CloudGuard AI cannot modify or delete any resources',
              'No automated destructive actions of any kind',
              'All recommendations require explicit human review before action',
              'Environment variable-based configuration — no hardcoded secrets',
              'Input validation and secure error handling on all API endpoints',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to optimize your cloud?</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Open the dashboard to see CloudGuard AI in action with realistic demo data — no AWS account required to explore.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/app')} className="btn-primary text-base px-8 py-3.5 glow-blue">
              Open Dashboard <ArrowRight size={18} />
            </button>
            <a
              href="https://github.com/vedanshg7572/cloudproject"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3.5"
            >
              <ExternalLink size={18} /> GitHub Repo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold">CloudGuard AI</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center">
            Built for the AWS "Zero to Shipped" Hackathon 2026 · #workplace-efficiency · #startups<br />
            Not affiliated with or endorsed by Amazon Web Services, Inc. Demo data is simulated.
          </p>
          <a
            href="https://github.com/vedanshg7572/cloudproject"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={14} /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
