// server.js
import { file } from 'bun';

// Bun server to serve track1.html on port 9090
const server = Bun.serve({
  port: 9090,
  fetch(req) {
    // Serve the HTML file when the root URL is accessed
    if (req.url === '/') {
      return new Response(file('track1.html'), {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
    
    // Default 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server is running on http://localhost:${server.port}`);
