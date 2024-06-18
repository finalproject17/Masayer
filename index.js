const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config(); 
const mongoose = require('mongoose');
const JobRoute = require('./routes/JobRoute'); 
const CompanyRoute = require('./routes/CompanyRoutes');
const usersRoute = require('./routes/userRoute');
const jobFormRoute = require('./routes/jobFormRoute');
const auth = require('./middlewares/auth');


app.use(cors());
app.use(express.json()); 

app.use('/users', usersRoute);
app.use('/jobs', JobRoute); 
app.use('/jobForm', jobFormRoute); 
app.use('/companies', CompanyRoute);




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