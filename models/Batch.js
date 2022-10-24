const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    capacity: { type: Number, required: true },
    full: { type: Boolean, default: false },
    size: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;