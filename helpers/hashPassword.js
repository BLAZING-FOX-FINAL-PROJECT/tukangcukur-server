const bcrypt = require('bcryptjs')


function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { comparePassword }