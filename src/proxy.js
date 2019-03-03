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
        target, 
        changeOrigin: true, 
        onProxyReq(proxyReq, req, socket, options, head) {
            proxyReq.setHeader('Cookie', md.headers.Cookie)
            proxyReq.setHeader('content-type', contentType)
            if(req.body) {
                if(contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
                    const body = Object.keys(req.body)
                    .map(function(key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key])
                    })
                    .join('&')
                    proxyReq.setHeader('Content-Length', body.length)
                    proxyReq.write(body)
                } else {
                    const body = JSON.stringify(req.body)
                    proxyReq.setHeader('Content-Length', body.length)
                    proxyReq.write(body)
                }
            }
            proxyReq.end()
        },
        onProxyRes(proxyRes, req, res) {
            console.log(proxyRes)
            console.log(req)
        },
        onError(err, req, res) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end(
                'Something went wrong. And we are reporting a custom error message.'
            )
        }
    })
}