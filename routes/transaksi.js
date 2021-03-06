"use strict"

const router = require('express').Router()
const MainController = require('../controllers/mainController')
const {authenticate,authorize} = require('../middlewares/auth')
const {matcher} = require('../middlewares/matcher')

router.get('/', authenticate, MainController.getTransaksi)
router.get('/ongoing', authenticate, MainController.getOngoingTransaksi)
router.get('/:id', authenticate, MainController.getTransaksiById)
router.post('/', authenticate, matcher, MainController.postTransaksi)
router.patch('/:id', authenticate, authorize, MainController.patchTransaksi)

module.exports = router