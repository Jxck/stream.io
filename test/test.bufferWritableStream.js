var Buff = require('../lib/bufferWritableStream')
  , assert = require('assert')
  ;

(function() {
  var buff = new Buff();

  // test inherits stream
  assert(buff.pipe);

})();

(function() {
  var buff = new Buff();

  var fixture = [
    'aaa',
    'bbb',
    'ccc'
  ];

  fixture.forEach(function(e) {
    buff.write(e);
  });

  var result = buff.end();
  assert.deepEqual(result, fixture);
})();

(function() {
  var buff = new Buff();

  var fs = require('fs')
    , file = __dirname + '/fixture'
    , actual = fs.readFileSync(file, 'utf-8')
    ;

  buff.on('end', function(data) {
    assert.equal(data.toString(), actual);
  });
  fs.createReadStream(file).pipe(buff);
})();
