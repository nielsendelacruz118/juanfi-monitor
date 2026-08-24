const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Memory cache for vendo statuses
let vendoDatabase = {};

app.post("/api/update", (req, res) => {
  const { vendoName, ip, status } = req.body;
  if (vendoName) {
    vendoDatabase[vendoName] = {
      name: vendoName,
      ip: ip,
      status: status,
      lastSeen: new Date().toISOString()
    };
  }
  res.status(200).send({ message: "Updated successfully" });
});

app.get("/api/status", (req, res) => {
  res.json(vendoDatabase);
});

module.exports = app;
