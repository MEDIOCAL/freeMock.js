const http = require("http")
const https = require('https')
const zlib = require("zlib")
const querystring = require("querystring")

const protocol = {
    http,
    https
}
module.exports = function(md = {}, state = {},  req, res) {
    let proxy = typeof md.proxy === 'string' ? md.proxy : state.proxy
    let port = md.port || state.port
    let protocolName = proxy.indexOf('https') >= 0 ? 'https' : 'http'
    let headers = Object.assign({}, state.headers, md.headers)
    let postdata = querystring.stringify(state.params)
    let options = {
        hostname: proxy.replace(`${protocolName}://`,''),
        port: port || (protocolName === 'http' ? 80 : 443),
        path: req.path,
        method: md.method || req.method,
        headers: Object.assign(
            {
                'content-type': req.headers['content-type'] || 'application/json; charset=utf-8'
            },
            {
                Cookie: state.Cookie,
                encoding : null 
            },
            headers,
            {
                'Content-Length': postdata.length,
            }
        )
    }
    let data = ''
    let request = protocol[protocolName].request(options, function(response) {
        let output = response
        if(response.headers['content-encoding']=='gzip'){
            var gzip = zlib.createGunzip()
            response.pipe(gzip);
            output = gzip
        } 
        
        output.on('data', function(chunk) {
            chunk = chunk.toString('utf-8')
            data = data + chunk
        })
        output.on('error', function(err) {
            console.log(err)
        })
        output.on('end', function() {
            try {
                data = JSON.parse(data)
            } catch(err) {
                data = {
                    msg: "数据格式有误，请检查接口正确"
                }
            }
            return res.json && res.json(data) || (res.body = data)
        })
    })
    request.on('error', function(e) {
        console.log('Error', e)
    })
    request.write(postdata)
    request.end()
}