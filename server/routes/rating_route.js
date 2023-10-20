const rating = require('../controllers/rating_controller');
const express = require("express");
const router = express.Router();

router.post("/rate", rating.rateMovie);
router.get('/getMovieRate/:movieId', rating.getMovieRating);

module.exports = router