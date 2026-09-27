import { Router } from 'express';
import { CostExplorerClient, GetCostAndUsageCommand, Granularity } from '@aws-sdk/client-cost-explorer';
import { demoCostTrend, demoCostByService, demoSummary } from '../demoData';

const router = Router();
const isDemo = () => process.env.DEMO_MODE === 'true' || !process.env.AWS_ACCESS_KEY_ID;

const ceClient = () => new CostExplorerClient({
  region: 'us-east-1', // Cost Explorer only works in us-east-1
});

// GET /api/cost/summary
router.get('/summary', async (_req, res) => {
  if (isDemo()) {
    return res.json({ ...demoSummary, isDemo: true });
  }
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const cmd = new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: end },
      Granularity: Granularity.MONTHLY,
      Metrics: ['UnblendedCost'],
    });
    const data = await ceClient().send(cmd);
    const amount = parseFloat(data.ResultsByTime?.[0]?.Total?.UnblendedCost?.Amount || '0');
    res.json({
      monthlySpend: amount,
      potentialSavings: amount * 0.25, // rough estimate
      optimizationScore: 81,
      resourcesAnalyzed: 27,
      isDemo: false,
    });
  } catch (err) {
    console.error('Cost Explorer error:', err);
    res.json({ ...demoSummary, isDemo: true, fallback: true });
  }
});

// GET /api/cost/trend
router.get('/trend', async (_req, res) => {
  if (isDemo()) {
    return res.json({ data: demoCostTrend, isDemo: true });
  }
  try {
    const now = new Date();
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString().split('T')[0];

    const cmd = new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: end },
      Granularity: Granularity.MONTHLY,
      Metrics: ['UnblendedCost'],
    });
    const data = await ceClient().send(cmd);
    const trend = (data.ResultsByTime || []).map(r => ({
      month: new Date(r.TimePeriod?.Start || '').toLocaleString('default', { month: 'short' }),
      cost: parseFloat(r.Total?.UnblendedCost?.Amount || '0'),
    }));
    res.json({ data: trend, isDemo: false });
  } catch (err) {
    console.error('Cost trend error:', err);
    res.json({ data: demoCostTrend, isDemo: true, fallback: true });
  }
});

// GET /api/cost/by-service
router.get('/by-service', async (_req, res) => {
  if (isDemo()) {
    return res.json({ data: demoCostByService, isDemo: true });
  }
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const cmd = new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: end },
      Granularity: Granularity.MONTHLY,
      Metrics: ['UnblendedCost'],
      GroupBy: [{ Type: 'DIMENSION', Key: 'SERVICE' }],
    });
    const data = await ceClient().send(cmd);
    const groups = data.ResultsByTime?.[0]?.Groups || [];
    const services = groups
      .map(g => ({
        service: g.Keys?.[0]?.replace('Amazon ', '').replace('AWS ', '') || 'Other',
        cost: parseFloat(g.Metrics?.UnblendedCost?.Amount || '0'),
      }))
      .filter(s => s.cost > 0)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 8);
    res.json({ data: services, isDemo: false });
  } catch (err) {
    console.error('Cost by-service error:', err);
    res.json({ data: demoCostByService, isDemo: true, fallback: true });
  }
});

export { router as costRoutes };
