import cors from "cors";
import "dotenv/config";
import express from "express";
const app = express();
const port = 8080;
import dbConnection from "./dbConnection.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
dbConnection();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
