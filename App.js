const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./controllers/errorHandler');
require("dotenv").config();
const User = require("./models/User");
const testRoute = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

app.use("/", testRoute);
app.use("/user", userRoute);

app.use(errorHandler);

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