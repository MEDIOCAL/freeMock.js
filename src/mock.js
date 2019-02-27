const Mock = require('mockjs')

function analysis(temp, req) {
    if(!temp) {
        return temp 
    }

    const reg = /@param(.[0-9a-zA-Z_$]+)+/g

    if(typeof temp === 'object') {
        temp = JSON.stringify(temp)
        temp = temp.replace(reg, function($1) {
            const query = $1.split('.').splice(1)
            let body = req.query || req.body || {}
            
            for(let q of query) {
                body = body[q]
            }

            return body
        })
    }

    return JSON.parse(temp)
}

function mock(req, state) {
    return function(mockTemp) {
        if(!mockTemp) {
            return mockTemp
        }

        let temp = mockTemp

        if(typeof mockTemp === 'function') {
            temp = mockTemp(req, state)
        }

        const data = analysis(temp, req, state)
        
        if(!data || typeof data != 'object') {
            return data
        }

        return Mock.mock(data)
    }
}

module.exports = mock