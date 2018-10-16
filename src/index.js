const Mock = require("./mock") 
const http = require("http")
const https = require('https')
const querystring = require("querystring")
const protocol = {
    http,
    https
}
module.exports = function({ mockData, state }) {
    return async function (req, res, next) {
        const params = req.query || req.body
        let error = '没有配置该路由'
        let data = null

        if(!Array.isArray(mockData)) {
            mockData = [].push(mockData)
        }

        const md = mockData.find((val) => {
            if(!val.proxy && val.url === req.path && val.method) {
                error = 'method 错误'
                return  val.method.toUpperCase() === req.method.toUpperCase()
            }
            return val.url === req.path
        })
        if(!md) {
            res.json && res.json({error}) || (res.body = {error})
            return 
        }

        const mock = new Mock(req, state)

        for(let key in md) {
            if(key.indexOf('data|') >= 0) {
                let keys = key.split('|')
                let l = keys[1]
                if(typeof md[key] === 'function') {
                    data = md[key](req, state)
                }
                data = mock.array(md[key], l)
            } else if(key === 'data') {
                if(typeof md.data === 'function') {
                    data = md.data(req, state)
                }
                data = mock.object(md.data)
            }
        }
        
        if(md.proxy) {
            let postdata = querystring.stringify(params)
            let protocolName = md.proxy.indexOf('https') >= 0 ? 'https' : 'http'
            let options = {
                hostname: md.proxy.replace(`${protocolName}://`,''),
                port: md.port || (protocolName === 'http' ? 80 : 443),
                path: req.path,
                method: md.method || req.method,
                headers: Object.assign(
                    {
                        Cookie: state.Cookie
                    },
                    md.headers,
                    {
                        'Content-Length': postdata.length,
                    },
                )
            }
            data = ''
            let request = protocol[protocolName].request(options, function(response){
                response.setEncoding('utf8')
                response.on('data', function(chunk) {
                    data = data + chunk
                })
                response.on('end', function() {
                    try {
                        data = JSON.parse(data)
                    } catch(err) {
                        console.log(err)
                    }
                    res.json && res.json(data) || (res.body = data)
                })
            })

            request.on('error', function(e) {
                console.log('Error', e)
            })
            request.write(postdata)
            request.end()
            return 
        }

        if(md && md.plot) {
            data = md.plot({data, params, state}) || data
        }

        req.mockData = data
        req.state = state 

        res.json && res.json(req.mockData) || (res.body = req.mockData)

    }
}