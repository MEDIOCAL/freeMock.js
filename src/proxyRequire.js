const axios = require("axios")
const qs = require("qs")
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const formData = require("./formData")

module.exports = async function proxyRequire(md = {} , state, req, res) {
    const contentType = state.contentType
    const postdata = state.params
    const query = state.query
    const method = req.method.toLowerCase()
    const headers = Object.assign(
        {
            'Content-Type':  contentType || 'application/json; charset=utf-8'
        },
        {
            Cookie: md.headers && md.headers.Cookie || state.Cookie 
        }, 
        state.headers,
    )

    let proxy = '' 
   
    if(typeof md.proxy === 'string') {
        proxy = md.proxy
    } else {
        proxy = state.proxy
    }

    let url = proxy + req.path

    if(query) {
        for(let key in query) {
            let value = query[key]
            if(Array.isArray(value) && value.length > 1) {
                const lis = unique(value)
                if(lis.length === 1) {
                    query[key] = lis[0]
                }
            }   
        }
        const params = qs.stringify(query)
        url = url + '?' + params
    }
    
    if(state.debugger) {
        console.log('当前api信息:', {
            method,
            url,
            contentType,
            headers
        })
        console.log('当前api 传递的参数:', postdata)
    }

    let response = {
        data: {
            status: -1,
            msg: '请求方法有问题。或者写文件错误'
        }
    }

    try {
        if(method === 'get') {
            response = await axios[method](url, { headers })
        } else if(method === 'post') {
            if (contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
                response = await axios[method](url, qs.stringify(postdata), { headers })
            } else if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
                return 
            } else {
                response = await axios[method](url, postdata, { headers })
            } 
        }
        if(state.writeFile) {
            writeFile(req, state, response.data)
        }
    } catch(err) {
        console.log('向后台请求接口的时候，或者写文件的时候出错：', err)
        response.data = requestDirFile(req, state, response)
    }

    res.json && res.json(response.data)
    return
}




