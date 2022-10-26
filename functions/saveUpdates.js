const mongoose = require("mongoose");
const User = require("../models/User");
const Batch = require("../models/Batch");

const saveUpdatedUsers = async (updatedUsers, session) => {
    const userDaos = updatedUsers.map(user => new User(user));
    const promises = [];
    for (let i = 0; i < userDaos.length; i++) {
        promises.push(userDaos[i].save({ session }));
    }
    return Promise.all(promises);
}

const saveUpdatedBatches = async (updatedBatches, session) => {
    const batchDaos = updatedBatches.map(batch => new Batch(batch));
    const promises = [];
    for (let i = 0; i < batchDaos.length; i++) {
        promises.push(batchDaos[i].save({ session }));
    }
    return Promise.all(promises);
}

// const saveBatchAssingments = async (updatedUsers, updatedBatches, session) => {
//     let session = null;
//     try {
//         session.startTransaction();
//         await Promise.all([
//             saveUpdatedUsers(updatedUsers, session), 
//             saveUpdatedBatches(updatedBatches, session)
//         ]);

//         console.log("Comitting transaction...");
//         await session.commitTransaction();
//         console.log("Transaction committed");
//     } catch(err) {
//         console.error("Error occured while saving updates: "+err.message);
//         await session.abortTransaction();
//         console.log("Transaction aborted");
//     } finally {
//         session.endSession();
//     }
// }

exports.saveUpdatedBatches = saveUpdatedBatches;
exports.saveUpdatedUsers = saveUpdatedUsers;