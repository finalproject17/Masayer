const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const additionalQuestionsSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "JobModel", required: true },
  FirstQuestion: { type: String },
  SecondQuestion: { type: String },
  ThirdQuestion: { type: String },
  FourthQuestion: { type: String }
});

const additionalQuestionsModel = mongoose.model("additionalQuestions", additionalQuestionsSchema);

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



async function getFormByJobId(req, res) {
  try {
    const jobId = new ObjectId(req.params.id);
    const form = await additionalQuestionsModel.findOne({ jobId: jobId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const getJobForm = async (req, res) => {
  try {
    let jobForms = await additionalQuestionsModel.find();
    res.status(200).json(jobForms); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateJobForm = async (req, res) => {
  const { id } = req.params;
  const newJobForm = req.body;
  try {
    let updatedForm = await additionalQuestionsModel.findByIdAndUpdate(id, newJobForm, { new: true });
    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteJobForm = async (req, res) => {
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
  deleteJobForm,
  getFormByJobId
};
