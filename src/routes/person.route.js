const express = require("express");
const personController = require("../controllers/person.controller");

const personRoute = express.Router({ mergeParams: true });

personRoute.get(
    "/:personId/medias",
    personController.personMedias
);

personRoute.get(
    "/:personId",
    personController.personDetail
);

module.exports = personRoute;