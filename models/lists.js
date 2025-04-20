const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    status: {
        type: String,
        enum: ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'],
        default: 'plan_to_watch'
    }
});

const List = mongoose.model('List', listSchema);
module.exports = List;