const express = require("express");
const os      = require("os");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.get("/", (req, res) => {
  res.json({
    message:  "Welcome to CI/CD Demo App!",
    version:  process.env.APP_VERSION || "1.0.0",
    hostname: os.hostname()
  });
});

app.get("/api/info", (req, res) => {
  res.json({ app: "nodejs-cicd-demo", node: process.version });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

module.exports = app;
