const Film = require('../models/films');
const list = require('../models/lists');

const addList = async (req, res) => {
    try {
        const { userId, filmId, status } = req.body;
        const existingList = await list.findOne({ userId, filmId });
        if (!userId || !filmId) {
            return res.status(400).json({ message: 'User ID and Film ID are required' });
        }
        if (existingList) {
            return res.status(400).json({ message: 'List already exists' });
        }

        const film = await Film.findById(filmId);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        if (film.status === 'not_yet_aired' && status !== 'plan_to_watch') {
            return res.status(400).json({ message: 'Film not yet aired, status must be plan_to_watch' });
        }

        const newList = new list({ userId, filmId, status });
        await newList.save();
        res.status(201).json({ message: 'List added successfully', list: newList });
    } catch (error) {
        console.error('Error adding list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateListStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedList = await list.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }
        if (status && !['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        res.status(200).json({message: 'Success Update list', updatedList});
    } catch (error) {
        res.status(500).json({ message: 'Failed to update list', error });
    }
}

const getUserLists = async (req, res) => {
    try {
        const { userId } = req.params;
        const lists = await list.find({ userId });
        if (!lists) {
            return res.status(404).json({ message: 'No lists found for this user' });
        }
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve lists', error });
    }
}

module.exports = {
    addList,
    updateListStatus,
    getUserLists
}