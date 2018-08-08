const Mock = require("./mock") 

class FreeMock {
    constructor() {
        const me = this
        this.mockData = arguments[0]
        this.state = arguments[1]
        this.interceptors = {
            request: {
                use: me.request.bind(me)
            },
            response: {
                use: me.response.bind(me)
            }
        }
        this.requestSuccess = res => res
        this.responseSuccess = res => res   
        this.responseError = err => err
    }

    setState(newState) {
        let state = this.state 
        this.state = Object.assign({}, state, newState)
    }

    request(success, error) {
        this.requestSuccess = success
        this.requestError = error 
    }
    
    response(success, error) {
        this.responseSuccess = success 
        this.responseError = error 
    }

    get(url, params, config) {
        config = this.requestSuccess(config)
        return this.getData(url, params, config, 'GET')
        .then((res) => {
            return this.responseSuccess(res)
        })
        .catch( (error) => {
            return this.responseError(error)
        })
    }

    post(url, params, config) {
        config = this.requestSuccess(config)
        return this.getData(url, params, config, 'POST')
        .then((res) => {
            return this.responseSuccess(res)
        })
        .catch( (error) => {
            return this.responseError(error)
        })
    }

    getData(url, params, config, method) {
        let regular = -1
        let data = null
        if(typeof url != 'string') {
            return Promise.reject('url is string')
        }
        const mockData = this.mockData.find((val) => {
            return val.url === url
        })
        if(mockData.method && mockData.method != method) {
            return Promise.reject(`this·s method is ${mockData.method}`)
        }
        if(config && config.params) {
            params = Object.assign({}, params, config.params)
        }
        if(config && config.transformRequest) {
            for(let fnc of config.transformRequest) {
                params = fnc.call(this, params, this.setState.bind(this), this.state)
            }
        }
        if(config && config.regular) {
            regular = config.regular.findIndex((fn) => {
                return !fn(this.state)
            })
        }
        if(regular < 0) {
            const mock = new Mock(params)
            let isArray = false
            for(let key in mockData) {
                if(key.indexOf('data|') >= 0) {
                    let keys = key.split('|')
                    let l = keys[1]
                    data = mock.array(mockData[key], l)
                    isArray = true
                } 
            }
            if(!isArray) {
                data = mock.object(mockData.data)
            }
        }
        
        return new Promise(function(resolve) {
            if(config && config.transformResponse) {
                for(let fnc of config.transformResponse) {
                    data = fnc.call(this, data, this.setState.bind(this), this.state)
                }
            }
            resolve({
                data,
                status: 200,
                statusText: 'ok',
                config
            })
        })
    }
}



module.exports = FreeMock