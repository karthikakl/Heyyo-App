import express from "express";
import http from 'http'
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(cors())

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDb();
});
