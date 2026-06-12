const http = require('node:http');

const server = http.createServer((req, res) => {
  // Step 3 — Log every request
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  // Parse URL and query params
  const { pathname, searchParams } = new URL(req.url, 'http://localhost:8080');

  // Step 2 — Routing
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to my server! 🎉');
  }

  if (req.method === 'GET' && pathname === '/api/joke') {
    const joke = {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!"
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(joke));
  }

  if (req.method === 'GET' && pathname === '/api/rollDie') {
    const rawQuantity = parseInt(searchParams.get('quantity'));
    const quantity = Number.isInteger(rawQuantity) && rawQuantity > 0 ? rawQuantity : 1;

    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * 6) + 1);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ rolls }));
  }

  // Fallback — 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});