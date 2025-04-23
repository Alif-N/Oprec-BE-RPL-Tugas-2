const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;