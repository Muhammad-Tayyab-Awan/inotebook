import cors from "cors";
import "dotenv/config";
import express from "express";
const app = express();
const port = 8080;
import dbConnection from "./dbConnection.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
const connectionToDB = await dbConnection();
if (connectionToDB.success) {
  console.log(connectionToDB.message);
} else {
  console.log(connectionToDB.error);
}
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
  res
    .status(200)
    .json({ success: true, message: "Welcome to iNotebook Server!" });
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is Running on http://localhost:${port}`);
  } else {
    console.log(err.message);
  }
});
