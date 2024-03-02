const express = require("express");
const userRoute = require("./user.route");
const mediaRoute = require("./media.route");
const personRoute = require("./person.route");
const reviewRoute = require("./review.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/:mediaType", mediaRoute);
router.use("/person", personRoute);
router.use("/reviews", reviewRoute);

module.exports = router;