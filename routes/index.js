"use strict"

const router = require('express').Router()
const customer = require('./customer')
const tukangCukur = require('./tukangCukur')

router.use('/customer', customer)
router.use('/tukangcukur', tukangCukur)

module.exports = router