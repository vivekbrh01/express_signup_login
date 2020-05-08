var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("User Route");
});

router.get("/signup", function (req, res, next) {
	res.render("signup");
});

router.get("/login", function (req, res, next) {
	res.render("login");
});

module.exports = router;
