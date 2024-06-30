const AppliedJob = require('../models/appliedJobsModel');
const applyForJob = async (req, res) => {
  const { userId, jobId,companyId } = req.body;
  try {
    const existingAppliedJob = await AppliedJob.findOne({ userId, jobId });
    if (existingAppliedJob) {
      return res.status(400).json({ message: 'You have already applied for this job !!!!' });
    }

    const appliedJob = new AppliedJob({ userId, jobId });
    await appliedJob.save();

    res.status(201).json({ message: 'Congratulations, You applied successfully ^_^', data: appliedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};




const getAllAppliedJobsByJobSeeker = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 100 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    console.log(`Fetching applied jobs for userId: ${userId}, page: ${pageInt}, limit: ${limitInt}`);

    const AllAppliedJobsByJobSeeker = await AppliedJob.find({ userId })
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .populate('jobId');

    const totalItems = await AppliedJob.countDocuments({ userId });

    const response = {
      message: 'All applied jobs by this user',
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      currentPage: pageInt,
      data: AllAppliedJobsByJobSeeker
    };

    console.log('Response:', response);  

    res.json(response);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);  
    res.status(500).json({ error: error.message });
  }
};


const getAllAppliedJobs = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { page = 1, limit = 6 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    const AllAppliedJobs = await AppliedJob.find({ jobId })
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .populate('userId');

    const totalItems = await AppliedJob.countDocuments({ jobId });

    const response = {
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      currentPage: pageInt,
      data: AllAppliedJobs
    };

    console.log(response);  

    res.json(response);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: error.message });
  }
};

const deleteAppliedJob = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    const deletedAppliedJob = await AppliedJob.findByIdAndDelete(applicationId);

    if (!deletedAppliedJob) {
      return res.status(404).json({ message: 'Applied Job not found' });
    }

    res.json({ message: 'This Applied Job deleted successfully', data: deletedAppliedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCountByUser = async (req, res) => {
  try {
    const { jobId } = req.params;
    const appliedJobCount = await AppliedJob.countDocuments({jobId});
    res.status(200).json({ count: appliedJobCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const countAppliedJobsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
      const count = await AppliedJob.countAppliedJobsByUser(userId);
      res.json({ count });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = { applyForJob, getAllAppliedJobsByJobSeeker, getAllAppliedJobs, deleteAppliedJob ,getCountByUser, countAppliedJobsByUser};
