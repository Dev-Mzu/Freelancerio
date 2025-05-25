const admin = require('../firebase/firebase.js');
const Contract = require('../models/contractModel');
const JobApplication = require('../models/applicationModel');

const createContract = async (req, res) => {
    try {
        const { client_id, freelancer_id, job_id, contract_terms } = req.body;

        if (!client_id || !freelancer_id || !job_id || !contract_terms) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // You can perform additional validation (check if users exist in the database)
        // For example, validate that client_id, freelancer_id, and job_id exist in their respective collections

        const contract = new Contract({
            client_id,
            freelancer_id,
            job_id,
            contract_terms,
            status: 'pending', // Default to pending status
        });

        await contract.save();

         await JobApplication.updateMany(
            { job_id: job_id, status: { $ne: 'accepted' } }, // Find applications that are not accepted
            { $set: { status: 'rejected' } } // Set their status to 'rejected'
        );

        // Set the selected freelancer's application to 'accepted'
        await JobApplication.updateOne(
            { job_id: job_id, user_id: freelancer_id },
            { $set: { status: 'accepted' } } // Accept the selected freelancer's application
        );


        return res.status(201).json({ message: "Contract created successfully", contract });
    } catch (err) {
        console.error("Error creating contract:", err);
        return res.status(500).json({ message: "Failed to create contract" });
    }

}

const getContract = async (req, res) => {
    try {
        const { contractId } = req.params;

        if (!contractId) {
            return res.status(400).json({ message: "Contract ID is required" });
        }

        const contract = await Contract.findById(contractId);
        
        if (!contract) {
            return res.status(404).json({ message: "Contract not found" });
        }

        return res.status(200).json({ contract });
    } catch (err) {
        console.error("Error fetching contract:", err);
        return res.status(500).json({ message: "Failed to fetch contract" });
    }

}

const getAllFreelancerContracts = async (req, res) => {
     try {
        const { freelancerId } = req.params;

        if (!freelancerId) {
            return res.status(400).json({ message: "Freelancer ID is required" });
        }

        // Fetch all contracts where the freelancer is involved
        const contracts = await Contract.find({ freelancer_id: freelancerId });

        if (!contracts.length) {
            return res.status(404).json({ message: "No contracts found for this freelancer" });
        }

        return res.status(200).json({ contracts });
    } catch (err) {
        console.error("Error fetching freelancer contracts:", err);
        return res.status(500).json({ message: "Failed to fetch freelancer contracts" });
    }

}

const getAllClientsContracts = async (req, res) => {
     try {
        const { clientId } = req.params;

        if (!clientId) {
            return res.status(400).json({ message: "Client ID is required" });
        }

        // Fetch all contracts where the client is involved
        const contracts = await Contract.find({ client_id: clientId });

        if (!contracts.length) {
            return res.status(404).json({ message: "No contracts found for this client" });
        }

        return res.status(200).json({ contracts });
    } catch (err) {
        console.error("Error fetching client contracts:", err);
        return res.status(500).json({ message: "Failed to fetch client contracts" });
    }

}

const AcceptContract = async (req, res) => {
    try {
        const { contractId } = req.params;

        const contract = await Contract.findById(contractId);

        if (!contract) {
            return res.status(404).json({ message: "Contract not found" });
        }

        if (contract.status !== 'pending') {
            return res.status(400).json({ message: "This contract has already been accepted or declined" });
        }

        contract.status = 'accepted';
        await contract.save();

        return res.status(200).json({ message: "Contract accepted successfully", contract });
    } catch (err) {
        console.error("Error accepting contract:", err);
        return res.status(500).json({ message: "Failed to accept contract" });
    }

}

const RejectContract = async (req, res) => {
    try {
        const { contractId } = req.params;

        const contract = await Contract.findById(contractId);

        if (!contract) {
            return res.status(404).json({ message: "Contract not found" });
        }

        if (contract.status !== 'pending') {
            return res.status(400).json({ message: "This contract has already been accepted or declined" });
        }

        contract.status = 'declined';
        await contract.save();

        return res.status(200).json({ message: "Contract rejected successfully", contract });
    } catch (err) {
        console.error("Error rejecting contract:", err);
        return res.status(500).json({ message: "Failed to reject contract" });
    }

}

module.exports = { createContract, getContract, getAllFreelancerContracts, getAllClientsContracts, AcceptContract, RejectContract};