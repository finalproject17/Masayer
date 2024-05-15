const jobFormSchema = require("../models/jobFormModel");

const addJobForm = (req, res) => {
  const dataJobForm = req.body;
    
  jobFormSchema
    .create(dataJobForm)
    .then((savedJobForm) => {
      res.status(201).json(savedJobForm);
    })
    .catch((error) => {
      console.error("Error saving job form:", error);
      res.status(500).json({ error: "Failed to save job form" });
    });
};

module.exports = {
  addJobForm,
};
