const request = require('request')
const querystring = require("querystring")
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")

function get(url, headers, cb) {
    return request({
        url, 
        headers: Object.assign({}, headers, {
            "content-type": "application/json",
        })
    }, cb)
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
        headers: Object.assign({}, headers, {
            "content-type": "application/x-www-form-urlencoded",
        }),
        form: data
    }, cb)
}

function postFormData(url, headers, cb) {
    return request.post({
        url:url,
        headers: Object.assign({}, headers, {
            "content-type": "multipart/form-data",
        })
    }, cb)
}

function callBack(res, req, state) {
    return function(err, response, body) {
        let data = null
        if (!err && response.statusCode == 200) {
            if(typeof body != 'object') {
                try {
                    data = JSON.parse(body)
                } catch(err) {}
            } else {
                data = body
            }
        }
        
        if(!data) {
            data = requestDirFile(req, state, response)
        } else if(state.writeFile) {
            writeFile(req, state, data)
        }
        
        res.json && res.json(data) || (res.body = data)
    }
}

module.exports = function(md = {}, state = {},  req, res) {
    const contentType = state.contentType
    const postdata = state.params
    const query = state.query
    const method = req.method.toLowerCase()
    const headers = Object.assign({}, state.headers, { 
        Cookie: md.headers && md.headers.Cookie || state.Cookie 
    })
    
    let proxy = '' 
   
    if(typeof md.proxy === 'string') {
        proxy = md.proxy
    } else {
        proxy = state.proxy
    }

    let url = proxy + req.path

    if(query) {
        const params = querystring.stringify(query)
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
    
    if(method  === 'get') {
        return get(url, headers, callBack(res, req, state))
    } else if(method === 'post') {
        if(contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
            return postForm(url, postdata, headers, callBack(res, req, state))
        } else if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
            return postFormData(url, headers, callBack(res, req, state))
        } else {
            return postJson(url, postdata, headers, callBack(res, req, state)) 
        }  
    }

    const data = {
        msg: "未找到请求方式，目前只支持 get、post/json、x-www-form-urlencoded、multipart/form-data"
    }

    res.json && res.json(data) || (res.body = data)
    return 
}