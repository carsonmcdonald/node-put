module.exports = Put;
function Put () {
    if (!(this instanceof Put)) return new Put;
    
    var words = [];
    var len = 0;
    
    this.put = function (buf) {
        words.push({ buffer : buf });
        len += buf.length;
        return this;
    };
    
    this.word8 = function (x) {
        words.push({ bytes : 1, value : x });
        len += 1;
        return this;
    };
    
    [16,32,64].forEach((function (bits) {
        this['word' + String(bits) + 'be'] = function (x) {
            words.push({ endian : 'big', bytes : bits / 8, value : x });
            len += bits / 8;
            return this;
        };
        this['word' + String(bits) + 'le'] = function (x) {
            words.push({ endian : 'little', bytes : bits / 8, value : x });
            len += bits / 8;
            return this;
        };
    }).bind(this));
    
    this.pad = function (bytes) {
        words.push({ endian : 'big', bytes : bytes, value : 0 });
        len += bytes;
        return this;
    };
    
    this.buffer = function () {
        var buf = new Buffer(len);
        var n = 0;
        words.forEach(function (word) {
            if (word.buffer) {
                word.buffer.copy(buf, n, 0);
                n += word.buffer.length;
            }
            else if (word.endian == 'big') {
                for (var i = (word.bytes - 1) * 8; i >= 0; i -= 8) {
                    buf[n++] = (word.value >> i) & 0xff;
                }
            }
            else {
                for (var i = 0; i < word.bytes * 8; i += 8) {
                    buf[n++] = (word.value >> i) & 0xff;
                }
            }
        });
        return buf;
    };
    
    this.send = function (obj) {
        obj.send(this.buffer());
    };
}

