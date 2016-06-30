var Nightmare = require('nightmare');
var nightmare = Nightmare({width: 1280, height: 800});

var selector = '.app-layout';

nightmare
  .goto('http://localhost:9966/')
  .screenshot(__dirname + '/img.png')
  .end()
  .then(function () {})
