const formidable = require("formidable")

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