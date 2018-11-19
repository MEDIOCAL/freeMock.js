const Mock = require("./mock") 
const proxyRequest = require("./proxyRequest")

module.exports = function({ mockData = [], state = {} }) {
    return async function (req, res, next) {
        if(mockData.length === 0 && state === {}) {
            return next() 
        }

        let isInterceptors = false
        let data = null

        if(!Array.isArray(mockData)) {
            mockData = [].push(mockData)
        }

        const md = mockData.find((val) => {
            if(val.url.indexOf("/*") >= 0) {
                let newUrl = val.url.replace("/*", "")
                return req.path.indexOf(newUrl) === 0 && req.path != newUrl
            }
            return val.url === req.path
        })

        if(!md) {
            return next()
        }
        
        const interceptors = md.interceptors || state.interceptors
        if(interceptors && typeof interceptors === 'function') {
            isInterceptors = interceptors(state, req)
        }

        if(isInterceptors) {
            let data = typeof isInterceptors === "object" ? 
                        isInterceptors : 
                        { status: '400', msg:'is Interrupted'}

            res.json && res.json(data) || (res.body = data)
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
                data = mock.array(data, l)
            } else if(key === 'data') {
                if(typeof md.data === 'function') {
                    data = md.data(req, state)
                }
                data = mock.object(data)
            }
        }
        
        if(md && md.plot) {
            data = md.plot({data, params, state}) || data
        }

        req.mockData = data
        req.state = state 

        if(md.proxy) {
            const method = req.method.toUpperCase()
            const params = method === 'GET' ? req.query :  req.body
            const contentType = req.headers['content-type'] || req.headers['Content-Type']
            const proxymethod = state.proxymethod || 0

            state.params = params
            state.contentType = contentType

            const request = proxyRequest(md, state, req, res)

            if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
                const boundaryKey = Math.random().toString(16)
                request.setHeader('Content-Type', 'multipart/form-data; boundary='+boundaryKey+'')
                request.write( 
                    '--' + boundaryKey + '\r\n'
                    + 'Content-Disposition: form-data; name="name"\r\n'
                    + 'logo.png \r\n'
                    +'--' + boundaryKey + '\r\n'
                    + 'Content-Disposition: form-data; name="file"; filename="logo.png"\r\n'
                    + 'Content-Transfer-Encoding: binary\r\n\r\n'
                )
                fs.createReadStream('/Users/chenxuehui/cxh/crm_mc_admin/src/assets/logo.png', { bufferSize: 4 * 1024 })
                .on('end', function() {
                    request.end('\r\n--' + boundaryKey + '--')
                })
                .pipe(request, { end: false })
                
                const form = new formidable.IncomingForm()
                form.parse(req, function(err, fields, files) { 
                    var forms = new FormStream()
                    forms.field('name', 'logo.png')
                    forms.stream('file', fs.createReadStream(__dirname + '../../../src/assets/logo.png'))
                    forms.pipe(rq)
                })
            }
            
            return 
        }

        res.json && res.json(req.mockData) || (res.body = req.mockData)

        return 
    }
}