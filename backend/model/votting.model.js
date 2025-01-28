import mongoose from "mongoose";

const votingSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Voting = mongoose.model("Voting", votingSchema);
