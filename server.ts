import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory server-authoritative store
  let serverConfig = {
    targetRTP: 96.2,
    minGCBet: 1.0,
    maxGCBet: 100.0,
    minSCBet: 0.20,
    maxSCBet: 10.0,
    minRedemptionSC: 100.0,
    scUsdRate: 1.0,
    sweepstakesEnabled: true
  };

  // API Health Endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'HEALTHY',
      service: 'Hidden Treasures Game Engine',
      timestamp: new Date().toISOString(),
      rng: 'Node.js crypto.randomInt (CSPRNG)',
      rtp: serverConfig.targetRTP
    });
  });

  // Server-Side Cryptographically Secure RNG Endpoint
  app.post('/api/slot/generate-seed', (_req, res) => {
    const seed = crypto.randomBytes(32).toString('hex');
    const nonce = crypto.randomInt(100000, 999999);
    res.json({ seed, nonce, timestamp: Date.now() });
  });

  // Admin Config Endpoint
  app.get('/api/admin/config', (_req, res) => {
    res.json(serverConfig);
  });

  app.post('/api/admin/config', (req, res) => {
    serverConfig = { ...serverConfig, ...req.body };
    res.json({ success: true, config: serverConfig });
  });

  // Vite Middleware / Static Serve
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hidden Treasures Game Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
