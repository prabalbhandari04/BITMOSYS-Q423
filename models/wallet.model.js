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
      cryptoLogo: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 0,
        validate: {
          validator: function(value) {
            return value >= 0;
          },
          message: 'Quantity cannot be less than zero',
        },
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
