import { Router } from 'express';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { demoSummary, demoRecommendations } from '../demoData';

const router = Router();

const DEMO_RESPONSES: Record<string, string> = {
  default: `Based on your current AWS infrastructure data:\n\n**Monthly Spend:** $${demoSummary.monthlySpend} (September 2026 estimate)\n\n**Top Opportunities:**\n1. EC2 right-sizing — EC2-Web-01 at 8.2% CPU avg (~$18.70/mo saving)\n2. Unused EBS volume — vol-0a1b2c3d4e unattached 47 days (~$12.40/mo)\n3. S3 lifecycle — ~82 GB not transitioned to cheaper tier (~$16.20/mo)\n\nTotal estimated potential: **$47.30/month** ($567/year)\n\n*Note: Connect your AWS account in Settings for real-time analysis.*`,
  bill: `Your bill trend shows +9.4% month-over-month. Primary drivers:\n\n- **EC2 (49%)** — $91.20 — largest single category\n- **S3 (17%)** — $31.80 — storage growing without lifecycle rules\n- **RDS (15%)** — $28.40 — may be oversized for actual query load\n\nEC2 is the highest-value optimization target.`,
  reduce: `Ways to reduce costs without impacting production:\n\n1. **Right-size gradually** — Monitor 2-4 weeks, resize in low-traffic windows\n2. **Reserved Instances** — 1-year RIs save 30-40% for predictable workloads\n3. **S3 Intelligent-Tiering** — Auto-moves objects to cheapest tier\n4. **Delete unattached EBS** — Snapshot first, then delete\n5. **Lambda memory tuning** — Right-size function memory allocations\n\n⚠️ CloudGuard AI never takes automated destructive actions.`,
  underutilized: `Underutilized resources in your environment:\n\n| Resource | Utilization | Action |\n|----------|-------------|--------|\n| EC2-Web-01 | 22% CPU | Resize to t3.medium |\n| Lambda-Cron | 6% | Reduce memory |\n| RDS-Prod-MySQL | 33% | Review instance class |\n| EBS-Old-01 | 0% (unattached) | Delete after snapshot |`,
  drivers: `Top AWS cost drivers:\n\n1. **EC2** — $91.20/mo (49%) — 3 instances\n2. **S3** — $31.80/mo (17%) — 2 buckets\n3. **RDS** — $28.40/mo (15%) — MySQL production\n4. **Lambda** — $11.30/mo (6%) — 3 functions\n5. **CloudWatch** — $8.20/mo (4%) — alarms & logs`,
};

function getDemoResponse(message: string): string {
  const l = message.toLowerCase();
  if (l.includes('bill') || l.includes('increas') || l.includes('why')) return DEMO_RESPONSES.bill;
  if (l.includes('reduc') || l.includes('cut') || l.includes('save') || l.includes('without')) return DEMO_RESPONSES.reduce;
  if (l.includes('underutil') || l.includes('idle') || l.includes('unused')) return DEMO_RESPONSES.underutilized;
  if (l.includes('driver') || l.includes('biggest') || l.includes('explain')) return DEMO_RESPONSES.drivers;
  return DEMO_RESPONSES.default;
}

// POST /api/copilot/chat
router.post('/chat', async (req, res) => {
  const { message } = req.body as { message?: string };
  if (!message || typeof message !== 'string' || message.length > 2000) {
    return res.status(400).json({ error: 'Invalid message' });
  }

  const bedrockEnabled = process.env.BEDROCK_ENABLED === 'true';

  if (!bedrockEnabled || process.env.DEMO_MODE === 'true') {
    // Demo fallback
    return res.json({ response: getDemoResponse(message), isDemo: true });
  }

  try {
    const client = new BedrockRuntimeClient({
      region: process.env.BEDROCK_REGION || 'us-east-1',
    });

    // Build context from real data (in production, fetch live data here)
    const context = `
You are CloudGuard AI, an AWS cost optimization assistant.
Current infrastructure context:
- Monthly spend: $${demoSummary.monthlySpend}
- Potential savings: $${demoSummary.potentialSavings}
- Resources analyzed: ${demoSummary.resourcesAnalyzed}
- Top recommendations: ${demoRecommendations.map(r => r.title).join(', ')}

IMPORTANT: You analyze and recommend only. Never suggest automated destructive actions.
Always recommend human review before any infrastructure change.
Be concise, practical, and specific to AWS.
    `.trim();

    const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-haiku-20240307-v1:0';

    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: context,
      messages: [{ role: 'user', content: message }],
    };

    const command = new InvokeModelCommand({
      modelId,
      body: JSON.stringify(payload),
      contentType: 'application/json',
      accept: 'application/json',
    });

    const response = await client.send(command);
    const body = JSON.parse(new TextDecoder().decode(response.body));
    const text = body.content?.[0]?.text || getDemoResponse(message);

    res.json({ response: text, isDemo: false });
  } catch (err) {
    console.error('Bedrock error:', err);
    // Graceful fallback
    res.json({ response: getDemoResponse(message), isDemo: true, fallback: true });
  }
});

export { router as copilotRoutes };
