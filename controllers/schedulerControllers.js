const batchAssignment = require("../functions/batchAssignment")

const schedule = async (req, res, next) => {
    try {
        let message = await batchAssignment();  
        res.json({ message });
    } catch(err) {
        res.json({ 'error': err })
    }
}

module.exports = schedule;