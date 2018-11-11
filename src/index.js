const Mock = require("./mock") 
const proxyHttp = require("./proxyHttp")
const proxyRequire = require("./proxyRequire")
const proxyRequest = require("./proxyRequest")

const proxyMethods = [
    proxyHttp,
    proxyRequire,
    proxyRequest
]

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

        if(md.proxy) {
            const method = req.method.toUpperCase()
            const params = method === 'GET' ? req.query :  req.body
            const contentType = req.headers['content-type'] || req.headers['Content-Type']
            const proxymethod = state.proxymethod || 0

            state.params = params
            state.contentType = contentType

            const rq = proxyMethods[proxymethod](md, state, req, res)

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
        
        if(md && md.plot) {
            data = md.plot({data, params, state}) || data
        }

        req.mockData = data
        req.state = state 

        res.json && res.json(req.mockData) || (res.body = req.mockData)
        return 
    }
}