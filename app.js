//import packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import custom packages
var AppConfig = require('./config/config');
var config=require('./routes.config');

var app = express();

// set application views path
app.set('views', path.join(__dirname, 'views'));

//set application view engine
app.set('view engine', 'jade');

//set application secret
app.set('superSecret', AppConfig.secret);

//application logger configuration
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure database
AppConfig.configureMongoDb();
//Routes configuration
config.configureRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
