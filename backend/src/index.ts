import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import friendsRoutes from "./routes/friends.route.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); //for parsing application/json

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/friends", friendsRoutes)

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});