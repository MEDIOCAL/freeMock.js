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
            return null
        }

        const temp = sw[method.toLowerCase()]
        
        if(!temp) {
            return null
        }

        const { responses } = temp
        let result = null

        if(responses[200] && responses[200].schema && responses[200].schema.originalRef) {
            const definition = definitions[responses[200].schema.originalRef]
            result = getMockTemp(definition)
        }
        return mock(result, definitions, manualProps, req)
    }
}

function getMockTemp(definition) {
    if(definition.type && definition.type === 'object') {
        return definition.properties
    }
}

function mock(properties, definitions, manualProps, req) {
    const types = ['string', 'boolean', 'integer']
    const result = {}

    for(let [key, value] of Object.entries(properties)) {
        const type = value.type
        const format = value.format
        
        if(types.includes(type)) {
            result[key] = createDataByType(type, format, key, manualProps, req)
        } else if(value.originalRef && definitions[value.originalRef])  { 
            let def = getMockTemp(definitions[value.originalRef])
            result[key] = mock(def, definitions, manualProps, req)
        } else if(value.items && value.items.originalRef && definitions[value.items.originalRef]) {
            let def = getMockTemp(definitions[value.items.originalRef])
            let arr = []
            let length = 5
            if(
                Object.keys(manualProps).includes(key) && 
                typeof manualProps[key] === 'object' && 
                manualProps[key].length != undefined
            ) {
                length = manualProps[key].length
            }

            for(let index = 0; index < length; index ++) {
                arr.push(mock(def, definitions, manualProps, req))
            }
            result[key] = arr
        } else if(typeof type === 'object') {
            result[key] = {}
        } else {
            result[key] = ''
        }
    }

    return result
}

function createDataByType(type, format, key, manualProps, req) {
    const manualKey = Object.keys(manualProps)
    
    if(manualKey.includes(key)) {
        const result = manualProps[key]
        if(typeof result === 'function') {
            return result(req)
        } 
        return result
    }

    switch(type) {
        case 'boolean':
            return boolean(key)
        case 'integer':
            return integer(format, key)
        default:
            return string(key)
    }
}

function boolean(key) {
    return true
}

function integer(format, key) {
    const p = ['pageNo', 'pageSize']
    if(p.includes(key)) {
        return Math.ceil(Math.random() * 20)
    }

    if(format === 'int16') {
        return Math.ceil(Math.random() * 32767)
    } else if(format === 'int32') {
        return Math.ceil(Math.random() * 2147483647)
    } else {
        return Math.ceil(Math.random() * 9223372036854775807)
    }
}

function string(key) {
    const len = Math.ceil(Math.random() * 10) + 10
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZ abcdefhijkmnprstwxyz '
    let pwd = ''

    for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * $chars.length));
　　 }

    return pwd
}


module.exports = swagger