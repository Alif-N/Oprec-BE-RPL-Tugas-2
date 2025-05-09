const Film = require('../models/films');

const getAllFilms = async (req, res) => {
    try {
        const films = await Film.find().select('-_id -__v').populate('genres', '-_id name');
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch films', error });
    }
};

const getFilmByJudul = async (req, res) => {
    try {
        const { judul } = req.params;
        const film = await Film.findOne({ title: { $regex: judul, $options: 'i' } }).select('-_id').populate('genres', '-_id name');
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch film', error });
    }
};

const createFilm = async (req, res) => {
    try {
        const films = req.body;
        const existingFilm = await Film.findOne({ title: films.title });
        if (existingFilm) {
            return res.status(400).json({ message: `Film ${films.title} already exists` });
        }

        if (Array.isArray(films)) {
            await Film.insertMany(films);
            res.status(201).send({ message: `Film ${films.title} added successfully` });
        } else {
            const film = new Film(films);
            await film.save();
            res.status(201).send({ message: `Film ${films.title} added successfully` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, synopsis, images, genres, status, totalEpisodes, releaseDate } = req.body;
        const updatedFilm = await Film.findByIdAndUpdate(
            id,
            { title, synopsis, images, genres, status, totalEpisodes, releaseDate },
            { new: true }
        ).select('-_id -__v').populate('genres', '-_id name');
        if (!updatedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(updatedFilm);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update film', error });
    }
};

const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFilm = await Film.findByIdAndDelete(id);
        if (!deletedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: `Film ${deletedFilm.title} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete film', error });
    }
};

module.exports = {
    getAllFilms,
    getFilmByJudul,
    createFilm,
    updateFilm,
    deleteFilm
};