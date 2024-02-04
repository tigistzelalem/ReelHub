const Rating = require('../models/rate');
const Movie = require('../models/movies_model');

const rateMovie = async (req, res) => {
    try {
        const { userId, movieId, rating } = req.body;
        const newRating = await Rating({
            userId,
            movieId,
            rating
        });

        await newRating.save();
        res.status(201).json({ message: 'rate created', newRating });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMovieRating = async (req, res) => {
    try {
        const movieId = req.body.movieId
        const rating = await Rating.find({ movieId }).populate('movieId');
        const rate = rating.rating;
        console.log(rate);
        if (!rating) {
            res.status(404).json({ message: 'rating not found' });
        }
        res.status(200).json({ message: 'rating fetched', rating });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
const topRated = async (req, res) => {
    try {
        const topRatedMovies = await Rating.aggregate([
            {
                $group: {
                    _id: "$movieId",
                    averageRating: { $avg: "$rating" },
                },
            },
            {
                $match: { averageRating: { $gte: 4.5 } }, // Adjust the rating threshold
            },
        ]);

        // Extract movie IDs from the aggregation result
        const movieIds = topRatedMovies.map((rating) => rating._id);

        // Retrieve movie details for the top-rated movies
        const movies = await Movie.find({ _id: { $in: movieIds } });

        res.json(movies);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {
    rateMovie,
    getMovieRating,
    topRated
}
