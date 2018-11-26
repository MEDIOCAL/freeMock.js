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
    
    console.log('...\n...\n...\n',color(`...s${message}`),error,'\n...\n')
}