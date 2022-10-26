const { infectionProbabilityComparator, timeStampComparator } = require("./comparators"); 

function scheduleBatches(pendingUsers, availableBatches) {
    let updatedUsers = [], updatedBatches = [];

    console.log(pendingUsers);

    pendingUsers.sort(infectionProbabilityComparator);
    availableBatches.sort(timeStampComparator);

    while(availableBatches.length > 0 && pendingUsers.length > 0) {
        let currentBatch = availableBatches.shift();
        while(!currentBatch.full && pendingUsers.length > 0) {
            let currentUser = pendingUsers.shift();
            currentUser.slot_assigned = true;
            currentUser.slot_id = currentBatch._id;
            currentBatch.size++;
            currentBatch.full = currentBatch.size == currentBatch.capacity;
            currentBatch.enrolledUsers.push(currentUser.id);
            updatedUsers.push(currentUser);
        }
        updatedBatches.push(currentBatch);
    }

    return {  updatedUsers, updatedBatches };
}

module.exports = scheduleBatches;