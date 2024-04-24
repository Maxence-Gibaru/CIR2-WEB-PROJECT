const express = require("express");
const app = express();

// Routes
app.use("/api", require("./routes/auth"));

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
