var Put = require('put');
var Binary = require('binary');

exports.chain = function (assert) {
    var buf = Put()
        .word16be(1337)
        .word8(1)
        .pad(5)
        .put(new Buffer('pow', 'ascii'))
        .word32le(9000)
        .buffer()
    ;
    assert.equal(buf.length, 2 + 1 + 5 + 3 + 4);
    assert.deepEqual(
        [].slice.call(buf),
        [
            0x05, 0x39, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x70, 0x6f, 0x77,
            0x28, 0x23, 0x00, 0x00
        ]
    );
};

exports.parity = function (assert) {
    [ 8, 16, 32 ].forEach(function (n) {
        var max = Math.pow(2,n);
        var step = Math.max(1, Math.floor(max / 1000));
        
        for (var i = -1 - n; i < max; i += step) {
            var buf = Put()['word' + n + 'le'](i).buffer();
            var j = Binary.parse(buf)['word' + n + 'le']('j').vars.j;
            assert.eql(i,j);
        }
    });
};
