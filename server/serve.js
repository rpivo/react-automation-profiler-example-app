import { spawn } from 'child_process';

let isServerRunning = false;

const watch = spawn('npx', [
  'nodemon',
  '--delay', '1000ms',
  '--ext', 'js,ts,jsx,tsx',
  '--quiet',
  '--watch', './src',
  './server/build.js'
],  { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], });

watch.on('message', event => {
  if (event.type === 'exit' && !isServerRunning) {
    spawn('npx', [
      'express-compression-server',
      '--build=dist',
      '--port=1000',
    ]);
    isServerRunning = true;
  }
});
