const schedule = require("../controllers/schedulerControllers");
const router = require("express").Router();

router.post("/", schedule);

module.exports = router;