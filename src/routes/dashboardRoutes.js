const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');
const Job = require('../models/jobModel');
const JobApplication = require('../models/applicationModel');
const Contract = require('../models/contractModel');

// Get all users
router.get('/users', async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};
  const users = await User.find(filter);
  res.json(users);
});

// Get all jobs
router.get('/jobs', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { job_category: category } : {};
  const jobs = await Job.find(filter);
  res.json(jobs);
});

// Get all applications
router.get('/applications', async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const applications = await JobApplication.find(filter);
  res.json(applications);
});

// Dashboard summary
router.get('/summary', async (req, res) => {
  const [totalUsers, totalJobs, totalApps, users, jobs] = await Promise.all([
    User.countDocuments(),
    Job.countDocuments(),
    JobApplication.countDocuments(),
    User.find(),
    Job.find()
  ]);

  const freelancers = users.filter(u => u.role === 'user').length;
  const clients = users.filter(u => u.role === 'client').length;

  const jobsByCategory = jobs.reduce((acc, job) => {
    acc[job.job_category] = (acc[job.job_category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalUsers,
    totalJobs,
    totalApps,
    freelancers,
    clients,
    jobsByCategory
  });
});


router.get('/client-analysis/:userid', async (req, res) => {
    const clientId = req.params.userid;  // Get the clientId from the URL parameter
    console.log("called");

    try {
        // 1. Total Applications for this Client
        const applicationsCount = await JobApplication.aggregate([
            { $match: { client_id: clientId } },  // Match by client_id directly
            { $group: { _id: '$client_id', totalApplications: { $sum: 1 } } }
        ]);

        // 2. Total Money Paid (sum of completed milestones)
        const totalPaid = await Job.aggregate([
            { $match: { client_id: clientId } },  // Match by client_id directly
            { $unwind: '$milestones' },
            { $match: { 'milestones.status': 'completed' } },
            { $group: { _id: '$client_id', totalMoneyPaid: { $sum: '$milestones.amount' } } }
        ]);

        // 3. Total Jobs Posted by this Client
        const totalJobsPosted = await Job.countDocuments({
            client_id: clientId  // Match by client_id directly
        });

        // 4. Average Number of Applications per Job
        const totalApplications = applicationsCount.length ? applicationsCount[0].totalApplications : 0;
        const averageApplicationsPerJob = totalJobsPosted === 0 ? 0 : totalApplications / totalJobsPosted;

        // 5. Total Money Paid Calculation
        const totalAmountPaid = totalPaid.length ? totalPaid[0].totalMoneyPaid : 0;

        // Prepare the response data
        const responseData = {
            totalApplications: totalApplications,
            totalMoneyPaid: totalAmountPaid,
            totalJobsPosted: totalJobsPosted,
            averageApplicationsPerJob: averageApplicationsPerJob.toFixed(2) // rounding to 2 decimal points
        };
        console.log(responseData);

        // Send the response with computed data
        return res.status(200).json(responseData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/analysis/:userid', async (req, res) => {
  try {
    const { userid } = req.params;

    // Get the number of job applications for the freelancer (user)
    const applicationCount = await JobApplication.countDocuments({ user_id: userid });

    // Get the contracts accepted by the freelancer
    const acceptedContracts = await Contract.find({ freelancer_id: userid, status: 'accepted' });

    // Get the total earnings by calculating the completed milestones
    let totalEarnings = 0;
    for (const contract of acceptedContracts) {
      const job = await Job.findById(contract.job_id);
      
      if (job) {
        // Calculate earnings for completed milestones
        job.milestones.forEach((milestone) => {
          if (milestone.status === 'completed') {
            totalEarnings += milestone.amount;
          }
        });
      }
    }

    // Get the number of unique clients (based on client_id)
    const clientIds = new Set(acceptedContracts.map(contract => contract.client_id));
    const uniqueClientCount = clientIds.size;

 

    // Return the response with all the needed data
    return res.status(200).json({
      applicationCount,
      acceptedJobsCount: acceptedContracts.length,
      totalEarnings,
      uniqueClientCount
    });

  } catch (err) {
    console.error('Error fetching analysis:', err);
    return res.status(500).json({ message: 'Failed to fetch analysis data.' });
  }
});


module.exports = router;
