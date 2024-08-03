const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
