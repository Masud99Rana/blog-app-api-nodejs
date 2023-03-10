// => external import
const express = require("express");
require('dotenv').config();
const morgan = require('morgan');

// => internal import
const connectDB = require('./config/db');

// => middleware import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");


// => route import
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");


// Catching Uncaught Exceptions
// this should be very top or before any code executing
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});


// => load env vars
// dotenv.config({ path: './config/config.env' });
// dotenv.config()


// => express app
const app = express();


// => db connect - Connect to database
connectDB();



// => Init Middleware

// request parsers - pass incoming payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// => middleware

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});



// => mount routes - define routes

// home route
app.get("/", (req, res) =>{
  res.status(200).json({
    message: `Welcome to Blog API - Masud Rana`
  });
});

// ping route
app.get("/api/v1/ping", (req, res) =>{
  res.status(200).json({
    message: `Welcome to Blog API - Masud Rana`
  });
});

//users route
app.use("/api/v1/users/", userRouter);
//categories route
app.use("/api/v1/categories", categoryRouter);
//posts route
app.use("/api/v1/posts", postRouter);
//comments route
app.use("/api/v1/comments", commentRouter);

// => error handlers middleware
// handling unhandled routes - 404 not found handler
app.use(notFoundHandler);
// app.use("*", (req, res) => {
//   console.log(req.originalUrl);
//   res.status(404).json({
//     message: `${req.originalUrl} - Route Not Found`,
//   });
// });

// common error handler
app.use(errorHandler);


//Listen to server
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});


// Handle Errors Outside Express Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});