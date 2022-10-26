const mongoose = require("mongoose");
const Batch = require("../models/Batch");
const User = require("../models/User");
const { saveUpdatedBatches, saveUpdatedUsers } = require("./saveUpdates");
const getPendingUsers = require("./getPendingUsers");
const { getAvailableBatches, getTotalAvailableCapacity, getTotalSize } = require("./getAvailableBatches");
const scheduleBatches = require("./scheduleBatches");
const log = require("log-beautify");

// remove later
// require("dotenv").config();

log.setSymbols({
    info: "ℹ️ ",
    info_: "ℹ️ ",
    success: "✅ ",
    success_: "✅ ",
    error: "❌ ",
    error_: "❌ "
});


const batchAssignment = async (depth = 10) => {
    if (depth == 0) return null;

    let availableBatches, pendingUsers;

    let session = null, summary = "";
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const [pendingUsers, availableBatches] = await Promise.all([
            getPendingUsers(session),
            getAvailableBatches(session)
        ]);

        // console.log('hello');
        // console.log(availableBatches);
        // console.log('hello');
        const initialCapacity = getTotalAvailableCapacity(availableBatches);
        const initialSize = getTotalSize(availableBatches);
        const initialPendingUsers = pendingUsers.length;

        const { updatedUsers, updatedBatches } = scheduleBatches(pendingUsers, availableBatches);

        const scheduledUsers = updatedUsers.length;
        const leftUsers = initialPendingUsers - scheduledUsers;
        const scheduledSeats = getTotalSize(updatedBatches) - initialSize;
        const leftSeats = initialCapacity - scheduledSeats;

        console.log({
            initialCapacity, 
            initialSize,

        });

        await Promise.all([
            saveUpdatedUsers(updatedUsers, session),
            saveUpdatedBatches(updatedBatches, session)
        ])

        // await saveUpdatedBatches(updatedBatches, session);
        // await saveUpdatedUsers(updatedUsers, session);

        // for(let i = 0; i < updatedUsers.length; i++) {
        //     let userDao = await User(updatedUsers[i]);
        //     await userDao.save();
        // }

        // for(let i = 0; i < updatedBatches.length; i++) {
        //     let batchDao = await User(updatedBatches[i]);
        //     await batchDao.save({ session });
        // }

        log.info("Comitting transaction...");
        await session.commitTransaction();
        log.success("Transaction committed");
        log.success_("Summary");
        summary = `${initialCapacity} seats were available. ${scheduledUsers} users out of ${initialPendingUsers} were scheduled. ${leftUsers} users still pending. ${leftSeats} seats still available.`;
        log.success_(summary);

    } catch (err) {
        console.log("Error occured while saving updates: " + err.message);
        // console.log(err.errorLabels, err.errorLabels && err.errorLabels.indexOf('TransientTransactionError') >= 0);
        if (err.errorLabels && err.errorLabels.indexOf('TransientTransactionError') >= 0) {
            console.log('TransientTransactionError, retrying transaction ...');
            batchAssignment(--depth);
        } else {
            await session.abortTransaction();
            log.error_("Transaction aborted");
        }
    } finally {
        session.endSession();
        log.info("Session ended");
    }
}

module.exports = batchAssignment;