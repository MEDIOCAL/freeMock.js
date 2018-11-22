const fs = require('fs')
const Mock = require("./mock")
const creatName = require('./createPathName.js')

module.exports = function requestDirFile(req, state, response) {
    const path = req.path 
    const dir_path = state.dirpath
    const mock = new Mock(req, state)
    const params = Object.assign({}, state.query, state.params)

    let name = dir_path + path
    let data = {}
    let mockJson = null

    if(state.readFile) {
        name = creatName(state.readFile, params, name, req)
    }
    
    name = name + '.json'

    try {
        mockJson = JSON.parse(fs.readFileSync(name, 'utf-8'))
        if(Array.isArray(mockJson)) {
            mockJson = mock.array(mockJson)
        } else if(typeof mockJson === 'object' && mockJson != null) {
            mockJson = mock.object(mockJson)
        }
        console.log("已读取：" + name + "的数据")
    } catch(err) {
        console.log('读文件出错', err)
    }

    data = mockJson || req.mockData || {
        status: response && response.statusCode || -1,
        msg: "数据格式有误，请检查接口正确"
    }

    return data
}


