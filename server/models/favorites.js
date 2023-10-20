const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
});

module.exports = mongoose.model("Favorite", favoritSchema);