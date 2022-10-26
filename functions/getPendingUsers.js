const mongoose = require("mongoose");
const User = require("../models/User");

const getPendingUsers = async(session) => {
    return User.find({ slot_assigned: false }, null, { session });
}

module.exports = getPendingUsers;