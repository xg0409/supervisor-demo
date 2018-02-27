var express = require('express');
var app = express();
var config = require('./json/config');
console.log(config)

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


app.get('/', function (req, res) {
  res.render('index.ejs', { name: config.name });
});

app.listen(3000, function () {
  console.log('start 3000')
});