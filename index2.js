// const express = require('express');
// const app = express();
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config({ path: 'config.env' });
// const mongoose = require('mongoose');


// var usersRoute = require('./routes/userRoute');


// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(process.env.MONGO);
// }
// mongoose.connection.on('connected', () => {
//   console.log(`connected to mongoDB`);
// });


// app.use(cors());
// mongoose.connection.on('disconnected', () => {
//   console.log(`disconnected to mongoDB!`);
// });

// app.get('/', (req, res) => {
//   res.send('first request');
// });


// app.use(express.json());


// app.use('/users', usersRoute);


// app.use('*', (req, res, next) => {
//   res.status(404).end('not found');
// });
// app.use((req, res, next) => {
//   console.log('not foundddd');
// });
