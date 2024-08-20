import express from "express";
import dotenv from "dotenv";
import ragbotRoutes from "./routes/v1/ragbot.route.js";
import { connectDB } from "./db/dbConnection.js";

const app = express();
dotenv.config();
await connectDB();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1/ragbot", ragbotRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
