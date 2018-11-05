const Mock = require("./mock") 
const querystring = require("querystring")
const proxyRequire = require("./proxyRequire")

module.exports = function({ mockData = [], state = {} }) {
    return async function (req, res, next) {
        const params = req.query || req.body
        let isInterceptors = false
        let error = '没有配置该路由'
        let data = null

        state.params = params
        
        if(!Array.isArray(mockData)) {
            mockData = [].push(mockData)
        }

        const md = mockData.find((val) => {
            if(
                !val.proxy && 
                ( 
                    val.url === req.path ||
                    val.url.indexOf("/*") >= 0 &&
                    req.path.indexOf(val.url.replace("/*","")) == 0
                ) && 
                val.method
            ) {
                error = 'method 错误'
                return  val.method.toUpperCase() === req.method.toUpperCase()
            } else if(val.url.indexOf("/*") >= 0) {
                return req.path.indexOf(val.url.replace("/*","")) == 0
            }
            return val.url === req.path
        })

        if(!md) {
            return next()
        }
        
        if(
            md.interceptors &&
            typeof md.interceptors === 'function' ||
            state.interceptors && 
            typeof state.interceptors === 'function'
        ) {
            const interceptors = md.interceptors || state.interceptors
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

            return proxyRequire(md, state, req, res)
        }

        if(md && md.plot) {
            data = md.plot({data, params, state}) || data
        }

        req.mockData = data
        req.state = state 

        res.json && res.json(req.mockData) || (res.body = req.mockData)

    }
}