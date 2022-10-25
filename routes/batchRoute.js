const router = require("express").Router();
const batchControllers = require("../controllers/batchControllers");

router.get('/', batchControllers.getAllAvailableBatches);

router.post('/', batchControllers.createBatch);

module.exports = router;