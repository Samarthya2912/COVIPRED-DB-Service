const userControllers = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/", userControllers.addUser);

module.exports = router;
