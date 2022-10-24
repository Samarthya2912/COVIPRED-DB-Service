const axios = require("axios");
const Batch = require("../models/Batch");
const User = require("../models/User");
require("dotenv").config();

/*
Batch = {
    slot_id: ObjectId,
    size: Number
}
*/

function comparator(a, b) {
    if (a.infection_probability < b.infection_probability) {
        return -1;
    }
    if (a.infection_probability > b.infection_probability) {
        return 1;
    }
    return 0;
}

const createBatch = async () => {}

mongoose.connect(process.env.DB_URI)
    .then(createBatch)
    .catch(err => console.error(err.message))

module.exports = createBatch;