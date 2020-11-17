const path = require('path')
module.exports = function(impdata, req, res) {
    if(typeof impdata != 'object') {
        return impdata
    }

    const result = {}

    if(impdata.state) {
        result.state = impdata.state
    } else {
        const state = { pureProxy: true }
        Object.keys(impdata).filter(key => (/^[a-zA-Z0-9_]+$/.test(key))).forEach(key => {
            state[key] = impdata[key]
        })
        result.state = state
    }

    if (result.state.pureProxy === undefined) {
        result.state.pureProxy = true
    }

    if(impdata.mockData) {
        result.mockData = impdata.mockData
    } else {
        const mockData = Object.entries(impdata)
        .filter(el => {
            const key = el[0]
            return /^\/.+/.test(key) 
        }).map(([key, val]) => {
            const moc = { url: key }
            if(typeof val === 'string') {
                val = val.trim()
            }

            if(typeof val === 'string' && val.indexOf('SSE') === 0) {
                moc.sse = true
                val = val.replace('SSE', '').trim()
            }

            if(typeof val === 'string' && val.indexOf('LONG') === 0) {
                moc.long = true
                val = val.replace('LONG', '').trim()
            }

            // 路径
            if(typeof val === 'function') {
                moc.data = val
            } else if(typeof val === 'object') {
                moc.data = val 
            } else if(/^\/([\w-\.$]+){1}$/.test(val)) {
                moc.dirpath = path.resolve('./' + val)
            } else if(/^\/([\w-\.$]+\/?)+$/.test(val)) {
                moc.dirpath = val
            } else if(val.indexOf('swagger') === 0) {
                moc.swagger = val.replace('swagger', '').trim()
            } else if(val.indexOf('http') === 0) {
                moc.proxy = val
            }

            return moc
        })
        result.mockData = mockData
    }
    return result
}