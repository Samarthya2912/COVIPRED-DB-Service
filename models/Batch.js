const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    capacity: { type: Number, required: true },
    size: { type: Number, default: 0 },
    full: { type: Boolean, default: false },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    beginsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true }
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;