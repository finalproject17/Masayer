const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config(); 
const mongoose = require('mongoose');
const JobRoute = require('./routes/JobRoute'); 

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/jobs', JobRoute); 

// MongoDB Connection
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server started');
    });
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
});