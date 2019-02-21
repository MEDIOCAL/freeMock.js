function swagger({paths, definitions, basePath, manualProps = {}}) {
    return function(req) {
        let path = req.path
        let method = req.method

        if(!paths || !definitions) {
            return null
        }
        path = path.replace(basePath, '')

        const sw = paths[path]
        
        if(!sw) {
            console.log('\t\t', 'swagger 文档中未查询到该路径')
            return null
        }

        const temp = sw[method.toLowerCase()]
        
        if(!temp) {
            console.log('\t\t', '未找到' + method + '方法对应的描述')
            return null
        }

        const { responses } = temp
        let result = null

        if(responses[200] && responses[200].schema) {
            const definition = definitions[getOriginalRef(responses[200].schema)]
            result = getMockTemp(definition)
            return mock(result, definitions, manualProps, req)
        }

        console.log('\t\t', '未找到 status 为 200 的数据格式')
        return null
    }
}

function getMockTemp(definition) {
    if(!definition) {
        return {}
    }

    if(definition.type && definition.type === 'object') {
        return definition.properties
    }
}

function mock(properties, definitions, manualProps, req) {
    const types = ['string', 'boolean', 'integer']
    const result = {}

    for(let [key, value] of Object.entries(properties)) {
        const type = value.type
        if(types.includes(type)) {
            result[key] = createDataByType(value, key, manualProps, req)
        } else if(getOriginalRef(value) && definitions[getOriginalRef(value)]) { 
            let def = getMockTemp(definitions[getOriginalRef(value)])
            if(Object.keys(def).join() === Object.keys(properties).join()) {
                result[key] = {}
            } else {
                result[key] = mock(def, definitions, manualProps, req)
            }
        } else if(value.items && getOriginalRef(value.items) && definitions[getOriginalRef(value.items)]) {  // 对象数组
            let def = getMockTemp(definitions[getOriginalRef(value.items)])
            let arr = []
            let length = getArrayLength(manualProps, key, req)

            for(let index = 0; index < length; index ++) {
                if(Object.keys(def).join() === Object.keys(properties).join()) {
                    arr.push({})
                } else {
                    arr.push(mock(def, definitions, manualProps, req))
                }
            }
            result[key] = arr
        } else if(value.items && value.items.type) {    // 普通数组
            let arr = []
            let length = getArrayLength(manualProps, key, req)

            for(let i = 0; i < length; i++) {
                arr.push(createDataByType(value))
            }

            result[key] = arr
        } else if(type === 'array') {
            result[key] = []
        } else if(type === 'object') {
            result[key] = {}
        } else {
            result[key] = ''
        }
    }

    return result
}

function getOriginalRef(schema) {
    if(!schema) {
        return ''
    }

    if(schema.originalRef) {
        return schema.originalRef
    }

    if(schema['$ref']) {
        return schema['$ref'].replace('#/definitions/', '')
    }

    return ''
}

function getArrayLength(manualProps, key, req) {
    let length = 5
    
    if(Object.keys(manualProps).includes(key)) {
        if(typeof manualProps[key] === 'object' && manualProps[key].length != undefined) {
            length = manualProps[key].length
        } else if(typeof manualProps[key] === 'function') {
            const v = manualProps[key](req) 
            length = v && v.length || 5
        }   
    }

    return length
}

function createDataByType(value, key, manualProps, req) {
    const { type, format, enum: enums } = value 
    
    const manualKey = Object.keys(manualProps)
    
    if(manualKey.includes(key)) {
        const result = manualProps[key]
        if(typeof result === 'function') {
            const val = result(req)
            if(typeof val != 'object') {
                return val
            }
        } else {
            return result
        }
    }

    switch(type) {
        case 'boolean':
            return boolean(key)
        case 'integer':
            return integer(format, key, enums)
        default:
            return string(key, enums)
    }
}

function boolean(key = '', ) {
    if(Math.random() > 0.8) {
        return false
    }
    return true
}

function integer(format, key = '', enums) {
    if(enums) {
        const index = Math.floor(Math.random() * enums.length)
        return enums[index]
    }

    if(key.indexOf('id') < 0 && key.indexOf('Id') < 0) {
        return Math.round(Math.random())
    }

    if(format === 'int16') {
        return Math.ceil(Math.random() * 32767)
    } else if(format === 'int32') {
        return Math.ceil(Math.random() * 2147483647)
    } else {
        return Math.ceil(Math.random() * 9223372036854775807)
    }
}

function string(key = '', enums) {
    if(enums) {
        const index = Math.floor(Math.random() * enums.length)
        return enums[index]
    }
    
    if(key.indexOf('date') >= 0 || key.indexOf('Date') >= 0) {
        let date = new Date()
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }

    if(key.indexOf('time') >= 0 || key.indexOf('Time') >= 0) {
        let date = new Date()
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    const len = Math.ceil(Math.random() * 10) + 10
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZ abcdefhijkmnprstwxyz '

    if(key.indexOf('email') >= 0 || key.indexOf('Email') >= 0) {
        const i = Math.floor(Math.random() * 4)
        return $chars.slice(i, i + 5) + '@' + $chars.slice(i, i + 3) + '.com'
    }

    if(key.indexOf('url') >= 0 || key.indexOf('Url') >= 0) {
        return 'http://' + $chars.slice(i, i + 5) + '.com'
    }

    let pwd = ''

    for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * $chars.length));
　　 }

    return pwd
}


module.exports = swagger