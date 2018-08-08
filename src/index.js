const Mock = require("./mock") 

class FreeMock {
    constructor() {
        const me = this
        this.mockData = arguments[0]
        this.state = arguments[1]
        this.interceptors = {
            request: {
                use: me.request
            },
            response: {
                use: me.response
            }
        }
        this.requestSucess = res => res
        this.responseSuccess = res => res   
        this.responseError = err => err
    }

    request(success, error) {
        this.requestSucess = success
        this.requestError = error 
    }
    
    response(success, error) {
        this.responseSuccess = success 
        this.responseError = error 
    }

    get(url, params, config) {
        config = this.requestSucess(config)
        return this.getData(url, params, config, 'GET')
        .then((res) => {
            return this.responseSuccess(res)
        })
        .catch( (error) => {
            return this.responseError(error)
        })
    }

    post(url, params, config) {
        config = this.requestSucess(config)
        return this.getData(url, params, config, 'POST')
        .then((res) => {
            return this.responseSuccess(res)
        })
        .catch( (error) => {
            return this.responseError(error)
        })
    }

    getData(url, params, config, method) {
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
                params = fnc(params)
            }
        }
        const mock = new Mock(params)
        const data = mock.object(mockData.data)
        return new Promise(function(resolve) {
            if(config && config.transformResponse) {
                for(let fnc of config.transformResponse) {
                    data = fnc(data)
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


const fm = new FreeMock([{
    url: 'test',
    data: {
        people: {
            name: "@name()",
            age: "@number()",
        }
    }
}])


fm.get('test').then((data) => {
    console.log(data)
})