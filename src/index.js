const Mock = require("./mock") 
class FreeMock {
    constructor(...rest) {
        const me = this
        this.mockData = rest[0]
        this.state = rest[1]
        this.methods = ['GET', 'POST']
        this.interceptors = {
            request: {
                use(success, error) {
                    me.requestSuccess = success
                    me.requestError = error 
                }
            },
            response: {
                use(success, error) {
                    me.requestSuccess = success
                    me.requestError = error 
                }
            }
        }
        this.requestSuccess = res => res
        this.responseSuccess = res => res   
        this.responseError = err => err
        this._setMethods()
    }

    _setState(newState) {
        this.state = Object.assign({}, this.state, newState)
    }

    _setMethods() {
        const methods = this.methods
        methods.forEach((method) => {
            this[method.toLowerCase()] = (url, params, config) => {
                config = config || {}
                config.url = url 
                config = this.requestSuccess(config)
                return this._getData(url, params, config, method)
                .then((res) => {
                    return this.responseSuccess(res)
                })
                .catch( (error) => {
                    return this.responseError(error)
                })
            }
        })
    }

    _getData(url, params, config, method) {
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
                params = fnc.call(
                    this, 
                    params, 
                    this._setState.bind(this), 
                    this.state
                )
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
                    data = fnc.call(
                        this, 
                        data, 
                        this._setState.bind(this), 
                        this.state
                    )
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