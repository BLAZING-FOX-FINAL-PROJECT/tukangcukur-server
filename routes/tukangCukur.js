"use strict"

const router = require('express').Router()
const tukangCukurController = require('../controllers/tukangCukurController')
const {authenticate} = require('../middlewares/auth')

router.get('/', tukangCukurController.getTukangCukurs)
router.post('/', tukangCukurController.postTukangCukur)
router.get('/:id', tukangCukurController.getTukangCukur)
router.put('/:id', tukangCukurController.putTukangCukur)
router.patch('/:id', authenticate, tukangCukurController.patchTukangCukur)
router.delete('/:id', tukangCukurController.delTukangCukur)

module.exports = router