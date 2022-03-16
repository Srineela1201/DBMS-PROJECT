const express = require('express')
const app = express()
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
var booksRouter = require('./Routes/books');
var memberRouter = require('./Routes/members');
var publishersRouter = require('./Routes/publishers');
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');
const PORT = 3000;
app.get('/', (req, res) => {
    res.render('index')
})
app.use('/books', booksRouter);
app.use('/members', memberRouter);
app.use('/publishers', publishersRouter);


app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));