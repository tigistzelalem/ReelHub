const favoritesController = require('../controllers/favorites_controller')
const express = require("express");
const router = express.Router();

router.post('/addToFavorite', favoritesController.addToFavorite);
router.delete("/removeFromFavorite/:movieId", favoritesController.removeFromFavorites);

module.exports = router;