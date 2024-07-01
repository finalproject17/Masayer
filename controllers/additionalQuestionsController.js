const additionalQuestionsModel = require("../models/additionalQuestionsModel");

const addJobForm = (req, res) => {
  const dataJobForm = req.body;
    
  additionalQuestionsModel
    .create(dataJobForm)
    .then((savedJobForm) => {
      res.status(201).json(savedJobForm);
    })
    .catch((error) => {
      console.error("Error saving job form:", error);
      res.status(500).json({ error: "Failed to save job form" });
    });
};

const getJobForm = async (req, res) => {
  try {
  let jobForms = await additionalQuestionsModel.find();
    res.status(201).json(jobForms);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}
const updateJobForm = async(req, res) => {
  const { id } = req.params;
  const newJobForm = req.body;
  try {
    let updatedForm = await additionalQuestionsModel.findByIdAndUpdate(id, newJobForm,{new:true});
    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const deleteJobForm = async(req, res) => {
  const { id } = req.params;
  try {
    let deletedForm = await additionalQuestionsModel.findByIdAndDelete(id);
    res.status(200).json(deletedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  addJobForm,
  getJobForm,
  updateJobForm,
  deleteJobForm
};
