const proxy = require('http-proxy-middleware')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const loger = require('./loger')
const swagger = require('./swagger')
const mock = require("./mock") 

module.exports = function(req, res, state, md) {
    const target = typeof md.proxy === 'string' ? md.proxy : state.proxy
    const contentType = state.contentType
    return proxy({ 
        target , 
        changeOrigin: true, 
        onProxyReq(proxyReq, req, socket, options, head) {
            proxyReq.setHeader('Cookie', md.headers.Cookie)
            proxyReq.setHeader('Content-Type', contentType)
            console.log(req.body)
            console.log(md.headers.Cookie)
            console.log('content-type', contentType)
            if(req.body) {
                let bodyData = JSON.stringify(req.body)
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
                proxyReq.write(bodyData)
            }
        }
    })
}