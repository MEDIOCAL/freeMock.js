const swagger2mock = require('./swagger2mock')
const loger = require('./loger')
const request = require('superagent')

module.exports = async function(req, state, md) {
    let swagger = {}
    if(typeof state.swagger === 'object') {
        swagger = state.swagger
    } else {
        swagger = await new Promise(function(reslove) {
            try {
                request.get(state.swagger).set({'Cookie': md.headers && md.headers.Cookie || state.Cookie}).end(function(err, res) {
                    if(err) {
                        reslove(null)
                    } else {
                        reslove(res.body)
                    }
                })
            } catch(err) {
                loger(true, 'warn', '读取swagger出错', req.path)
                reslove(null)
            }
        })
    }
    
    loger(true, 'info', '开始生成 swagger', req.path)
    const data = swagger2mock(swagger)(req.path)

    if(!data) {
        loger(true, 'warn', 'swagger 读取失败', req.path)
    } else {
        loger(true, 'info', '已根据 swagger 生成 mock 数据', req.path)
    }
    return data
}