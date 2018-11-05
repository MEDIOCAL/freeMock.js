
const axios = require("axios")

module.exports = function proxyRequire(md, state, req, res) {
    let proxy = typeof md.proxy === 'string' ? md.proxy : state.proxy
    let url = `${proxy}${req.path}`
    let method = (md.method || req.method).toLowerCase()
    let params = state.params
    let headers = Object.assign(
        {
            Cookie: state.Cookie
        }, 
        state.headers, 
        md.headers
    )
    console.log(method, url)
    axios[method](url, { params, headers })
    .then(function(response) {
        res.json(response.data)
    })
    .catch( err => {
        res.json({
            err
        })
    })
}