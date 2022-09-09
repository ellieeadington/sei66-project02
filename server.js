// Require Express
const express = require('express');

// Require Mongoose
const mongoose = require('mongoose');

// Port Config
const PORT = 4000;

// Initialise Express
const app = express();

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})

