const JobModel = require('../models/JobModel');

const PostNewJob = async (req, res) => {
    const job = req.body;

    try {
        const newJob = await JobModel.create({
            companyName: job.companyName,
            description: job.description,
            status: job.status,
            salary: job.salary,
            skills: job.skills,
            workHours: job.workHours,
            jobLocation: job.jobLocation,
            locationType: job.locationType,
            jobLevel: job.jobLevel,
            jobRequirements: job.jobRequirements
        });

        res.status(201).json({ newJob });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { PostNewJob };
