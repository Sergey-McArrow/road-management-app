// ESM syntax
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create the server
const server = jsonServer.create();

// Path to the db.json file
const dbPath = join(__dirname, '..', 'db.json');

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Custom CORS middleware
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Create router using the database
const router = jsonServer.router(dbPath);
server.use(router);

// For Vercel serverless functions, we need to export a handler
export default createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Forward the request to json-server
  server(req, res);
});
