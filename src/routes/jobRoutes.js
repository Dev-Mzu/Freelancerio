const express = require('express');
const router = express.Router();

const { addJob, removeJob, singleJob, allJobs, allJobsByUser, setIsHidden, updateJob,getClientId, allTakenJobs, allFreelancerTakenJobs, updatePayment } = require('../controllers/jobController');

// Job routes
router.post('/add-job',addJob);
router.delete('/remove-job/:jobId',removeJob);
router.get('/single-job/:jobId',singleJob);
router.get('/all-jobs',allJobs);
router.get('/all-jobs/:userid',allJobsByUser);
router.get('/get-client-id/:jobId',getClientId);
router.put('/set-hidden-status/:jobId',setIsHidden);
router.put('/update-job/:jobId',updateJob);
router.put('/update-payment/:jobId',updatePayment)
router.get('/taken-jobs/:userid', allTakenJobs);
router.get('/taken-freelancer-jobs/:userid', allFreelancerTakenJobs);


module.exports = router;