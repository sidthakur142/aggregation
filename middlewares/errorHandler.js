const createError = require("http-errors");

function errorHandler(err, req, res, next) {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || "Something went wrong!";

  res.send({
    Error: {
      status: errStatus,
      message: errMessage,
    },
  });
}

module.exports = errorHandler;
