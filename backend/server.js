import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 5000;

import userRouter from "./routes/user.route.js";
import connectDB from "./db/db.config.js";
import feedbackRouter from "./routes/feedback.route.js";

app.use("/api", userRouter);
app.use("/api", feedbackRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
