import express from "express";
import Users from "../models/Users.js";
const router = express.Router();
import expressValidator from "express-validator";
import bcrypt from "bcryptjs";
const { body, validationResult } = expressValidator;
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
import getUser from "../middleware/getUser.js";
router.post(
  "/signup",
  [
    body("name", "Name must conatin at least 6 chars").isLength({ min: 6 }),
    body("email", "Please enter correct eamil").isEmail(),
    body("password", "password must conatin at least 8 chars").isLength({
      min: 8
    })
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
          let salt = await bcrypt.genSalt(10);
          let hashedPassword = await bcrypt.hash(req.body.password, salt);
          user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          let token = JWT.sign({ id: user.id }, JWT_SECRET);
          res.status(200).json({ success: true, authToken: token });
        } else {
          res.status(400).json({
            success: false,
            error: { msg: "User with this email already exists" }
          });
        }
      } else {
        return res.status(400).json({ success: false, errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error Occured on Server Side",
        message: error.message
      });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Please Enter Correct Email").isEmail(),
    body("password", "Please Enter Correct Password").exists()
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        let { email, password } = req.body;
        let user = await Users.findOne({ email: email });
        if (!user) {
          res.status(400).json({
            success: false,
            error: "Invalid credentials! Please Enter Correct credentials"
          });
        } else {
          const comparePassword = await bcrypt.compare(password, user.password);
          if (comparePassword) {
            let token = JWT.sign({ id: user.id }, JWT_SECRET);
            res.status(200).json({ success: true, authToken: token });
          } else {
            res.status(400).json({
              success: false,
              error: "Invalid credentials! Please Enter Correct credentials"
            });
          }
        }
      } else {
        return res.status(400).json({ success: false, errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error Occured on Server Side",
        message: error.message
      });
    }
  }
);

router.post("/getuser", getUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findOne({ _id: userId }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error Occured on Server Side",
      message: error.message
    });
  }
});
export default router;
