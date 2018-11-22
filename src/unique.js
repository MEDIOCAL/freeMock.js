function compared(a, b) {
    if(Array.isArray(a) && Array.isArray(b)) {
        if(b.length != a.length) {
            return false
        }
        for(var index = 0, l = a.length; index < l; index++) {
            var val = a[index]
            if(typeof val === 'object' || typeof b[index] === 'object') {
                if(compared(val, b[index])) {
                    continue
                } else {
                    return false
                }
            } else if(val === b[index]) {
                continue
            } else {
                return false
            }
        }
    } else if (typeof a === 'object' && typeof b === 'object') {
        var lisa = Object.keys(a).length
        var lisb = Object.keys(b).length
        var long = a
        var sh = b
        if(lisa < lisb) {
            long = b
            sh = a
        }
        for(let key in long) {
            if(sh[key] && (typeof sh[key] === 'object' || typeof long[key] === 'object')) {
                if(compared(sh[key], long[key])) {
                    continue
                } else {
                    return false
                }
            } else if(sh[key] && sh[key] === long[key]) {
                continue
            } else {
                return false
            }
        }
    } else {
        return false
    }
    return true
}

module.exports = function unique(array) {
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if(typeof array[i] === 'object' || typeof res[j] === 'object') {
                if(compared(array[i], res[j])) {
                    break
                }
            } else {
                if (array[i] === res[j]) {
                    break
                }
            }
        }
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}