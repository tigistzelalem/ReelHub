const Movies = require('../models/movies_model');
const cloudinary = require('../utils/cloudinary');

const createMovie = async (req, res) => {
    let videoUrl;
    // let publicId;
    try {
        const { title, genere, description, image } = req.body;
        await cloudinary.uploader.upload(req.file.path, { resource_type: 'video' }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            } else {
                console.log(result);
                videoUrl = result.secure_url;
                publicId = result.public_id;
            }
        });

        const newMovie = new Movies({
            title,
            genere,
            description,
            videoUrl,
            publicId: publicId,
            // image
        });

        await newMovie.save();
        res.status(201).json({ message: 'Video created successfully', newMovie, videoUrl, publicId });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMovie = async (req, res) => {
    try {
        const movieId = req.body.id;
        const movie = await Movies.findById(movieId);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie fetched', movie });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        const searchResult = await Movies.find({ title: title });

        if (!searchResult) {
            console.log('No result with the respected title');
        }

        res.status(200).json({ message: 'search successfull', searchResult });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const filter = async (req, res) => {
    try {
        const genere = req.body.genere;
        const filterResult = await Movies.find({ genere: genere });
        res.status(200).json({ message: 'filter successfull', filterResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const stream = async (req, res) => {
    try {
        const publicId = req.body.publicId;
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
    
    
};