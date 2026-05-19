const https = require('https');
const http = require('http');

const SUPABASE_URL = process.env.SUPABASE_URL;
if (!SUPABASE_URL) {
    console.error('FATAL: SUPABASE_URL environment variable is not set');
    process.exit(1);
}
const target = new URL(SUPABASE_URL);

const server = http.createServer((req, res) => {
    // 1. Обработка CORS preflight запросов (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400',
        });
        res.end();
        return;
    }

    // 2. Настройка запроса к Supabase
    const options = {
        hostname: target.hostname,
        port: 443,
        path: req.url,
        method: req.method,
        headers: {
            ...req.headers,
            host: target.hostname,
        },
    };

    const proxyReq = https.request(options, (proxyRes) => {
        // 3. Удаляем исходный CORS-заголовок, чтобы не было дублирования
        const headers = { ...proxyRes.headers };
        delete headers['access-control-allow-origin'];
        // Добавляем свой CORS-заголовок
        headers['access-control-allow-origin'] = '*';

        res.writeHead(proxyRes.statusCode, headers);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy request failed:', err);
        res.writeHead(502, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
    });

    req.pipe(proxyReq);
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Supabase CORS proxy is running on port ${PORT}`);
});
