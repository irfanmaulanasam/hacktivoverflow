var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question');
var answerRouter = require('./routes/answer');

var app = express();

const mongoose = require('mongoose');
require('dotenv').config();
const databaseName = process.env.databaseName

mongoose.connect(`mongodb://localhost/${databaseName}`,{useNewUrlParser:true})
mongoose.set('useCreateIndex', true)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/search', indexRouter);

module.exports = app;
