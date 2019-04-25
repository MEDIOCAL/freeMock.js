module.exports = {
    mockData: [{
        url: '/opt/web/*',
    }, {
        url: '/opt/dict/*',
    }, {
        url: '/ncrm/*',
    }],
    state: {
        dirpath: __dirname,
        readFile: true,
        swagger: 'imp-daily.uc.test/ncrm/v2/api-docs',
        debugger: false,
    }
}