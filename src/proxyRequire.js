const axios = require("axios")
const qs = require('qs')

module.exports = async function proxyRequire(md = {} , state, req, res) {
    const getMethod = ['get', 'delete', 'head']
    let proxy = typeof md.proxy === 'string' ? md.proxy : state.proxy
    let url = `${proxy}${req.path}`
    let method = (md.method || req.method).toLowerCase()
    let params = state.params
    let ContentType = req.headers['content-type'] || req.headers['Content-Type']
    let headers = Object.assign(
        {
            'Content-Type':  ContentType || 'application/json; charset=utf-8'
        },
        {
            Cookie: state.Cookie
        }, 
        state.headers, 
        md.headers,
    )
    let requestParam = [url, {...params}, {headers}]
    let response = {
        data: {
            status: -1,
            msg: '发生未知错误'
        }
    }
    
    try {
        if(getMethod.includes(method)) {
            response = await axios[method](url, { params, headers })
        } else {
            response = await axios[method](url, params, { headers })
        }
    } catch(err) {}
   
    res.json(response.data)
    
}