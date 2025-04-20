const mongoose = require("mongoose");
const Genre = require("../models/genres");

mongoose.connect('mongodb://127.0.0.1/db_rpl')
    .then((result) => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console(err)
    });

const seedGenres = [
    {
        name: "Action"
    },
    {
        name: "Adventure"
    },
    {
        name: "Comedy"
    },
    {
        name: "Drama"
    },
    {
        name: "Fantasy"
    },
    {
        name: "Horror"
    },
    {
        name: "Mystery"
    },
    {
        name: "Romance"
    },
    {
        name: "Sci-Fi"
    },
]

Genre.insertMany(seedGenres).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})