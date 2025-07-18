import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data.json');
const BUILD_DIR = resolve(__dirname, 'dist');

function loadData() {
  if (existsSync(DATA_FILE)) {
    try {
      return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sendJSON(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function handleBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const json = body ? JSON.parse(body) : {};
      callback(json);
    } catch {
      callback({});
    }
  });
}

const server = createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/data') {
    sendJSON(res, loadData());
  } else if (req.method === 'POST' && req.url === '/api/translations') {
    handleBody(req, ({ lang, updates }) => {
      const data = loadData();
      if (!data.customTranslations) data.customTranslations = {};
      data.customTranslations[lang] = {
        ...(data.customTranslations[lang] || {}),
        ...updates,
      };
      saveData(data);
      sendJSON(res, { status: 'ok' });
    });
  } else if (req.method === 'POST' && req.url === '/api/credentials') {
    handleBody(req, ({ username, password }) => {
      const data = loadData();
      data.credentials = { username, password };
      saveData(data);
      sendJSON(res, { status: 'ok' });
    });
  } else if (req.method === 'GET') {
    const filePath = join(BUILD_DIR, req.url === '/' ? 'index.html' : req.url);

    if (existsSync(filePath)) {
      const extname = String(filePath.split('.').pop()).toLowerCase();
      const mimeTypes = {
        html: 'text/html',
        js: 'text/javascript',
        css: 'text/css',
        png: 'image/png',
        jpg: 'image/jpg',
        gif: 'image/gif',
        svg: 'image/svg+xml',
      };
      const contentType = mimeTypes[extname] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(readFileSync(filePath));
    } else {
      const indexFilePath = join(BUILD_DIR, 'index.html');
      if (existsSync(indexFilePath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(indexFilePath));
      } else {
        res.writeHead(404);
        res.end('404 Not Found: index.html not found in build directory.');
      }
    }
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Serving static files from ${BUILD_DIR}`);
});
