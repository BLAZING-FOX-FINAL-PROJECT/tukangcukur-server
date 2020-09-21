"use strict"

const router = require('express').Router()
const MainController = require('../controllers/mainController')
const {authenticate} = require('../middlewares/auth')

router.get('/', authenticate, MainController.appVerify)

module.exports = router