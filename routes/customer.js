"use strict"

const router = require('express').Router()

const customerController = require('../controllers/customerController')

router.get('/', customerController.getCustomers)
router.post('/', customerController.postCustomer)
router.get('/:id', customerController.getCustomer)
router.put('/:id', customerController.putCustomer)
router.delete('/:id', customerController.delCustomer)



module.exports = router