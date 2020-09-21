function errorHandler(err, req, res, next) {

  let statusCode = err.status
  let message = err.message

  res.status(statusCode).json({
    message
  })
}

module.exports = errorHandler