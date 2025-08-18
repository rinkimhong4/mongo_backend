const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoutes = require("./src/controller/route_controller");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use central controller for all /api routes
app.use("/api", apiRoutes);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/clothing");
    console.log(
      `Connected to database: ${mongoose.connection.db.databaseName}`
    );
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
