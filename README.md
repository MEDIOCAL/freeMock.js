# freeMock.js

#### 功能

可以从本地直接请求测试环境的 api，从本地服务获取测试服务的数据，方便调试。

当 api 报错或者没有 api 又或者在联调的时候某个测试环境的 api 报错，影响调试。可以读取本地 mock 的 json 文件中的数据。

可以将测试环境的数据保存到本地的 json 文件中。  

## Quick get start

server.js

```
const config = require('./config.js')
const freeMock = require('freemockjs')

....

app.use(freeMock(config))
//or
app.use(freeMock(path.reslove(__dirname , '/mock/config.js')))
...
```
注意：路径是相对于 freemockjs server.js 的

### demo1 config.js (以下大部分 api 都没啥用，基本配置这样就 ok)

```
module.exports = {
    mockData: [{
        url:'/wo/plan/list',
        data: {
            name: "123",
            template: "456"
        },
        proxy: true,
    }, {
        url:'/mme/*',
        proxy: true
    }],
    state: {
        dirpath: __dirname + '/mock',        // 必须
        proxy: 'https://ad-test1.smsa.cn',   // 必须
        Cookie: '1233asdasdsadasdsadzzzz',   // 必须
        headers: { 
            'CSRF-TOKEN': 'ssdw22'
        },
        readFile: {
            '/opt/dict/list': ["theme"],
        }
    }
}

```
项目 api 请求：
```
axios.post('/mme/aaa/bbb/c', params}).then(...) 

axios.get('/wo/plan/list', { params }).then(...)

上面两个请求会直接访问 localhost:3000/wo/plan/list 本地的接口，但是实际上会代理访问 https://ad-test1.smsa.cn/wo/plan/list。 访问不到就读取本地当前目录下 /mock/wo/plan/list.json  。
```

## 代理

**1.设置代理后优先请求服务器的数据。**

例如 demo1 中的设置：
当访问localhost:8080/wo/plan/list，先请求 https://ad-test1.ok.cn/wo/plan/list 的数据。

**2.假如服务器报错，或者没有 api 报 404，将请求本地相应路径下的json数据。**

例如 demo1 中设置：
此时我们设置的 dirpath 是 __dirname + '/mock',那么将获取当前路径下 /mock/wo/plan/list.json 的数据。

**3.如果没有json文件，继续生成配置中 data 属性的数据。**

例如 demo1 中设置：
```
{
    url:'/wo/plan/list',
    data: {
        name: "123",
        template: "456"
    },
    proxy: 'https://ad-test1.sma.cn',
}
```
此时返回 data 中数据

**4.如果没有设置 data 会返回报错信息**

## 配置文件

config 是一个对象：

```
{
    mockData //代表需要配置的接口，以及返回的数据
    state    //接口需要的公共属性
}

```

### state

#### writeFile

值为 true 或 false，表示是否写文件。
访问 api 成功以后，会将服务器返回的数据，更新到对应的文件。例如 demo1 中：

当访问 /wo/plan/list?pageNo=2 的时候，因为 dirpath 为 /mock 会更新 /mock/wo/plan/list.json , 如果没有该目录，会自动新建。


#### readFile

读文件的配置，可设置为数组、对象。

**当设置为数组的时候**

```
{
    readFile: ['channelId', 'id']
}
```
假如我们访问 localhost:3000/wo/web/list?channelId=16 失败，不设置此值会去读取 /mock/wolong/web/list.json。

假如设置如上，则会依次解析请求头中的 channelId、id，如果有值则会 加到文件名中，就变成了 /mock/wolong/web/list_16.json。

如果是请求 localhost:3000/wolong/web/article?channelId=16&id=1011，则去加载 /mock/wolong/web/article_16_1011.json

那么问题来了，假如多个 api 有重复的 params，那会互相造成干扰。所以可以设置成对象。

**当设置为对象的时候**

```
{
    readFile: {
        '/wo/web/list': ["channelId"],
        '/wo/web/article': ["channelId", "id"]
    }
}
```
当访问 localhost:3000/wo/web/list?channelId=16 失败后，会读取 /mock/wolong/web/list_16.json 的数据。

当访问 localhost:3000/wo/web/article?channelId=16&id=11 失败后，会读取 /mock/wolong/web/list_16_11.json 的数据。

这种情况 mock tab 切换的时候，调用同一个 api 但是传递的值不同，获取数据不同。

**当 writeFile 为 true 的时候，写入数据也会以此写入文件**

当访问 localhost:3000/wo/web/list?channelId=16 成功后，会写入到 /mock/wolong/web/list_16.json 文件中。
也可以设置成对象，原理和 readFile 相同。

**当设置了 readFile 为对象的时候，writeFile 只需要设置为 true 即可，两者可共用一份数据操作文件。 当 readFile 设置为 false 的时候，writeFile 可以设置成对象**

两者取值如下：

```
if(state.readFile && typeof state.readFile === 'object') {
    fileConfig = state.readFile
} else if(state.writeFile && typeof state.writeFile === 'object') {
    fileConfig = state.writeFile
}
 name = creatName(fileConfig, params, name, req)
```

#### dirpath

mock 文件路径，假如后台没有api的情况，以便去读本地 json 数据，配置路径指定读取哪个文件夹。**建议设置为字符串**

**1.设置为字符串**

```
{
   dirpath：__dirname + '/mock' 
}

```

当访问 /wo/a 失败的时候，会去读取 __dirname + '/mock/wo/a.json' 文件。

当访问成功后，我们想把获取的数据写入到本地文件，也是写入到 /mock/wo/a.json

**2.设置为数组**

```
state: {
    dirpath：[__dirname + '/mock', [0, 0]
}
```
存在这样一种情况，我们代理的路经过长，例如： 

```
{
    url: '/koo/sm/v1/*',
    proxy: true
}
```
理论上我们访问 localhost:3000/koo/sm/v1/ag/list 失败的时候，会去访问 /mock/koo/sm/v1/list.json。但是，我们在 mock 文件夹下没必要创建那么多的文件夹嵌套，所以我们需要把 /koo/sm/v1 删掉，直接访问 /mock/ag/list.json。设置成数组就是这么个目的。

/koo/sm/v1 会生成 [koo, sm, v1], 设置剪切 [0, 0] 意思就是从 0 开始 切0个。 所以就去读取 /mock/ag/list.json

同理，当设置 [0, 1] 的时候，会去读取 /mock/koo/ag/list.json

#### pureProxy 

纯代理模式，代理失败也不会返回 mock 数据
#### swagger 

根据 swagger 生成 mock 数据。
优先级  proxy > 读取本地数据 > swagger > data 字段

```
swagger: 'imp.mmsstt.test/n/v2/api-docs',
swaggerManualProps: {
    pageSize: 20,
    pageNo: req => req.query.pageNo,
        businessTypes: () => {
             eturn '2'
        }
 }
```

#### swaggerManualProps

swaggerManualProps 可设置为一个对象。其属性的值可以为 function、object、string、number、boolean。

例如在 state 里我们这么设置：

```
{
    pageSize: 20,        // 生成数据中所有的 pageSize 都为20
    success: false,      // 生成数据中所有的 success 都为 false
    pageNo: res => res.query.pageNo,  // 生成数据中所有的 pageNo 都为 url 中传递的值
    data: {              // 假如 data 为一个数组的话，生成数据中所有的 data 长度都为 20
        length: 20       // 假如 data 为一个数组的话，会生成一个长度为 20 的数组。
    },
}
```

**注意：当设置为 object 时，只针对数组类型的数据设置 length。如果设置的字段不是数组类型，则不生效。**

假如在开发中有些字段在swagger中类型为 int32，随机生成的 value 可能会很大，但是我们所需要的数值为 1 - 5。例如：

bussinessType值为 1 - 5，但是随即生成了 121213。有什么方法可以手动更改数据呢？ 

```
{
    bussinessType: () => {
        const arr = [1, 2, 3, 4, 5]
        const index = Math.floor(Math.random()*arr.length)
        return arr[index]
    }
}
```

同理，对于 pageNo 也为 int32，我们期望从 query 里取我们传递的值。

```
{
    pageNo: res => res.query.pageNo
}
```

**默认设置为：**

```
{
    pageNo: res => (res.query.pageNo || req.body.pageNo || 1),
    pageSize: res => (res.query.pageSize || req.body.pageSize || 20),
    data: res => ({ length: res.query.pageSize || res.body.pageSize || 20 }),
    result: res => ({ length: res.query.pageSize || res.body.pageSize || 20 }),
}
```

#### debugger

设置为 true，会打印请求 api 的信息。

设置为对象。例如：

```
{
    debugger: {
        method: ['post'],   // 只打印 post 请求信息， 默认为 ['get', 'post'],
        path: ['/a']       // 只打印 路径 /a 的日志
    }
}

```

#### proxy
在state 里设置 proxy 只能是 url。

当在 mockData 的配置里也设置 proxy 为 url 时，优先使用 mockData 中配置的。

#### Cookie
公共 cookie

#### headers
公共的 headers

#### plugin

```
mockData: [{
    data: {
        id: function(ctx, state) {
            return state.id
        }
    }
}]

```
在 plugin 里面也可以使用：

```
{
    mockData: [
        {
            data: {
                id: "@getId(cxh)"
            }
        }
    ],
    state: {
        plugin: {
            "getId": function(name) {
                return this.state.id || id
            }
        }
    }
}

```

所以我们可以设置一些属性完成一些功能。

例如：

```
state: {
    username:'cxh',
    password:'123456',
    isLogin: false,
    interceptors: function(state) {
        if(!state.isLogin) {
            return {
                status: 101,
                msg: '没有登录'
            }
        } else {
            return false
        }
    }
}

```

mockData:

```
[
    {
        url: '/login',
        interceptors: function(state, req) {
            if(
                req.query.name === state.username &&
                req.query.password === state.password
            ) {
                state.isLogin = true
            }
            return {
                msg:'登录成功'
            }
        }
    }, {
        url: '/logout',
        interceptors: function(state, req) {
            state.isLogin = false
            return {
                msg:'登出成功'
            }
        }
    }
]

```

interceptors: 是一个打断接口的 api，下面有介绍。 这样就模拟了登录效果


## mockData：

mockData 是一个对象数组。

```
[
    {
        url     // 必需，接口的路径。例如 /A 注意前面要加 “/”
        data    // 默认为 {}。代表接口返回的数据。必须是一个 json 数据。 value可以是 function，但是 function 必须有返回值。
        proxy   // 代理开关，当为 true 时，将使用 state 里配置的代理方式。当为字符串时，使用当前方式。不设，代表不走代理。
        headers // headers
        readWriteFilePath // string，设置读写文件的路径。如配置的 url 过长，但是我们在 mock 下，不想创建那么多文件夹，此路径会替代请求路径，类似于 state.dirpath 设置成数组的情况。
        getMockData // [function] 当为代理模式的时候，可以通过此方法，来设定使用 mock 的值，还是使用代理返回的值。
        validateWriteFile  //[function] 当为代理模式的时候，可以通过此方法，来设定是否将获取的测试数据写入到本地文件。返回 true 为写入
    }
]
```
### readWriteFilePath

可能会有如下情况：
```
mockData: [{
    url: '/aaa/bbb/cc/dd/*',
    proxy: true,
    readWriteFilePath: '',
}],
state: {
   dirpath: '/mock' 
}
```
当我们访问 localhost:3000/aaa/bbb/ccc/dd/ff/e 的时候，假如代理访问失败，理论上会获取 /mock/aaa/bbb/cc/dd/ff/e.json。所以我们会在mock文件夹下生成嵌套很深的文件夹，这是我们不想看到的。

假如我们像上面那样，设置 readWriteFilePath 为'',就代表着 '' 代替了 /aaa/bbb/cc/dd/，所以当访问失败的时候，会去获取 /mock/ff/e.json 的数据，这样我们就没必要去建立很多文件夹了。

和 state 中 dirpath 设置为数组的情况相同。但是 **不能同时使用** 

### getMockData

有的时候，代理虽然请求成功了。但是返回我们需要调试的字段数据却是 null，这不是我们需要的数据。这时候我们依然想用本地 mock 的数据。
```
// 当服务器返回值的 view 值为空的时候, 去请求对应 json 文件的值。
getMockData(data, req) {
    if(req.path === '/aaa/bbb/c' && !data.data.view) {  
        return true
    }
    return false
}
```

### validateWriteFile

当我们将 state 下的 writeFile 设置为 true 的时候，每次我们去请求测试环境的数据成功，就会将我们得到数据写入到，本地对应的 json 文件中。这样做的目的主要是为了保证线上数据与本地 mock 数据保持同步。其次，当我们已有 api 时就不需要手动建立 json 文件，工具会自动生成，这样帮我们省很多力。

有的时候代理虽然成功获取测试数据，但是测试数据并不如本地 mock 数据完美。此时，我们并不想写入本地文件。

```
validateWriteFile(data, req) {
    if(!data.data.views || data.data.views.length === 0) {  // 当新获取的数据 views 为null或者[]的时候，不写入。
        return false
    }
    return true
}
```

## demo分析动态数据生成

fremockjs 引用了 Mock.js 生成动态数据。详情参考 <a href="http://mockjs.com/" target="blank">Mock.js</a>

#### demo2

```
mockData = [
    {
        url: '/getData',
        data: {
            name: 'cxh',
            age: '21'
        }
    }
]

```

请求 localhost:8080时，返回 data 的 json 数据，method 不限。

动态数据：

```
mockData = [
    {
        url: '/getData',
        data: {
            name: '@name()',
            age: '@number(1, 99)'
            id: '@number(10000, 999999)
        }
    }
]

```

@代表是识别调用 function 的标识
 name： 随机生成一个人名

数组：

```
{
    url: '/getData',
    'data|9': [{
        name: '@name()',
        age: '@number(1, 99)',
        id: '@number(0, 10000, 999999),
        'source|9': ['@title()']
    }]
}

```

操控动态数据：

```
{
    url: '/getData',
    'data|@params.pageSize': [{
        pageNo: '@params.pageNo',
    }]
}

```

在 key 中，可以直接使用 @params，来获取我们调用接口传递的参数。例如： 调用 [http://localhost:3002/test1?pageSize=12&pageNo=10&maxPage=100](http://localhost:3002/test1?pageSize=12&pageNo=10&maxPage=100) @params.pageSize 就是取 pageSize 的值

当我们 post 数据的时候有传递的参数可能会是一个对象。那么 @params 可以获取对象的值么？ 答案是肯定的。

```
'data|@params.page.pageSize'

```

而 @params 也可以接受多个参数，例如：

```
 pageNo: '@params.page.pageNo' // 相当于 req.query.page.pageNo

```

自定义方法: 有些时候已有的方法我发满足我们的需求，我们希望自己定制方法 getName

```
 {
   state: {
       plugin: {
           "getName": function(name) {
               return this.ctx.query.name || name
           }
       }
   }
 }

```

使用 getName：

```
{
    url:'/test1',
    "data": {
        name: "@name()",
        "list|@params.size": [{
            title:"@title()",
            name: "@getName(chenxuehui)"
        }]
    }
}

```

### API

interceptors: 是一个function， 接受两个参数 req、state。 返回 false 的时候不会打断接口。 当返回的值判定为true的时候，接口会返回该值。 如果返回值为 true，那么接口会返回

<a href="http://mockjs.com/examples.html" target="blank">动态数据</a>
