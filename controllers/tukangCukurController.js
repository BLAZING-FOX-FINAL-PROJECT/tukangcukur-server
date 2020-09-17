"use strict"

class tukangCukurController{
  static async getTukangCukurs(req, res, next) {
    try {
      res.send('tes get customer')
    } catch (error) {
      res.send(error)
    }
  }

  static async postTukangCukur(req, res, next) {
    try {
      res.send('tes get postCustomer')
    } catch (error) {
      res.send(error)
    }
  }

  static async getTukangCukur(req, res, next) {
    const id = req.params.id
    try {
      res.send('tes get getTukangCukur')
    } catch(err) {
      next(err.name)
    }
  }

  static async putTukangCukur(req, res, next) {
    const id = req.params.id
    try {
      res.send('tes get putCustomer')
    } catch (error) {
      res.send(error)
    }
  }

  static async patchTukangCukur(req, res, next) {
    const id = req.params.id
    try {
      res.send('tes get putCustomer')
    } catch (error) {
      res.send(error)
    }
  }

  static async delTukangCukur(req, res, next) {
    const id = req.params.id
    try {
      res.send('tes get delCustomer')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = tukangCukurController