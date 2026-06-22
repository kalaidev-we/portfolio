const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const action = process.argv[2]; // 'dev', 'build', 'start', 'lint'

// Check if running on Vercel or in any non-Windows/CI environment
const isVercelOrNonWindows = process.env.VERCEL || process.env.CI || process.platform !== 'win32';

if (isVercelOrNonWindows) {
  // Production / Vercel / Linux Environment: run standard Next.js commands in current folder
  let cmd = '';
  if (action === 'dev') {
    cmd = 'next dev';
  } else if (action === 'build') {
    cmd = 'next build';
  } else if (action === 'start') {
    cmd = 'next start';
  } else {
    cmd = 'next lint';
  }
  console.log(`[DEPLOYMENT ENV] Running command: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Command failed: ${cmd}`, error);
    process.exit(1);
  }
} else {
  // Local Windows Machine: sync files physically and delegate script execution to the C: drive
  const cDrivePath = 'C:\\Users\\USER\\.gemini\\antigravity\\portfolio_project';
  const srcDirD = path.resolve(__dirname, '../src');
  const publicDirD = path.resolve(__dirname, '../public');
  const srcDirC = path.join(cDrivePath, 'src');
  const publicDirC = path.join(cDrivePath, 'public');

  // Helper to remove directory or junction safely
  function removeDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
      try {
        const stat = fs.lstatSync(dirPath);
        if (stat.isSymbolicLink() || stat.isDirectory()) {
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      } catch (e) {
        // Fallback to command-line rmdir if locked
        try {
          execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'ignore' });
        } catch (_) {}
      }
    }
  }

  // 1. Sync files physically to bypass Next.js file-watcher (chokidar) symlink limitations
  console.log('[LOCAL SYNC] Synchronizing src and public folders to C: drive...');
  removeDirectory(srcDirC);
  removeDirectory(publicDirC);

  fs.mkdirSync(srcDirC, { recursive: true });
  fs.mkdirSync(publicDirC, { recursive: true });

  if (fs.existsSync(srcDirD)) {
    fs.cpSync(srcDirD, srcDirC, { recursive: true, force: true });
  }
  if (fs.existsSync(publicDirD)) {
    fs.cpSync(publicDirD, publicDirC, { recursive: true, force: true });
  }
  console.log('[LOCAL SYNC] Initial sync complete.');

  // 2. Start watcher for 'dev' action to support hot module reloading (HMR)
  if (action === 'dev') {
    console.log('[LOCAL SYNC] Starting file sync watcher for hot reloading...');
    
    const watchCallback = (baseDirD, baseDirC) => (eventType, filename) => {
      if (!filename) return;
      const sourceFile = path.join(baseDirD, filename);
      const targetFile = path.join(baseDirC, filename);
      try {
        if (fs.existsSync(sourceFile)) {
          const stats = fs.statSync(sourceFile);
          if (stats.isFile()) {
            fs.mkdirSync(path.dirname(targetFile), { recursive: true });
            fs.copyFileSync(sourceFile, targetFile);
            console.log(`[SYNC] Copied change: ${filename}`);
          }
        } else {
          if (fs.existsSync(targetFile)) {
            fs.rmSync(targetFile, { force: true });
            console.log(`[SYNC] Removed file: ${filename}`);
          }
        }
      } catch (err) {
        // Ignore lock conflicts during simultaneous saves
      }
    };

    fs.watch(srcDirD, { recursive: true }, watchCallback(srcDirD, srcDirC));
    fs.watch(publicDirD, { recursive: true }, watchCallback(publicDirD, publicDirC));
  }

  // 3. Delegate command execution to C: drive
  console.log(`[LOCAL DEV ENVIRONMENT] Delegating command to C: drive...`);
  const cmd = `npm.cmd run ${action}`;
  console.log(`Running: ${cmd} inside ${cDrivePath}`);
  
  const child = spawn('npm.cmd', ['run', action], {
    cwd: cDrivePath,
    stdio: 'inherit',
    shell: true
  });

  child.on('close', (code) => {
    process.exit(code || 0);
  });
}
