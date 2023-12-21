// controllers/cryptoController.js
const Crypto = require('../models/cryptoCoin.model');
const Wallet = require('../models/wallet.model');

// Buy crypto and update wallet
exports.buyCrypto = async (req, res) => {
  const cryptoId = req.params.id;

  try {
    // Find the crypto based on its ID
    const crypto = await Crypto.findById(cryptoId);

    if (!crypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }

    // Find or create the wallet entry
    let walletArray = await Wallet.findOne();

    if (!walletArray) {
      // If the wallet array doesn't exist, create a new one with the wallet for the current crypto
      walletArray = new Wallet({
        coins: [{
          crypto: cryptoId,
          cryptoName: crypto.name,
          cryptoSymbol: crypto.symbol,
          cryptoLogo: crypto.image,
          quantity: req.body.quantity,
        }]
      });
    } else {
      // Check if a wallet for the current crypto already exists in the array
      const existingWallet = walletArray.coins.find(wallet => wallet.crypto.equals(cryptoId));

      if (!existingWallet) {
        // If the wallet for the current crypto doesn't exist, create a new one
        walletArray.coins.push({
          crypto: cryptoId,
          cryptoName: crypto.name,
          cryptoSymbol: crypto.symbol,
          cryptoLogo: crypto.image,
          quantity: req.body.quantity,
        });
      } else {
        // If the wallet for the current crypto exists, update the quantity
        existingWallet.quantity += req.body.quantity;
      }
    }

    await walletArray.save();

    res.status(201).json({ message: 'Crypto bought successfully', wallet: walletArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
