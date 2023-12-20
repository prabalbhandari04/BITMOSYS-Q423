// ___________________________________________________Necessary Imports______________________________________________________
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require("dotenv").config();
const PORT = 5000;
require('colors');

// ___________________________________________________Express Server Initated______________________________________________________
const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.get("/", (req, res, next) => {
    res.json("Server V1 running in development environment!!");
  });



// ____________________________________________________Database Connection______________________________________________________
// Connect to mongodb
const URI =  process.env.MONGODB_URL || 'mongodb+srv://viron04:a8eauTTrMWuWar9@cluster0.rzclz8d.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log(
        `Database connected.`.blue.bold
      );
})



app.listen( process.env.PORT || 5000 , () => {
    console.log(
        `Ayuh production Server connected at: ${PORT}`.magenta.bold);
})

