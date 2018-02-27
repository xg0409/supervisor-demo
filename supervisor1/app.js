var express = require('express');
var app = express();
var config = require('./json/config');
var detect = require('detect-port-alt');
var chalk = require('chalk');
const isRoot = require('is-root');
const isInteractive = process.stdout.isTTY;
console.log(config)

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


app.get('/', function (req, res) {
  res.render('index.ejs', { name: config.name });
});

app.listen(3000, function () {
  // console.log('start 3000')
});
app.listen(3001, function () {
  // console.log('start 3001')
});


// 端口判断，若端口被暂用，则递增
choosePort('127.0.0.1', 3000).then(function(port){
  console.log('choosePort:',port);
  app.listen(port, function () {
    console.log(`listen ${port}`)
  });
});


function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          resolve(port);
        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
      }),
    err => {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`) +
        '\n' +
        ('Network error message: ' + err.message || err) +
        '\n'
      );
    }
  );
}