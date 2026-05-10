import axios from "axios";
import User from "../models/userModel.js";

export const generateRoadmap = async (req, res) => {
  try {
    const { topic, level = "beginner" } = req.body;
    console.log("📤 Sending to FastAPI:", { topic, level });

    // 🔹 Call FastAPI
    const response = await axios.post(
      `${process.env.FASTAPI_URL}/api/roadmap/generate`,
      { topic, level }
    );

    const roadmap = response.data.roadmap;

    // 🔹 Save progress in DB
    const user = await User.findById(req.user);

    const alreadyExists = user.progress.find(
      (item) => item.topic === topic
    );

    if (!alreadyExists) {
      user.progress.push({
        topic,
        progress: 2,
        totalNodes: roadmap.nodes.length,
      });
    }

    await user.save();

    res.json({
      roadmap,
      progress: user.progress,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "AI error" });
  }
};