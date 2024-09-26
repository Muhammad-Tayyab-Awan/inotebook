import express from "express";
import Users from "../models/Users.js";
const router = express.Router();

router.post("/", (req, res) => {
    let newUser = Users(req.body);
    newUser.save();
    res.send(newUser);
})

export default router;