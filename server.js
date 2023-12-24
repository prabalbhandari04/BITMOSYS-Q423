// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cryptoRoutes = require('./routes/cryptoCoin.route');
const walletRoutes = require('./routes/wallet.route');
const app = express();

// Enable CORS for all origins
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Access the connection object and handle events
const db = mongoose.connection;

db.on('error', (error) => {
console.error('MongoDB connection error:', error);
});

db.once('open', () => {
console.log('Server connected to the database.');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1/crypto', cryptoRoutes);
app.use('/api/v1/wallet', walletRoutes);

// New route to check if the server is running in production
app.get('/', (req, res) => {
const environment = process.env.NODE_ENV || 'development';
res.json({ message: `Server running on ${environment} environment` });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});