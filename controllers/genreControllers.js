const Genre = require('../models/genres');

const addGenre = async (req, res) => {
    try {
        const { name}  = req.body;
        if (!name) {
            return res.status(400).json({message: 'Genre name is required'});
        }
        const existingGenre = await Genre.findOne({name});
        if (existingGenre) {
            return res.status(400).json({message: 'Genre already exists'});
        }
        const genre = new Genre({name});
        await genre.save();
        res.status(201).json({message: 'Genre created successfully', genre});
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    addGenre
}