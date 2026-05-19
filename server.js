const https = require('https');
const http = require('http');

// Используем переменную окружения, которую мы задали в настройках Render
const SUPABASE_URL = process.env.SUPABASE_URL;
if (!SUPABASE_URL) {
    console.error('FATAL: SUPABASE_URL environment variable is not set');
    process.exit(1);
}
const target = new URL(SUPABASE_URL);

const server = http.createServer((req, res) => {
    // 1. Обработка предварительных запросов CORS (preflight OPTIONS)
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*', // Разрешаем любые заголовки, чтобы точно не было проблем
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
            host: target.hostname, // Важно подменить заголовок host
        },
    };

    const proxyReq = https.request(options, (proxyRes) => {
        // 3. Получаем ответ от Supabase и добавляем к нему CORS-заголовки
        const headers = {
            ...proxyRes.headers,
            'Access-Control-Allow-Origin': '*', // Гарантированно разрешаем доступ с любого сайта
        };
        res.writeHead(proxyRes.statusCode, headers);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy request failed:', err);
        // Даже если Supabase не ответил, мы должны вернуть браузеру CORS-заголовки
        res.writeHead(502, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
    });

    // 4. Отправляем тело исходного запроса в Supabase
    req.pipe(proxyReq);
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Supabase CORS proxy is running on port ${PORT}`);
});
