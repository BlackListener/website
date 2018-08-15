const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('./logger').getLogger('website:app', 'cyan')
const indexRouter = require('./routes/index')
const replaceAll = function(str, before, after) {
  return str.split(__dirname).join("");
};
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next()
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.status(404)
  res.send(`${replaceAll(err.stack.replace(/\n/gm, "<br />"))}`);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message.replace(__dirname, "<root>")
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
