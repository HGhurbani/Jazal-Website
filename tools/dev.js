#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

// Use fileURLToPath to properly decode the file URL on all platforms
// especially on Windows where pathname encoding can break native paths.
const vitePath = fileURLToPath(
  new URL('../node_modules/vite/bin/vite.js', import.meta.url)
);

const processes = [
  spawn(process.execPath, ['server.js'], { stdio: 'inherit' }),
  spawn(process.execPath, [vitePath], { stdio: 'inherit' })
];

function shutdown(signal = 'SIGTERM') {
  processes.forEach(p => {
    if (!p.killed) {
      p.kill(signal);
    }
  });
}

processes.forEach(p => {
  p.on('exit', code => {
    shutdown();
    process.exit(code ?? 0);
  });
});

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
