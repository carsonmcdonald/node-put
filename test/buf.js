var Put = require('put');
var Binary = require('binary');

exports.chain = function (assert) {
    var buf = Put()
        .word16be(1337)
        .word8(1)
        .pad(5)
        .put(new Buffer('pow', 'ascii'))
        .word32le(9000)
        .word64le(3)
        .word64be(4)
        .buffer()
    ;
    assert.equal(buf.length, 2 + 1 + 5 + 3 + 4 + 8 + 8);
    assert.deepEqual(
        [].slice.call(buf),
        [
            0x05, 0x39, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x70, 0x6f, 0x77,
            0x28, 0x23, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
            0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        ]
    );
};

exports.parity = function (assert) {
    [ 'le', 'be' ].forEach(function (end) {
        [ 8, 16, 32 ].forEach(function (n) {
            var max = Math.pow(2,n);
            var step = Math.max(1, Math.floor(max / 1000));
            
            for (var i = 0; i < max; i += step) {
                var buf = Put()[ 'word' + n + end ](i).buffer();
                var j = Binary.parse(buf)[ 'word' + n + end ]('j').vars.j;
                assert.eql(i, j);
            }
        });
    });
};
