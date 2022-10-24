const mongoose = require("mongoose");
const getProbability = require("../functions/getProbability");
const HttpError = require("../models/HttpError");
const User = require("../models/User");

const addUser = async(req, res, next) => {
    const userData = req.body;
    try {
        const userDao = new User(userData);
        const predictions = await getProbability(userData.symptoms);
        // console.log(predictions);
        userDao.infection_probability = predictions.probability;
        userDao.infection_prediction = predictions.infected;
        const response = await userDao.save();
        return res.json({ 'message': `User "${userData.name}" created.` })
    } catch(err) {
        // console.log(`Error creating user. Message: ${err.message}`);
        return next(new HttpError("Error in creating user: "+err.message, 409));
    }
}

exports.addUser = addUser;