import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  topic: String,
  progress: { type: Number, default: 2 }, // initial 2%
  totalNodes: Number,
  completedNodes: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,

  progress: [progressSchema]
});

export default mongoose.model("User", userSchema);