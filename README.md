# freeMock.js

#### What can you do with freeMock

Automatically refresh the data every time the API is called

Generating data from the user's params

Analog login operation


##### Quick get start

```
server.js

```
app.use(freeMock(config))
```
config.js

```
module.exports = {
    mockData: [{
        url:'/test1',
        method:'GET',
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
        method: 'GET',
        data: {
            name: "123",
            template: "456"
        }
    }, {
        url:'/wolongweb/plan/listNaive',
        proxy: 'https://ad-test1.sm.cn',
        method: 'GET',
        port: '443',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'ad-test1.sm.cn',
            'Referer': 'https://ad-test1.sm.cn/cpc/static/index.html?uid=1061',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Cookie': '3428.1539223421.'
        }
    }],
    state: {
        
    }
}
```

### 配置文件
config 是一个对象：
```
{
    mockData //代表需要配置的接口，以及返回的数据
    state  //接口需要的公共属性
}
```
#### mockData：
mockData 是一个对象数组。
```
[
    {
        url //必需，接口的路径。例如 /A 注意前面要加 “/”
        data //默认为 {}。代表接口返回的数据。是一个 json 数据。
        method  // 不设代表 get Post 都可以
        proxy   // 代理开关，当为 true 时，将使用state里配置的代理方式。当为字符串时，使用当前方式。不设，代表不走代理
        port    // 代理的 port
        headers // 代理请求的 headers
    }
]
```
#### API


#### State


### 基础语法

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
