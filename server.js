const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-sessiom');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const catsRouter = require('./routes/cats');
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
const vetsRouter = require('./routes/vets');
const apptsRouter = require('./routes/appts');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/cats', catsRouter);
app.use('/', notesRouter);
app.use('/users', usersRouter); // check if these are right
app.use('/vets', vetsRouter); // check if these are right
app.use('/', apptsRouter); // check if these are right

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
