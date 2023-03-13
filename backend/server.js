const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose').default;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5005;

mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(() => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
