const httpProxy = require('http-proxy')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const loger = require('./loger')
const swagger = require('./swagger')
const mock = require("./mock") 
const proxy = httpProxy.createProxyServer({})

module.exports = function(req, res, state, md) {
    proxy.on('error', function(err) {
        if(state.pureProxy) {
            loger(true, 'error', '向服务器请求发生错误', err)
            return res.send(err)
        } 

        let error = req.path

        if(
            state.debugger &&
            state.debugger.method.includes(req.method.toLowerCase()) && 
            (
                state.debugger.path.length === 0 ||
                state.debugger.path.includes(req.path) 
            )
        ) {
            error = err
        }

        loger(true, 'error', '向服务器请求发生错误', error)
    })

    proxy.on('proxyReq', function (proxyReq, req) {
        proxyReq.setHeader('Cookie', req.md.headers.Cookie)
        proxyReq.setHeader('Content-Type', state.contentType)

        if (req.body) {
            let bodyData = JSON.stringify(req.body)
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
            proxyReq.write(bodyData)
        }
    })
    
    proxy.on('proxyRes', function (proxyRes, req, res) {
        console.log(proxyRes)
    })

    return function() {
        const target = typeof md.proxy === 'string' ? md.proxy : state.proxy
        return proxy.web(req, res, { target: 'http://localhost:3200' }, function(e) {
            loger(true, 'error', '代理发生错误', e)
        })
    } 
}