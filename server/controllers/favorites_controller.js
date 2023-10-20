const Favorite = require("../models/favorites");

const addToFavorite = async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        const existing = await Favorite.findById(movieId);

        if (existing) {
            return res.status(400).json({ message: 'Alread in favorite' });
        }

        const newFavorite = await Favorite({
            user: userId,
            movie: movieId
        });

        await newFavorite.save();
        res.status(201).json({ message: 'Added to favorites' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFromFavorites = async (req, res) => {
    try {
        const movieId  = req.params.movieId;
        const deleted = await Favorite.findByIdAndDelete(movieId);
        console.log(deleted);
        if (!deleted) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Removed successfully' , deleted});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addToFavorite,
    removeFromFavorites
}