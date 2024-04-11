const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();

// Serve static files from the "public" directory
app.use(express.static("../public"));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://ugowarem:Q7TT52ivN8fncVle@cluster0.xe28aee.mongodb.net/?retryWrites=true&w=majority"',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
