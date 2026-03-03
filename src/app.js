const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js CI/CD Demo App!',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    hostname: os.hostname(),
    platform: os.platform()
  });
});

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'nodejs-cicd-demo',
    node_version: process.version,
    memory: process.memoryUsage(),
    cpu: os.cpus().length + ' cores'
  });
});

// Only start the server when this file is run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
