 const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    companyName: {
        type: String,
        ref: 'Company', 
        //required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
        minLength: 200
    },
    status: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
        default: 'pending'
    },
    salary: Number,
    skills: {
        type: [String],
       // required: true
    },
    workHours: {
        type: { from: Number, to: Number },
        //required: true
    },
    jobLocation: {
        type: [{ State: String, government: String}]
    },
    locationType: {
        type: String,
        enum: ['Onsite', 'Remote', 'Hybrid']
    },
    jobLevel: {
        type: String,
        enum: ['EntryLevel', 'MidLevel', 'Senior']
    },
    jobRequirements: {
        type: [String],
        //required: true
    },timeStamp:{
        type: Date,
    }
});

const JobModel= mongoose.model('Job', JobSchema);
module.exports = JobModel;
