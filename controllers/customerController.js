// const {Customer} = require("../models")

class customerController {
  static async getCustomers(req, res, next) {
    try {
      res.send('tes get customer')
    } catch (error) {
      res.send(error)
    }
  }


  static async postCustomer(req, res, next) {
    try {
      res.send('tes get postCustomer')
    } catch (error) {
      res.send(error)
    }
  }

  static async getCustomer(req, res, next) {
    try {
      res.send('tes get getCustomer')
    } catch(err) {
      next(err.name)
    }
  }

  static async putCustomer(req, res, next) {
    try {
      res.send('tes get putCustomer')
    } catch (error) {
      res.send(error)
    }
  }

  static async delCustomer(req, res, next) {
    try {
      res.send('tes get delCustomer')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = customerController