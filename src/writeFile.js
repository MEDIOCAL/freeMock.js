const fs = require('fs')
const path = require('path')
const creatName = require('./createPathName.js')
const loger = require('./loger')

module.exports = function writeFile(req, state, data, cb = null) {
    const dir_path = state.md.dirpath || state.dirpath
    const params = Object.assign({}, state.query, state.params)
    let fileConfig = ''
    let rpath = req.path
    let name = ''

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
    
    if(state.readFile && typeof state.readFile === 'object') {
        fileConfig = state.readFile
    } else if(state.writeFile && typeof state.writeFile === 'object') {
        fileConfig = state.writeFile
    }
    
    name = creatName(fileConfig, params, name, req)
    name = name + '.json'
    makep(name)

    if(typeof data != 'string') {
        data = JSON.stringify(data)
    }
    
    if(cb) {
        cb(name, data)
    } else {
        fs.writeFile(name, data, 'utf8', function(err) {
            if(err) {
                loger(true, 'error', '写文件时出错')
            } else {
                loger(true, 'info', '写文件操作成功, 已写入到：'+ name)
            }
        })
    }
}

function makep(dir) {
    let paths = dir.split('/')
    for(let i = 1; i < paths.length; i++) {
        let newPath = paths.slice(0,i).join('/')
        
        if(!newPath) {
            continue
        }
        
        try {
            fs.accessSync(newPath, fs.constants.R_OK)
        } catch (e) {
            if(newPath.indexOf('.json') < 0) {
                fs.mkdirSync(newPath)
            } else {
                fs.openSync(name, "w")
            }
        }
    }
}