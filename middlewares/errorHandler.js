function errorHandler(err, req, res, next) {
  console.log(err, '<<< ERROR HANDLER RESPONSE');

  let statusCode = err.status
  let message = err.message

  if(err.name === 'JsonWebTokenError'){
    statusCode = 400
    message = err.message
  }

  res.status(statusCode).json({
    message
  })
}

module.exports = errorHandler