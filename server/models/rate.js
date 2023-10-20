const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },

})

module.exports = mongoose.model("Rating", ratingSchema);