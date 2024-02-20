import createError from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import authRoutes from "./routes/authRouter.js"
import carRouter from './routes/carRouter.js';
import bikeRouter from './routes/bikeRouter.js';

import {Readable} from 'stream';

const sekretKeyCookie = 'npowuepfw52w65tybvUut!fdg';
const rs = Readable();

const app = express();
const url = "mongodb://myUserAdmin:abc123@localhost:27017/Cars&Bikes?authSource=admin"; 


  mongoose.connect(url).then(()=> {
  console.log("Подключение установлено");
  }).catch(err => console.log(err));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled





app.use(bodyParser.json());

// view engine setup
app.set("view engine", "hbs");
app.set('views', "./views");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

export default app;
