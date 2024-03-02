const mongoose= require("mongoose");
const { Schema } = require("mongoose");
const modelOptions = require("./model.options.js");

export default mongoose.model(
    "Review",
    new mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        mediaId: {
            type: String,
            required: true
        },
        mediaTitle: {
            type: String,
            required: true
        },
        mediaPoster: {
            type: String,
            required: true
        },
    }, modelOptions)
);