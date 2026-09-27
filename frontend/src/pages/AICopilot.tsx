import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTED = [
  'Why is my AWS bill increasing?',
  'Which resources look underutilized?',
  'How can I reduce costs without affecting production?',
  'Explain my biggest AWS cost drivers.',
];

const DEMO_RESPONSES: Record<string, string> = {
  default: `Based on your current infrastructure data, here are my key observations:

**Cost Overview:** Your estimated monthly spend is **$184.72**, up approximately 9.4% from last month. The primary driver is EC2 at $91.20 (49% of total spend).

**Top Optimization Opportunities:**
1. **EC2 right-sizing** — EC2-Web-01 shows average CPU utilization of just 8.2%, suggesting a t3.medium may be sufficient instead of m5.large (~$18.70/mo saving)
2. **Unused EBS volume** — vol-0a1b2c3d4e has been unattached for 47 days (~$12.40/mo)
3. **S3 lifecycle** — ~82 GB of objects older than 90 days not in lower-cost storage classes (~$16.20/mo)

**Note:** These are estimates based on simulated demo data. Connect your AWS account to get real-time analysis.`,
  bill: `Your estimated bill has been trending upward (+9.4% month-over-month). The primary drivers in the demo data are:

- **EC2 compute** accounts for 49% ($91.20) of spend — the largest single category
- **S3 storage** grew as older objects weren't transitioned to cheaper tiers
- **RDS** ($28.40) may have room for instance optimization depending on actual query load

Connecting a real AWS account via Cost Explorer API would give exact cost allocation by resource tag and account.`,
  reduce: `Here are practical ways to reduce costs without impacting production:

1. **Right-size gradually** — Monitor CPU/memory for 2-4 weeks, then resize during low-traffic windows
2. **Use Reserved Instances or Savings Plans** — If EC2 usage is predictable, 1-year RIs can save 30-40%
3. **S3 Intelligent-Tiering** — Automatically moves objects to cheapest storage class
4. **Lambda rightsizing** — Reduce memory allocation on underutilized functions
5. **Delete unattached EBS volumes** — After snapshotting any data you need

⚠️ CloudGuard AI never takes automated destructive actions. All changes require explicit human review.`,
  underutilized: `Based on the demo infrastructure scan, these resources show low utilization:

| Resource | Service | Utilization | Status |
|----------|---------|-------------|--------|
| EC2-Web-01 | EC2 | 22% CPU avg | Review |
| Lambda-Cron | Lambda | 6% | Review |
| RDS-Prod-MySQL | RDS | 33% | Review |
| EBS-Old-01 | EBS | 0% | Action Needed |

EC2-Web-01 and RDS-Prod-MySQL are the highest-value targets given their monthly costs ($42.80 and $28.40 respectively).`,
  drivers: `Your top AWS cost drivers in demo mode:

1. **EC2** — $91.20/mo (49.4%) — Web server, API server, and worker instances
2. **S3** — $31.80/mo (17.2%) — Assets bucket and logs
3. **RDS** — $28.40/mo (15.4%) — Production MySQL database
4. **Lambda** — $11.30/mo (6.1%) — Three functions (resize, API handler, cron)
5. **CloudWatch** — $8.20/mo (4.4%) — Monitoring and alarms

EC2 is the dominant category and likely the highest-value target for optimization.`,
};

function getResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes('bill') || l.includes('increas') || l.includes('why')) return DEMO_RESPONSES.bill;
  if (l.includes('reduc') || l.includes('cut') || l.includes('save') || l.includes('cheaper') || l.includes('without')) return DEMO_RESPONSES.reduce;
  if (l.includes('underutil') || l.includes('idle') || l.includes('low usage')) return DEMO_RESPONSES.underutilized;
  if (l.includes('driver') || l.includes('biggest') || l.includes('explain')) return DEMO_RESPONSES.drivers;
  return DEMO_RESPONSES.default;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
        <Bot size={16} className="text-white" />
      </div>
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-blue-400 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-blue-400 typing-dot" />
        </div>
      </div>
    </div>
  );
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: `Hello! I'm **CloudGuard AI Copilot** — your AI assistant for AWS infrastructure analysis.\n\nI can help you understand your cloud spending, identify optimization opportunities, and explain your infrastructure. Try asking me something below, or pick a suggested question.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Try real backend, fall back to demo
    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: data.response, timestamp: new Date() }]);
      } else {
        throw new Error('non-ok');
      }
    } catch {
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: getResponse(msg), timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map((line, i) => <p key={i} className={line.startsWith('- ') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') ? 'ml-3' : ''} dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles size={22} className="text-blue-400" />
            AI Copilot
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Ask questions about your AWS environment</p>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge />
          <button onClick={() => setMessages(msgs => [msgs[0]])} className="btn-secondary text-xs">
            <RefreshCw size={13} /> Clear
          </button>
        </div>
      </div>

      {/* Suggested */}
      {messages.length === 1 && (
        <div className="mb-4 flex-shrink-0">
          <p className="text-xs text-[var(--text-muted)] mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/50 text-[var(--text-secondary)] hover:text-white px-3 py-1.5 rounded-lg transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(m => (
          <div key={m.id} className={`flex items-end gap-3 ${ m.role === 'user' ? 'flex-row-reverse' : '' }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.role === 'user'
                ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                : 'bg-gradient-to-br from-blue-500 to-purple-500'
            }`}>
              {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
            </div>
            <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed space-y-1 ${
              m.role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-ai text-[var(--text-secondary)]'
            }`}>
              {formatContent(m.content)}
              <p className="text-xs opacity-50 mt-2">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-1 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about your AWS infrastructure..."
          className="flex-1 bg-transparent text-sm text-white placeholder-[var(--text-muted)] px-3 py-2 outline-none"
          disabled={loading}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
        >
          <Send size={15} className="text-white" />
        </button>
      </div>
    </div>
  );
}
