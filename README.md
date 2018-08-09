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

params： 

transformRequest：

regular：

transformResponse:

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