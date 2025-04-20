const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    images: [{ type: String }],
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    status: {
        type: String,
        enum: ["not_yet_aired", "airing", "finished_airing"],
        required: true
    },
    totalEpisodes: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    }
});

const Film = mongoose.model('Film', filmSchema);
module.exports = Film;