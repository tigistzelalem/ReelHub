const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    genere: {
        type: String,
    },

    description: {
        type: String,
    },

    vidoeUrl: {
        type: String,
    },

    publicId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()

    },
    image: {
        type: String
    },

    rating: [
        {
            userId: {
            type: Schema.Types.ObjectId,
            res: 'User',
            required: true
        },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5,


        }
        }

    ]


});

module.exports = mongoose.model('Movie', MovieSchema);