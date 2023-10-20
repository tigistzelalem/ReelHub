const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    createdAt: {
        type: Date,
        default: Date.now()

    },
    profileImage: {
        type: String
    },

    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
});

module.exports = mongoose.model('User', UserSchema);