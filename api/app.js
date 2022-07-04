const express = require('express');
var cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const weatherRouter = require('./routes/weather');

const app = express();

// Allowing everything through CORS for now
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/weather', weatherRouter);

module.exports = app;
