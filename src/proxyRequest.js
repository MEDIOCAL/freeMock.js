const request = require('request')
const querystring = require("querystring")

function get(url, headers, cb) {
    return request({
        url, 
        headers: Object.assign({}, headers, {
            "content-type": "application/json",
        })
    },cb)
}

function postJson(url, data, headers, cb) {
    return request({
        url,
        method: 'POST',
        json: true,
        headers: Object.assign({}, headers, {
            "content-type": "application/json",
        }),
        body: JSON.stringify(data)
    }, cb)
}

function postForm(url, data, headers, cb) {
    return request.post({
        url:url,
        method: 'POST', 
        headers: Object.assign({}, headers, {
            "content-type": "application/x-www-form-urlencoded",
        }),
        form: data
    }, cb)
}

function postFormData(url, data, headers, cb) {
    return request.post({
        url:url,
        method: 'POST', 
        headers: Object.assign({}, headers, {
            "content-type": "multipart/form-data",
        }),
        formData: data
    }, cb)
}

function callBack(res) {
    return function(err, response, body) {
        let data = body
        if (!err && response.statusCode == 200) {
            try {
                data = JSON.parse(data)
            } catch(err) {
                data = {
                    data,
                    msg: "数据格式有误，请检查接口正确"
                }
            }
            res.json && res.json(data) || (res.body = data)
        }
    }
}

module.exports = function(md = {}, state = {},  req, res) {
    const contentType = state.contentType
    const postdata = state.params
    const method = req.method.toLowerCase()
    const headers = { 
        Cookie: md.headers && md.headers.Cookie || state.Cookie 
    }
    
    let proxy = '' 
   
    if(typeof md.proxy === 'string') {
        proxy = md.proxy
    } else {
        proxy = state.proxy
    }

    const url = proxy + req.path

    if(method  === 'get') {
        const params = querystring.stringify(state.params)
        return get(`${url}?${params}`, headers, callBack(res))
    }

    if(!contentType || contentType.indexOf('application/json') >= 0) {
        return postJson(url, postdata, headers, callBack(res)) 
    } else if(contentType.indexOf('x-www-form-urlencoded') >= 0) {
        return postForm(url, postdata, headers, callBack(res))
    } else if(contentType.indexOf('multipart/form-data') >= 0) {
        return postFormData(url, postdata, headers, callBack(res))
    }
    
    const data = {
        msg: "未找到请求方式，目前只支持 get、post/json、x-www-form-urlencoded、multipart/form-data"
    }
    res.json && res.json(data) || (res.body = data)
    return 
}