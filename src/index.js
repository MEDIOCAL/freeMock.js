const Mock = require("./mock") 
class FreeMock {
    constructor() {
        this.mockData = arguments[0]
    }

    get(url, params, config) {
        if(typeof url != 'string') {
            return Promise.reject('url is string')
        }
        const mockData = this.mockData.find((val) => {
            return val.url === url
        })
        if(mockData.method && mockData.method != 'GET') {
            return Promise.reject(`this·s method is ${mockData.method}`)
        }
        const mock = new Mock(params)
        const data = mock.object(mockData.data)
        return new Promise(function(resolve) {
            resolve(data)
        })
    }
}


const fm = new FreeMock([{
    url: 'test',
    data: {
        name: 'cxh'
    }
}])


fm.get('test').then((data) => {
    console.log(data)
})