const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('Database connection established.')
    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}.`);
    })    
})
.catch(err => {
    console.error('Error connecting to database:');
    console.error(err.message);
})

