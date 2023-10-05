import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import connectDB from "./utils/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//connect to database
connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Server is running...",
  });
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
