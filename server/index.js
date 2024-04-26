const express = require("express");
const app = express();

// Routes
app.use("/api", require("./routes/auth"));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
