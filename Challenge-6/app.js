require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var controllers = require('./controllers');
var router = require('./routes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('home');
})
app.use(router);
// app.use('/users', usersRouter);

// 404 handler
app.use(controllers.notFound);

//500 handler
app.use(controllers.exception);

module.exports = app;
