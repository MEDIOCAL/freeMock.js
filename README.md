# freeMock.js

#### What can you do with freeMock

Automatically refresh the data every time the API is called

Generating data from the user's params

Analog login operation


##### Quick get start

```
mock.js

import FreeMock from "freemock"

export default const freeMocl = new FreeMock([{
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
}])
```
use.js
```
import freeMock from "mock.js"

...

getTest = async () => {
    let res = await freeMock.get('test')
}

...

```

##### Result

```
{ 
    data: { 
        people: { 
            name: '张云龙', 
            age: 83
        } 
    },
    status: 200,
    statusText: 'ok',
    config: {}
}

```

#### API

##### config

params： 调用api的时候，传递的parmas会合并config的params。

transformRequest：[function]
    在请求之前，会调用该方法。该方法有3个参数:
    1.params: api传递的值 
    2.setState：一个可以用来设置state的function
    3.state：当前state。
    
regular：[function]
    用户可以设置若干个规则来打断api的调用。
    只有所有的function都返回true的时候，才会继续生成数据，否则数据为null。


transformResponse:
    和transformRequest一样，只是在响应阶段调用

##### interceptors

```
interceptors.request.use(function(config) {
    ...
    return config
})

interceptors.response.use(function(data) {
    ...
    return data
})

```

#### State
 可以设置state作为一个全局变量，用户可以通过transformRequest设置它，并且regular可以拿到state。因此我们可以通过state做一些验证操作
```
fm = new FreeMock([...], State)

config.transformRequest = [function(params, setState, state) {
    if(state.username === params.username && state.password === params.password) {
        setState({
            logined: true 
        })
    }
    return params
}]

...

config.regular = [function(state) {
    return state.logined
}]

```

Demo，来模拟登录

```
const fm = new FreeMock([{
    url:'test',
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

```

调用：
```
fm.get('login', {username: 'chenxuehui', password: '123'}).then((res) => {
    console.log(res)
})


fm.get('test').then(res => {
    console.log(res)
})
```
