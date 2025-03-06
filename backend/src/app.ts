import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import statsRoutes from "./routes/statsRoutes";
import { authMiddleware } from "./middleware/auth";
import { errorMiddleware } from "./middleware/error";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/dashboard", authMiddleware, statsRoutes);

app.use(errorMiddleware);

export default app;
