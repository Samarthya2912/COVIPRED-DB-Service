const router = require("express").Router();

router.get("/", (req, res, next) => {
    console.log('API working!');
    res.json({ 'message': 'API working!' })
})

module.exports = router;