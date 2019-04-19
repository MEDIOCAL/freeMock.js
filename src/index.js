const fs = require('fs')
const mock = require("./mock") 
const proxyRequest = require("./proxyRequest")
const loger = require('./loger')
const swagger = require('./swagger')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")

module.exports = function(rest) {
    return async function (req, res, next) {   
        let mockData = []
        let state = {}

        if(typeof rest === 'string') {
            let data = {}
            try {
                if(rest.indexOf('.json') > 0) {
                    data = JSON.parse(fs.readFileSync(rest, 'utf-8'))
                } else {
                    data = eval(fs.readFileSync(rest, 'utf-8'))
                }
            } catch(err) {
                loger(true, 'error', '请求配置文件失败')
            }
            mockData = data && data.mockData || []
            state = Object.assign({}, state, data.state)
        } else if(typeof rest === 'object') {
            mockData = rest.mockData
            state = Object.assign({}, state, rest.state)
            
        }

        if(mockData.length === 0) {
            loger(true, 'warn', '配置文件发生错误')
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
        
        loger(true, 'help', '\n\n\n' + req.path + ':')

        if(!md) {
            loger(true, 'warn', '未匹配到连接', req.path)
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

        const mockjsData = {}

        for(let key in md) {
            if(key.indexOf('data') >= 0) {
                mockjsData[key] = md[key]
                data = mock(req, state)(mockjsData)
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

        if(state.mkfile) {
            writeFile(req, state, `{\n\t"status": 0,\n\t"msg": "success",\n\t"result": {}\n}`, function(name, data) {
                if(!fs.existsSync(name) || !fs.readFileSync(name, 'utf8')) {
                    fs.writeFile(name, data, 'utf8', function(err) {
                        if(err) {
                            loger(true, 'error', '写文件时出错')
                        } else {
                            loger(true, 'info', '已创建：'+ name)
                        }
                    })
                }
            })
        }

        if(md.proxy) {
            loger(true, 'info', '进入代理模式', '-->' + (typeof md.proxy === 'string' ? md.proxy : state.proxy))
            const query = req.query 
            const params = req.body
            const contentType = req.headers['content-type'] || req.headers['Content-Type']
            
            state.params = params
            state.query = query
            state.contentType = contentType

            proxyRequest(md, state, req, res)
            
            return 
        }
        
        if(state.swagger) {
            const swaggerData = await swagger(req, state, md)
            if(swaggerData && !req.mockData) {
                req.mockData = swaggerData
            }
        } else if(state.readFile) {
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