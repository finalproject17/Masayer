const express = require("express");
const router = express.Router();
const { addJobForm } = require("../controllers/jobFormController");

router.post("/job-form", addJobForm);

module.exports = router;
