const fs = require('fs')
const util = require('util')
const formidable = require("formidable")

var BOUNDARYPREFIX = 'nbglme'

function mkfield(field, value) {
    return util.format('Content-Disposition: form-data; name="%s"\r\n\r\n%s', field, value)
}

exports.post = function (param) {
    const max = 9007199254740992
    const dec = Math.random() * max
    const hex = dec.toString(36)
    const boundary = BOUNDARYPREFIX + hex
    const data = []
    for (var i in param) {
        if(param[i] && param[i].path) {
            const file = fs.readFileSync(param[i].path)
            let content = ""
            content = `Content-Disposition: form-data; name=\"${i}\"; filename=\"${param[i].name}\"\r\n`
            content += `Content-Type: ${param[i].type}\r\n`
            content += `Content-Transfer-Encoding: binary\r\n`
            content += file
            data.push(content)
        } else {
            data.push(mkfield(i, param[i]))
        }
    }

    var body = util.format('Content-Type: multipart/form-data; boundary=%s\r\n\r\n', boundary)
    + util.format('--%s\r\n', boundary)
    + data.join(util.format('\r\n--%s\r\n', boundary))
    + util.format('\r\n--%s', boundary)

    return {
        body,
        boundary
    }
}

exports.acceptData = function(req, cb) {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions= true
    form.parse(req, function(err, fields, files) {
        if(!err) {
            cb(fields, files)
        }
    })
}