import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path'; // أضف resolve
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data.json');
const BUILD_DIR = resolve(__dirname, 'dist'); // افترض أن ملفات البناء في مجلد dist

// ... (بقية دوال loadData, saveData, sendJSON, handleBody)

const server = createServer((req, res) => {
  // ... (معالجة OPTIONS)

  if (req.method === 'GET' && req.url === '/api/data') {
    sendJSON(res, loadData());
  } else if (req.method === 'POST' && req.url === '/api/translations') {
    // ... (معالجة api/translations)
  } else if (req.method === 'POST' && req.url === '/api/credentials') {
    // ... (معالجة api/credentials)
  } else if (req.method === 'GET') {
    // محاولة خدمة الملفات الثابتة (مثل CSS, JS, صور)
    const filePath = join(BUILD_DIR, req.url === '/' ? 'index.html' : req.url); // For / or other assets
    
    // إذا كان المسار يشير إلى ملف، قم بخدمته
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
        // أضف المزيد من الأنواع حسب الحاجة
      };
      const contentType = mimeTypes[extname] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(readFileSync(filePath));
    } else {
      // إذا لم يكن ملفًا ثابتًا، أعد index.html لتوجيه العميل
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