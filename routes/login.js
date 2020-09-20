"use strict"

const router = require('express').Router()
const MainController = require('../controllers/MainController')

router.post('/:role', MainController.login)

module.exports = router