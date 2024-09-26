import express from "express";
import Users from "../models/Users.js";
const router = express.Router();
import expressValidator from "express-validator";
const { body, validationResult } = expressValidator;
router.post(
  "/",
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
          user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          res.status(200).send(user);
        } else {
          res
            .status(400)
            .json({ error: { msg: "User with this email already exists" } });
        }
      } else {
        return res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error Occured on Server Side",
        message: error.message
      });
    }
  }
);

export default router;
