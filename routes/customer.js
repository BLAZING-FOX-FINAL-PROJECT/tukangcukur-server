"use strict"

const router = require('express').Router()

const customerController = require('../controllers/customerController')
const {authenticate} = require('../middlewares/auth')


router.get('/all', customerController.getCustomers)
router.get('/', authenticate, customerController.getCustomer)
router.post('/', customerController.postCustomer)
router.get('/:id', customerController.getCustomer)
router.put('/:id', customerController.putCustomer)
router.delete('/:id', customerController.delCustomer)



module.exports = router