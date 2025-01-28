import { Voting } from '../model/votting.model.js';


export const createVote = async (req, res) => {
    try {
        const newVote = new Voting(req.body);
        const savedVote = await newVote.save();
        res.status(201).json(savedVote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all votes
export const getVotes = async (req, res) => {
    try {
        const votes = await Voting.find().populate('candidate');
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single vote by ID
export const getVoteById = async (req, res) => {
    try {
        const vote = await Voting.findById(req.params.id).populate('candidate');
        if (!vote) {
            return res.status(404).json({ message: 'Vote not found' });
        }
        res.status(200).json(vote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vote by ID
export const updateVote = async (req, res) => {
    try {
        const updatedVote = await Voting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVote) {
            return res.status(404).json({ message: 'Vote not found' });
        }
        res.status(200).json(updatedVote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vote by ID
export const deleteVote = async (req, res) => {
    try {
        const deletedVote = await Voting.findByIdAndDelete(req.params.id);
        if (!deletedVote) {
            return res.status(404).json({ message: 'Vote not found' });
        }
        res.status(200).json({ message: 'Vote deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Add a vote to a candidate by user ID
export const addVoteToCandidate = async (req, res) => {
    try {
        const candidateId = req.body.candidateId;
        const userId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.votes.push(userId);
        await candidate.save();

        res.status(200).json({ message: 'Vote added to candidate successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};