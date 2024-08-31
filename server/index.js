import express from "express";
import dotenv from "dotenv";
import ragbotRoutes from "./routes/v1/ragbot.route.js";
import { connectDB } from "./db/dbConnection.js";
import cors from "cors";
import path from "path"
const PORT = process.env.PORT || 3001;

const app = express();
dotenv.config();
await connectDB();
app.use(
  cors({
    origin: ["https://ragdeploycheck.onrender.com"],
  })
);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use(express.json());
app.use("/api/v1/ragbot", ragbotRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running on port https://ragdeploycheck.onrender.com`)
);
