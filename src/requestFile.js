const Mock = require("./mock")
const fs = require('fs')

module.exports = function requestDirFile(req, state, response) {
    const path = req.path 
    const dir_path = state.dirpath
    const mock = new Mock(req, state)
    let data = {}
    let mockJson = null

    try {
        mockJson = JSON.parse(fs.readFileSync(dir_path + path + '.json', 'utf-8'))
        if(Array.isArray(mockJson)) {
            mockJson = mock.array(mockJson)
        } else if(typeof mockJson === 'object' && mockJson != null) {
            mockJson = mock.object(mockJson)
        }
    } catch(err) {
        console.log('读文件出错', err)
    }

    data = mockJson || req.mockData || {
        status: response && response.statusCode || -1,
        msg: "数据格式有误，请检查接口正确"
    }

    return data
}