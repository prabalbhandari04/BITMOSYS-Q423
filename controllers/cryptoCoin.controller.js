// controllers/cryptoController.js
const Crypto = require('../models/cryptoCoin.model');

// Create a new crypto
exports.createCrypto = async (req, res) => {
  try {
    const crypto = new Crypto(req.body);
    const savedCrypto = await crypto.save();
    res.status(201).json(savedCrypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cryptos
exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json(cryptos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get crypto by ID
exports.getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    if (!crypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.status(200).json(crypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update crypto by ID
exports.updateCryptoById = async (req, res) => {
  try {
    const updatedCrypto = await Crypto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCrypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.status(200).json(updatedCrypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete crypto by ID
exports.deleteCryptoById = async (req, res) => {
  try {
    const deletedCrypto = await Crypto.findByIdAndDelete(req.params.id);
    if (!deletedCrypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
