"use strict"

const router = require('express').Router()
const MainController = require('../controllers/mainController')

router.post('/:role', MainController.login)

module.exports = router