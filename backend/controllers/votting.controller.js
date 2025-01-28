const express = require("express");

const router = express.Router();

// Mock database
let votes = [];

// Get all votes
router.get("/votes", (req, res) => {
  res.json(votes);
});

// Add a new vote
router.post("/vote", (req, res) => {
  const { candidate } = req.body;
  if (!candidate) {
    return res.status(400).json({ error: "Candidate is required" });
  }
  votes.push({ candidate, timestamp: new Date() });
  res.status(201).json({ message: "Vote added successfully" });
});

// Get votes for a specific candidate
router.get("/votes/:candidate", (req, res) => {
  const { candidate } = req.params;
  const candidateVotes = votes.filter((vote) => vote.candidate === candidate);
  res.json(candidateVotes);
});


// Function to count votes for each candidate
function countVotes() {
  const voteCount = {};
  votes.forEach((vote) => {
    if (voteCount[vote.candidate]) {
      voteCount[vote.candidate]++;
    } else {
      voteCount[vote.candidate] = 1;
    }
  });
  return voteCount;
}
