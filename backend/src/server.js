import express from "express";
import http from 'http'
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import {Server} from 'socket.io';
import cors from 'cors'
import { log } from "console";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

//initializing socket.io server
export const io = new  Server(server,{
  cors:{origin:"*"}
})

//store online users
export const userSocketMap = {} //{userId:socketId}

//socket.io connection handler (listens for connections)
io.on("connection",(socket)=>{
  const userId = socket.handshake.query.userId;
  console.log('User connected',userId);
  
  if(userId) userSocketMap[userId]=socket.id;

  //Emit online users to all connected client
  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    console.log("User Disconnected",userId);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
  })
})



app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", messageRoutes);
app.use(cors())

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDb();
});
