var express = require('express');
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var authRouter = require('./routes/auth.route');

module.exports.configureRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/auth', authRouter);
}