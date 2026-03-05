const http = require('node:http');

const server = http.createServer((req, res) => {
  // Step 3 — Log every request
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  // Parse URL and query params
  const { pathname, searchParams } = new URL(req.url, 'http://localhost:8080');

  // Route: GET /
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node server!');
    return;
  }

  // Route: GET /api/joke
  if (req.method === 'GET' && pathname === '/api/joke') {
    const joke = {
      setup: 'Why do programmers prefer dark mode?',
      punchline: 'Because light attracts bugs.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(joke));
    return;
  }

  // Route: GET /api/rollDie
  if (req.method === 'GET' && pathname === '/api/rollDie') {
    let quantity = parseInt(searchParams.get('quantity'));

    // Validate quantity (must be positive number)
    if (!quantity || quantity < 1) {
      quantity = 1;
    }

    const rolls = [];

    for (let i = 0; i < quantity; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      rolls.push(roll);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rolls }));
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});