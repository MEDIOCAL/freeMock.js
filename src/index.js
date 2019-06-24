const fs = require('fs')
const mock = require("./mock") 
const proxyRequest = require("./proxyRequest")
const loger = require('./loger')
const swagger = require('./swagger')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const resetConfig = require("./resetConfig")
const mockjs = require('mockjs')

module.exports = function(rest) {
    return async function (req, res, next) {   
        let mockData = []
        let state = {}
        let impdata = rest
        if(typeof rest === 'string') {
            try {
                if(rest.indexOf('.json') > 0) {
                    impdata = JSON.parse(fs.readFileSync(rest, 'utf-8'))
                } else {
                    // impdata = eval(fs.readFileSync(rest, 'utf-8'))
                    if(Object.keys(require.cache).includes(rest)) {
                        delete require.cache[rest]
                    }
                    impdata = require(rest)
                }
            } catch(err) {
                loger.error(err, 'Mock')
            }
        }
        

        if(typeof impdata === 'object') {
            impdata = resetConfig(impdata, req, res)
            mockData = impdata && impdata.mockData || []
            state = Object.assign({}, state, impdata.state)
        }

        if(mockData.length === 0) {
            loger.error('配置文件发生错误', 'Mock')
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
                state.configUrl = newUrl
                return req.path.indexOf(newUrl) === 0 && req.path != newUrl
            }
            state.configUrl = val.url
            return val.url === req.path
        })
        
        if(!md) {
            return next()
        } else {
            state.md = md
            state.getMockData = md.getMockData
            if(state.readFile === undefined) {
                state.readFile = true
            }
        }
        
        const interceptors = md.interceptors || state.interceptors
        if(interceptors && typeof interceptors === 'function') {
            isInterceptors = interceptors(state, req)
        }

        if(isInterceptors) {
            let data = typeof isInterceptors === "object" ? 
                        isInterceptors : 
                        { status: '400', msg:'is Interrupted'}

            res.json && res.json(data)
            return 
        } 

        let mockjsData = {}

        for(let key in md) {
            if(key.indexOf('data') >= 0) {
                mockjsData = md[key]
                if(typeof mockjsData === 'function') {
                    state.mock = mockjs.mock
                    mockjsData = mockjsData(req, state, res)
                    if(typeof mockjsData === 'object') {
                        data = mock(req, state)(mockjsData)
                    } else {
                        return 
                    }
                } else {
                    data = mock(req, state)(mockjsData)
                }
                // loger.info(req.path + ': 已根据 data 属性，生成数据', 'Mock')
            }
        }

        req.mockData = data
        req.state = state 

        if(!state.md.validateWriteFile || typeof state.md.validateWriteFile != 'function') {
            state.md.validateWriteFile = () => true
        }

        if(state.debugger === true) {
            state.debugger = {
                method: ['get', 'post'],
                path: []
            }
        } else if(typeof state.debugger === 'object') {
            state.debugger.method =  state.debugger.method || ['get', 'post']
            state.debugger.path =  state.debugger.path || []
        }

        if((state.mkfile === undefined || state.mkfile) && (state.dirpath || md.dirpath)) {
            writeFile(req, state, `{\n\t"status": 0,\n\t"msg": "success",\n\t"result": {}\n}`, function(name, data) {
                if(!fs.existsSync(name) || !fs.readFileSync(name, 'utf8')) {
                    fs.writeFileSync(name, data, 'utf8')
                }
            })
        }

        if(md.proxy) {
            // loger.info(req.path + ': 进入代理模式\n开始请求 ' + (typeof md.proxy === 'string' ? md.proxy : state.proxy) + req.path, 'Mock')
            const query = req.query 
            const params = req.body
            const contentType = req.headers['content-type'] || req.headers['Content-Type']
            
            state.params = params
            state.query = query
            state.contentType = contentType

            proxyRequest(md, state, req, res)
            
            return 
        }
        
        if(state.swagger || md.swagger) {
            const swaggerData = await swagger(req, state, md)
            if(swaggerData && !req.mockData) {
                req.mockData = mock(req, state)(swaggerData)
            }
        } else if(state.readFile && !req.mockData) {
            const fileData = requestDirFile(req, state)
            if(fileData) {
                const data = mock(req, state)(fileData)
                data && (req.mockData = data)
            }
        } 

        res.json(req.mockData)

        return 
    }
}