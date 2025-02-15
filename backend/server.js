require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

