import { Shield, Zap, Lock, Server, Bot, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: <DollarSign size={20} className="text-green-400" />, title: 'Cost Intelligence', desc: 'Analyze AWS Cost Explorer data and surface the biggest spend drivers across services, regions, and time.' },
  { icon: <Bot size={20} className="text-blue-400" />, title: 'AI Copilot', desc: 'Powered by Amazon Bedrock, ask natural language questions about your cloud environment and get contextual answers.' },
  { icon: <Zap size={20} className="text-yellow-400" />, title: 'Optimization Simulator', desc: 'Model what-if scenarios before committing to changes. See estimated savings for specific actions.' },
  { icon: <Shield size={20} className="text-purple-400" />, title: 'Read-Only Security', desc: 'CloudGuard AI never automatically modifies or deletes resources. Analysis only — you stay in control.' },
  { icon: <Server size={20} className="text-cyan-400" />, title: 'Resource Inventory', desc: 'Full visibility into EC2, S3, EBS, RDS, Lambda, and CloudWatch resources with utilization signals.' },
  { icon: <Lock size={20} className="text-red-400" />, title: 'Secure by Design', desc: 'AWS credentials stay server-side. No secrets in the browser. Environment-variable based configuration.' },
];

const awsServices = [
  { name: 'Amazon S3', purpose: 'Frontend hosting' },
  { name: 'CloudFront', purpose: 'CDN + HTTPS delivery' },
  { name: 'API Gateway', purpose: 'REST API endpoints' },
  { name: 'AWS Lambda', purpose: 'Serverless backend' },
  { name: 'Cost Explorer', purpose: 'Cost and usage data' },
  { name: 'Amazon EC2', purpose: 'Resource inventory' },
  { name: 'Amazon CloudWatch', purpose: 'Metrics and utilization' },
  { name: 'Amazon Bedrock', purpose: 'AI recommendations' },
  { name: 'Amazon DynamoDB', purpose: 'Settings persistence' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">About CloudGuard AI</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">How it works and what AWS services power it</p>
      </div>

      {/* Mission */}
      <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/5 border-blue-500/20">
        <h2 className="font-semibold text-white mb-2">Mission</h2>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          CloudGuard AI helps developers and small engineering teams understand where cloud spending is coming from
          and where they can optimize — without requiring deep AWS expertise. By combining real-time infrastructure
          analysis with AI-powered explanations, CloudGuard AI turns complex billing data into clear, actionable insights.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="card">
        <h2 className="font-semibold text-white mb-6">AWS Architecture</h2>
        <div className="flex flex-col items-center gap-2 text-sm">
          {[
            { label: 'User Browser', color: 'bg-blue-600' },
            null,
            { label: 'Amazon CloudFront (CDN)', color: 'bg-cyan-600' },
            null,
            { label: 'Amazon S3 — React Frontend', color: 'bg-cyan-700' },
            null,
            { label: 'Amazon API Gateway', color: 'bg-purple-600' },
            null,
            { label: 'AWS Lambda — Backend Handlers', color: 'bg-purple-700' },
          ].map((item, i) => (
            item === null ? (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className="w-px h-4 bg-[var(--border-light)]" />
                <div className="w-2 h-2 rounded-full bg-[var(--border-light)]" />
                <div className="w-px h-4 bg-[var(--border-light)]" />
              </div>
            ) : (
              <div key={i} className={`${item.color} text-white text-xs font-semibold px-6 py-2.5 rounded-lg w-72 text-center`}>
                {item.label}
              </div>
            )
          ))}

          {/* Fan out */}
          <div className="flex items-start gap-4 mt-2">
            {[
              { label: 'Cost Explorer', color: 'bg-green-700' },
              { label: 'CloudWatch', color: 'bg-green-600' },
              { label: 'EC2 / S3 / EBS', color: 'bg-blue-700' },
              { label: 'Amazon Bedrock', color: 'bg-orange-600' },
            ].map(svc => (
              <div key={svc.label} className="flex flex-col items-center gap-1">
                <div className="w-px h-6 bg-[var(--border-light)]" />
                <div className={`${svc.color} text-white text-xs font-medium px-3 py-1.5 rounded-lg text-center`}>{svc.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="font-semibold text-white mb-4">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="card">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AWS Services */}
      <div className="card">
        <h2 className="font-semibold text-white mb-4">AWS Services Used</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {awsServices.map(s => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <span className="text-sm font-medium text-white">{s.name}</span>
              <span className="text-xs text-[var(--text-secondary)]">{s.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card border-green-500/20 bg-green-500/5">
        <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Shield size={18} className="text-green-400" />
          Security Approach
        </h2>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          {[
            'AWS credentials are stored server-side only — never exposed to the browser',
            'Read-only IAM permissions — CloudGuard AI cannot modify or delete resources',
            'No automatic destructive actions of any kind',
            'All recommendations require explicit human review before action',
            'Environment variables used for all secrets and configuration',
            'Input validation and error handling on all API endpoints',
            'CORS configured to restrict API access to the frontend origin',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <Shield size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="card border-yellow-500/20 bg-yellow-500/5">
        <h2 className="font-semibold text-yellow-400 mb-2">Important Disclaimers</h2>
        <ul className="space-y-1 text-xs text-yellow-400/80 list-disc list-inside">
          <li>Estimated savings are projections, not guarantees. Actual savings depend on real workload requirements.</li>
          <li>Optimization Score is an analytical score by CloudGuard AI, not an AWS-certified or official rating.</li>
          <li>CloudGuard AI is not affiliated with, endorsed by, or certified by Amazon Web Services, Inc.</li>
          <li>AWS® is a trademark of Amazon.com, Inc. All AWS service names are trademarks of their respective owners.</li>
        </ul>
      </div>

      <button onClick={() => navigate('/app')} className="btn-primary">
        Go to Dashboard <ArrowRight size={16} />
      </button>
    </div>
  );
}
