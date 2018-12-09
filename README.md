# freeMock.js

#### What can you do with freeMock

Automatically refresh the data every time the API is called

Generating data from the user's params

Analog login operation

**注意：当使用代理功能时候，目前不支持文件上传功能。**

##### [](https://github.com/MEDIOCAL/freeMock.js#quick-get-start)Quick get start

server.js

```
const freeMock = require('freemockjs')

app.use(freeMock(config))
//or
app.use(freeMock(__dirname + '/mock/config.js'))


```

config 可以是一个对象，或者路径。
当设置为路径的时候，更新文件不需要重启服务。（但是一定注意在设置其他路径的时候，例如dirpath。是相对于server文件的路径，而不是配置文件）

config.js

```
module.exports = {
    mockData: [{
        url:'/test1',
        "data|<2": {
            name: "@name()",
            "list|<req.size": {
                title:"@title()",
                time: "@time()",
                height: "@number(2)"
            }
        }
    }, {
        url: '/wolong',
        data: {
            name: "123",
            template: "456"
        }
    }, {
        url:'/wolong123/plan/list',
        proxy: 'https://ad-test1.sma.cn',
        headers: {
            'Cookie': '3428.1539223421.'
        }
    }],
    state: {

    }
}

```

### [](https://github.com/MEDIOCAL/freeMock.js#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)配置文件

config 是一个对象：

```
{
    mockData //代表需要配置的接口，以及返回的数据
    state  //接口需要的公共属性
}

```

### [](https://github.com/MEDIOCAL/freeMock.js#mockdata)mockData：

mockData 是一个对象数组。

```
[
    {
        url     // 必需，接口的路径。例如 /A 注意前面要加 “/”
        data    // 默认为 {}。代表接口返回的数据。必须是一个 json 数据。 value可以是 function，但是 function 必须有返回值。
        proxy   // 代理开关，当为 true 时，将使用 state 里配置的代理方式。当为字符串时，使用当前方式。不设，代表不走代理。
        headers // headers
        getMockData // [function] 当为代理模式的时候，可以通过此方法，来设定使用 mock 的值，还是使用代理返回的值。
    }
]
// 有的时候，代理虽然成功，但是返回值却是 null，这不是我们需要的，所以这时候我们依然想用 mock 的值。
getMockData(data) {
    if(!data.data) {
        // 当服务器返回值的 data 值为空的时候, 去请求对应 json 文件的值。
        return true
    }
    return false
}

```

#### [](https://github.com/MEDIOCAL/freeMock.js#demo%E5%88%86%E6%9E%90)demo分析

demo1

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
            age: '@number(0, 1, 99)'
            id: '@number(0, 10000, 999999)
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
    'data|9': {
        name: '@name()',
        age: '@number(0, 1, 99)',
        id: '@number(0, 10000, 999999),
        'source|<9': '@title()'
    }
}

```

key 值中出现 | 代表这是一个数组，数组的元素是 value 值。 比如 data|9，代表data是一个长度为 9 的数组，数组的元素是，后面的 mock 对象生成的数据。 “|”可以配合 “<"、“>”、“<=”、“>=” 使用。 source|<9 代表 source 是一个长度小于 9 的数组。注意此处没有设置[]。

操控动态数据：

```
{
    url: '/getData',
    'data|req.pageSize': {
        pageNo: '@params(pageNo)',
        maxPage: function(ctx, state) {
            return ctx.query.maxPage
        }
    }
}

```

在 key 中，可以直接使用 req，来获取我们调用接口传递的参数。例如： 调用 [http://localhost:3002/test1?pageSize=12&pageNo=10&maxPage=100](http://localhost:3002/test1?pageSize=12&pageNo=10&maxPage=100) 但是只有在 key 值当中使用时，才可以直接使用 req。如果想在 value 中使用可以仿照上例中 pageNo 和 maxPage 调用。 @params(pageNo): params 方法可以获取 pageNo 的值。相当于 req.pageNo 当值为 function 时，可以在函数体内使用 ctx 获取。 ctx 可以理解成 node 的 req。函数的返回值就是生成的 mock 数据，第二个 state 后面会提到。

当我们 post 数据的时候有传递的参数可能会是一个对象。那么 req 可以获取对象的值么？ 答案是肯定的。

```
'data|req.page.pageSize'

```

而 params 方法也可以接受多个参数，例如：

```
 pageNo: '@params(page, pageNo)' // 相当于 req.page.pageNo

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
    "data|<2": {
        name: "@name()",
        "list|<req.size": {
            title:"@title()",
            name: "@getName(chenxuehui)"
        }
    }
}

```

### [](https://github.com/MEDIOCAL/freeMock.js#%E4%BB%A3%E7%90%86)代理

1.设置代理后优先请求服务器的数据。 
例如：访问localhost:8080/wolong123/aa，先请求 https://ad-test1.ok.cn/wolong123/aa 的数据。

2.假如服务器报错，或者没有api报404，将请求本地相应路径下的json数据。
例如：此时我们设置的dirpath是 /mock,那么将获取 /mock/wolong123/aa.json 的文件。

3.如果没有json文件，继续生成 data 属性的数据。

4.如果没有设置 data 会返回报错信息


```
{
    url:'/wolong123/*',
    proxy: 'https://ad-test1.ok.cn', 
    headers: {
        Cookie: "asdsads"
    }
}

```

url:可以设置具体的path，也可以设置 * 代表此路由下所有的 url。
proxy 有两种值:
当 proxy 为 true 的时候，表示此 api 走代理。会使用公共的 state.proxy。同样的，假如你的 headers 没有设置，都会去state里找。
当 proxy 设置为字符串的时候（如上）优先使用。
不设置 proxy 就直接返回 data 生成的数据。
 state

```
{
    headers: {
        Cookie: "asdsads"
    }
}

```

### [](https://github.com/MEDIOCAL/freeMock.js#state)state

**dirpath**

文件路径，假如后台没有api的情况，便去读本地 json 数据，配置路径指定读取哪个文件夹。

1.设置为字符串
```
{
   dirpath：__dirname + '/mock' 
}

```

当访问 /wolongweb/a 失败的时候，会去读取 __dirname + '/mock/wolongweb/a.json'文件。
当我们需要写文件的时候，也是在该目录下写文件。
2.设置为数组：
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
}，{
    url: '/kcc/sm/v1/*',
    proxy: true
}
```
理论上我们访问 localhost:3000/koo/sm/v1/list 失败的时候，会去访问 /mock/koo/sm/v1/list.json。但是，我们在 mock 文件夹下没必要创建那么多的文件夹嵌套，所以我们需要把 /koo/sm/v1 删掉，直接访问 /mock/list.json。设置成数组就是这么个目的。/koo/sm/v1 会生成 [koo, sm, v1], 设置剪切 [0, 0] 意思就是从 0 开始 切0个，就是''了。

**writeFile**

值为 true 或 false。表示是否写文件，访问api成功以后，会将服务器返回的数据，更新到对应的文件。例如：
当访问 /wolongweb/a?pageNo=2 的时候
假如设置为true，则会更新 /wolongweb/a.json 。如果没有该目录，会自动新建。

**readFile**

读文件的配置，可设置为数组、对象。
当设置为数组的时候：
```
{
    readFile: ['channelId', 'id']
}
```
假如我们访问 localhost:3000/wolong/web/list?channelId=16 失败，不设会去读取 /mock/wolong/web/list.json。设置如上，则会依次解析请求头中的 channelId、id，如果有值则会 加到文件名中，就变成了 /mock/wolong/web/list_16.json。
如果是请求  localhost:3000/wolong/web/article?channelId=16&id=1011，则去加载 /mock/wolong/web/article_16_1011.json
那么问题来了，假如多个 api 有重复的 params，那会互相造成干扰。所以可以设置成如下：
```
{
    readFile: {
        '/wolong/web/list': ["channelId"],
        '/wolong/web/article': ["channelId", "id"]
    }
}
```

**debugger**

设置为 true，会打印请求api的信息。
设置为对象。例如： 
```
{
    debugger: {
        method: ['post'],   // 只打印 post 请求信息， 默认为 ['get', 'post'],
        path: ['/a']   // 只打印 路径 /a 的日志
    }
}

```

**proxy**
在state 里设置 proxy 只能是 url。

**Cookie**
公共 cookie

**headers**
公共的 headers。

因为我们可以再配置 data 的 function 里面使用 state，例如：

```
mockData: [{
    id: function(ctx, state) {
        return state.id
    }
}]

```

在 plugin 里面也可以使用：

```
{
    state: {
        plugin: {
            "getName": function(name) {
                return this.state.name || name
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

### [](https://github.com/MEDIOCAL/freeMock.js#api)API

interceptors: 是一个function， 接受两个参数 req、state。 返回 false 的时候不会打断接口。 当返回的值判定为true的时候，接口会返回该值。 如果返回值为 true，那么接口会返回

```
{ status: '400', msg:'is Interrupted'}

```

name()： 随机生成人名

title()：随机生成一串字符

number()：随机生成一个数字

number(n)：随机生成精确到小数点后n位的数字

number(a,b,c)：在a，b的范围内随机生成精确到小数点后c位数字

string()：随机生成一串字符串

string(2)：随机生成2个英文字符

string(a, b)：a=true，随机生成b个大写英文字符

boolean()：随机生成一个boolean值

boolean(a)：如果a=true则返回true，否则返回false

. . . .
