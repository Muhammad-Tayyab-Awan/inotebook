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
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
        .then((userCreated) => {
          res.status(200).json(userCreated);
        })
        .catch((err) => {
          res.status(400).json({
            Error: "Please enter unique value for email",
            Message: err.message,
          });
        });
    } else {
      return res.status(400).json({ errors: result.array() });
    }
  }
);

export default router;
