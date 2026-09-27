import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CloudGuard AI Backend',
    version: '1.0.0',
    mode: process.env.DEMO_MODE === 'true' ? 'demo' : 'live',
    region: process.env.AWS_REGION || 'us-east-1',
    timestamp: new Date().toISOString(),
  });
});

export { router as healthRoutes };
