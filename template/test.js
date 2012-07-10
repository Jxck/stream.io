log = console.log.bind(console);
var ws = require('./writableStream')
  , util = require('util')
  , events = require('events').EventEmitter;
  ;

// var ev = new events();
// ev.on('hoge', function(){ log('hoge')});
// ev.on('fuga', function(){ log('fuga')});
// ev.on('piyo', function(){ log('piyo')});
// log(ev.listeners('hoge').toString());


function Hoge() {
  events.call(this);
  ['hoge', 'fuga', 'piyo'].forEach(function(ev) {
    this.on(ev, function() { log(ev) });
  }.bind(this));
  this.ten = 10;
}

util.inherits(Hoge, events);

Hoge.prototype.meth = function(msg) {
  log(msg);
}

var hoge = new Hoge();
// hoge.emit('hoge');
// hoge.emit('fuga');
// hoge.emit('piyo');

///////////////////////////

function Fuga() {
  Hoge.call(this);
  this.five = 5;
}
util.inherits(Fuga, Hoge);

Fuga.prototype.ffff = function() {
  log('ffff');
}

var fuga = new Fuga();

log(fuga.five);
log(fuga.ffff());
fuga.emit('hoge');
