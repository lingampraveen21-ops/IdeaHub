import express from "express";
import {
  createIdea,
  getIdeas,
  updateIdea,
  deleteIdea,
  likeIdea,
  commentIdea
} from "../controllers/ideaController.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CRUD
router.post("/create", authMiddleware, createIdea);
router.get("/", getIdeas);
router.put("/:id", authMiddleware, updateIdea);
router.delete("/:id", authMiddleware, deleteIdea);

// Like + Comment
router.post("/like/:id", authMiddleware, likeIdea);
router.post("/comment/:id", authMiddleware, commentIdea);

export default router;
