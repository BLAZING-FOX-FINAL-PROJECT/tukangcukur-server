"use strict"

const router = require('express').Router()
const MainController = require('../controllers/MainController')
const {authenticate} = require('../middlewares/auth')

router.post('/:role', MainController.login)

module.exports = router