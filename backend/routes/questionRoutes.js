import express from "express";
import { getQuestions, createQuestion } from "../controllers/questionControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getQuestions);
router.post("/", authenticateToken, requireRole("teacher"), createQuestion);

export default router;
