const request = require('superagent')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const formData = require("./formData")
const loger = require('./loger')

function get(url, query, headers, cb) {
    return request
    .get(url)
    .query(query) 
    .set(headers)
    .end((err, res) => {
        if(res) {

        }
        cb(err, res)
    })
}

function postJson(url, data, query, headers, cb) {
    return request
    .post(url)
    .set(Object.assign({}, headers, {
        "content-type": "application/json",
    }))
    .query(query)
    .send(data)
    .end( (err, res) => {
        cb(err, res)
    })
}

function postForm(url, data, query, headers, cb) {
    return request
    .post(url)
    .type('form')
    .set(headers)
    .query(query)
    .send(data)
    .end( (err, res) => {
        cb(err, res)
    })
}

function postFormData(url, data, query, headers, cb) {
    return request
    .post(url)
    .type('form')
    .set(headers)
    .query(query)
    .send(data)
    .end( (err, res) => {
        cb(err, res)
    })
}

function callBack(res, req, state) {
    return function(err, response) {
        let data = null

        if (!err && response && response.statusCode == 200) {
            let body = response.body
            if(
                response.text && 
                (!body || typeof body === 'object' && JSON.stringify(body) === '{}')
            ) {
                data = response.text
                res.send(data)
                return 
            } else if(typeof body != 'object') {
                try {
                    data = JSON.parse(body)
                } catch(err) {}
            } else {
                data = body
            }
        } else {
            loger(true, 'error', 'error:', err)
        }
        
        if(!data || (state.md.getMockData && state.md.getMockData(data))) {
            data = requestDirFile(req, state, response)
        } else if(data && state.writeFile) {
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
        Cookie: md.headers && md.headers.Cookie || state.Cookie || 'freemock'
    })
    
    let proxy = '' 
   
    if(typeof md.proxy === 'string') {
        proxy = md.proxy
    } else {
        proxy = state.proxy
    }

    let url = proxy + req.path

    if(
        state.debugger &&
        state.debugger.method.includes(method) && 
        (
            state.debugger.path.length === 0 ||
            state.debugger.path.includes(req.path) 
        )
    ) {
        loger(true, 'info', '当前api信息', {
            method,
            url,
            contentType,
            headers
        }) 
        loger(true, 'info', '当前api 传递的参数:', postdata)
    }
    
    if(method === 'get') {
        return get(url, query, headers, callBack(res, req, state))
    } else if(method === 'post') {
        if(contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
            return postForm(url, postdata, query, headers, callBack(res, req, state))
        } else if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
            formData.acceptData(req, function(fields, files) {
                const params = {}
                Object.assign(params, fields, files)
                const multipart = formData.post(params)
                headers["content-type"] = `multipart/form-data; boundary=${multipart.boundary}`
                postFormData(url, multipart.body, query, headers, callBack(res, req, state))
            })
            return 
        } else {
            return postJson(url, postdata,  query, headers, callBack(res, req, state)) 
        }  
    }

    const data = {
        msg: "未找到请求方式，目前只支持 get、post/json、x-www-form-urlencoded、multipart/form-data"
    }

    res.json && res.json(data) || (res.body = data)
    
    return 
}