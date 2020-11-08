import { spawnSync } from 'child_process';

console.log('preparing build...');

spawnSync('rm', ['-rf', 'dist']);
spawnSync('mkdir', ['dist']);
spawnSync('rollup', ['-c']);
spawnSync('cp', ['./src/index.html', './dist/index.html']);

console.log(`finished build at ${new Date().toLocaleTimeString()}.\n`);
