require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoutes = require("./src/routes/route_controller");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Clothing Store API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api",
    },
  });
});

// Use central controller for all /api routes
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Connect to MongoDB with retry logic
async function connectDB() {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const mongoUri = process.env.MONGODB_URI;
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(
        `✅ Connected to database: ${mongoose.connection.db.databaseName}`
      );
      console.log(`📊 Database host: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      retries++;
      console.error(
        `❌ MongoDB connection attempt ${retries} failed:`,
        err.message
      );

      if (retries === maxRetries) {
        console.error("❌ Max retries reached. Exiting...");
        process.exit(1);
      }

      console.log(`⏳ Retrying in 5 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

// Graceful shutdown
function gracefulShutdown(signal) {
  console.log(`\n📤 Received ${signal}. Shutting down gracefully...`);

  server.close(() => {
    console.log("🔌 HTTP server closed");

    mongoose.connection.close(false, () => {
      console.log("📊 MongoDB connection closed");
      process.exit(0);
    });
  });
}

// Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

// Connect to database
connectDB();
