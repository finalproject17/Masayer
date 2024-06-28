const express = require("express");
const router = express.Router();
const { addJobForm, updateJobForm, deleteJobForm, getJobForm } = require("../controllers/additionalQuestionsController");

router.get("/", getJobForm);
router.post("/", addJobForm);
router.put("/:id", updateJobForm);
router.delete("/:id", deleteJobForm);

module.exports = router;
