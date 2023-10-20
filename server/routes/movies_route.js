const multer = require("multer");
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies_controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination folder for video uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Define the file name
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only videos are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.post("/createMovie", upload.single('videoUrl'), moviesController.createMovie);
router.get("/search", moviesController.searchMovie);
router.get("/getMovies", moviesController.getMovies);
router.get('/getMovie/:id', moviesController.getMovie);
router.get("/filter", moviesController.filter);
router.get("/stream/:publicId", moviesController.stream);
router.get("/download/:publicId", moviesController.downloadMovie);



module.exports = router;