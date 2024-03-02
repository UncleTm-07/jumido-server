const express = require("express");
const { body } = require("express-validator");
const reviewController = require("../controllers/review.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const requestHandler = require("../handlers/request.handler");

const reviewRoute = express.Router({ mergeParams: true });

reviewRoute.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewsOfUser
);

reviewRoute.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("content")
        .exists().withMessage("content is required")
        .isLength({ min: 1 }).withMessage("content can not be empty"),
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.createReview
);

reviewRoute.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.removeReview
)

module.exports = reviewRoute;