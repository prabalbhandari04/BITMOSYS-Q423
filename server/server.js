// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cryptoRoutes = require('./routes/cryptoCoin.route');
const walletRoutes = require('./routes/wallet.route');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://viron04:a8eauTTrMWuWar9@cluster0.rzclz8d.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Access the connection object and handle events
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Server connected to development environment.');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1/crypto', cryptoRoutes);
app.use('/api/v1/wallet', walletRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
