"use strict"

const router = require('express').Router()
const MainController = require('../controllers/MainController')
const {authenticate,authorize} = require('../middlewares/auth')

router.get('/', authenticate, MainController.getTransaksi)
router.get('/:id', authenticate, MainController.getTransaksiById)
router.post('/', authenticate, MainController.postTransaksi)
router.patch('/:id', authenticate, authorize, MainController.patchTransaksi)

module.exports = router