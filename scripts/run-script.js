const { execSync } = require('child_process');
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
  // Local Windows Machine: delegate script execution to the C: drive execution folder
  const cDrivePath = 'C:\\Users\\USER\\.gemini\\antigravity\\portfolio_project';
  const cmd = `cmd.exe /c "cd /d ${cDrivePath} && npm run ${action}"`;
  console.log(`[LOCAL DEV ENVIRONMENT] Delegating to C: drive...`);
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Delegated command failed: ${cmd}`, error);
    process.exit(1);
  }
}
