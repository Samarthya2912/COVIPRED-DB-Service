require("dotenv").config();
const axios = require("axios");

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

    returns Number [0,1]
*/

const getProbability = async (features) => {
    try {
        const response = await axios.post(process.env.PREDICTOR_SERVICE_URI, features);
        // console.log(response.data);
        return response.data.prediction;
    } catch(err) {
        console.error(err.message);
    }
}

module.exports = getProbability;