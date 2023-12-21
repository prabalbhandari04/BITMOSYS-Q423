// routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

// Create a new crypto
router.post('/buy/:id', walletController.buyCrypto);

module.exports = router;
