
const axios = require("axios")

module.exports = function proxyRequire(md, state, req, res) {
    let url = `${md.proxy}${req.path}`
    let method = (md.method || req.method).toLowerCase()
    let headers = Object.assign(
        {
            Cookie: state.Cookie
        }, 
        state.headers, 
        md.headers
    )

    axios[method](url, { headers })
    .then(function(response) {
        res.json(response.data)
    })
    .catch( err => {
        res.json({
            err
        })
    })
}