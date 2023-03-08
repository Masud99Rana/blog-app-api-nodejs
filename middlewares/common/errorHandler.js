const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "failed";
  err.statusCode = 404;
  next(err);

  // next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  //status
  //message
  //stack
  const status = err.status ? err.status : "failed";
  const stack = err.stack;
  const message = err.message;
  const statusCode = err?.statusCode ? err.statusCode : 500;
  //send the response
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};