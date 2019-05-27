const swagger2mock = require('./swagger2mock')
const loger = require('./loger')
const request = require('superagent')

module.exports = async function(req, state, md) {
    let swagger = md.swagger || state.swagger
    if(typeof swagger != 'object') {
        const swaggerapi = swagger
        swagger = await new Promise(function(reslove) {
            try {
                request.get(swaggerapi).set({'Cookie': (md.headers && md.headers.Cookie || state.Cookie || 'no')}).end(function(err, res) {
                    if(err) {
                        loger.error('请求 swagger 出错', 'Mock')
                        reslove(null)
                    } else {
                        reslove(res.body)
                    }
                })
            } catch(err) {
                loger.error(err, 'Mock')
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
    
    const data = swagger2mock(swagger)(req)

    if(!data) {
        loger.warn(req.path + ': swagger 数据生成失败', 'Mock')
    } else {
        loger.info(req.path + ': 已根据 swagger 生成 mock 数据', 'Mock')
    }
    return data
}