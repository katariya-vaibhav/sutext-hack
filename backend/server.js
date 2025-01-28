import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
