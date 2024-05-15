const express = require('express');
const router = express.Router();
const { PostNewJob } = require('../controllers/JobController');


router.post('/create', PostNewJob);

module.exports = router;
