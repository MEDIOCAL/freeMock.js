var colors = require('colors')

colors.setTheme({
    prompt: 'grey',
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    log: 'white'
})

module.exports = function(isLog, level, message, error = '') {
    if(!isLog) {
        return
    }
    const color = colors[level] || colors.log
    if(typeof error === 'object') {
        console.log('\t',color(`${message}`),'\n')
        console.log("%j", error)
    } else {
        console.log('\t',color(`${message}`),error,'\n')
    }
    
}