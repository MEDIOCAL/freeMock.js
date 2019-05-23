const fs = require('fs')
const path = require('path')
const mock = require("./mock")
const creatName = require('./createPathName.js')
const loger = require('./loger')

module.exports = function requestDirFile(req, state, response, isCompare = false) {
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
       loger(true, 'warn', 'dirpath 必须是一个字符串或者长度为2的数组')
       name = path.resolve(__dirname, '../../../mock') + rpath 
    }

    if(state.readFile) {
        name = creatName(state.readFile, params, name, req)
    }
    
    name = name + '.json'

    try {
        mockJson = JSON.parse(fs.readFileSync(name, 'utf-8'))

        if(typeof mockJson === 'object' && mockJson != null) {
            mockJson = mock(req, state)(mockJson)
        }

        if(isCompare) {
            loger(true, 'info', "正在对比数据")
        } else {
            loger(true, 'info', "已读取：" + name + "的数据")
        } 
    } catch(err) {
        !isCompare && loger(true, 'error', '读文件出错')
    }
   
    data = mockJson || null
    
    return data
}


