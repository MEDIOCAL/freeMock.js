Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。
# 快速入门
在 `mock.config.js` 文件里添加如下代码：

```js
module.exports = {
   // 代理,请求https://mocks.alibaba-inc.com/mock/ncrm/agent/list
	"/ncrm/agent/list": "https://mocks.alibaba-inc.com/mock",   
  
	"/ncrm/*": "swagger https://imp-daily.uc.test/ncrm/v2/api-docs",  // swagger
  
  "/cpt/*": "/mock",    // 读取本地 mock 文件夹的 *.json 文件

  "/test11/*":  {
        status: 0,
        message: 'success'
    },
	"/test22/*": function(req, state) {
	  	const param = req.query
        return {
            status: 0,
            result: {
                pageSize: param.pageSize,
                header: req.header,
                Cookie: state.Cookie
            }
        }
    },
  // 手动设置响应值响应头
	"/test33/*": function(req, state, res) {
        const param = req.query
        res.set({
                'ETag': '12345'
         })
        res.status(201).json(state.mock({
            status: 0,
            result: {
                pageSize: param.pageSize,
                header: req.header,
                Cookie: state.Cookie
            }
        }))
    }
}
```
当客户端（浏览器）发送请求，如请求 http://localhost:8080/ncrm/agent/list 的时候，此时 freemock 会在本地的服务里拦截 /ncrm/agent/list 的请求，然后去请求 https://mocks.alibaba-inc.com/mock/ncrm/agent/list 下的数据返回。
如果请求 /cpt/b 这个接口，则会到本地 mock 文件夹下读取 /cpt/b.json 文件的数据。_本地如果没有文件会自动创建。_

# 获取请求参数
有时候我们需要获取请求的 param/query 参数，来作为返回值。例如我们想根据请求的 pageSize 来确定返回数据的长度，可以使用 @param 来获取请求参数。例如：
```js
module.exports = {
	"/api/test":  {
        status:  0,
        "data|@param.pageSize": [{
            name: "@name",
            age: "@integer(0, 100)",
        }]
    },
}
```
当浏览器发出 http://localhost:8080/api/test?pageSize=12 请求的时候，则返回的数据中 data 的长度为 12。

``` json
{
	status: 0,
  	data: [    // 长度为 10
	  {
	  	name: 'mock',
		 age: 11
	  }
	]
}
```
# 使用 swagger 
如果后端能提前提供 swagger ，可以引入 swagger  生成数据。配置的时候在前面加上 swagger + 空格 即可。
```js
module.exports = {
	"/ncrm/*":   "swagger https://imp-daily.uc.test/ncrm/v2/api-docs"
}
```
此时当浏览器访问 http://localhost:8080/ncrm/agent/list 的时候，会去 swagger 查找相应的规则，然后返回数据。

# 引入 Mock.js
[Mock.js](http://mockjs.com/) 是常用的辅助生成模拟数据的第三方库。freemock 已经引入了 mockjs，所以不需要我们再手动引入，直接在设置 data 的时候使用 mockjs 语法即可，比如：
```js
module.exports = {
	'/api/tags': {
    		'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
     },
}
```
生成的数据
```json
{
	list: [
	  {
	  	name: '北京市',
		  value: 23,
		  type: 1
	  }
	  ... // 此处长度为 100
	]
}
```

在生成数据时，freemock 会去执行 mock 函数解析 mockjs 的语法。当然同样可以在 json 文件里这么用。例如：
```js
module.exports = {
	'/api/tags': '/mock'
}
```
/mock/api/tags.json
```js
{
    "list|100":  [{ name: "@city", "value|1-100":  50, "type|0-2": 1 }]
 }
```

# 接入非 cli 工具
```js
npm install freemockjs --save-dev
```

### server.js 接入
在 server.js 里加入：

```js
const freeMock = require('freemockjs')
const bodyParser = require('body-parser')   
.
.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(freeMock(path.resolve('./mock/config.js')))  // freeMock(path.resolve('./mock/config.js') 为配置文件的地址
```
### 在 vue-cli 接入
vue.config.js
```js
const bodyParser = require('body-parser')
const freeMock = require('freemockjs')
...
module.exports = {
  baseUrl: '..**',
  devServer: {
    port: 9010,
    before: function(app) {
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(freeMock(path.resolve('./mock/config.js')))
    }
  }
}

```