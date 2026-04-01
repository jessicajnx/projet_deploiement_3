const express = require("express");
const { formatGreeting } = require("./message");

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "projet_deploiement_3",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/greet", (req, res) => {
  const name = req.query.name || "monde";
  res.status(200).json({
    message: formatGreeting(name)
  });
});

app.get("/", (_req, res) => {
  res.status(200).send("Application deployee et operationnelle");
});

module.exports = app;
