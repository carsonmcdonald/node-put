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
        .word16be(24930)
        .word32le(1717920867)
        .word8(103)
        .write(stream)
    ;
    
    assert.equal(written, 1);
};
