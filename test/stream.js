var assert = require('assert');
var Put = require('put');

exports.stream = function () {
    var written = 0;
    var stream = {
        write : function (buf) {
            assert.equal(buf.toString(), 'abcdefg');
            written ++;
        }
    };
    
    Put()
        .word16be(
            'a'.charCodeAt(0)
            + 256 * 'b'.charCodeAt(0)
        )
        .word32le(
            Math.pow(256, 3) * 'c'.charCodeAt(0)
            + Math.pow(256, 2) * 'd'.charCodeAt(0)
            + Math.pow(256, 1) * 'e'.charCodeAt(0)
            + 'f'.charCodeAt(0)
        )
        .word8('g'.charCodeAt(0))
        .write(stream)
    ;
    assert.equal(written, 1);
};
