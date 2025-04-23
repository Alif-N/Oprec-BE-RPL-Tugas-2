const Review = require('../models/reviews');
const List = require('../models/lists'); // Import model List

const createReview = async (req, res) => {
    try {
        const { userId, filmId, rating, comment } = req.body;

        const listEntry = await List.findOne({ userId, filmId });
        if (!listEntry) {
            return res.status(400).json({ message: 'You can only review films that are in your list' });
        }

        const newReview = new Review({ userId, filmId, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'username -_id').populate('filmId', 'title -_id').select('-__v -_id');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true }).populate('userId', 'username -_id').populate('filmId', 'title -_id').select('-__v -_id');
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
};