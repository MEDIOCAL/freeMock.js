module.exports = function creatName(fileConfig, params, name, req) {
    if(Array.isArray(fileConfig) && fileConfig.length > 0){
        for(let cname of fileConfig) {
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
    } else if(typeof fileConfig === 'object') {
        const wf = fileConfig[req.path]
        if(wf) {
            return creatName(wf, params, name)
        }
    }
    return name
}