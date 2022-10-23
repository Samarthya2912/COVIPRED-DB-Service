const mongoose = require("mongoose");
const getProbability = require("../functions/getProbability");
const User = require("../models/User");

const addUser = async(req, res, next) => {
    const userData = req.body;
    try {
        const userDao = new User(userData);
        userDao.risk = await getProbability(userData.symptoms);
        const response = await userDao.save();
        return res.json({ 'message': `User "${userData.name}" created.` })
    } catch(err) {
        console.log(`Error creating user. Message: ${err.message}`);
        return res.json({ 'message': 'Error creating user.' })
    }
}

exports.addUser = addUser;