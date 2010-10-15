var Put = require('put');

exports.buf = function (assert) {
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
