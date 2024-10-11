const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/NoteRoutes');
const app = express();

const DB_URL = "mongodb+srv://pegah81ghm:Pegah2002ghm@cluster0.w52gj.mongodb.net/notesApp?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB Atlas
mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connected to the MongoDB Atlas server.");
})
.catch(err => {
    console.error('Could not connect to the database. Exiting now...', err);
    process.exit(1); // Exit with a failure code
});

app.use('/', notesRoutes);

// Home route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note-Taking Application - Week 06 Exercise</h1>");
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
