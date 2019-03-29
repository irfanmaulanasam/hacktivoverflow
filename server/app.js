var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const users = require('./routes/users')
const answer = require('./routes/answer')
const question = require('./routes/question')
var indexRouter = require('./routes/index');

var app = express();

const mongoose = require('mongoose');
require('dotenv').config();
const databaseName = process.env.databaseName

app.use(cors())
mongoose.connect(`mongodb://localhost/${databaseName}`,{useNewUrlParser:true})
mongoose.set('useCreateIndex', true)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log('port server running')
app.use('/answer', answer);
app.use('/question', question);
app.use('/search', indexRouter);
app.use('/users', users);

module.exports = app;
