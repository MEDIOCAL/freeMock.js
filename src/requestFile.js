module.exports = function requestDirFile(req, state, response) {
    const path = req.path 
    const dir_path = state.dirpath
    let data = {}
    let mockJson = null

    try {
        mockJson = require(dir_path + path + '.json')
    } catch(err) {
        console.warn(err)
    }

    data = mockJson || req.mockData || {
        status: response && response.statusCode || -1,
        msg: "数据格式有误，请检查接口正确"
    }

    return data
}