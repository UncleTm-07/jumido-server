const responseHandler = require("../handlers/response.handler");
const tmdbApi = require("../tmdb/tmdb.api");
const userModel = require("../models/user.model");
const favoriteModel = require("../models/favorite.model");
const reviewModel = require("../models/review.model");
const tokenMiddleware = require("../middlewares/token.middleware");


const getList = async (req, res) => {
    try {
        const { page } = req.body;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const { query, page } = req.body;
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getDetails = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const params = { mediaType, mediaId };

        const media = await tmdbApi.mediaDetail(params);
        media.credits = await tmdbApi.mediaCredits(params);
        media.videos = await tmdbApi.mediaVideos(params);

        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;
        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);

            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
                media.isFavorite = isFavorite !== null;
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    getList,
    getGenres,
    search,
    getDetails
};

