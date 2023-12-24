// routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

// Create a new crypto
router.post('/buy/:id', walletController.buyCrypto);
router.post('/exchange/:id', walletController.exchangeCrypto);
router.get('/wallet', walletController.getWalletCombined);

module.exports = router;
