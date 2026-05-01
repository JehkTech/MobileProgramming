'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'coverage']);
const errors = [];

function walkDir(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) {
        walkDir(full);
      }
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      try {
        execSync(`node --check "${full}"`, { stdio: 'pipe' });
      } catch (err) {
        errors.push(`${full}: ${err.stderr?.toString().trim() || err.message}`);
      }
    }
  }
}

walkDir(process.cwd());

if (errors.length > 0) {
  console.error('Type check errors:');
  errors.forEach((e) => console.error(e));
  process.exit(1);
}

console.log('Frontend type-check passed');
