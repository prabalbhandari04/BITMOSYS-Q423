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

    res.status(200).json({ message: `Congrats on your purchase of ${req.body.quantity} coins of ${crypto.symbol}!`, wallet: walletArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Exchange crypto coins
exports.exchangeCrypto = async (req, res) => {
  const sourceCryptoId = req.params.id;
  const exchangeQuantity = req.body.quantity;

  try {
    // Find the source crypto based on its ID
    const sourceCrypto = await Crypto.findById(sourceCryptoId);

    if (!sourceCrypto) {
      return res.status(404).json({ message: 'Crypto Coin not found' });
    }

    // Find the wallet entry for the source crypto
    const wallet = await Wallet.findOne({ 'coins.crypto': sourceCryptoId });

    if (!wallet) {
      return res.status(404).json({ message: 'Crypto not found in wallet' });
    }

    // Check if there are enough coins to exchange
    const sourceCoin = wallet.coins.find(coin => coin.crypto.equals(sourceCryptoId));
    if (!sourceCoin || sourceCoin.quantity < exchangeQuantity) {
      return res.status(400).json({ message: 'Not enough coins to exchange' });
    }

    // Assuming the destination crypto ID is provided in the request body
    const destinationCryptoId = req.body.destinationCryptoId;

    // Find the destination crypto based on its ID
    const destinationCrypto = await Crypto.findById(destinationCryptoId);

    if (!destinationCrypto) {
      return res.status(404).json({ message: 'Destination Crypto not found' });
    }

    // Update the wallet by reducing the quantity of the source crypto
    sourceCoin.quantity -= exchangeQuantity;

    // Update or add the destination crypto in the wallet
    const destinationCoin = wallet.coins.find(coin => coin.crypto.equals(destinationCryptoId));
    if (destinationCoin) {
      destinationCoin.quantity += exchangeQuantity;
    } else {
      // If the destination crypto is not in the wallet, add it
      wallet.coins.push({
        crypto: destinationCryptoId,
        cryptoName: destinationCrypto.name,
        cryptoSymbol: destinationCrypto.symbol,
        cryptoLogo: destinationCrypto.image,
        quantity: exchangeQuantity,
      });
    }
    console.log(destinationCoin)
    console.log(sourceCrypto)
    // Save the changes to the wallet
    await wallet.save();

    res.status(201).json({ message: `${req.body.quantity} ${sourceCrypto.symbol} coins exchanged successfully with ${req.body.quantity} ${destinationCoin.cryptoSymbol} coins!`, wallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
