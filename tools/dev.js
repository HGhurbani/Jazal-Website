#!/usr/bin/env node

import { spawn } from 'child_process';

const vitePath = new URL('../node_modules/vite/bin/vite.js', import.meta.url).pathname;

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
