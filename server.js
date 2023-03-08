// => external import
const express = require("express");


// => internal import


// => middleware import

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");


// => route import



// Catching Uncaught Exceptions
// this should be very top or before any code executing
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});


const app = express();


// => db connect



// => middleware

// request parsers - pass incoming payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});



// => routing setup
app.get("/api/v1/ping", (req, res) =>{
  res.status(200).json({
    message: `Welcome to Blog API - Masud Rana`
  });
});


// 


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