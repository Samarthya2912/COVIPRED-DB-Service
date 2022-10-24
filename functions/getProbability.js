const axios = require("axios");
const HttpError = require("../models/HttpError");

/* 
    features: {
        cough: 1,
        fever: 1,
        sore_throat: 1,
        shortness_of_breath: 1,
        head_ache: 1,
        age_60_and_above: 1,
        gender: 1,
        test_indication: 1
    }

    returns Object {
        'probability': Number,
        'infected': {0,1}
    }
*/
const getPredictions = async (features) => {
    try {
        const response = await axios.post(process.env.PREDICTOR_SERVICE_URI, features);
        return response.data;
    } catch(err) {
        // console.error(err.message);
        throw new HttpError("Error getting predictions while creating user: "+err.message, 503);
    }
}

module.exports = getPredictions;