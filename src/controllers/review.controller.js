const responseHandler = require("../handlers/response.handler");
const reviewModel = require("../models/review.model");

const createReview = async (req, res) => {
    try {
        const { movieId } = req.params;

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...red.body
        });

        await review.save();

        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch {
        responseHandler.error(res);
    }
};

const removeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        });

        if (!review) return responseHandler.notfound(res);

        await review.remove();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};


const getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await reviewModel.find({
            user: req.user.id
        }).sort("-createdAt");

        responseHandler.ok(res, reviews);
    } catch {
        responseHandler.error(res);
    }
}

module.exports = {
    createReview,
    removeReview,
    getReviewsOfUser
}