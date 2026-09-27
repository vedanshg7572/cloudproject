import { useState } from 'react';
import { Shield, Key, Globe, AlertCircle, ExternalLink } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

export default function Settings() {
  const [region, setRegion] = useState('us-east-1');

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">AWS connection and application configuration</p>
        </div>
        <DemoBadge />
      </div>

      {/* Connection Status */}
      <div className="card border-[var(--border)]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Globe size={18} className="text-blue-400" />
              AWS Connection Status
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Currently running in Demo Mode with simulated data</p>
          </div>
          <span className="badge-demo">DEMO MODE</span>
        </div>

        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-400">No AWS Account Connected</p>
              <p className="text-xs text-yellow-400/80 mt-1">
                CloudGuard AI is currently displaying simulated demo data. Connect your AWS account to see real infrastructure analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-400">Read-Only Philosophy</p>
              <p className="text-xs text-blue-400/80 mt-1">
                CloudGuard AI uses read-only AWS permissions. It analyzes your infrastructure to provide recommendations but never automatically modifies or deletes any resources.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="card">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Key size={18} className="text-purple-400" />
          AWS Setup Instructions
        </h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">1</div>
            <div>
              <p className="text-sm font-medium text-white">Create an IAM Role or User with read-only permissions</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Attach the following AWS managed policies:</p>
              <div className="mt-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 font-mono text-xs text-blue-300 space-y-1">
                <div>ReadOnlyAccess</div>
                <div>CostExplorerAccess (ce:*)</div>
                <div>CloudWatchReadOnlyAccess</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">2</div>
            <div>
              <p className="text-sm font-medium text-white">Set environment variables on the backend Lambda</p>
              <div className="mt-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 font-mono text-xs text-green-300 space-y-1">
                <div>AWS_REGION=us-east-1</div>
                <div>AWS_ACCESS_KEY_ID=your-key</div>
                <div>AWS_SECRET_ACCESS_KEY=your-secret</div>
                <div className="text-[var(--text-muted)]"># OR use an IAM role (recommended)</div>
              </div>
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                Never commit AWS credentials to source control or expose them in the frontend
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">3</div>
            <div>
              <p className="text-sm font-medium text-white">(Optional) Configure Amazon Bedrock</p>
              <div className="mt-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 font-mono text-xs text-purple-300 space-y-1">
                <div>BEDROCK_REGION=us-east-1</div>
                <div>BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0</div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-2">If not configured, CloudGuard AI falls back to built-in analytical responses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Region Selector */}
      <div className="card">
        <h2 className="font-semibold text-white mb-4">AWS Region</h2>
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 w-full max-w-xs"
        >
          <option value="us-east-1">US East (N. Virginia) — us-east-1</option>
          <option value="us-west-2">US West (Oregon) — us-west-2</option>
          <option value="eu-west-1">Europe (Ireland) — eu-west-1</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore) — ap-southeast-1</option>
          <option value="ap-south-1">Asia Pacific (Mumbai) — ap-south-1</option>
        </select>
        <p className="text-xs text-[var(--text-muted)] mt-2">Primary region for resource discovery</p>
      </div>

      {/* Documentation Links */}
      <div className="card">
        <h2 className="font-semibold text-white mb-4">Documentation &amp; Resources</h2>
        <div className="space-y-3">
          {[
            { label: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
            { label: 'AWS Cost Explorer API', url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-api.html' },
            { label: 'Amazon Bedrock Getting Started', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html' },
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={13} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
