import express from 'express';
import { createVote, getVotes, getVoteById, updateVote, deleteVote } from '../controllers/votting.contoller.js';

const router = express.Router();

// Create a new vote
router.post('create-vote/', createVote);

// Get all votes
router.get('vote/', getVotes);

// Get a single vote by ID
router.get('vote/:id', getVoteById);

// Update a vote by ID
router.put('vote/:id', updateVote);

// Delete a vote by ID
router.delete('vote/:id', deleteVote);

export default router;