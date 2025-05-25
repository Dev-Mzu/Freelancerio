const express = require('express');
const router = express.Router();

const { createContract, getContract, getAllFreelancerContracts, getAllClientsContracts, AcceptContract, RejectContract } = require('../controllers/contractController');

// Contract routes
router.post('/create-contract',createContract);
router.get('/get-contract/:contractId',getContract);
router.get('/get-all-freelancer-contracts/:freelancerId',getAllFreelancerContracts);
router.get('/get-all-client-contracts/:clientId', getAllClientsContracts);
router.put('/accept-contract/:contractId',AcceptContract);
router.put('/reject-contract/:contractId',RejectContract);

module.exports = router;