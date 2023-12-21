// routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoCoin.controller');

// Create a new crypto
router.post('/crypto', cryptoController.createCrypto);

// Get all cryptos
router.get('/crypto', cryptoController.getAllCryptos);

// Get crypto by ID
router.get('/crypto/:id', cryptoController.getCryptoById);

// Update crypto by ID
router.put('/crypto/:id', cryptoController.updateCryptoById);

// Delete crypto by ID
router.delete('/crypto/:id', cryptoController.deleteCryptoById);

module.exports = router;
