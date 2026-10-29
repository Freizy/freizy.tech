import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

// `rm -rf` does not exist in cmd.exe or PowerShell, and this project is
// developed on Windows. Node gives every platform the same behaviour.
for (const target of ['dist', 'server.js']) {
  await rm(resolve(target), { recursive: true, force: true });
}

console.log('Removed dist/ and server.js (if present).');
