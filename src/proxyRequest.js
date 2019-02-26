const request = require('superagent')
const requestDirFile = require("./requestFile.js")
const writeFile = require("./writeFile.js")
const formData = require("./formData")
const loger = require('./loger')
const swagger = require('./swagger')

function deepCompare(x, y) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof(x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}

function get(url, query, headers, cb) {
    return request
    .get(url)
    .query(query) 
    .set(headers)
    .end(cb)
}

function postJson(url, data, query, headers, cb) {
    return request
    .post(url)
    .set(Object.assign({}, headers, {
        "content-type": "application/json",
    }))
    .query(query)
    .send(data)
    .end(cb)
}

function postForm(url, data, query, headers, cb) {
    return request
    .post(url)
    .type('form')
    .set(headers)
    .query(query)
    .send(data)
    .end(cb)
}

function postFormData(url, data, query, headers, cb) {
    return request
    .post(url)
    .type('form')
    .set(headers)
    .query(query)
    .send(data)
    .end(cb)
}

function callBack(res, req, state, md) {
    return async function(err, response) {
        let data = null
        
        if (!err && response && response.statusCode == 200) {
            loger(true, 'info', '请求数据成功', req.path)
            
            let body = response.body
            let text = response.text
            if(
                text && 
                (!body || typeof body === 'object' && JSON.stringify(body) === '{}')
            ) {
                data = text
            } else {
                data = body
            }
        } else if(state.pureProxy) {
            if(err) {
                loger(true, 'error', '向服务器请求发生错误', err)
                return res.send(err)
            } else if(response) {
                loger(true, 'error', '服务器返回错误', response)
                return res.send(response)
            }
        } else {
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
        }
        
        if(state.readFile && (!data || (state.md.getMockData && state.md.getMockData(data, req)))) {
            loger(state.info, 'info', '开始读取文件', req.path)
            data = requestDirFile(req, state, response)
        } 

        if(!data && state.swagger) {
            data = await swagger(req, state, md) 
        }

        if(
            data && typeof data === 'object' && 
            state.writeFile && 
            state.md.validateWriteFile(data, req) 
        ) {
            const readFileData = requestDirFile(req, state, response, true)
            !deepCompare(readFileData, data) && writeFile(req, state, data) // 深度比较获取数据与文件数据，不一样才能写入
        }

        if(data || req.mockData) {
            return res.send(data || req.mockData)
        } else {
            return res.send(err || response)
        }
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
        loger(true, 'debug', '当前api信息：', {
            method,
            url,
            contentType,
            headers
        }) 
        loger(true, 'debug', '当前api 传递的参数:', postdata)
    }
    
    if(method === 'get') {
        return get(url, query, headers, callBack(res, req, state, md))
    } else if(method === 'post') {
        if(contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
            return postForm(url, postdata, query, headers, callBack(res, req, state, md))
        } else if(contentType && contentType.indexOf('multipart/form-data') >= 0) {
            formData.acceptData(req, function(fields, files) {
                const params = {}
                Object.assign(params, fields, files)
                const multipart = formData.post(params)
                headers["content-type"] = `multipart/form-data; boundary=${multipart.boundary}`
                postFormData(url, multipart.body, query, headers, callBack(res, req, state, md))
            })
            return 
        } else {
            return postJson(url, postdata,  query, headers, callBack(res, req, state, md)) 
        }  
    }

    const data = {
        msg: "未找到请求方式，目前只支持 get、post/json、x-www-form-urlencoded、multipart/form-data"
    }

    res.json && res.json(data)
    
    return 
}