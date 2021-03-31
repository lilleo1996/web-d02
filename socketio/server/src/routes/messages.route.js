const express = require('express');
const router = express.Router()

const messagesController = require('../controllers/messages.controller')

router.get('/', messagesController.getMessages)

router.post('/', messagesController.createMessage)

module.exports = router;