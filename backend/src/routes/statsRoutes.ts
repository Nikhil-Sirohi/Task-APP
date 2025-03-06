import { Router } from "express";
import { getStats } from "../controllers/statsController";

const router = Router();

router.get("/stats", getStats);

export default router;
