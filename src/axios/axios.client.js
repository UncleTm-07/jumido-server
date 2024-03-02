const axios = require("axios");

const get = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

module.exports = { get };