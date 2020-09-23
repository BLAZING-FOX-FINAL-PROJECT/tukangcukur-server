"use strict"

const router = require('express').Router()
const tukangCukurController = require('../controllers/tukangCukurController')
const {authenticate} = require('../middlewares/auth')

router.get('/all', tukangCukurController.getTukangCukurs)
router.get('/', authenticate, tukangCukurController.getTukangCukur)
router.post('/', tukangCukurController.postTukangCukur)
router.get('/:id', tukangCukurController.getTukangCukur)
router.put('/:id', tukangCukurController.putTukangCukur)
router.patch('/:id', authenticate, tukangCukurController.patchTukangCukur)
router.delete('/:id', tukangCukurController.delTukangCukur)

module.exports = router