const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    reaction: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
});

reactionSchema.index({ userId: 1, reviewId: 1 }, { unique: true });

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;