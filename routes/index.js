const express = require('express')
const contactController = require('./contact.controller')

const router = express.Router()

//contact
router.get('/contacts', contactController.getContact)
router.post('/contacts', contactController.saveContact)

module.exports = router