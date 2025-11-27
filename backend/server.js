import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import ideaRoutes from "./routes/ideaRoutes.js";

dotenv.config();

// INITIALIZE APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONNECT DATABASE FIRST
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
