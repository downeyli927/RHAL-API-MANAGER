require('dotenv').config();
const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PROXY_PORT || 3099;
const AI_API_URL = process.env.AI_API_URL_BACKEND || 'https://devops.realtek.com/realgpt-api/openai-compatible/v1/chat/completions';
const AI_API_KEY = process.env.AI_API_KEY;

const targetUrl = new URL(AI_API_URL);

const server = http.createServer((req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Intercept and proxy requests
  if (req.url.startsWith('/chat/completions') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Inject API KEY securely from backend .env
          'Authorization': `Bearer ${AI_API_KEY}`
        }
      };

      const proxyReq = (targetUrl.protocol === 'https:' ? https : http).request(options, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      proxyReq.on('error', e => {
        console.error("Proxy Error:", e);
        res.writeHead(500);
        res.end('Proxy Error');
      });

      proxyReq.write(body);
      proxyReq.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[AI Proxy] Running on http://0.0.0.0:${PORT}`);
  console.log(`[AI Proxy] Forwarding requests to: ${AI_API_URL}`);
});
