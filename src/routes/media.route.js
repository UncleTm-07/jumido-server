const express = require("express");
const mediaController = require("../controllers/media.controller");

const mediaRoute = express.Router({ mergeParams:true });

mediaRoute.get(
    "/search",
    mediaController.search
);

mediaRoute.get(
    "/genres",
    mediaController.getGenres
);

mediaRoute.get(
    "/detail/:mediaId",
    mediaController.getDetails
);

mediaRoute.get(
    "/:mediaCategory",
    mediaController.getList
);

module.exports = mediaRoute;