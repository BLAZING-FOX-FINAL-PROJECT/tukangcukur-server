"use strict"

const router = require('express').Router()

const customerController = require('../controllers/customerController')
const {authenticate,authorize} = require('../middlewares/auth')

router.get('/', customerController.getCustomers)
router.post('/', customerController.postCustomer)
router.get('/:id', authenticate, customerController.getCustomer)
router.put('/:id', authenticate, authorize, customerController.putCustomer)
router.delete('/:id', authenticate, authorize, customerController.delCustomer)



module.exports = router