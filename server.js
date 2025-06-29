import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data.json');

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
  res.writeHead(status, { 'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                          'Access-Control-Allow-Headers': 'Content-Type' });
  res.end(JSON.stringify(data));
}

function handleBody(req, callback) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
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
      'Access-Control-Allow-Headers': 'Content-Type'
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
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
