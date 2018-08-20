const Mock = require("./mock") 
const FreeMock = require("FreeMock")

module.exports = function() {
    const fm = new FreeMock(arguments)
    return async function (req, res, next) {
        const params = req.query || req.body
        let path = req.path
        let isArray = false
        let data = null

        const mockData = fm.mockData.find((val) => {
            return val.url === path
        }) || {}
  
        const mock = new Mock(params)

        for(let key in mockData) {
            if(key.indexOf('data|') >= 0) {
                let keys = key.split('|')
                let l = keys[1]
                data = mock.array(mockData[key], l)
                isArray = true
            } 
        }

        if(!isArray) {
            data = mock.object(mockData.data)
        }

        req.mockData = data

        await next()
    }
}