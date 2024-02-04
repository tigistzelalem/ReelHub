const Movies = require('../models/movies_model');
const cloudinary = require('../utils/cloudinary');

const createMovie = async (req, res) => {
    let videoUrl, image, publicId;

    try {
        const { title, genere, description } = req.body;

        if (req.files['videoUrl']) {
            const videoFile = req.files['videoUrl'][0];
            await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: err.message });
                } else {
                    console.log(result);
                    videoUrl = result.secure_url;
                    publicId = result.public_id;
                }
            });
        }

        if (req.files['image']) {
            const imageFile = req.files['image'][0];
            await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: err.message });
                } else {
                    console.log(result);
                    image = result.secure_url;
                }
            });
        }

        const newMovie = new Movies({
            title,
            genere,
            description,
            videoUrl,
            publicId,
            image,
        });

        await newMovie.save();
        res.status(201).json({ message: 'Video created successfully', newMovie, videoUrl, publicId });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMovie = async (req, res) => {
    try {
        const movieId = req.params.id; // Extract movieId from URL params
        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie fetched', movie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getMovies = async (req, res) => {
    try {
        const movies = await Movies.find();
        if (!movies) {
            res.status(404).json({ message: 'No movies available' });
        }

        res.status(200).json({ message: 'movies fetched successfully', movies });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchMovie = async (req, res) => {
    try {
        const title = req.body.title;
        console.log('query', title);
        const searchResult = await Movies.find({ title: { $regex: title, $options: 'i' } });

        if (!searchResult.length) {
            console.log('No result with the respected title');
            return res.status(404).json({ message: 'No movies found with the provided title' });
        }

        res.status(200).json({ message: 'Search successful', searchResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const filter = async (req, res) => {
    try {
        const genere = req.body.genere;
        const filterResult = await Movies.find({ genere: genere });
        res.status(200).json({ message: 'filter successfull', filterResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const rateMovie = async (req, res) => {
    try {
        const { userId, movieId, value } = req.body;
        const movie = await Movies.findById(movieId);

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });

        }

        const existRating = movie.rating.find((rate) => rate.userId.equals(userId));
        if (existRating) {
            existRating.value = value
        } else {
            movie.rating.push({ userId, value });
        }

        await movie.save();

        res.status(200).json({ message: 'Movie rated success fully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const stream = async (req, res) => {
    try {
        const publicId = req.params.publicId;
        if (!publicId) {
            res.status(404).json({ message: 'Movie not Found' });
        }
        const movieUrl = `https://res.cloudinary.com/dhllakbwr/video/upload/${publicId}.mp4`;
        res.redirect(movieUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const downloadMovie = async (req, res) => {
    try {
        const publicId = req.body.publicId;
        if (!publicId) {
            res.status(404).json({ message: 'Movie not found' });
        }

        const downloadUrl = `https://res.cloudinary.com/dhllakbwr/video/upload/${publicId}.mp4`;
        res.setHeader('Content-Disposition', `attachment; filename=${publicId}.mp4`);
        res.setHeader('Content-Type', 'video/mp4');
        res.redirect(downloadUrl);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    searchMovie,
    filter,
    stream,
    downloadMovie,
    rateMovie,


};