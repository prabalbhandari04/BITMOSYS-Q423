const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema({
  coins: [
    {
      crypto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crypto',
        required: true,
      },
      cryptoName: {
        type: String,
      },
      cryptoSymbol: {
        type: String,
      },
      cryptoLogo: { // Corrected field name
        type: String,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    }
  ]
});

// Create the Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

// Export the Wallet model
module.exports = Wallet;