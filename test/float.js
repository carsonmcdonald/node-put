var Put = require('put');
var assert = require('assert');

exports.buf = function () {
    var ibuf = Put().word32le(1096149893).buffer();
    var fbuf = Put().floatle(13.37).buffer();
    
    assert.eql(ibuf, fbuf);
};
