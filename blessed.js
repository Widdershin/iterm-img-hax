var blessed = require('blessed');
var fs = require('fs');
var process = require('process');
var imgcat = require('term-img2');

// Create a screen object.
var Nightmare = require('nightmare');
var nightmare = Nightmare({width: 1280, height: 800});

var selector = '#lst-ib';

var screen = blessed.screen({
  ignoreLocked: ['escape', 'q', 'C-c']
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var box = blessed.terminal({
  parent: screen,
  left: 0,
  top: 0,
  height: '100%',
  width: '70%',
  handler: function() {}
});

nightmare
  .goto('http://google.com')
  .wait(selector)
  .screenshot()
  .end()
  .then(function (screenshotBuffer) {
    var newImg = imgcat(screenshotBuffer, {
      log: false,
      height: box.height,
      width: box.width
    });

    newImg = newImg.replace('\n', '');
    newImg = newImg.replace('\033', '\033Ptmux;\033\033') + '\033\\';
    screen.realloc();
    box.term.reset();
    box.term.write(newImg);
    box.term.cursorHidden = true;
    screen.render();
  })


