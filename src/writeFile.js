const fs = require('fs')

module.exports = function writeFile(req, state, data) {
    const path = req.path 
    const dir_path = state.dirpath
    const params = Object.assign({}, state.query, state.params)
    let name = dir_path + path
    
    if(Array.isArray(state.writeFile) && state.writeFile.length > 0){
        for(let cname of state.writeFile) {
            if(
                params[cname] && 
                (
                    typeof params[cname] === 'string' ||
                    typeof params[cname] === 'number'
                )
            ) {
                name += `_${params[cname]}`
            }
        }
    }

    name = name + '.json'
    
    makep(name)

    if(typeof data != 'string') {
        data = JSON.stringify(data)
    }
    
    fs.writeFile(name, data, 'utf8', function(err){
        if(err) {
            console.log("写文件时出错", err)
        } else {
            console.log('写文件操作成功')
        }
    })

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
                fs.open(name, "w", function(err) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("文件创建成功")
                    }
                })
            }
        }
    }
}