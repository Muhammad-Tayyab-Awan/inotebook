/* eslint-disable no-undef */
import express from "express";
import { param, validationResult } from "express-validator";
const router = express.Router();
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
import Users from "../models/Users.js";
router.get(
  "/:verificationToken",
  param("verificationToken").isJWT(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const verificationToken = req.params.verificationToken;
        JWT.verify(verificationToken, JWT_SECRET, async (err, response) => {
          // * verifying token
          if (err) {
            // * in case when token is tempered or not valid
            res.status(403).json({
              status: false,
              error: "Token is not valid!"
            }); // ! sending error
          } else {
            // * in case when token is valid
            const user = await Users.findById(response.id);
            if (user.emailVerified === true) {
              res.status(400).json({
                success: false,
                error: "User email is already verified"
              });
            } else {
              user.emailVerified = true;
              await user.save();
              res
                .status(200)
                .json({ success: true, msg: "Email verified successfully" });
            }
          }
        });
      } else {
        res.status(400).json({ success: false, error: result.errors });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error Occurred on Server Side",
        message: error.message
      });
    }
  }
);
export default router;
