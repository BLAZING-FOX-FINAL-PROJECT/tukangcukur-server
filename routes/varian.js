"use strict"

const router = require('express').Router()
const MainController = require('../controllers/MainController')
const {authenticate} = require('../middlewares/auth')

router.get('/', authenticate, MainController.getVarian)

module.exports = router