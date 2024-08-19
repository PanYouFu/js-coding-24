const { execSync, spawn } = require('child_process');
const readline = require('readline');
const path = require('path');

function chooseFile() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the path of the TypeScript file to debug: ', (filePath) => {
      rl.close();
      resolve(filePath);
    });
  });
}

async function main() {
  try {
    // Step 1: Select the file
    const filePath = await chooseFile();
    const absoluteFilePath = path.resolve(filePath);

    // Step 2: Compile the TypeScript file
    console.log('Compiling TypeScript file...');
    execSync(`npx tsc ${absoluteFilePath}`, { stdio: 'inherit' });

    // Step 3: Start the Node.js debugger
    console.log('Starting Node.js debugger...');
    const jsFilePath = absoluteFilePath.replace(/\.ts$/, '.js');
    const nodeProcess = spawn('node', ['--inspect-brk', jsFilePath], {
      stdio: 'inherit'
    });

    nodeProcess.on('exit', (code) => {
      console.log(`Node.js process exited with code ${code}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
