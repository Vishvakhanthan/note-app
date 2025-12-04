import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";

import rateLimiter from "./middleware/rateLimiter.js";
import NotesRouter from "./routes/notes-routes.js";
import { connectDB } from "./config/db.js";

dotenv.config({ quiet: true });

const app = express();
const __dirname = path.resolve();

const ENVIRONMENTAL_VARIABLES = process.env;
const port = ENVIRONMENTAL_VARIABLES.API_PORT || 8000;
const URI = ENVIRONMENTAL_VARIABLES.MONGODB_API_URI;

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/v1/notes", NotesRouter);


connectDB(URI).then(() => {
  app.listen(port, () => {
    console.log(__dirname);
    console.log(`Server is running on http://localhost:${port}`);
  });
});
