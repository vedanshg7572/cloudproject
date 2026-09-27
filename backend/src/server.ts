import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { costRoutes } from './routes/cost';
import { resourceRoutes } from './routes/resources';
import { copilotRoutes } from './routes/copilot';
import { healthRoutes } from './routes/health';

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// Strip internal errors from responses
app.use((_req, res, next) => {
  res.sendError = (status: number, message: string) => {
    res.status(status).json({ error: message, demo: process.env.DEMO_MODE === 'true' });
  };
  next();
});

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/health',    healthRoutes);
app.use('/api/cost',      costRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/copilot',   copilotRoutes);

// ── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[CloudGuard AI Error]', err.message);
  res.status(500).json({ error: 'Internal server error', demo: process.env.DEMO_MODE === 'true' });
});

app.listen(PORT, () => {
  const mode = process.env.DEMO_MODE === 'true' ? '🎭 DEMO MODE' : '☁️  LIVE AWS MODE';
  console.log(`\n🛡  CloudGuard AI Backend`);
  console.log(`   ${mode}`);
  console.log(`   Listening on http://localhost:${PORT}`);
  console.log(`   Region: ${process.env.AWS_REGION || 'us-east-1'}\n`);
});

export default app;
