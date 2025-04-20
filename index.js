const express = require('express');
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const filmRouter = require('./routes/filmRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const genreRouter = require('./routes/genreRoutes');
const listRouter = require('./routes/listRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const reactionRouter = require('./routes/reactRoutes');

const app = express();
const port = 8080;
const uri = 'mongodb://127.0.0.1/db_rpl';

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/film', filmRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/genre', genreRouter);
app.use('/list', listRouter);
app.use('/review', reviewRouter);
app.use('/react', reactionRouter);

mongoose.connect(uri, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});