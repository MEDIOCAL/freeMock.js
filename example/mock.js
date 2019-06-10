const path = require('path')
module.exports = {
    mockData: [{
        url: '/opt/mocks/*',
    }, {
        url: '/ncrm/*',
    }],
    state: {
        dirpath: path.resolve('./example'),
        readFile: true,
        debugger: false,
        mkfile: true,
    }
}