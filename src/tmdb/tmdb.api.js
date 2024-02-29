const axiosClient = require("../axios/axios.client");
const tmdbEndpoints = require('./tmdb.endpoints');

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async ({ mediaType, page }) => axiosClient.get(
        tmdbEndpoints.mediaDetail({ mediaType, page })
    ),
    mediaGenres: async ({ mediaType }) => axiosClient.get(
        tmdbEndpoints.mediaGenres({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),
};

export default tmdbApi;