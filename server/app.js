const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user_route');
const moviesRoute = require('./routes/movies_route');
const ratingRoute = require('./routes/rating_route');
const favoritesRoute = require('./routes/favorites_route');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on ${port}`);
});

app.use('/user', userRoute);
app.use('/movies', moviesRoute);
app.use('/favorites', favoritesRoute);
app.use('/rate', ratingRoute);

