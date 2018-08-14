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
}, {
    url:'login',
    method: 'GET',
    data: {}
}], {
    username: 'chenxuehui',
    password: '123',
    logined: false
})

fm.interceptors.request.use(function(config) {
    if(config.url == 'login') {
        config.transformRequest = [function(params, setState, state) {
            if(state.username === params.username && state.password === params.password) {
                setState({
                    logined: true 
                })
            }
            return params
        }]
    } else {
        config.regular = [function(state) {
            return state.logined
        }]
    }
    return config
})

fm.get('login', {username: 'chenxuehui', password: '123'}).then((res) => {
    console.log(res)
})


fm.get('test').then(res => {
    console.log(res)
})