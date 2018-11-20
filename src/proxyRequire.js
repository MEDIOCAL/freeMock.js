const axios = require("axios")
const qs = require("qs")
const requestDirFile = require("./requestFile.js")

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
            msg: '发生未知错误'
        }
    }
    
    try {
        if(method === 'get') {
            response = await axios[method](url, { headers })
        } else if(!contentType || contentType.indexOf('application/json') >= 0) {
            response = await axios[method](url, postdata, { headers })
        } else if (contentType.indexOf('x-www-form-urlencoded') >= 0) {
            response = await axios[method](url, qs.stringify(postdata), { headers })
        } else {
            response = {
                data: {
                    msg: "未找到请求方式，目前只支持 get、post/json、x-www-form-urlencoded、multipart/form-data"
                }
            }
        }
    } catch(err) {
        console.log(err)
        if(state.dirpath) {
            response.data = requestDirFile(req, state, response)
        } else {
            response.data = {
                status: -1,
                mag: "发生未知错误"
            }
        }
    }
    res.json && res.json(response.data) || (res.body = response.data)
    return
}




