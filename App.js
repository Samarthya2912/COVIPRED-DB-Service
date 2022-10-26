const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./controllers/errorHandler');
require("dotenv").config();
const User = require("./models/User");
const testRoute = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");
const batchRoute = require("./routes/batchRoute");
const schedulerRoute = require("./routes/scheduleRoute");
const log = require("log-beautify");

const app = express();
app.use(express.json());

app.use("/", testRoute);
app.use("/user", userRoute);
app.use("/batch", batchRoute);
app.use("/schedule", schedulerRoute);

app.use(errorHandler);

mongoose.connect(process.env.DB_URI)
.then(() => {
    log.success_('Database connection established.')
    app.listen(process.env.PORT, () => {
        log.success_(`Server started at port ${process.env.PORT}.`);
    })    
})
.catch(err => {
    log.error_('Error connecting to database:');
    log,error_(err.message);
})