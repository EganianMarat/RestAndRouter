const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const authRoutes = require("./routes/authRouter")
const carRouter = require('./routes/carRouter');
const bikeRouter = require('./routes/bikeRouter');
const cookieParser = require('cookie-parser');
const sekretKeyCookie = 'npowuepfw52w65tybvUut!fdg';

const app = express();

app.use(bodyParser.json());

// view engine setup
app.set("view engine", "hbs");
app.set('views', "./views");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(sekretKeyCookie))

app.use("/", authRoutes)
app.use('/cars', carRouter);
app.use('/bikes', bikeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
