const fs = require('fs')
const path = require('path')
const mock = require("./mock")
const creatName = require('./createPathName.js')
const loger = require('./loger')

module.exports = function requestDirFile(req, state, isCompare = false, isMock = true) {
    const dir_path = state.md.dirpath || state.dirpath
    const params = Object.assign({}, state.query, state.params)
    let rpath = req.path
    let name = ''
    let data = {}
    let mockJson = null

    if(typeof state.md.readWriteFilePath === 'string') {
        rpath = req.path.replace(state.configUrl, state.md.readWriteFilePath)
    }

    if(Array.isArray(dir_path) && dir_path.length === 2) {
        const sp = state.configUrl.split('/').slice(1)
        let rp = sp.slice(dir_path[1][0], dir_path[1][1]).join('/')
        rp = rp ? '/' + rp : ''
        name = (dir_path[0] + rpath).replace(state.configUrl, rp)
    } else if(typeof dir_path === 'string') {
        name = dir_path + rpath
    } else {
       loger.warn(req.path + ': dirpath 必须是一个字符串或者长度为2的数组', 'Mock')
       name = path.resolve(__dirname, '../../../mock') + rpath 
    }

    if(state.readFile) {
        name = creatName(state.readFile, params, name, req)
    }
    
    name = name + '.json'

    try {
        mockJson = JSON.parse(fs.readFileSync(name, 'utf-8'))

        if(typeof mockJson === 'object' && mockJson != null && isMock) {
            mockJson = mock(req, state)(mockJson)
        }
    } catch(err) {
        !isCompare && loger.error(err, 'Mock-readFile')
    }
   
    data = mockJson || null
    
    return data
}


