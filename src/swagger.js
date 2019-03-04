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
                request.get(state.swagger).set({'Cookie': (md.headers || md.headers.Cookie || state.Cookie)}).end(function(err, res) {
                    if(err) {
                        loger(true, 'warn', '请求 swagger 出错', req.path)
                        reslove(null)
                    } else {
                        reslove(res.body)
                    }
                })
            } catch(err) {
                loger(true, 'warn', '请求 swagger 出错', req.path)
                reslove(null)
            }
        })
    }

    if(!swagger) {
        return null
    }
    
    const swaggerManualProps = md.swaggerManualProps || state.swaggerManualProps 

    if(swaggerManualProps) {
        swagger.manualProps = Object.assign({
            pageNo: res => (res.query.pageNo || req.body.pageNo || 1),
            pageSize: res => (res.query.pageSize || req.body.pageSize || 20),
            data: res => ({ length: res.query.pageSize || res.body.pageSize || 20 }),
            result: res => ({ length: res.query.pageSize || res.body.pageSize || 20 }),
        }, swaggerManualProps)
    }
    
    loger(true, 'info', '开始生成 swagger', req.path)
    const data = swagger2mock(swagger)(req)

    if(!data) {
        loger(true, 'warn', 'swagger 数据生成失败', req.path)
    } else {
        loger(true, 'info', '已根据 swagger 生成 mock 数据', req.path)
    }
    return data
}