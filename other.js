var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

app.engine("html",require("ejs").__express)
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, '/')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/huihui', function(req, res) {
  res.json({
    name: 'cxh',
    age: '24'
  })
})
app.get('/hui', function(req, res) {
  console.log(22)
  res.json({
    name: 'cxh',
    age: '24'
  })
})
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

var port = normalizePort('3003')

app.set('port', port)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

app.listen(port)