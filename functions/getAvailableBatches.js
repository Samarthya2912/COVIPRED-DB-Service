const mongoose = require("mongoose");
const Batch = require("../models/Batch");

const getAvailableBatches = async(session) => {
    return Batch.find({ full: false }, null, { session });
}

const getTotalAvailableCapacity = (availableBatches) => {
    let count = 0;
    for(let batch of availableBatches) count += batch.capacity-batch.size;
    return count;
}

const getTotalSize = (availableBatches) => {
    let count = 0;
    for(let batch of availableBatches) count += batch.size;
    return count;
} 

exports.getAvailableBatches = getAvailableBatches;
exports.getTotalAvailableCapacity = getTotalAvailableCapacity;
exports.getTotalSize = getTotalSize;