const jwt = require('jsonwebtoken')
const {TukangCukur, Customer, Transaction} = require('../models')
const { Op } = require("sequelize");

async function authenticate(req, res, next) {
  try {
    // payload: {id, role}
    const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    if (!payload) {
      next({
        status: 401,
        message: "Invalid Token!"
      })
    } else {
      if (payload.role === 'customer') {
        const user = await Customer.findOne({where: { id: payload.id }})
        if (user) {
          req.access_id = user.id
          req.role = payload.role
          next()
        } else {
          throw err
        }
      } else if (payload.role === 'tukangcukur') {
        const user = await TukangCukur.findOne({where: { id: payload.id }})
        if (user) {
          req.access_id = user.id
          req.role = payload.role
          next()
        } else {
          throw err
        }
      } else {
        next({
          status: 401,
          message: "Unidentifed Role!"
        })
      }
  }
  } catch (err) {
    next({
      status: 401,
      message: "Invalid Token!"
    })
  }
}

async function authorize(req, res, next) {
  try {
    const id = req.params.id
    if (req.role === 'customer') {
      const transaction = await Transaction.findOne({
        where: {
          [Op.and]: [
            { CustomerId: req.access_id },
            { id }
          ]
        }
      })
      if (transaction) next()
      else throw err
    } else if (req.role === 'tukangcukur') {
      const transaction = await Transaction.findOne({
        where: {
          [Op.and]: [
            { TukangCukurId: req.access_id },
            { id }
          ]
        }
      })
      if (transaction) next()
      else throw err
    }
  } catch (error) {
    next({
      status: 401,
      message: "Unauthorized action!"
    })
  }
}

module.exports = { authenticate, authorize }

