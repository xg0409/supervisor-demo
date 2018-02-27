const { spawn } = require('cross-spawn');
const chalk = require('chalk');

function executeNodeScript(command, scriptPath, ...args) {
  const child = spawn(command, [scriptPath, ...args], {
    stdio: 'inherit',
  });

  child.on('close', code => {
    if (code !== 0) {
      console.log();
      console.log(chalk.cyan(scriptPath) + ' exited with code ' + code + '.');
      console.log();
      return;
    }
  })
  child.on('error', err => {
    console.log(err);
  });

  return child;
}

executeNodeScript(
  'supervisor',
  `--watch`,'json,app.js',
  '--',
  'app.js'
);

// node index.js
// http://localhost:3000
// 修改json/config.js文件，无需手动重启node服务，刷新页面