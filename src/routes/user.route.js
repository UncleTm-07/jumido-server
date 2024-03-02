const express = require("express");
const { body } = require("express-validator");
const favoriteController = require("../controllers/favorite.controller");
const userController = require("../controllers/user.controller");
const requestHandler = require("../handlers/request.handler");
const userModel = require("../models/user.model");
const tokenMiddleware = require("../middlewares/token.middleware");

const userRoute = express.Router();

userRoute.post(
    "/signup",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 8 }).withMessage("username minimun 8 characters")
        .custom(async value => {
            const user = await userModel
                .findOne({ username: value });
            if (user) return Promise.reject("username already used");
        }),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password minimun 8 characters"),
    body("confirmPassword")
        .exists().withMessage("confirmPassword is required")
        .isLength({ min: 8 }).withMessage("confirmPassword minimun 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("confirmPassword not match");
            return true;
        }),
    body("displayName")
        .exists().withMessage("displayName is required")
        .isLength({ min: 8 }).withMessage("displayName minimun 8 characters"),
    requestHandler.validate,
    userController.signup
);

userRoute.post(
    "/signin",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 8 }).withMessage("username minimun 8 characters"),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password minimun 8 characters"),
    requestHandler.validate,
    userController.signin
);

userRoute.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password minimun 8 characters"),
    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isLength({ min: 8 }).withMessage("newPassword minimun 8 characters"),
    body("confirmNewPassword")
        .exists().withMessage("confirmNewPassword is required")
        .isLength({ min: 8 }).withMessage("confirmNewPassword minimun 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
            return true;
        }),
    requestHandler.validate,
    userController.updatePassword
);

userRoute.get(
    "/user-info",
    tokenMiddleware.auth,
    userController.getInfo
);

userRoute.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

userRoute.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite
);

userRoute.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
)

module.exports = userRoute;