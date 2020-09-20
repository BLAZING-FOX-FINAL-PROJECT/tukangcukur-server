"use strict"

const router = require('express').Router()
const customer = require('./customer')
const tukangCukur = require('./tukangCukur')
const verify = require('./verify')
const transaksi = require('./transaksi')
const varian = require('./varian')
const login = require('./login')

router.use('/customer', customer)
router.use('/tukangcukur', tukangCukur)
router.use('/verify', verify)
router.use('/login', login)
router.use('/transaksi', transaksi)
router.use('/varian', varian)


module.exports = router