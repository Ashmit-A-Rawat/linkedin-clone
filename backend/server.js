import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/users.js';
import { initializeSocket } from './socket/socketHandler.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ Allow Socket.io from anywhere
const io = new Server(server, {
  cors: {
    origin: "*", // 👈 Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false // 👈 Must be false when using "*"
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

const PORT = process.env.PORT || 5001;

// ✅ Allow Express CORS from anywhere
app.use(
  cors({
    origin: "*", // 👈 Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin"
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Initialize Socket.io
initializeSocket(io);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

// Health routes
app.get("/", (req, res) => {
  res.json({
    message: "LinkedIn Clone API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: "connected"
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong!"
  });
});

// Graceful shutdown
["SIGTERM", "SIGINT"].forEach(signal =>
  process.on(signal, () => {
    console.log(`👋 ${signal} received, shutting down...`);
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  })
);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 CORS: Allowed from anywhere`);
});

export { io };
