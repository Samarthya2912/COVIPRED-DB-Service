const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true },
    time: { type: Date, default: Date.now },
    symptoms: {
        cough: { type: Boolean, default: false },
        fever: { type: Boolean, default: false },
        sore_throat: { type: Boolean, default: false },
        shortness_of_breath: { type: Boolean, default: false },
        head_ache: { type: Boolean, default: false },
        age_60_and_above: { type: Boolean, default: false },
        gender: { type: Boolean, default: false },
        test_indication: { type: Boolean, default: false },
    },
    infection_probability: { type: Number, default: -1 },
    infection_prediction: { type: Boolean, default: false },
    slot_assigned: { type: Boolean, default: false },
    slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', default: null }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
