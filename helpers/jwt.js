const jwt = require("jsonwebtoken")

function userToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  if(token){
    return token
  } else {
    throw ({
      status: 401,
      message: 'jwt must be provided'
    })
  }
}

module.exports = userToken