const fs = require('fs')
const Mock = require("./mock") 
const proxyRequest = require("./proxyRequest")
const proxyRequire = require("./proxyRequire")
const proxyMethods = [proxyRequest, proxyRequire]

module.exports = function(rest) {
    return async function (req, res, next) {   
        let mockData = []
        let state = {}

        if(typeof rest === 'string') {
            let data = {}
            if(rest.indexOf('.json') > 0) {
                data = JSON.parse(fs.readFileSync(rest, 'utf-8'))
            } else {
                data = eval(fs.readFileSync(rest, 'utf-8'))
            }
            mockData = data && data.mockData || []
            state = data && data.state || {}
        } else if(typeof rest === 'object') {
            mockData = rest.mockData
            state = rest.state
        }

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
        } else {
            state.md = md
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
            let res = md[key]
            if(key.indexOf('data|') >= 0) {
                let keys = key.split('|')
                let l = keys[1]
                if(typeof md[key] === 'function') {
                    res = md[key](req, state)
                }
                data = mock.array(res, l)
            } else if(key === 'data') {
                if(typeof md.data === 'function') {
                    res = md.data(req, state)
                }
                data = mock.object(res)
            }
        }
        
        req.mockData = data
        req.state = state 

        if(state.debugger === true) {
            state.debugger = {
                method: ['get', 'post'],
                path: []
            }
        } else if(typeof state.debugger === 'object') {
            state.debugger.method =  state.debugger.method || ['get', 'post']
            state.debugger.path =  state.debugger.path || []
        }

        if(md.proxy) {
            const query = req.query 
            const params = req.body
            const contentType = req.headers['content-type'] || req.headers['Content-Type']
            const methodIndex = state.proxymethod || 0
            
            state.params = params
            state.query = query
            state.contentType = contentType

            proxyMethods[methodIndex](md, state, req, res)
            
            return 
        }

        res.json && res.json(req.mockData) || (res.body = req.mockData)

        return 
    }
}