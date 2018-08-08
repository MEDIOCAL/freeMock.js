const FreeMock = require('../src')


const fm = new FreeMock([{
    url: 'test',
    data: {
        people: {
            name: "@name()",
            age: "@number()",
        }
    }
}, {
    url:'test1',
    method:'GET',
    "data|2": {
        name: "@name()",
        "list|10": {
            title:"@title()",
            time: "@time()"
        }
    }
}], {
    username: 'chenxuehui',
    password: '123',
    logined: false
})

fm.interceptors.request.use(function(config) {
    return Object.assign({}, config, {
        transformRequest: [function(params, setState, state) {
            if(state.username === params.username && state.password === params.password) {
                setState({
                    logined: true 
                })
            }
            return params
        }],
        regular: [function(state) {
            return state.logined

        }]
    })
})
fm.get('test1', {username: 'chenxuehui', password: '123'}).then((res) => {
    console.log(res)
})