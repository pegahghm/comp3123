const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(express.json());


const DB_CONNECTION_STRING = "mongodb+srv://pegahghm:Peg%40h2002ghm@cluster0.vs4xt.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";


mongoose.connect(DB_CONNECTION_STRING, {
  serverSelectionTimeoutMS: 30000 
})
.then(() => {
  console.log("Successfully connected to the MongoDB Atlas Server");
})
.catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
