const Batch = require("../models/Batch");
const HttpError = require("../models/HttpError");

const getAllAvailableBatches = async (req, res, next) => {
    try {
        const response = await Batch.find({ full: false });
        const batches = response.map(batch => {
            return {
                _id: batch._id,
                capacity: batch.capacity,
                size: batch.size,
                full: batch.full,
                enrolledUsers: batch.enrolledUsers,
                beginsAt: batch.beginsAt.toString(),
                endsAt: batch.endsAt.toString()
            }
        })
        return res.json({ batches });
    } catch (err) {
        return next(new HttpError("Error fetching batches: " + err.message, 500));
    }
}

const createBatch = async (req, res, next) => {
    let batchData = req.body;
    try {
        const batchDao = new Batch();
        batchDao.capacity = batchData.capacity;
        batchDao.beginsAt = new Date(batchData.beginsAt);
        batchDao.endsAt = new Date(batchData.endsAt);
        const response = await batchDao.save();

        return res.json({ 'message': `Batch created with id: ${response._id}.` });
    } catch (err) {
        return next(new HttpError("Error creating batch: " + err.message, 409));
    }
}

exports.getAllAvailableBatches = getAllAvailableBatches;
exports.createBatch = createBatch;