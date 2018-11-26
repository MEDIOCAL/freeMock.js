const fs = require('fs')
const path = require('path')
const creatName = require('./createPathName.js')
const loger = require('./loger')

module.exports = function writeFile(req, state, data) {
    const rpath = req.path 
    const dir_path = state.dirpath
    const params = Object.assign({}, state.query, state.params)
    let name = ''
    console.log(state.configUrl)
    if(Array.isArray(dir_path) && dir_path.length === 2) {
        name = (dir_path[0] + rpath).replace(state.configUrl, dir_path[1])
    } else if(typeof dir_path === 'string') {
        name = dir_path + rpath
    } else {
        loger(true, 'warn', 'dirpath 必须是一个字符串或者长度为2的数组')
        name = path.resolve(__dirname, '../../../mock') + rpath 
    }
    console.log(name)
    name = creatName(state.readFile, params, name, req)
    name = name + '.json'
    console.log(name)
    makep(name)

    if(typeof data != 'string') {
        data = JSON.stringify(data)
    }
    
    fs.writeFile(name, data, 'utf8', function(err){
        if(err) {
            loger(true, 'error', '写文件时出错', err)
        } else {
            loger(true, 'info', '写文件操作成功, 已写入到：'+ name)
        }
    })

}

function makep(dir) {
    let paths = dir.split('/')
    console.log(dir)
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
                fs.open(name, "w", function(err) {
                    if(err) {
                        loger(true, 'info', "创建文件失败" + name, err)
                    } else {
                        loger(true, 'info', "文件创建成功，文件路径：" + name)
                    }
                })
            }
        }
    }
}