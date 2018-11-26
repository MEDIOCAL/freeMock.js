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
        cb(err, res, res.body)
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
        cb(err, res, res.body)
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
        cb(err, res, res.body)
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
        cb(err, res, res.body)
    })
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

    if(
        state.debugger &&
        state.debugger.method.includes(method) && 
        (
            state.debugger.path.length === 0 ||
            state.debugger.path.includes(req.path) 
        )
    ) {
        loger(true, 'log', '当前api信息', {
            method,
            url,
            contentType,
            headers
        }) 
        loger(true, 'log', '当前api 传递的参数:', postdata)
    }
    
    if(method === 'get') {
        return get(url, query, headers, callBack(res, req, state))
    } else if(method === 'post') {
        if(contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
            return postForm(url, postdata, query, headers, callBack(res, req, state))
        } else if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
            formData.acceptData(req, function(fields, files) {
                const params = {}
                const forms = fields.concat(files)
                for(let fie of forms) {
                    params[fie.field] = fie.value || fie.file
                }
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