const http = require('node:http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  // Log every request
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  // Parse URL and query params
  const { pathname, searchParams } = new URL(req.url, `http://localhost:${PORT}`);

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

  // Route: GET /api/rollDie (d6 only)
  if (req.method === 'GET' && pathname === '/api/rollDie') {
    let quantity = parseInt(searchParams.get('quantity'), 10);

    // Validate quantity (must be a positive number, cap at 100)
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    } else if (quantity > 100) {
      quantity = 100;
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

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});